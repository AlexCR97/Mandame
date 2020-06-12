import { Component, OnInit } from '@angular/core'; 
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CalificarRepartidorPage } from 'src/app/modals/calificar-repartidor/calificar-repartidor.page';
import { ChatService } from 'src/app/services/chat.service';
import { Usuario } from 'src/app/dbdocs/usuario';
import { Pedido } from 'src/app/dbdocs/pedido';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { EstadoPedido, PedidosService } from 'src/app/services/pedidos.service';

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

    uidPedido: string;
    pedido: Pedido;

    entregado = false;

    constructor(
        private modalController: ModalController,
        private pedidoService: PedidosService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
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
        console.log('cargarPedido()');
        this.uidPedido = this.route.snapshot.queryParamMap.get('uid');
        this.pedido = CachePedidos.getPedido(this.uidPedido);

        console.log('Uid pedido:', this.uidPedido);
        console.log('Pedido:', this.pedido);

        // Observar cambios en tiempo real en el pedido
        this.pedidoService.getPedido(this.uidPedido).subscribe(pedido => {
            console.log('Cambio en el pedido!');
            this.actualizarEstado(pedido.estado);
        });
    }

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
        this.presentCalificarRepartidorModal(this.uidPedido);
    }

    contactarRepartidor() {
        console.log('contactar con este repartidor alv'); 
        this.abrirMensajes(this.pedido.repartidor);
    }

    abrirMensajes(uidReceptor: string) {
        this.router.navigate(['/mensajes'], {
            queryParams: {
                uidReceptor: uidReceptor,
            }
        });
    }

    actualizarEstado(estado: string) {
        console.log(`actualizarEstado(${estado})`);

        if (estado == EstadoPedido.Confirmado.toString()) {
            this.estado1 = 'active';
            this.estado2 = 'inactive';
            this.estado3 = 'inactive';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;     
        }
        else if (estado == EstadoPedido.Preparando.toString()) {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'inactive';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;
        }
        else if (estado == EstadoPedido.Recolectando.toString()) {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'inactive';
            this.estado5 = 'inactive';
            this.entregado = false;
        }
        else if (estado == EstadoPedido.Transitando) {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'active';
            this.estado5 = 'inactive';
            this.entregado = false;
        }
        else if (estado == EstadoPedido.Entregado) {
            this.estado1 = 'active';
            this.estado2 = 'active';
            this.estado3 = 'active';
            this.estado4 = 'active';
            this.estado5 = 'active';
            this.entregado = true;
        }
    }
}
