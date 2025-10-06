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
      const element = document.getElementById('mostrarPersonajes');
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
            </div>`
        })
      }
      
    },
    complete: () => console.log('done'),
});