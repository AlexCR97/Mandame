import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/dbdocs/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { CacheChat } from 'src/app/services/cache-chat';

@Component({
  selector: 'app-tab-chats-repartidor',
  templateUrl: './tab-chats-repartidor.page.html',
  styleUrls: ['./tab-chats-repartidor.page.scss'],
})
export class TabChatsRepartidorPage implements OnInit {

  cargandoDialog;
  chats: Usuario[];

  constructor(
    public chatService: ChatService,
    public guiUtls: GuiUtilsService,
    public router: Router,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    console.log('Obteniendo chats con usuarios...');
    this.chatService.getChats(CacheUsuario.usuario.uid,
      usuarios => {
        console.log('Usuarios obtenidos en Chats Repartidor');
        console.table(usuarios);

        CacheChat.setAllChatUsuario(usuarios);
        this.chats = CacheChat.getAllChatsUsuarios();
      },
      error => {
        console.error('Error al obtener los usuarios :(');
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

}
