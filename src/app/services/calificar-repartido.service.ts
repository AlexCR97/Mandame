import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroService } from 'src/app/services/registro.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class CalificarRepartidoService {

  constructor(
    public afs: AngularFirestore,
    public afa: AngularFireAuth,
    public reg :RegistroService,
  ) { }

  async calificarRepartidor(uidRepartidor: string, calificacion: number): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();

    let repartidorDocRef = db.collection('repartidores').doc(uidRepartidor);
    let calif = (await repartidorDocRef.get()).get("calificacion");
    let califPromedio = (calif + calificacion) / 2;

    batch.update(repartidorDocRef, {
      calificacion:califPromedio,
    });

    return batch.commit();
  }

  comentarPedido(uidPedido:string,comentario:string): Promise<void>{
    const db = this.afs.firestore;
    const batch = db.batch();
    
    let pedidoDocRef = db.collection('pedidos').doc(uidPedido);

    batch.update(pedidoDocRef, {
      comentarios:comentario,
    });
    
    return batch.commit();
  }

  calificarYComentar(uidRepartidor: string, calificacion: number, uidPedido: string, comentario: string) {
    return Promise.all([
      this.calificarRepartidor(uidRepartidor, calificacion),
      this.comentarPedido(uidPedido, comentario),
    ]);
  }
}
