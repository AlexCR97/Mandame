import { Component, OnInit } from '@angular/core'; 
import { ModalController } from '@ionic/angular';
// import { CalificarRepartidorPage } from '../../modals/calificar-repartidor.page';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CalificarRepartidorPage } from 'src/app/modals/calificar-repartidor/calificar-repartidor.page';
import { CacheChat } from 'src/app/cache/cache-chat';
import { ChatService } from 'src/app/services/chat.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Usuario } from 'src/app/dbdocs/usuario';

@Component({
    selector: 'app-preparando-pedido',
    templateUrl: './preparando-pedido.page.html',
    styleUrls: ['./preparando-pedido.page.scss'],
})
export class PreparandoPedidoPage implements OnInit {

    chats: Usuario[];

    estado1 = 'active';
    estado2 = 'active';
    estado3 = 'inactive';
    estado4 = 'inactive';
    estado5 = 'inactive';

    public numPedido: string = "1";
    public lugar: string = "Dominos Pizza";

    uid: string;

    pedido: any = {
        restaurante: 'Domino\'s',
        url: 'url',
        uidrepartidor: 'uidrepartidor',
        estado: 'estadopedido'
    };

    entregado = false;

    constructor(
        public chatService: ChatService,
        public modalController: ModalController,
        private route: ActivatedRoute,
        private router: Router,
        private restaurant: RestaurantService
    ) { }

    ngOnInit() {
        console.log('Obteniendo chats con repartidores...');
        console.log('Usuario: ', CacheUsuario.usuario);
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

        this.cargarPedido();
    }

    abrirDetallesPedido(uid: string) {
        console.log('abrirDetallesPedido()')
        console.log(uid);
    
        this.router.navigate(['/detalles-pedido-cliente'], {
            queryParams: {
                uidPedido: uid,
            }
        });
    }

    cargarPedido() {
        console.log('CARGAR PEDIDO');
        this.route.queryParams.subscribe(params => {
            console.log('queryParams: ', params);
            this.uid = params['uidPedido'];
            this.restaurant.getPedido(this.uid).subscribe(ev => {
                let event = ev as any;
                this.pedido.restaurante = event.restaurante,
                this.pedido.url = 'url', // \//TODO: DECIDE WHAT IMAGE IS GOING TO BE USED
                this.pedido.uidrepartidor = event.repartidor,
                this.pedido.estado = event.estado
                this.actualizarEstado(this.pedido.estado);
            });
            console.log('Pedidio retrieved: ', this.pedido);
        });
    }

    contador = 0;

    async presentCalificarRepartidorModal(uidPedido: string) {
        const modal = await this.modalController.create({
            component: CalificarRepartidorPage,
            componentProps: {
                'uidPedido': uidPedido,
            },
            cssClass: "dialog-modal"
        });
        return await modal.present();
    }

    calificarRepartidor() {
        this.presentCalificarRepartidorModal(this.uid);
    }

    contactarRepartidor() {
        console.log('contactar con este repartidor alv'); 
        this.abrirMensajes(this.pedido.uidrepartidor);
    }

    abrirMensajes(uidReceptor: string) {
        this.router.navigate(['/mensajes'], {
            queryParams: {
                uidReceptor: uidReceptor,
            }
        });
    }

    actualizarEstado(estado) {

        if(estado == 'confirmado') {
            this.estado1 = 'active';
            this.estado2 = 'inactive';
            this.estado3 = 'inactive';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;     
        } else if(estado == 'preparando') {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'inactive';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;
        } else if(estado == 'recolectando') {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;
        } else if(estado == 'transitando') {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'active';
            this.estado5 = 'inactive';
            this.entregado = false;
        } else if(estado == 'entregado') {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'active';
            this.estado5 = 'active';
            this.entregado = true;
        }
    }

}
