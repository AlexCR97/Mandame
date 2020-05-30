import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.page.html',
  styleUrls: ['./nueva-direccion.page.scss'],
})
export class NuevaDireccionPage implements OnInit {

  direccion: Direccion = {
    calle: '',
    entreCalle1: '',
    entreCalle2: '',
    numeroExterior: undefined as number,
    numeroInterior: undefined as number,
    colonia: '',
  };

  constructor(
    private direccionesService: DireccionesService,
    private guiUtils: GuiUtilsService,
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

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

    this.seleccionarDireccion(this.direccion);
  }

  seleccionarDireccion(direccion: Direccion) {
    console.log('seleccionarDireccion()');
    console.log('Direccion:', direccion);

    this.modalController.dismiss(direccion);
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
