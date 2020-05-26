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
            .filter(pedido => pedido.espera == espera.toString())
            .sort((p1, p2) => (new Date(p1.fechaHora)).getTime() - (new Date(p2.fechaHora)).getTime());
    }

    public static getAllPedidosDeUsuario(uidUsuario: string, espera: EsperaPedido): Pedido[] {
        return this.getAllPedidos(espera)
            .filter(p => p.cliente == uidUsuario);
    }

    public static setAllPedidos(pedidos: Pedido[]) {
        pedidos.forEach(pedido => this.setPedido(pedido.uid, pedido));
    }

    public static setPedido(uidPedido: string, pedido: Pedido) {
        this.pedidos.set(uidPedido, pedido);
    }
}
