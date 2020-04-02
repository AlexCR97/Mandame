import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-test',
  templateUrl: './alert-test.page.html',
  styleUrls: ['./alert-test.page.scss'],
})
export class AlertTestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mostrarAlertaPersonalizada() {
    console.log('mostrando alerta...');
  }

}
