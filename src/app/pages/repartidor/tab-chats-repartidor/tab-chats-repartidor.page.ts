import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/dbdocs/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { CacheChat, VistaChat } from 'src/app/cache/cache-chat';
import { CacheService } from 'src/app/cache/cache.service';

@Component({
  selector: 'app-tab-chats-repartidor',
  templateUrl: './tab-chats-repartidor.page.html',
  styleUrls: ['./tab-chats-repartidor.page.scss'],
})
export class TabChatsRepartidorPage implements OnInit {

  cargandoDialog;
  vistasChats = new Array<VistaChat>();

  constructor(
    private cacheService: CacheService,
    private chatService: ChatService,
    private guiUtls: GuiUtilsService,
    private router: Router,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    console.log('Obteniendo chats con usuarios...');
    
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
}
