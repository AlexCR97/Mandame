import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.page.html',
  styleUrls: ['./modal-alert.page.scss'],
})
export class ModalAlertPage implements OnInit {

  imagen:string = "assets/icon/logo.png";

  constructor(
  	private modalController: ModalController,
  	private router: Router) { }

  ngOnInit() {
  }

  verPedido() {
  	this.dismissModal();
  	this.router.navigateByUrl('/pedidos')
  }	

  dismissModal() {
  	this.modalController.dismiss();	
  	// TODO: SEND DIRECTLY TO PEDIDOS PAGE OR RETURN SOME VALUE AND REDIRECT FROM PARENT PAGE
  }
}
