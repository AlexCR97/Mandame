import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { MandadoService } from 'src/app/services/mandado.service';
import { SafeDocsService } from 'src/app/services/safe-docs.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Mandado } from 'src/app/dbdocs/mandado';
import { Direccion } from 'src/app/dbdocs/direccion';
import { CacheMandados } from 'src/app/cache/cache-mandados';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { EsperaPedido } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-detalles-mandado-repartidor',
  templateUrl: './detalles-mandado-repartidor.page.html',
  styleUrls: ['./detalles-mandado-repartidor.page.scss'],
})
export class DetallesMandadoRepartidorPage implements OnInit {

  uidMandadoSeleccionado: string;
  mandadoSeleccionado: Mandado;

  direccionOrigen: Direccion = {
    calle: 'No haz elegido una dirección',
    numeroExterior: null as number,
    colonia: 'Elige a donde te llevaran tu pedido',
  };

  direccionDestino: Direccion = {
    calle: 'No haz elegido una dirección',
    numeroExterior: null as number,
    colonia: 'Elige a donde te llevaran tu pedido',
  };

  indicaciones = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private direccionesService: DireccionesService,
    private guiUtils: GuiUtilsService,
    private mandadoService: MandadoService,
    private modalController: ModalController,
    private navController: NavController,
    private safeDocs: SafeDocsService,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    this.uidMandadoSeleccionado = this.activatedRoute.snapshot.queryParamMap.get('uidMandado');

    this.mandadoSeleccionado = CacheMandados.getMandado(this.uidMandadoSeleccionado);

    console.log('El mandado seleccionado fue', this.uidMandadoSeleccionado);
    console.log(this.mandadoSeleccionado);

    console.log('Obteniendo las direcciones del mandado seleccionado...');

    // La direccion de origen no esta en cache
    if (!CacheDirecciones.containsDireccion(this.mandadoSeleccionado.uidDireccionOrigen)) {
      this.direccionesService.getDireccion(this.mandadoSeleccionado.uidDireccionOrigen).subscribe(direccion => {
        this.direccionOrigen = direccion;
        CacheDirecciones.addDireccion(this.mandadoSeleccionado.uidCliente, this.direccionOrigen);
      });
    }
    // La direccion de origen si esta en cache
    else {
      this.direccionOrigen = CacheDirecciones.getDireccion(this.mandadoSeleccionado.uidDireccionOrigen);
    }

    // La direccion destino no esta en cache
    if (!CacheDirecciones.containsDireccion(this.mandadoSeleccionado.uidDireccionDestino)) {
      this.direccionesService.getDireccion(this.mandadoSeleccionado.uidDireccionDestino).subscribe(direccion => {
        this.direccionDestino = direccion;
        CacheDirecciones.addDireccion(this.mandadoSeleccionado.uidCliente, this.direccionDestino);
      });
    }
    // La direccion destino si esta en cache
    else {
      this.direccionDestino = CacheDirecciones.getDireccion(this.mandadoSeleccionado.uidDireccionDestino);
    }

    console.log('Las direcciones son:');
    console.log(this.direccionOrigen);
    console.log(this.direccionDestino);

    this.indicaciones = this.mandadoSeleccionado.indicaciones;
  }

  async onBtnEsperaMandadoClick() {
    console.log('onBtnEsperaMandadoClick()');

    const alert = await this.alertController.create({
      header: 'Estado del mandado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: data => this.onEsperaSeleccionada(data),
        },
      ],
      inputs: [
        {
          type: 'radio',
          label: EsperaPedido.Pendiente.toString(),
          value: EsperaPedido.Pendiente,
        },
        {
          type: 'radio',
          label: EsperaPedido.Concluido.toString(),
          value: EsperaPedido.Concluido,
        },
      ],
    });

    await alert.present();
  }

  onEsperaSeleccionada(data: any) {
    console.log('onEsperaSeleccionada()');
    console.log(data);

    let espera = data as EsperaPedido;
    this.mandadoSeleccionado.espera = espera;

    console.log('Actualizando el estado del pedido...');

    this.mandadoService.actualizarEsperaMandado(this.mandadoSeleccionado.uid, espera)
    .then(() => {
      console.log('Espera del mandado actualizado! :D');
    })
    .catch(error => {
      console.error('Error al actualizar la espera del pedido :(');
      console.error(error);
    });
  }

}
