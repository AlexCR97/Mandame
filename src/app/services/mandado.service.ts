import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Mandado } from '../dbdocs/mandado';
import { Observable } from 'rxjs';
import { Direccion } from '../dbdocs/direccion';
import { ChatService } from './chat.service';
import { Usuario } from '../dbdocs/usuario';

@Injectable({
  providedIn: 'root'
})
export class MandadoService {

  constructor(
    private afs: AngularFirestore,
    private chatService: ChatService,
  ) { }

  agregarMandadoYDirecciones(
    usuario: Usuario,
    direccionOrigen: Direccion,
    direccionDestino: Direccion,
    mandado: Mandado,
    resolver: (mandadoRegistrado: Mandado) => void,
    manejarError: (error: any) => void
  ) {
    const db = this.afs.firestore;
    const batch = db.batch();

    // Primero, agregamos las direcciones
    if (direccionOrigen != null) {
      let direccionUid = this.afs.createId();
      let direccionDocRef = db.collection('direcciones').doc(direccionUid);
      direccionOrigen.uid = direccionUid;
      mandado.uidDireccionOrigen = direccionOrigen.uid;
      batch.set(direccionDocRef, direccionOrigen);

      usuario.direcciones.push(direccionUid);
      let usuarioDocRef = db.collection('usuarios').doc(usuario.uid);
      batch.update(usuarioDocRef, usuario);
    }

    if (direccionDestino != null) {
      let direccionUid = this.afs.createId();
      let direccionDocRef = db.collection('direcciones').doc(direccionUid);
      direccionDestino.uid = direccionUid;
      mandado.uidDireccionDestino = direccionDestino.uid;
      batch.set(direccionDocRef, direccionDestino);

      usuario.direcciones.push(direccionUid);
      let usuarioDocRef = db.collection('usuarios').doc(usuario.uid);
      batch.update(usuarioDocRef, usuario);
    }

    // Ahora, agregamos el mandado
    this.chatService.getRepartidorLibre(
      repartidor => {
        let mandadoUid = this.afs.createId();
        let mandadoDocRef = db.collection('mandados').doc(mandadoUid);

        mandado.uid = mandadoUid;
        mandado.apellidoRepartidor = repartidor.apellido;
        mandado.nombreRepartidor = repartidor.nombre
        mandado.fotoRepartidor = repartidor.foto;
        mandado.uidRepartidor = repartidor.uid;

        batch.set(mandadoDocRef, mandado);
        batch.commit()
        .then(() => resolver(mandado))
        .catch(error => manejarError(error));
      },
      error => manejarError(error)
    );
  }

  agregarMandado(
    mandado: Mandado,
    resolver: (mandadoRegistrado: Mandado) => void,
    manejarError: (error: any) => void
  ) {
    const db = this.afs.firestore;
    const batch = db.batch();

    this.chatService.getRepartidorLibre(
      repartidor => {
        let mandadoUid = this.afs.createId();
        let mandadoDocRef = db.collection('mandados').doc(mandadoUid);

        mandado.uid = mandadoUid;
        mandado.apellidoRepartidor = repartidor.apellido;
        mandado.nombreRepartidor = repartidor.nombre
        mandado.fotoRepartidor = repartidor.foto;
        mandado.uidRepartidor = repartidor.uid;

        batch.set(mandadoDocRef, mandado);
        batch.commit()
        .then(() => resolver(mandado))
        .catch(error => manejarError(error));
      },
      error => manejarError(error)
    );
  }
}
