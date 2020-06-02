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
import { Adicional } from '../dbdocs/adicional';
import { Producto } from '../dbdocs/producto';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private static carrito = {
        aproximacion: 0,
        cantidad: [ ],
        cliente: 'uidcliente',
        comentarios: [],  // arr of numbers
        direccion: 'dirusuario',
        estado: 'confirmado',
        fechaHora: 'fecha',
        precios: [], // arr of numbers
        productos: [], // arr of strings
        adicionales: [],
        complementos: [],
        repartidor: 'uidrepartidor',
        restaurante: 'uidrestaurante'
        // nombreRepartidor?: string,
        // nombreRestaurante?: string,
        // foto_perfil?: string,
    };

    public static restaurante = 'restaurante ejemplo';

    private onRestaurantesListener: () => void;
    private onRestaurantesError: (error: any) => void;
    private onProductosListener: () => void;
    private onProductosError: (error: any) => void;

    constructor(
        public chatsService: ChatService,
        public direccionesService: DireccionesService,
        public mandadsService: MandadoService,
        public pedidosService: PedidosService,
        public productoService: ProductosService,
        public restaurantService: RestaurantService,
        ) { }

    public static agregarAlCarrito(pedido) {
        // CLIENTE IS GONNA BE ADDED ON pre-pedido PAGE
        // COMPLEMENTOS ALSO ARE GONNA BE ADDED ON pre-pedido PAGE
        this.carrito.cantidad.push(pedido.cantidad);
        this.carrito.comentarios.push(pedido.comentario);
        this.carrito.precios.push(pedido.total);
        this.carrito.productos.push(pedido.producto.nombre);

        pedido.adicionales.forEach(adicional => {
            this.carrito.adicionales.push({
                uid: adicional.uid,
                nombre: adicional.nombre,
                precio: adicional.precio
            });
        });

        this.carrito.restaurante = pedido.uidRestaurante;
    }

    public static getCarrito() {
        return this.carrito;
    }

    public static getProductosSimplificados() {
        let productos = [];

        for (let i = 0; i < this.carrito.productos.length; i++) {
            let producto = {
                'nombre': this.carrito.productos[i],
                'precio': this.carrito.precios[i],
                'cantidad': this.carrito.cantidad[i]
            };

            productos.push(producto);
        }

        return productos;
    }

    public static agregarUsuario(uidUsuario) {
        this.carrito.cliente = uidUsuario;
    }

    public static agregarRepartidor(uidRepartidor) {
        this.carrito.repartidor = uidRepartidor;
    }

    public static agregarRestaurante(uidRestaurante) {
        this.carrito.restaurante = uidRestaurante;
    }

    public static agregarDireccion(uidDireccion) {
        this.carrito.direccion = uidDireccion;
    }

    public static agregarFechaHora(fechaHora) {
        this.carrito.fechaHora = fechaHora;
    }

    public static isCarritoEmpty(): boolean {
        return this.carrito.productos.length == 0;
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

   public iniciarCacheRestaurantes() {
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

   iniciarCacheChats() {
       console.log('iniciarCacheChats()');

       this.chatsService.getChats(CacheUsuario.usuario.uid,
           usuarios => {
               CacheChat.setAllChatUsuario(usuarios);
               console.log('CacheChat iniciado!');

               CacheChat.getAllChatsUsuarios().forEach(usuario => {
                   this.iniciarCacheChatMensajes(CacheUsuario.usuario.uid, usuario.uid);
               });
           },
           error => {
               console.error('CacheChat ERROR');
               console.error(error);
           }
           );
   }

   iniciarCacheChatMensajes(uidEmisor: string, uidReceptor: string) {
       console.log(`iniciarCacheMensajes(${uidEmisor}, ${uidReceptor})`);

       this.chatsService.getMensajes(uidEmisor, uidReceptor).subscribe(
           mensajes => {
               CacheChat.setMensajes(uidEmisor, mensajes);
               console.log(`CacheChatMensajes iniciado (${uidEmisor}, ${uidReceptor})`);
           },
           error => {
               console.error(`CacheChatMensajes ERROR (${uidEmisor}, ${uidReceptor})`);
               console.error(error);
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
}
