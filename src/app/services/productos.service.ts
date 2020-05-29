import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto, ProductosPorCategoria } from '../dbdocs/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getProductos(): Observable<Producto[]> {
    return this.afs.collection<Producto>('productos').valueChanges();
  }

  getProductosPorCategoria(): Observable<ProductosPorCategoria[]> {
    return this.afs.collection<Producto>('productos').valueChanges().pipe(
      map(productos => {
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
      })
    );
  }
}
