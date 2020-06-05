import { Component, OnInit } from '@angular/core';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { DocsPlantillas, getPlantilla } from 'src/app/dbdocs/plantillas';
import { Usuario } from 'src/app/dbdocs/usuario';
import { Direccion } from 'src/app/dbdocs/direccion';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-direccion',
  templateUrl: './seleccionar-direccion.page.html',
  styleUrls: ['./seleccionar-direccion.page.scss'],
})
export class SeleccionarDireccionPage implements OnInit {

  direcciones = CacheDirecciones.getAllDireccionesDeUsuario(CacheUsuario.usuario.uid);
  //direcciones = CacheDirecciones.getAllDireccionesDeUsuario((getPlantilla(DocsPlantillas.usuario) as Usuario).uid);

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  seleccionarDireccion(direccion: Direccion) {
    console.log('seleccionarDireccion()');
    console.log('Direccion:', direccion);

    this.modalController.dismiss(direccion);
  }

  dismissModal(){
    this.modalController.dismiss();
  }
}
