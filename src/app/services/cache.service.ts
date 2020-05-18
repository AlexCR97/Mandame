import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public static carrito: any[] = [
  	{
    	desc: 'Pizza Hawaiana',
    	precio: 100.50,
    	cantidad: 2
  	},
  	{
    	desc: 'Pizza Carnes Frias',
    	precio: 150.25,
    	cantidad: 1
  	},
  	{
	    desc: 'Pizza Hawaiana',
    	precio: 100.50,
    	cantidad: 2
	},
	{
	    desc: 'Pizza Carnes Frias',
	    precio: 150.25,
	    cantidad: 1
	} 
	];

  constructor() { 
  }
}
