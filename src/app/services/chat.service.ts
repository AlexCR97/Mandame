import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Usuario } from '../dbdocs/usuario';
import { Repartidor } from '../dbdocs/repartidor';
import { Mensaje } from '../dbdocs/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  async enviarMensaje(mensaje: Mensaje): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();

    let chatEmisorDocRef = db.collection('chats').doc(`${mensaje.emisor}-${mensaje.receptor}`);
    let chatReceptorDocRef = db.collection('chats').doc(`${mensaje.receptor}-${mensaje.emisor}`);

    let chatEmisor = await chatEmisorDocRef.get();
    let chatReceptor = await chatReceptorDocRef.get();

    // Primera vez que manda un mensaje, crear su chat
    if (!chatEmisor.exists) {
      batch.set(chatEmisorDocRef, { mensajes: [] });
    }

    // Primera vez que recibe un mensaje, crear su chat
    if (!chatReceptor.exists) {
      batch.set(chatReceptorDocRef, { mensajes: [] });
    }

    // Agregar el uid del nuevo mensaje al chat del emisor y receptor
    let uidMensaje = this.afs.createId();

    let mensajesEmisor = chatEmisor.get('mensajes');
    let mensajesReceptor = chatReceptor.get('mensajes');

    if (mensajesEmisor == undefined) {
      mensajesEmisor = [];
    }

    if (mensajesReceptor == undefined) {
      mensajesReceptor = [];
    }

    mensajesEmisor.push(uidMensaje);
    mensajesReceptor.push(uidMensaje);

    batch.update(chatEmisorDocRef, { mensajes: mensajesEmisor });
    batch.update(chatReceptorDocRef, { mensajes: mensajesReceptor });

    // Agregar el mensaje a la coleccion de mensajes
    let mensajeDocRef = db.collection('mensajes').doc(uidMensaje);
    batch.set(mensajeDocRef, mensaje);

    return batch.commit();
  }

  getChats(uidUsuario: string, resolver: (repartidores: Usuario[]) => void, manejarError: (error: any) => void) {
    this.afs.collection<any>('chats').snapshotChanges()
    // Filtrar por chats del usuario actual
    .pipe(map(chatSnapshots => {
      return chatSnapshots.filter(snapshot => {
        let chatUid = snapshot.payload.doc.id;
        let uids = chatUid.split('-');
        let uidEmisor = uids[0];
        return uidEmisor == uidUsuario;
      });
    }))
    // Convertir snapshots a usuarios repartidores
    .pipe(map(chatSnapshots => {
      return chatSnapshots.map(async snapshot => {
        let chatUid = snapshot.payload.doc.id;
        let uids = chatUid.split('-');
        let uidReceptor = uids[1];
        let usuarioDoc = await this.afs.firestore.collection('usuarios').doc(uidReceptor).get();

        let usuario: Usuario = {
          apellido: usuarioDoc.get('apellido'),
          direcciones: usuarioDoc.get('direcciones'),
          email: usuarioDoc.get('email'),
          foto: usuarioDoc.get('foto'),
          nombre: usuarioDoc.get('nombre'),
          posicion: usuarioDoc.get('posicion'),
          telefono: usuarioDoc.get('telefono'),
          uid: usuarioDoc.get('uid'),
        };
        
        return usuario;
      });
    }))
    // Obtener asincronamente los repartidores
    .subscribe(promises => {
      Promise.all(promises).then(usuarios => {
        resolver(usuarios);
      })
      .catch(error => {
        manejarError(error);
      });
    });
  }

  getMensajes(uidEmisor: string, uidReceptor: string): Observable<Mensaje[]> {
    return this.afs.collection<Mensaje>('mensajes').valueChanges().pipe(
      map(mensajes => {
        return mensajes
          .filter(msj => msj.emisor == uidEmisor && msj.receptor == uidReceptor)
          .sort((msj1, msj2) => (new Date(msj1.fechaHora)).getTime() - (new Date(msj2.fechaHora)).getTime())
      })
    );
  }

  getRepartidorLibre(resolver: (repartidores: Repartidor) => void, manejarError: (error: any) => void) {
    this.afs.collection<any>('usuarios').snapshotChanges()
    // Filtrar por usuarios con posicion de repartidor
    .pipe(map(usuariosSnapshots => {
      return usuariosSnapshots.filter(snapshot => {
        let posicion = snapshot.payload.doc.get('posicion');
        return posicion == 'repartidor';
      });
    }))
    // Convertir snapshots a usuarios repartidores
    .pipe(map(usuariosSnapshots => {
      return usuariosSnapshots.map(async snapshot => {
        let usuarioDoc = snapshot.payload.doc
        let repartidorDoc = await this.afs.firestore.collection('repartidores').doc(usuarioDoc.id).get();

        let repartidor: Repartidor = {
          apellido: usuarioDoc.get('apellido'),
          calificacion: repartidorDoc.get('calificacion'),
          email: usuarioDoc.get('email'),
          estado: repartidorDoc.get('estado'),
          foto: usuarioDoc.get('foto'),
          nombre: usuarioDoc.get('nombre'),
          telefono: usuarioDoc.get('telefono'),
          uid: usuarioDoc.get('uid'),
        };
        
        return repartidor;
      });
    }))
    // Obtener asincronamente los repartidores
    .subscribe(promises => {
      Promise.all(promises).then(usuarios => {

        // Filtrar repartidores que esten libres
        let repartidoresLibres = usuarios.filter(i => i.estado == "Libre");

        // Obtener un repartidor al azar
        let index = this.randomInt(0, repartidoresLibres.length - 1);
        let repartidor = repartidoresLibres[index];

        resolver(repartidor);
      })
      .catch(error => {
        manejarError(error);
      });
    });
  }

  getRepartidores(resolver: (repartidores: Repartidor[]) => void, manejarError: (error: any) => void) {
    this.getRepartidoresAsUsuarios().subscribe(usuariosRepartidores => {

      let repartidoresArray = Array<Repartidor>();

      usuariosRepartidores.forEach(async usuario => {

        let usuarioRepartidorDocRef = await this.afs.firestore.collection('repartidores').doc(usuario.uid).get()

        let repartidor: Repartidor = {
          apellido: usuario.apellido,
          calificacion: usuarioRepartidorDocRef.get('calificacion'),
          email: usuario.email,
          estado: usuarioRepartidorDocRef.get('estado'),
          foto: usuario.foto,
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          uid: usuario.uid,
        };

        repartidoresArray.push(repartidor);
      });

      resolver(repartidoresArray);
    });
  }

  getRepartidoresAsUsuarios(): Observable<Usuario[]> {
    return this.afs.collection<Usuario>('usuarios').valueChanges().pipe(
      map(usuarios => {
        return usuarios.filter(usuario => usuario.posicion == 'repartidor');
      })
    );
  }

  randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
