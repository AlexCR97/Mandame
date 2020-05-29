import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesService, OperacionDireccion } from 'src/app/services/direcciones.service';
import { LoadingController } from '@ionic/angular';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Direccion } from 'src/app/dbdocs/direccion';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  operacionAgregar = OperacionDireccion.agregar;
  operacionEditar = OperacionDireccion.editar;
  direcciones: Direccion[];

  constructor(
    public loadingController: LoadingController,
    public direccionesService: DireccionesService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Obteniendo direcciones del usuario...');
    this.direccionesService.getDireccionesUsuario(CacheUsuario.usuario.uid,
      direcciones => {
        console.log('Direcciones obtenidas!', direcciones);
        this.direcciones = direcciones;

        CacheDirecciones.setAllDireccionesDeUsuario(CacheUsuario.usuario.uid, this.direcciones);
        console.log('Direcciones guardadas en cache :D');
      }
    );
  }

  agregarOCambiarDireccion(operacion: OperacionDireccion, uidDireccion?: string) {
    console.log('agregarOCambiarDireccion()');
    console.log('Operacion:', operacion);
    console.log('Uid direccion:', uidDireccion);

    this.router.navigate(['/agregar-direccion'], {
      queryParams: {
        operacion: operacion,
        uidDireccion: uidDireccion,
      },
    });
  }

}
