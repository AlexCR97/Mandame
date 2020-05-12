import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { LoadingController } from '@ionic/angular';
import { CacheUsuario } from 'src/app/services/cache-usuario';


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  direcciones: any = [];
  constructor(
    public loadingController: LoadingController,
    public direccionesService: DireccionesService,

  ) { }

  ngOnInit() {
    this.direccionesService.getDireccion(CacheUsuario.usuario.uid).subscribe(direccion => {
      this.direcciones = direccion;
    })
  }
}