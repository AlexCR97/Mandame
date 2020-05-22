import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { CacheChat } from 'src/app/services/cache-chat';
import { Usuario } from 'src/app/dbdocs/usuario';
import { UtilsService } from 'src/app/services/utils.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  @ViewChild('ionContent', { static: true })
  ionContent: IonContent;

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
      this.scrollToBottom();

      console.table(this.mensajesChat);
    });
  }

  onBtnEnviarClick() {
    console.log('Enviando mensaje...');
    console.log(this.inputText);

    let mensaje: Mensaje = {
      contenido: this.inputText,
      fechaExpandida: false,
      fechaHora: this.utils.getFechaHoyString(),
      emisor: this.uidEmisor,
      receptor: this.uidReceptor,
    };

    this.chatService.enviarMensaje(mensaje)
    .then(() => {
      console.log('Mensaje enviado con exito! :D');
      this.inputText = '';
    })
    .catch(error => {
      console.error('Error el enviar mensaje :(');
      console.error(error);
    });
  }

  onMensajeItemClick(mensaje: Mensaje) {
    mensaje.fechaExpandida = !mensaje.fechaExpandida;
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.ionContent.scrollToBottom) {
        this.ionContent.scrollToBottom(400);
      }
    }, 500);
  }

}
