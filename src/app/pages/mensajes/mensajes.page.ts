import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { CacheChat } from 'src/app/cache/cache-chat';
import { Usuario } from 'src/app/dbdocs/usuario';
import { UtilsService } from 'src/app/services/utils.service';
import { IonContent } from '@ionic/angular';
import { RegistroService } from 'src/app/services/registro.service';
import { CacheService } from 'src/app/cache/cache.service';

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
  usuarioReceptor: Usuario = {
    apellido: '',
    direcciones: [],
    email: '',
    foto: '',
    nombre: '',
    posicion: '',
    telefono: '',
    uid: '',
  };
  mensajesChat = Array<Mensaje>();
  inputText: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private cacheService: CacheService,
    public chatService: ChatService,
    public registroService: RegistroService,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    this.uidEmisor = CacheUsuario.usuario.uid;
    this.uidReceptor = this.activatedRoute.snapshot.queryParamMap.get('uidReceptor');

    console.log('Uid emisor:   ' + this.uidEmisor);
    console.log('Uid receptor: ' + this.uidReceptor);
    console.log('Usuario receptor:', this.usuarioReceptor);

    // Si tiene conexion a internet
    if (this.utils.tieneConexionInternet()) {
      console.log('Si hay conexion a internet');
      this.cargarMensajesDesdeBd();
    }
    // No tiene conexion a internet
    else {
      console.log('No hay conexion a internet');
      this.cargarMensajesDesdeCache();
    }
  }

  cargarMensajesDesdeBd() {
    console.log('Obteniendo mensajes de la bd');
    this.cacheService.iniciarCacheChatMensajes(this.uidEmisor, this.uidReceptor);
    this.cacheService.setOnMensajesIniciado(
      () => {
        this.mensajesChat = CacheChat.getMensajes(this.uidReceptor);
        this.scrollToBottom();
      },
      error => {
        console.error(error);
      }
    );
  }

  cargarMensajesDesdeCache() {
    console.log('Obteniendo mensajes desde el cache');
    this.mensajesChat = CacheChat.getMensajes(this.uidReceptor);
    this.scrollToBottom();
  }

  onBtnEnviarClick() {
    console.log('Texto ingresado:', this.inputText);
    console.log('Enviando mensaje...');

    let mensaje: Mensaje = {
      contenido: this.inputText,
      fechaExpandida: false,
      fechaHora: this.utils.getFechaHoyString(),
      emisor: this.uidEmisor,
      receptor: this.uidReceptor,
    };

    this.cargarMensajesDesdeCache();
    this.inputText = '';

    this.chatService.enviarMensaje(mensaje)
    .then(() => {
      console.log('Mensaje enviado con exito! :D');
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
