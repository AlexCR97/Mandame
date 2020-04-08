import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preparando-pedido',
  templateUrl: './preparando-pedido.page.html',
  styleUrls: ['./preparando-pedido.page.scss'],
})
export class PreparandoPedidoPage implements OnInit {
  public numPedido: string = "1";
  public lugar: string = "Dominos Pizza";
  constructor() { }

  ngOnInit() {
  }

}
