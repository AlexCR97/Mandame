import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-chats',
  templateUrl: './tab-chats.page.html',
  styleUrls: ['./tab-chats.page.scss'],
})
export class TabChatsPage implements OnInit {

  chats = [
    {
      imgSrc: '../../../../assets/img/foto-perfil-01.jpg',
      usuario: 'Barbara Blade',
      fechaHora: 'Hace 2 min.',
      mensaje: 'Soluta ab eligendi itaque id architecto veritatis, atque placeat',
    },
    {
      imgSrc: '../../../../assets/img/foto-perfil-02.jpg',
      usuario: 'Eloyito Guemez',
      fechaHora: 'Hace 13 min.',
      mensaje: 'Autem, accusamus? Fugit obcaecati non maxime, unde labore',
    },
    {
      imgSrc: '../../../../assets/img/foto-perfil-03.jpg',
      usuario: 'Armando Casas',
      fechaHora: 'Hace 28 min.',
      mensaje: 'Nostrum natus soluta tenetur nesciunt eos',
    },
  ];
  
  constructor() { }

  ngOnInit() { }

}
