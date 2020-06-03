import { Producto, ProductosPorCategoria } from '../dbdocs/producto';

export class CacheProductos{

    private static productos = new Map<string, Producto>();

    public static clear() {
        this.productos.clear();
    }

    public static containsProducto(uidProducto: string): boolean {
        return this.productos.get(uidProducto) != null;
    }

    public static getProducto(uidProducto: string): Producto {
        return this.productos.get(uidProducto);
    }

    public static getAllProductos(): Producto[] {
        return Array.from(this.productos.values());
    }

    public static getAllProductosPorCategoria(): ProductosPorCategoria[] {
        let productos = this.getAllProductos();
        let productosPorCategoria = new Array<ProductosPorCategoria>();

        let categoriasRepetidas = productos.map(producto => producto.categoria);
        let categoriasUnicas = new Set<string>(categoriasRepetidas);

        categoriasUnicas.forEach(categ =>{
            let prods = productos.filter(prod => prod.categoria == categ);

            productosPorCategoria.push({
                categoria: categ,
                productos: prods,
            });
        });

        return productosPorCategoria;
    }

    public static getAllProductosRestaurante(uidRestaurante: string): Producto[]{
        return this.getAllProductos()
        .filter(p => p.restaurante == uidRestaurante);
    }

    public static getAdicionalesRestaurante(uidRestaurante: string): Producto[] {
        return this.getAllProductos()
        .filter(p => p.restaurante == uidRestaurante && p.categoria == 'adicionales');   
    }

    public static getProductoPorNombre(nombreProducto: string): Producto {
        return this.productos.get(nombreProducto);
    }

    public static isEmpty(): boolean {
        return this.productos.size == 0;
    }

    public static setAllProductos(productos: Producto[]){
        productos.forEach(producto => this.setProducto(producto))
    }

    public static setProducto(producto: Producto){
        // TODO Guardar producto en el cache con su uid, no con su nombre
        //this.productos.set(producto.uid, producto);
        this.productos.set(producto.nombre, producto);
    }
}
