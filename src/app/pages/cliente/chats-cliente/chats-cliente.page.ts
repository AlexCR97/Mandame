import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { CacheChat } from 'src/app/cache/cache-chat';
import { Mensaje } from 'src/app/dbdocs/mensaje';
import { UtilsService } from 'src/app/services/utils.service';
import { Usuario } from 'src/app/dbdocs/usuario';
import { Router } from '@angular/router';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

@Component({
  selector: 'app-chats-cliente',
  templateUrl: './chats-cliente.page.html',
  styleUrls: ['./chats-cliente.page.scss'],
})
export class ChatsClientePage implements OnInit {

  cargandoDialog;
  chats: Usuario[];

  constructor(
    public chatService: ChatService,
    public guiUtls: GuiUtilsService,
    public router: Router,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    console.log('Obteniendo chats con repartidores...');
    this.chatService.getChats(CacheUsuario.usuario.uid,
      repartidores => {
        console.log('Repartidores obtenidos en Chats Cliente');
        console.log(repartidores);

        CacheChat.setAllChatUsuario(repartidores);
        this.chats = CacheChat.getAllChatsUsuarios();
      },
      error => {
        console.error('Error al obtener los repartidores :(');
        console.error(error);
      }
    );
  }

  abrirMensajes(uidReceptor: string) {
    this.router.navigate(['/mensajes'], {
      queryParams: {
        uidReceptor: uidReceptor,
      }
    });
  }

  crearNuevoChat() {
    console.log('Buscando un repartidor libre...');
    // TODO Este dialogo no se cierra
    //this.cargandoDialog = this.guiUtls.mostrarCargando('Buscando un repartidor libre...');

    this.chatService.getRepartidorLibre(
      repartidor => {
        console.log('Repartidor libre obtenido!');
        console.log(repartidor);
        this.guiUtls.cerrarCargando(this.cargandoDialog);
        this.guiUtls.mostrarToast(`Se encontro el repartidor ${repartidor.nombre} ${repartidor.apellido}`, 3000, 'success');

        let repartidorUsuario = CacheChat.repartidorToUsuario(repartidor);
        CacheChat.setChatUsuario(repartidorUsuario);

        this.abrirMensajes(repartidor.uid);
      },
      error => {
        console.error('Error al obtener un repartidor');
        console.error(error);
        this.guiUtls.cerrarCargando(this.cargandoDialog);
        this.guiUtls.mostrarToast('No se encontro ningun repartidor libre :(', 3000, 'danger');
      }
    );
  }

}
