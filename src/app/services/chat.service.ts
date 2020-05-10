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

  getMensajes(uidEmisor: string, uidReceptor: string): Observable<Mensaje[]> {
    return this.afs.collection<Mensaje>('mensajes').valueChanges().pipe(
      map(mensajes => {
        return mensajes.filter(msj => msj.emisor == uidEmisor && msj.receptor == uidReceptor);
      })
    );
  }

  getRepartidorLibreRandom(resolver: (repartidor: Repartidor) => void, manejarError: (error: any) => void) {
    this.getRepartidoresLibres(
      repartidoresLibres => {
        console.log('getRepartidorLibreRandom');
        console.log('Repartidores libres:');
        console.log(repartidoresLibres);

        if (repartidoresLibres.length == 0) {
          manejarError('No hay ningun repartidor disponible :(');
        }
        else {
          let index = this.randomInt(0, repartidoresLibres.length);
          resolver(repartidoresLibres[index]);
        }
      },
      manejarError
    );
  }

  getRepartidoresLibres(resolver: (repartidores: Repartidor[]) => void, manejarError: (error: any) => void) {
    this.getRepartidores(
      repartidoresObtenidos => {
        console.log('getRepartidoresLibres');
        console.log('Repartidores obtenidos:');
        console.log(repartidoresObtenidos);
        console.log('Length: ' + repartidoresObtenidos.length);
        console.log('Repartidor 0: ' + repartidoresObtenidos[0]);

        let repartidoresLibres = repartidoresObtenidos.filter(rep => rep.estado == "Libre");

        console.log('Repartidores obtenidos filtrados');
        console.log(repartidoresLibres);

        resolver(repartidoresLibres);
      },
      manejarError
    );
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
