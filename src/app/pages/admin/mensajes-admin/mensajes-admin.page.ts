import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes-admin',
  templateUrl: './mensajes-admin.page.html',
  styleUrls: ['./mensajes-admin.page.scss'],
})
export class MensajesAdminPage implements OnInit {

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
