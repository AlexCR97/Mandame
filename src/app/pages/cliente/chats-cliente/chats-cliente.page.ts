import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Repartidor } from 'src/app/dbdocs/repartidor';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-chats-cliente',
  templateUrl: './chats-cliente.page.html',
  styleUrls: ['./chats-cliente.page.scss'],
})
export class ChatsClientePage implements OnInit {

  chats = Array<Repartidor>()

  constructor(
    public chatService: ChatService,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    this.chatService.getMensajes(CacheUsuario.usuario.uid, 'GGa1ciJZLgTI7W0XF97TxiE2IDc2').subscribe(mensajes => {
      console.log('Se obtuvieron nuevos mensajes!');

      mensajes = mensajes.sort((m1, m2) => {
        return (new Date(m1.fechaHora)).getTime() - (new Date(m2.fechaHora)).getTime();
      });

      console.log(mensajes);
    });
  }

  crearNuevoChat() {
    // GGa1ciJZLgTI7W0XF97TxiE2IDc2
    // j8NJPw3hIyYV4ZAoCa1b4p9bOzI2

    let mensaje: Mensaje = {
      contenido: 'Prueba 1',
      fechaHora: this.utils.getFechaHoyString(),
      emisor: CacheUsuario.usuario.uid,
      receptor: 'GGa1ciJZLgTI7W0XF97TxiE2IDc2',
    };

    console.log('Enviando mensaje...');

    this.chatService.enviarMensaje(mensaje)
    .then(() => {
      console.log('Mensaje enviado!');
    })
    .catch(error => {
      console.error('Error el enviar mensaje');
      console.error(error);
    });
  }

  foo() {
    this.chatService.getRepartidores(
      repartidores => {
        console.log('Repartidores');
        console.log(repartidores);

        this.chats = repartidores;
      },
      error => {
        console.error('Error al obtener repartidores');
        console.error(error);
      }
    );
  }

}
