export interface Pedido {
    aproximacion: number;
    cantidad: number[];
    cliente: string;
    comentarios: string[];
    complementos: string[];
    direccion: string;
    espera: string;
    estado: string;
    fechaHora: string;
    precios: number[];
    productos: string[];
    repartidor: string;
    restaurante: string;
    uid: string;

    nombreRepartidor?: string;
    nombreRestaurante?: string;  
    foto_perfil?: string;
}
