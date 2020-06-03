import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CacheChat, VistaChat } from 'src/app/cache/cache-chat';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { CacheService } from 'src/app/cache/cache.service';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { CacheUsuario } from 'src/app/cache/cache-usuario';

@Component({
  selector: 'app-chats-cliente',
  templateUrl: './chats-cliente.page.html',
  styleUrls: ['./chats-cliente.page.scss'],
})
export class ChatsClientePage implements OnInit {

  cargandoDialog;
  vistasChats = new Array<VistaChat>();

  constructor(
    private cacheService: CacheService,
    public chatService: ChatService,
    public guiUtls: GuiUtilsService,
    public router: Router,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    console.log('Obteniendo chats con repartidores...');

    // Si tiene conexion a internet
    if (this.utils.tieneConexionInternet()) {
      console.log('Si hay conexion a internet');
      this.cargarChatsDesdeBd();
    }
    // No tiene conexion a internet
    else {
      console.log('No hay conexion a internet');
      this.cargarChatsDesdeCache();
    }
  }

  abrirMensajes(uidReceptor: string) {
    this.router.navigate(['/mensajes'], {
      queryParams: {
        uidReceptor: uidReceptor,
      }
    });
  }

  cargarChatsDesdeBd() {
    console.log('Cargando chats desde la bd');

    this.cacheService.iniciarCacheChats();
    this.cacheService.setOnChatsIniciado(
      () => {
        this.vistasChats = CacheChat.getVistasChats();
      },
      error => {
        console.error(error);
      }
    );
  }

  cargarChatsDesdeCache() {
    console.log('Cargando chats desde el cache');
    this.vistasChats = CacheChat.getVistasChats();
  }

  contactarRepartidor() {
    console.log('Buscando un repartidor libre...');
    // TODO Este dialogo no cierra
    //this.cargandoDialog = this.guiUtls.mostrarCargando('Buscando un repartidor libre...');

    this.chatService.getRepartidorLibre3().subscribe(
      promise => promise.then(repartidor => {
        console.log('Repartidor libre encontrado!');
        console.log(repartidor);
        //this.guiUtls.mostrarToast(`Se encontro el repartidor ${repartidor.nombre} ${repartidor.apellido}`, 3000, 'success');

        this.verificarSiChatExiste(CacheUsuario.usuario.uid, repartidor.uid);
      }),
      error => {
        console.error(error);
        //this.guiUtls.mostrarToast('No se encontro ningun repartidor libre :(', 3000, 'danger');
      }
    );
  }

  inaugurarChatConMensaje(uidEmisor: string, uidReceptor: string) {
    console.log(`inaugurarChatConMensaje(${uidEmisor}, ${uidReceptor})`);

    let mensaje: Mensaje = {
      contenido: '¡A sus ordenes!, ¿En que puedo ayudarle?',
      fechaExpandida: false,
      fechaHora: this.utils.getFechaHoyString(),
      emisor: uidReceptor,
      receptor: uidEmisor,
    };

    this.chatService.enviarMensaje(mensaje)
    .then(() => {
      this.abrirMensajes(uidReceptor);
    })
    .catch(error => {
      console.error(error);
    });
  }

  verificarSiChatExiste(uidEmisor: string, uidReceptor: string) {
    console.log('Checando si el chat existe en el cache');
    if (CacheChat.chatExiste(uidReceptor)) {
      this.abrirMensajes(uidReceptor);
      return;
    }

    // Si tiene conextion a Internet
    if (this.utils.tieneConexionInternet()) {
      console.log('Checando si el chat existe en la bd...');;

      this.chatService.chatExiste(uidEmisor, uidReceptor).subscribe(
        promise => promise.then(chatExiste => {
          // El chat si existe, abrir mensajes
          if (chatExiste) {
            this.abrirMensajes(uidReceptor);
          }
          // El chat no existe, enviar mensaje de inauguracion, luego abrir mensajes
          else {
            this.inaugurarChatConMensaje(uidEmisor, uidReceptor);
          }
        }),
        error => {
          console.error(error);
        }
      )
    } else {
      console.log('Intenta de nuevo cuando tengas internet :(');
      // TODO Hacer algo si el usuario no tiene internet y tampoco hay nada en cache
    }
  }

}
