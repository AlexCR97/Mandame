export interface Producto {
    categoria: string;
    contenido: number;
    foto: string;
    ingredientes: string[];
    nombre: string;
    precio: number;
    restaurante: string;

    uid?: string;
    nombreRestaurant?: string;
}

export interface ProductosPorCategoria {
    categoria: string;
    productos: Producto[];
}
