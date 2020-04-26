import { Component, OnInit } from '@angular/core'; 
import { ModalController } from '@ionic/angular';
// import { CalificarRepartidorPage } from '../../modals/calificar-repartidor.page';


@Component({
  selector: 'app-preparando-pedido',
  templateUrl: './preparando-pedido.page.html',
  styleUrls: ['./preparando-pedido.page.scss'],
})
export class PreparandoPedidoPage implements OnInit {

  public numPedido: string = "1";
  public lugar: string = "Dominos Pizza";

  constructor(public modalController: ModalController) { }

  // aync presentModal(){
  //   const modal = await this.modalController.create({
  //     component: CalificarRepartidorPage
  //   });
  //   return await modal.present();
  // }

  ngOnInit() {
  }

}
