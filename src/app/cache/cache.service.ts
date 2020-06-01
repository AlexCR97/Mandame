import { Injectable } from '@angular/core';
import { CacheDirecciones } from './cache-direcciones';
import { DireccionesService } from '../services/direcciones.service';
import { CacheUsuario } from './cache-usuario';
import { PedidosService, EsperaPedido } from '../services/pedidos.service';
import { CachePedidos } from './cache-pedidos';
import { ChatService } from '../services/chat.service';
import { CacheChat } from './cache-chat';
import { RestaurantService } from '../services/restaurant.service';
import { ProductosService } from '../services/productos.service';
import { CacheRestaurantes } from './cache-restaurantes';
import { CacheProductos } from './cache-productos';
import { MandadoService } from '../services/mandado.service';
import { CacheMandados } from './cache-mandados';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  // Temporalmente el carrito tiene datos estaticos, hasta que esten conectadas algunas otras pantallas
  // que manden los valores a las demas, se mantendra asi
  public static carrito: any[] = [
  	{
      categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: 'Veggy',
      precio: 90.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
    	desc: 'Pizza Hawaiana',
    	cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
  	},
  	{
    	categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: '5 Carnes',
      precio: 100.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
      desc: 'Margarita Espacial',
      cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
  	},
  	{
	    categoria: 'especialidades',
      foto: 'url',
      ingredientes: [
      ],
      nombre: 'Orilla rellena',
      precio: 125.0,
      restaurante: 'Domino\'s Pizza', // Objeto con nombre en lugar de uid del restaurante, para no consultar solo por eso.
      desc: '5 Carnes',
      cantidad: 2, // Cantidad es agregado a otro objeto modificado en detalles-comida seleccionada, para sacar un total
      comentario: 'Tal cosa sin tal cosa y tal cosa para tal cosa'
	} 
	];

  public static restaurante = 'restaurante ejemplo';

  private onRestaurantesListener: () => void;
  private onRestaurantesError: (error: any) => void;
  private onProductosListener: () => void;
  private onProductosError: (error: any) => void;
  private onChatsListener: () => void;
  private onChatsError: (error: any) => void;
  private onMensajesListener: () => void;
  private onMensajesError: (error: any) => void;

  constructor(
    public chatsService: ChatService,
    public direccionesService: DireccionesService,
    public mandadsService: MandadoService,
    public pedidosService: PedidosService,
    public productoService: ProductosService,
    public restaurantService: RestaurantService,
  ) { }

  borrarCache() {
    CacheUsuario.usuario = undefined;
    this.borrarCacheRestaurantes();
    this.borrarCacheProductos();
    this.borrarCacheDirecciones();
    this.borrarCachePedidos();
    this.borrarCacheMandados();
    this.borrarCacheChats();
  }

  borrarCacheRestaurantes() {
    console.log('borrarCacheRestaurantes()');
    CacheRestaurantes.clear();
  }

  borrarCacheProductos() {
    console.log('borrarCacheProductos()');
    CacheProductos.clear();
  }

  borrarCacheDirecciones() {
    console.log('borrarCacheDirecciones()');
    CacheDirecciones.clear();
  }

  borrarCachePedidos() {
    console.log('borrarCachePedidos()');
    CachePedidos.clear();
  }

  borrarCacheMandados() {
    console.log('borrarCacheMandados()');
    CacheMandados.clear();
  }

  borrarCacheChats() {
    console.log('borrarCacheChats()');
    CacheChat.clear();
  }

  /**
   * Antes de llamar este metodo, asegurese de que CacheUsuario este iniciado
   */
  public iniciarCache() {
    this.iniciarCacheRestaurantes();
    this.iniciarCacheProductos();
    this.iniciarCacheDirecciones();
    this.iniciarCachePedidos();
    this.iniciarCacheMandados();
    this.iniciarCacheChats();
  }

  iniciarCacheRestaurantes() {
    console.log('inciarCacheRestaurantes()');

    this.restaurantService.getRestaurantes().subscribe(
      restaurantes => {
        CacheRestaurantes.setAllRestaurantes(restaurantes);
        console.log('CacheRestaurantes SUCCESS');
        if (this.onRestaurantesListener) {
          this.onRestaurantesListener();
        }
      },
      error => {
        console.error('CacheRestaurantes ERROR');
        console.error(error);
        if (this.onRestaurantesError) {
          this.onRestaurantesError(error);
        }
      }
    );
  }

  iniciarCacheProductos() {
    console.log('iniciarCacheProductos');

    this.productoService.getProductos().subscribe(
      productos => {
        console.log('CacheProductos SUCCESS');
        CacheProductos.setAllProductos(productos);
        if (this.onProductosListener) {
          this.onProductosListener();
        }
      },
      error => {
        console.error('CacheProductos ERROR');
        console.error(error);
        if (this.onRestaurantesError) {
          this.onProductosError(error);
        }
      }
    );
  }

  iniciarCacheDirecciones() {
    console.log('iniciarCacheDirecciones()');

    this.direccionesService.getDireccionesUsuario(CacheUsuario.usuario.uid,
      direcciones => {
        CacheDirecciones.setAllDireccionesDeUsuario(CacheUsuario.usuario.uid, direcciones);
        console.log('CacheDirecciones iniciado!');
      }
    );
  }

  iniciarCachePedidos() {
    console.log('iniciarCachePedidos()');

    this.pedidosService.getPedidosCompletosDeUsuario(CacheUsuario.usuario.uid, EsperaPedido.Todos,
      pedidos => {
        CachePedidos.setAllPedidos(pedidos);
        console.log('CachePedidos iniciado!');
      },
      error => {
        console.error('CachePedidos ERROR');
        console.error(error);
      }
    );
  }

  iniciarCacheMandados() {
    console.log('iniciarCacheMandados()');

    this.mandadsService.getMandadosDeUsuario(CacheUsuario.usuario.uid, EsperaPedido.Todos).subscribe(
      mandados => {
        CacheMandados.setAllMandados(mandados);
        console.log('CacheMandados inciado!');
      },
      error => {
        console.error('CacheMandados ERROR');
        console.error(error);
      }
    );
  }

  /**
   * Antes de llamar este metodo, asegurese de que CacheUsuario este iniciado
   */
  iniciarCacheChats() {
    console.log('iniciarCacheChats()');

    this.chatsService.getChats(CacheUsuario.usuario.uid,
      usuarios => {
        CacheChat.setAllChatUsuario(usuarios);
        console.log('CacheChat iniciado!');

        if (this.onChatsListener) {
          this.onChatsListener();
        }

        CacheChat.getAllChatsUsuarios().forEach(usuario => {
          this.iniciarCacheChatMensajes(CacheUsuario.usuario.uid, usuario.uid);
        });
      },
      error => {
        console.error('CacheChat ERROR');
        console.error(error);

        if (this.onChatsError) {
          this.onChatsError(error);
        }
      }
    );
  }

  iniciarCacheChatMensajes(uidEmisor: string, uidReceptor: string) {
    console.log(`iniciarCacheMensajes(${uidEmisor}, ${uidReceptor})`);

    this.chatsService.getMensajes(uidEmisor, uidReceptor).subscribe(
      mensajes => {
        CacheChat.setMensajes(uidReceptor, mensajes);
        console.log(`CacheChatMensajes iniciado (${uidEmisor}, ${uidReceptor})`);

        if (this.onMensajesListener) {
          this.onMensajesListener();
        }
      },
      error => {
        console.error(`CacheChatMensajes ERROR (${uidEmisor}, ${uidReceptor})`);
        console.error(error);

        if (this.onMensajesError) {
          this.onMensajesError(error);
        }
      }
    );
  }
  
  setOnRestaurantesIniciado(resolver: () => void, manejarError: (error: any) => void) {
    this.onRestaurantesListener = resolver;
    this.onRestaurantesError = manejarError;
  }

  setOnProductosIniciado(resolver: () => void, manejarError: (error: any) => void) {
    this.onProductosListener = resolver;
    this.onProductosError = manejarError;
  }

  setOnChatsIniciado(resolver: () => void, manejarError: (error: any) => void) {
    this.onChatsListener = resolver;
    this.onChatsError = manejarError;
  }

  setOnMensajesIniciado(resolver: () => void, manejarError: (error: any) => void) {
    this.onMensajesListener = resolver;
    this.onMensajesError = manejarError;
  }

}
