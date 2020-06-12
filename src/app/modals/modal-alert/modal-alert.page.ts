import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { CacheCarrito } from 'src/app/cache/cache-carrito';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.page.html',
  styleUrls: ['./modal-alert.page.scss'],
})
export class ModalAlertPage implements OnInit {

  imagen:string = "assets/icon/logo.png";

  // @Input() uid: any;

  constructor(
  	private modalController: ModalController,
  	private router: Router,
    public navController: NavController) { }

  ngOnInit() {
  }

  verPedido() {
    // uidPedido
    console.log('UID: ', CacheCarrito.getUltimoPedidoUid());
  	this.dismissModal();

    let navigationExtras: NavigationExtras = {
      queryParams: {
        uid: CacheCarrito.getUltimoPedidoUid()
      }
    }

    this.router.navigate(['/preparando-pedido'], navigationExtras);
  }	

  dismissModal() {
  	this.modalController.dismiss();	
  	// TODO: SEND DIRECTLY TO PEDIDOS PAGE OR RETURN SOME VALUE AND REDIRECT FROM PARENT PAGE
  }
}
