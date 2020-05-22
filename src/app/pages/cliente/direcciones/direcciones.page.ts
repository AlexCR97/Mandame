import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';
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
    console.log("Usuario")
    console.log(CacheUsuario.usuario) 
    this.direccionesService.getDireccion(CacheUsuario.usuario.uid).subscribe(direccion => {
      console.log("Obteniendo")
      console.log(direccion)
      this.direcciones = direccion;
    })
    console.log(this.direcciones)
  }
}