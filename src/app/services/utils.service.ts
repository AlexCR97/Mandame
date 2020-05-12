import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getFechaHoy(): Date {
    return new Date(this.getFechaHoyString());
  }

  getFechaHoyString(): string {
    let currentdate = new Date(); 
    return (currentdate.getMonth() + 1) + "/" 
          + currentdate.getDate() + "/"
          + currentdate.getFullYear() + " @ "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds();
  }
}
