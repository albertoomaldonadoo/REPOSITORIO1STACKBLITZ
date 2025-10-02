import './style.css'
import { fromFetch } from 'rxjs/fetch';
import { switchMap, of, catchError } from 'rxjs';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <h1>Personajes de Dragon Ball</h1>
      <div id="mostrarPersonajes">
        
      </div>
  </div>
`

async function listaDePersonajes() {
    const respuestaFetch = await fetch('https://dragonball-api.com/api/characters');
    const datosPersonajes = await respuestaFetch.json();
    const listaPersonajes = datosPersonajes.items;

    const contenedor = document.getElementById('mostrarPersonajes');

    listaPersonajes.forEach((personaje: any) => {
      const tarjeta = document.createElement('div');
      tarjeta.innerHTML = 
      `
        <h2>Nombre: ${personaje.name}</h2>
        <p>ID: ${personaje.id}</p>
        <p>KI: ${personaje.ki}</p>
        <p>MaxKi: ${personaje.maxKi}</p>
        <p>Raza: ${personaje.race}</p>
        <p>Genero: ${personaje.gender}</p>
        <p>Descripcion: ${personaje.description}</p>
        <p>Afilacion: ${personaje.affiliation}</p>
        
        <img src="${personaje.image}" alt="fotodelpersonaje"/>
      `;

      contenedor!.appendChild(tarjeta);
    });
}

listaDePersonajes();

/*CON RXJS*/

const respuestaFetchRXJS = fromFetch('https://dragonball-api.com/api/characters').pipe(
  switchMap(respuestaFetchRXJS => {
    if (respuestaFetchRXJS.ok) {
      return respuestaFetchRXJS.json();
    } else {
      return of({ error: true, message: `Error ${ respuestaFetchRXJS.status }` });
    }
  })
);
 
respuestaFetchRXJS.subscribe({
    next: (result:any) => {
      const element = document.getElementById('app');
      if(element){
        result['items'].map((character:any)=>{
          element.innerHTML+=`
            <div class="card">

              <div class="data-container">
                 <h2>ID: ${character['name']}</h2>
              </diV>

              <div class="image-container">
                 <img src="${character['image']}">
              </div>

              <div class="data-container">
                 <p>ID: ${character['id']}</p>
              </diV>

              <div class="data-container">
                 <p>Descripcion: ${character['description']}</p>
              </diV>

              <div class="data-container">
                 <p>KI: ${character['ki']}</p>
              </diV>

              <div class="data-container">
                 <p>MaxKI: ${character['maxKi']}</p>
              </diV>

              <div class="data-container">
                 <p>Raza: ${character['race']}</p>
              </diV>

              <div class="data-container">
                 <p>Afilacion: ${character['affiliation']}</p>
              </diV>
            </div>\n`
        })
      }
      
    },
    complete: () => console.log('done'),
});