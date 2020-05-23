import { Pedido } from '../dbdocs/pedido';
import { EsperaPedido } from '../services/pedidos.service';

export class CachePedidos {

    public static pedidos = new Map<string, Pedido>();
    
    public static getPedido(uidPedido: string): Pedido {
        return this.pedidos.get(uidPedido);
    }

    public static getAllPedidos(espera: EsperaPedido): Pedido[] {
        if (espera == EsperaPedido.Todos) {
            return Array.from(this.pedidos.values());
        }

        return Array.from(this.pedidos.values())
            .filter(pedido => pedido.espera == espera.toString());
            // TODO Ordenar pedidos por fecha
            //.sort();
    }

    public static setAllPedidos(pedidos: Pedido[]) {
        // TODO Cambiar la llave del repartidor por el uid del pedido
        pedidos.forEach(pedido => this.setPedido(pedido.repartidor, pedido));
    }

    public static setPedido(uidPedido: string, pedido: Pedido) {
        this.pedidos.set(uidPedido, pedido);
    }
}
