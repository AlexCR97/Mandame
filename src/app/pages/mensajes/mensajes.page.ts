import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { CacheChat } from 'src/app/services/cache-chat';
import { Usuario } from 'src/app/dbdocs/usuario';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  uidEmisor: string;
  uidReceptor: string;
  usuarioReceptor: Usuario;
  mensajesChat = Array<Mensaje>();
  inputText: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public chatService: ChatService,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    this.uidEmisor = CacheUsuario.usuario.uid;
    this.uidReceptor = this.activatedRoute.snapshot.queryParamMap.get('uidReceptor');
    this.usuarioReceptor = CacheChat.getChatUsuario(this.uidReceptor);

    console.log('Uid emisor:   ' + this.uidEmisor);
    console.log('Uid receptor: ' + this.uidReceptor);
    console.log('Usuario receptor');
    console.log(this.usuarioReceptor);
    console.log('Obteniendo mensajes...');

    this.chatService.getMensajes(this.uidEmisor, this.uidReceptor).subscribe(mensajes => {
      console.log('Mensajes obtenidos!');

      CacheChat.setMensajes(this.uidReceptor, mensajes);
      this.mensajesChat = CacheChat.getMensajes(this.uidReceptor);

      console.table(this.mensajesChat);
    });
  }

  onBtnEnviarClick() {
    console.log('Enviando mensaje...');
    console.log(this.inputText);

    let mensaje: Mensaje = {
      contenido: this.inputText,
      fechaHora: this.utils.getFechaHoyString(),
      emisor: this.uidEmisor,
      receptor: this.uidReceptor,
    };

    this.chatService.enviarMensaje(mensaje)
    .then(() => {
      console.log('Mensaje enviado con exito! :D');
      this.inputText = '';
      this.scrollToBottom();
    })
    .catch(error => {
      console.error('Error el enviar mensaje :(');
      console.error(error);
    });
  }

  scrollToBottom() {
    /*var messagesContent = this.app.getComponent('messagesContent') as Content;
    messagesContent.scrollTo(0, messagesContent.getContentDimensions().contentHeight, 700);*/

    /*let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);*/

    /*
      import {ViewChild} from 'angular2/core';
      import {Page,Content} from 'ionic-angular';

      @Page({  
        templateUrl: 'build/pages/page1/page1.html',
        queries: {
            content: new ViewChild(Content)
        }
      })
      export class Page1 {
          constructor() {
          }
          scrollToBottom(){
              let dimensions = this.content.getContentDimensions();
              this.content.scrollTo(0, dimensions.scrollBottom, 0);
          }
      }
     */
  }

}
