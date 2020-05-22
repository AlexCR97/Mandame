import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  // pedidoCompleto = {
  //   producto: { },
  //   adicionales: [],
  //   cantidad: 0,
  //   total: 0.0
  // }  

  // Temporalmente el carrito tiene datos estaticos, hasta que esten conectadas algunas otras pantallas
  // que manden los valores a las demas, se mantendra asi
  public static carrito: any[] = [
  	{
      categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: 'Veggy',
      precio: 90.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
    	desc: 'Pizza Hawaiana',
    	cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
  	},
  	{
    	categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: '5 Carnes',
      precio: 100.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
      desc: 'Margarita Espacial',
      cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
  	},
  	{
	    categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: 'Orilla rellena',
      precio: 125.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
      desc: '5 Carnes',
      cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
	} 
	];

  public static restaurante = 'restaurante ejemplo';

  constructor() { 
  }
}
