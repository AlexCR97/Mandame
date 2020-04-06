import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.page.html',
  styleUrls: ['./modal-alert.page.scss'],
})
export class ModalAlertPage implements OnInit {

  imagen:string = "assets/icon/logo.png";

  constructor() { }

  ngOnInit() {
  }

}
