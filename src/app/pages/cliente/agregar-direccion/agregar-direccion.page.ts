import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { DireccionesService, OperacionDireccion } from 'src/app/services/direcciones.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { NavController } from '@ionic/angular';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {

  titulos = new Map<OperacionDireccion, string>([
    [OperacionDireccion.agregar, 'Nueva dirección'],
    [OperacionDireccion.editar, 'Editar dirección'],
  ]);

  operacion: OperacionDireccion;
  uidDireccion: string;
  direccion: Direccion = {
    calle: '',
    entreCalle1: '',
    entreCalle2: '',
    numeroExterior: undefined as number,
    numeroInterior: undefined as number,
    colonia: '',
  };

  cargandoDialog;

  constructor(
    public activatedRoute: ActivatedRoute,
    public direccionesService: DireccionesService,
    public guiUtils: GuiUtilsService,
    public navController: NavController,
    public router: Router,
  ) { }

  ngOnInit() {
    this.operacion = this.activatedRoute.snapshot.queryParamMap.get('operacion') as OperacionDireccion;
    this.uidDireccion = this.activatedRoute.snapshot.queryParamMap.get('uidDireccion');

    console.log('La operacion es:', this.operacion);
    console.log('La direccion es:', this.uidDireccion);

    if (this.operacion == OperacionDireccion.editar) {
      console.log('Buscando la direccion en el cache...');
      this.direccion = CacheDirecciones.getDireccion(this.uidDireccion);
      console.log('La direccion encontrada fue: ', this.direccion);
    }
  }

  async agregarDireccion() {
    this.cargandoDialog = await this.guiUtils.mostrarCargando('Agregando nueva direccion...');
    
    console.log('Agregando nueva direccion...');
    this.direccionesService.agregarDireccion(CacheUsuario.usuario, this.direccion)
    .then(result => {
      console.log('Exito al agregar nueva direccion :D');
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('¡Direccion agregada!', 3000, 'success');

      this.navController.back();
      this.navController.back();
    })
    .catch(error => {
      console.log('Error al agregar nueva direccion :(');
      console.log(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('No se pudo agregar tu nueva direccion :(', 3000, 'danger');
    });
  }

  async editarDireccion() {
    this.cargandoDialog = await this.guiUtils.mostrarCargando('Editando tu direccion...');

    console.log('Editando tu direccion...');
    this.direccionesService.actualizarDireccion(this.uidDireccion, this.direccion)
    .then(() => {
      console.log('Exito al editar tu direccion :D');
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('¡Direccion editada!', 3000, 'success');

      this.navController.back();
      this.navController.back();
    })
    .catch(error => {
      console.log('Error al editar nueva direccion :(');
      console.log(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('No se pudo editar tu direccion :(', 3000, 'danger');
    });
  }

  onBtnConfirmarClick() {
    console.log('onBtnConfirmarClick()');
    console.log('Direccion ingresada: ', this.direccion);

    console.log('Validando datos...');
    if (!this.validarDatos()) {
      console.log('Datos invalidos :(');
      this.guiUtils.mostrarToast('Asegurate de llenar todos los campos obligatorios', 3000, 'danger');
      return;
    }

    console.log('Los datos son validos :D');

    switch (this.operacion) {
      case OperacionDireccion.agregar: {
        this.agregarDireccion();
        break;
      }

      case OperacionDireccion.editar: {
        this.editarDireccion();
        break;
      }
    }
  }

  validarDatos(): boolean {
    if (this.direccion.calle == undefined || this.direccion.calle.trim().length == 0) {
      return false;
    }

    if (this.direccion.numeroExterior == undefined) {
      return false;
    }

    if (this.direccion.colonia == undefined || this.direccion.colonia.trim().length == 0) {
      return false;
    }

    return true;
  }
}
