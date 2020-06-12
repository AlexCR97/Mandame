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
    // Simplify the way productos are caught from the database

    return this.afs.collection<Producto>('productos').valueChanges();

    return this.afs.collection<Producto>('productos').snapshotChanges()
    // Snapshots de productos a productos
    .pipe(map(productosSnapshot => {
      return productosSnapshot.map(async snapshot => {
        let productoDoc = snapshot.payload.doc;
        let producto: Producto = {
          categoria: productoDoc.get('categoria'),
          contenido: productoDoc.get('contenido'),
          foto: productoDoc.get('foto'),
          ingredientes: productoDoc.get('ingredientes'),
          nombre: productoDoc.get('nombre'),
          precio: productoDoc.get('precio'),
          restaurante: productoDoc.get('restaurante'),
          uid: productoDoc.get('uid'),
        };

        producto.nombreRestaurant = (await this.afs.firestore.collection('restaurantes').doc(producto.restaurante).get()).get('nombre');

        return producto;
      });
    }))
    // Obtener asincronamente los productos
    .pipe(map(promises => {
      let productos = new Array<Producto>();

      promises.forEach(async promise => {
        let producto = await promise;
        productos.push(producto);
      })

      return productos;
    }));
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
