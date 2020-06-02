export interface Restaurant {
    calificacion: number;
    categoria: string;
    complementos: string;
    estado: string;
    foto_perfil: string;
    foto_portada: string;
    nombre: string
    productos: string[];
    tiempo_entrega : number;
    uid: string;
    adicionales: string[];
}

export interface RestaurantesPorCategoria {
    categoria: string;
    restaurantes: Restaurant[];
}
