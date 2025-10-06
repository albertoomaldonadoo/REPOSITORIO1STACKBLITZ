import './style.css'
import { fromFetch } from 'rxjs/fetch';
import { switchMap, of} from 'rxjs';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <img src="../src/img/logo_dragonballapi.jpg" >
      
      <h1>Personajes de Dragon Ball</h1>
      <div id="mostrarPersonajes">
        
      </div>
    
      <h1>Planetas   de Dragon Ball</h1>
      <div id="mostrarPlanetas">
        
      </div>
  </div>
`

/*CON RXJS*/

const respuestaPersonajesFetchRXJS = fromFetch('https://dragonball-api.com/api/characters').pipe(
  switchMap(respuestaPersonajesFetchRXJS => {
    if (respuestaPersonajesFetchRXJS.ok) {
      return respuestaPersonajesFetchRXJS.json();
    } else {
      return of({ error: true, message: `Error ${ respuestaPersonajesFetchRXJS.status }` });
    }
  })
);
 
respuestaPersonajesFetchRXJS.subscribe({
    next: (result:any) => {
      const element = document.getElementById('mostrarPersonajes');
      if(element){
        result['items'].map((character:any)=>{
          element.innerHTML+=`
            <div class="card">
            
              <div class="image-container">
                 <img src="${character['image']}">
              </div>


              <div class="data-container">
                 <h2>ID: ${character['name']}</h2>
              </diV>


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

/*FECTH DE PLANETAS*/
const respuestaPlanetasFetchRXJS = fromFetch('https://dragonball-api.com/api/planets').pipe(
  switchMap(respuestaPlanetasFetchRXJS => {
    if (respuestaPlanetasFetchRXJS.ok) {
      return respuestaPlanetasFetchRXJS.json();
    } else {
      return of({ error: true, message: `Error ${ respuestaPlanetasFetchRXJS.status }` });
    }
  })
);
 
respuestaPlanetasFetchRXJS.subscribe({
    next: (result:any) => {
      const element = document.getElementById('mostrarPlanetas');
      if(element){
        result['items'].map((planet:any)=>{
          element.innerHTML+=`
            <div class="card">

              <div class="image-containerplanets">
                 <img src="${planet['image']}">
              </div>

              <div class="data-container">
                 <h2>ID: ${planet['name']}</h2>
              </diV>

              <div class="data-container">
                 <p>ID: ${planet['id']}</p>
              </diV>

              <div class="data-container">
                 <p>Descripcion: ${planet['description']}</p>
              </diV>

              <div class="data-container">
                 <p>KI: ${planet['ki']}</p>
              </diV>

              <div class="data-container">
                 <p>MaxKI: ${planet['maxKi']}</p>
              </diV>

              <div class="data-container">
                 <p>Raza: ${planet['race']}</p>
              </diV>

              <div class="data-container">
                 <p>Afilacion: ${planet['affiliation']}</p>
              </diV>
            </div>`
        })
      }
      
    },
    complete: () => console.log('done'),
});
