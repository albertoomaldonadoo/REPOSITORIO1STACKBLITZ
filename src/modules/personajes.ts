export interface Personaje {
    items: Personaje[];
    meta:  Meta;
    links: Links;
}


export interface Personaje {
    id:          number;
    name:        string;
    ki:          string;
    maxKi:       string;
    race:        string;
    gender:      string;
    description: string;
    image:       string;
    affiliation: string;
    deletedAt:   null;
}


export interface Links {
    first:    string;
    previous: string;
    next:     string;
    last:     string;
}


export interface Meta {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}


export class Personajes {    
    private personajes: any[];
    constructor(personajes: any[]) {        
        this.personajes = personajes;
    }

    render(): string {
        return `
            <div class="card-grid">
                ${this.personajes.map(personajes=>`
                    <div class="card">
                        <h2>${personajes.name}</h2>
                        <p>${personajes.description}</p>
                        <div>Ki: ${personajes.ki} | Max Ki: ${personajes.maxKi}</div>
                        <img src="${personajes.image}" alt="${personajes.name}" />
                    </div>
                `).join('')}
            </div>
        `;
    }


}