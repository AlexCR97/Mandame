import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-cliente-repartidor',
  templateUrl: './chat-cliente-repartidor.page.html',
  styleUrls: ['./chat-cliente-repartidor.page.scss'],
})
export class ChatClienteRepartidorPage implements OnInit {

  mensajes: any[] = [
    {
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
    {
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
	{
	'msg': 'Hola buenas, soy yo, el repartidor!',
	},
	{
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
	{
	'msg': 'Hola buenas, soy yo, el repartidor!',
	},
	{
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
	{
	'msg': 'Hola buenas, soy yo, el repartidor!',
	},
	{
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
	{
  	'msg': 'Hola buenas, soy yo, el repartidor!',
    },
    {
      'msg': 'Hola buenas, soy yo, el cliente!',
    },
    {
  	'msg': 'Hola buenas, soy yo, el repartidor!',
    },
    {
  	'msg': 'Hola buenas, soy yo, el repartidor!',
    },
    {
  	'msg': 'Hola buenas, soy yo, el repartidor!',
    }
  ]

	mtest: number[] = [ 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2 ]

  constructor() { }

  ngOnInit() {
  }

}
