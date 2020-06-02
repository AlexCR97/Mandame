import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { SeleccionarDireccionPage } from 'src/app/modals/seleccionar-direccion/seleccionar-direccion.page';
import { NuevaDireccionPage } from 'src/app/modals/nueva-direccion/nueva-direccion.page';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { EsperaPedido } from 'src/app/services/pedidos.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Mandado } from 'src/app/dbdocs/mandado';
import { MandadoService } from 'src/app/services/mandado.service';
import { ActivatedRoute } from '@angular/router';
import { CacheMandados } from 'src/app/cache/cache-mandados';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';

@Component({
  selector: 'app-mandame',
  templateUrl: './mandame.page.html',
  styleUrls: ['./mandame.page.scss'],
})
export class MandamePage implements OnInit {

  uidMandadoSeleccionado: string;
  mandadoSeleccionado: Mandado;

  direccionOrigen: Direccion = {
    calle: 'Haz clic aquí para seleccionar una dirección',
    numeroExterior: null,
    colonia: 'Selecciona a donde te llevaran tu pedido',
  };

  direccionDestino: Direccion = {
    calle: 'Haz clic aquí para seleccionar una dirección',
    numeroExterior: null,
    colonia: 'Selecciona a donde tienen que hacer tu mandado',
  };

  indicaciones = '';

  nuevaDireccionOrigenIngresada = false;
  nuevaDireccionDestinoIngresada = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private guiUtils: GuiUtilsService,
    private mandadoService: MandadoService,
    private modalController: ModalController,
    private navController: NavController,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    console.log('Verificando si se abrio un mandado...');
    this.uidMandadoSeleccionado = this.activatedRoute.snapshot.queryParamMap.get('uidMandado');

    if (this.uidMandadoSeleccionado != null) {
      this.mandadoSeleccionado = CacheMandados.getMandado(this.uidMandadoSeleccionado);

      console.log('El mandado seleccionado fue ', this.uidMandadoSeleccionado);
      console.log(this.mandadoSeleccionado);

      console.log('Obteniendo las direcciones del mandado seleccionado...');
      this.direccionOrigen = CacheDirecciones.getDireccion(this.mandadoSeleccionado.uidDireccionOrigen);
      this.direccionDestino = CacheDirecciones.getDireccion(this.mandadoSeleccionado.uidDireccionDestino);

      console.log('Las direcciones son:');
      console.log(this.direccionOrigen);
      console.log(this.direccionDestino);

      this.indicaciones = this.mandadoSeleccionado.indicaciones;
    }
    else {
      console.log('No se selecciono ningun mandado!');
    }
  }

  async abrirModalSeleccionarDireccion(onModalResult: (result: any) => void, onModalError: (error: any) => void) {
    const modal = await this.modalController.create({
      component: SeleccionarDireccionPage,
      cssClass: 'dialog-modal',
    });

    modal.onDidDismiss()
    .then(result => onModalResult(result))
    .catch(error => onModalError(error));

    return await modal.present();
  }

  async abrirModalIngresarNuevaDireccion(onModalResult: (result: any) => void, onModalError: (error: any) => void) {
    const modal = await this.modalController.create({
      component: NuevaDireccionPage,
      cssClass: 'dialog-modal',
    });

    modal.onDidDismiss()
    .then(result => onModalResult(result))
    .catch(error => onModalError(error));

    return await modal.present();
  }

  async abrirAlertIngresarIndicaciones(onAlertResult: (input: string) => void) {
    const alert = await this.alertController.create({
      cssClass: 'alert-indicaciones',
      header: '¿Cuál es tu mandado?',
      mode: 'ios',
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Escribe tus indicaciones',
        },
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: ($event) => {
            console.log('Result abrirAlertIngresarIndicaciones()');
            console.log($event);
            onAlertResult($event[0]);
          }
        }
      ]
    });

    return await alert.present();
  }

  ingresarIndicaciones() {
    if (this.mandadoSeleccionado) {
      return;
    }

    console.log('ingresarIndicaciones()');

    this.abrirAlertIngresarIndicaciones(input => {
      console.log('Las indicaciones son:', input);

      this.indicaciones = input;
    });
  }

  ingresarOtraDireccionDestino() {
    if (this.mandadoSeleccionado) {
      return;
    }

    console.log('ingresarOtraDireccionDestino()');

    this.abrirModalIngresarNuevaDireccion(
      result => {
        console.log('Resultado modal ingresarOtraDireccionDestino');
        console.log(result);

        let direccionIngresada = result.data as Direccion;
        console.log('La direccion ingresada fue', direccionIngresada);

        if (direccionIngresada != null) {
          this.direccionDestino = direccionIngresada;
          this.nuevaDireccionDestinoIngresada = true;
        }
      },
      error => {
        console.error('Error modal ingresarOtraDireccionDestino');
        console.error(error);
      }
    );
  }

  ingresarOtraDireccionOrigen() {
    if (this.mandadoSeleccionado) {
      return;
    }

    console.log('ingresarOtraDireccionOrigen()');

    this.abrirModalIngresarNuevaDireccion(
      result => {
        console.log('Resultado modal ingresarOtraDireccionOrigen');
        console.log(result);

        let direccionIngresada = result.data as Direccion;
        console.log('La direccion ingresada fue', direccionIngresada);

        if (direccionIngresada != null) {
          this.direccionOrigen = direccionIngresada;
          this.nuevaDireccionOrigenIngresada = true;
        }
      },
      error => {
        console.error('Error modal ingresarOtraDireccionOrigen');
        console.error(error);
      }
    );
  }

  seleccionarDireccionOrigen() {
    if (this.mandadoSeleccionado) {
      return;
    }

    console.log('seleccionarDireccionOrigen()');

    this.abrirModalSeleccionarDireccion(
      result => {
        console.log('Resultado modal seleccionarDireccionOrigen');
        console.log(result);

        let direccionSeleccionada = result.data as Direccion;
        console.log('La direccion seleccionada fue', direccionSeleccionada);

        if (direccionSeleccionada != null) {
          this.direccionOrigen = direccionSeleccionada;
          this.nuevaDireccionOrigenIngresada = false;
        }
      },
      error => {
        console.error('Error modal seleccionarDireccionOrigen');
        console.error(error);
      }
    );
  }
    
  seleccionarDireccionDestino() {
    if (this.mandadoSeleccionado) {
      return;
    }

    console.log('seleccionarDireccionDestino()');
      
    this.abrirModalSeleccionarDireccion(
      result => {
        console.log('Resultado modal seleccionarDireccionDestino');
        console.log(result);

        let direccionSeleccionada = result.data as Direccion;
        console.log('La direccion seleccionada fue', direccionSeleccionada);

        if (direccionSeleccionada != null) {
          this.direccionDestino = direccionSeleccionada;
          this.nuevaDireccionDestinoIngresada = false;
        }
      },
      error => {
        console.error('Error modal seleccionarDireccionOrigen');
        console.error(error);
      }
    );
  }

  realizarMandado() {
    if (this.mandadoSeleccionado) {
      return;
    }
    
    console.log('realizarMandado()');

    // Primero, validamos los datos
    if (!this.validarDatos()) {
      console.log('Los datos son invalidos :(');
      this.guiUtils.mostrarToast('Verifica que hayas llenado todos los campos', 3000, 'danger');
      return;
    }

    console.log('Los datos son validos :D');

    let mandado: Mandado = {
      indicaciones: this.indicaciones,
      espera: EsperaPedido.Pendiente,
      fechaHora: this.utils.getFechaHoyString(),
      uidCliente: CacheUsuario.usuario.uid,
      uidDireccionOrigen: this.nuevaDireccionOrigenIngresada? undefined : this.direccionOrigen.uid,
      uidDireccionDestino: this.nuevaDireccionDestinoIngresada? undefined : this.direccionDestino.uid,
    };

    console.log('El mandado generado es:', mandado);

    // TODO Mostrar dialogo de cargando

    // Si el usuario ingreso otra direccion, hay que agregarla a la base de datos
    if (this.nuevaDireccionOrigenIngresada || this.nuevaDireccionDestinoIngresada) {
      console.log('El usuario ingreso otra direccion');
      
      console.log('Agregando direcciones a la base de datos y luego registrar mandado...');
      this.mandadoService.agregarMandadoYDirecciones(
        CacheUsuario.usuario,
        this.nuevaDireccionOrigenIngresada? this.direccionOrigen : null,
        this.nuevaDireccionDestinoIngresada? this.direccionDestino : null,
        mandado,
        mandadoRegistrado => {
          console.log('El mandado se registro con exito! :D');
          console.log(mandadoRegistrado);

          mandado = mandadoRegistrado;

          // TODO meter mandado en el cache
          this.guiUtils.mostrarAlertaConfirmar('Mandado en proceso', '¡Genial! Tu mandado ya está en proceso. Puedes verlo en la sección de "Mandados"');
          this.navController.back();
        },
        error => {
          console.error('No se pudo registrar el mandado :(');
          console.error(error);
          this.guiUtils.mostrarToast('No se pudo registrar tu mandado :(', 3000, 'danger');
        }
      );
    }
    // Si el usuario selecciono una direccion ya existente, solo agregamos el mandado
    else {
      console.log('El usuario selecciono una direccion ya existente');

      this.mandadoService.agregarMandado(mandado,
        mandadoRegistrado => {
          console.log('El mandado se registro con exito! :D');
          console.log(mandadoRegistrado);

          mandado = mandadoRegistrado;

          // TODO meter mandado en el cache
          this.guiUtils.mostrarAlertaConfirmar('Mandado en proceso', '¡Genial! Tu mandado ya está en proceso. Puedes verlo en la sección de "Mandados"');
          this.navController.back();
        },
        error => {
          console.error('No se pudo registrar el mandado :(');
          console.error(error);
          this.guiUtils.mostrarToast('No se pudo registrar tu mandado :(', 3000, 'danger');
        }
      );
    }
  }

  validarDatos(): boolean {
    if (this.direccionOrigen.numeroExterior == null)
      return false;

    if (this.direccionOrigen.colonia == null) 
      return false;

    if (this.direccionOrigen.calle == null)
      return false;
      
    if (this.direccionDestino.numeroExterior == null)
      return false;

    if (this.direccionDestino.colonia == null) 
      return false;

    if (this.direccionDestino.calle == null)
      return false;

    if (this.indicaciones == null || this.indicaciones.trim().length == 0)
      return false;
    
    return true;
  }
}
