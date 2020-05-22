import { Component, OnInit } from '@angular/core';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Usuario } from 'src/app/dbdocs/usuario';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  usuario: Usuario = CacheUsuario.usuario;

  constructor() { }

  ngOnInit() {
    console.log('Usuario:');
    console.log(this.usuario);
  }
}
