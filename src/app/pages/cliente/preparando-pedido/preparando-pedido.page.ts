import { Component, OnInit } from '@angular/core'; 
import { ModalController } from '@ionic/angular';
// import { CalificarRepartidorPage } from '../../modals/calificar-repartidor.page';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-preparando-pedido',
  templateUrl: './preparando-pedido.page.html',
  styleUrls: ['./preparando-pedido.page.scss'],
})
export class PreparandoPedidoPage implements OnInit {

  public numPedido: string = "1";
  public lugar: string = "Dominos Pizza";

  uid: string;

  pedido: any = 
  {
    restaurante: 'Domino\'s',
    url: 'url',
    uidRepartidor: 'uidrepartidor',
    estado: 'estadopedido'
  };

  constructor(
    public modalController: ModalController,
    private router: ActivatedRoute,
    private restaurant: RestaurantService) { }

  // aync presentModal(){
  //   const modal = await this.modalController.create({
  //     component: CalificarRepartidorPage
  //   });
  //   return await modal.present();
  // }

  cargarPedido() {
    // TODO: CHECK STATUS FOR PEDIDOS AND CHANGE THE STATUS ON SCREEN BASED ON THAT
    console.log('CARGAR PEDIDO');
    this.router.queryParams.subscribe(params => {
      console.log('queryParams: ', params);
      this.uid = params['uid'];
      this.restaurant.getPedido(this.uid).subscribe(event => {
        this.pedido.restaurante = event.restaurante,
        this.pedido.url = 'url',
        this.pedido.uidrepartidor = event.repartidor,
        this.pedido.estado = event.estado
      });
      console.log('Pedidio retrieved: ', this.pedido);
    });

    // TODO: Cargar pedidio de BD
  }

  contactarRepartidor() {

  }

  ngOnInit() {
    this.cargarPedido();
  }

}
