import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  mensajes = [
    {
      mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nemo eos sequi voluptas',
      fechaHora: '04/03/2020 01:56 pm',
      isEmisor: false,
    },
    {
      mensaje: 'Elit delectus nemo eos sequi',
      fechaHora: '04/03/2020 01:56 pm',
      isEmisor: false,
    },
    {
      mensaje: 'Et quia molestiae assumenda voluptate porro sunt fugit totam corporis tempora delectus',
      fechaHora: '04/03/2020 01:58 pm',
      isEmisor: true,
    },
    {
      mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nemo eos sequi voluptas',
      fechaHora: '04/03/2020 01:56 pm',
      isEmisor: false,
    },
    {
      mensaje: 'Elit delectus nemo eos sequi',
      fechaHora: '04/03/2020 01:56 pm',
      isEmisor: false,
    },
    {
      mensaje: 'Et quia molestiae assumenda voluptate porro sunt fugit totam corporis tempora delectus',
      fechaHora: '04/03/2020 01:58 pm',
      isEmisor: true,
    },
  ];

  constructor() { }

  ngOnInit() { }

}
