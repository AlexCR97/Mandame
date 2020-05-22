import { Pedido } from '../dbdocs/pedido';

export class CachePedidos {
    public static pedidos = new Map<string, Pedido>([
        ['fytun85g7', {
            aproximacion: 5,
            cliente:"tu gfa",
            comentario:"vale v:",
            direccion:"que te importa",
            estado:"espera",
            nombre:"que tu gfa",
            productos:["una amborgueza","unos doritos"],
            repartidor:"el wey que me las trae",
            restaurantes:["La Dominos","la tiendita la chiquita"],
        }]
    ]);
}