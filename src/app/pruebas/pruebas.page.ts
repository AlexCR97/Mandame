import { Component, OnInit } from '@angular/core';
import { PruebasService } from '../services/pruebas.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {

  constructor(
    public service: PruebasService,
  ) { }

  ngOnInit() { }

  probar() {
    console.log('probando...');

    this.service.getUsers().subscribe(usuarios => {
      console.log(usuarios);
    });
  }
}
