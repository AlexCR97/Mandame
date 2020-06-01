import { Producto } from '../dbdocs/producto';

export class CacheProductos{

    private static productos = new Map<string, Producto>();

    public static getProducto(uidProducto: string): Producto{
        return this.productos.get(uidProducto);
    }

    public static getAllProductos(): Producto[]{
        return Array.from(this.productos.values());
    }

    public static getAllProductosRestaurante(uidRestaurante: string): Producto[]{
        return this.getAllProductos()
            .filter(p => p.restaurante == uidRestaurante);
    }

    public static setAllProductos(productos: Producto[]){
        productos.forEach(producto => this.setProducto(producto))
    }

    public static setProducto(producto: Producto){
        this.productos.set(producto.uid, producto);
    }
}
