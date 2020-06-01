import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Usuario } from '../dbdocs/usuario';
import { Repartidor } from '../dbdocs/repartidor';
import { Mensaje } from '../dbdocs/mensaje';
import { Producto } from '../dbdocs/producto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  chatExiste(uidEmisor: string, uidReceptor: string) {
    return this.afs.collection<any>('chats').doc<any>(uidEmisor).valueChanges()
    // Obtenemos los uids de los mensajes
    .pipe(map(chat => {
      return chat.mensajes as string[];
    }))
    // Obtenemos los mensajes
    .pipe(map(async uidsMensajes => {
      let mensajesObservable = this.afs.collection<Mensaje>('mensajes').valueChanges();

      // Filtramos mensajes con uid del emisor
      let mensajesFiltrados = mensajesObservable.pipe(map(mensajes => {
        return mensajes.filter(sms => sms.emisor == uidEmisor);
      }));

      // Verificamos si alguno de los mensajes contiene el uid del receptor
      let mensajes = await mensajesFiltrados.toPromise();
      let mensajeBuscado = mensajes.find(sms => sms.receptor == uidReceptor);

      if (mensajeBuscado == undefined) {
        return false;
      }

      return true;
    }));
  }

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
        let mensajesEmisorReceptor = mensajes.filter(msj => (msj.emisor == uidEmisor && msj.receptor == uidReceptor) || (msj.emisor == uidReceptor && msj.receptor == uidEmisor));
        let mensajesOrdenadosPorFecha = mensajesEmisorReceptor.sort((msj1, msj2) => (new Date(msj1.fechaHora)).getTime() - (new Date(msj2.fechaHora)).getTime());
        return mensajesOrdenadosPorFecha;
      })
    );
  }

  getRepartidorLibre(resolver: (repartidores: Repartidor) => void, manejarError: (error: any) => void) {
    console.log('Obteniendo un repartidor libre 2...');

    this.afs.collection<Usuario>('usuarios').valueChanges()
    // Filtrar usuarios con posicion de repartidor
    .pipe(map(usuarios => {
      return usuarios.filter(u => u.posicion == 'repartidor');
    }))
    // Convertir usuarios a repartidores
    .pipe(map(usuarios => {
      return usuarios.map(async u => {
        let repartidorDoc = await this.afs.firestore.collection('repartidores').doc(u.uid).get();
        let repartidor: Repartidor = {
          apellido: u.apellido,
          calificacion: repartidorDoc.get('calificacion'),
          email: u.email,
          estado: repartidorDoc.get('estado'),
          foto: u.foto,
          nombre: u.nombre,
          telefono: u.telefono,
          uid: u.uid,
        };
        return repartidor;
      });
    }))
    // Obtener asincronamente los repartidores
    .subscribe(promises => {
      Promise.all(promises)
      .then(usuariosRepartidores => {

        // Filtrar repartidores que esten libres
        let repartidoresLibres = usuariosRepartidores.filter(i => i.estado == 'Libre');

        // Obtener un repartidor al azar
        let index = this.randomInt(0, repartidoresLibres.length - 1);
        let repartidor = repartidoresLibres[index];

        console.log('Los repartidores sin filtrar son:', usuariosRepartidores);
        console.log('Los repartidores filtrados son:', repartidoresLibres);
        console.log('El index es:', index);
        console.log('El repartidor encontrado es:', repartidor);

        if (repartidor == null) {
          manejarError('No se encontro ningun repartidor :(');
        } else {
          resolver(repartidor);
        }
      })
      .catch(error => manejarError(error));
    });
  }

  getRepartidores() {
    console.log('getRepartidores()');

    return this.getRepartidoresUsuarios()
    .pipe(map(usuarios => {
      console.log('Los usuarios repatidores son:', usuarios);

      let repartidores = new Array<Repartidor>();

      usuarios.forEach(async usuario => {
        let repartidorDoc = await this.afs.collection('repartidores').doc(usuario.uid).ref.get();
        repartidores.push({
          apellido: usuario.apellido,
          calificacion: repartidorDoc.get('calificacion'),
          email: usuario.email,
          estado: repartidorDoc.get('estado'),
          foto: usuario.foto,
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          uid: usuario.uid,
        });
      })

      return repartidores;
    }));
  }

  getRepartidoresUsuarios(): Observable<Usuario[]> {
    console.log('getRepartidoresUsuarios()');

    return this.afs.collection<Usuario>('usuarios').valueChanges()
    .pipe(map(usuarios => {
      console.log('Los usuarios son', usuarios);
      return usuarios.filter(usuario => usuario.posicion == 'repartidor');
    }));

    return this.afs.collection('repartidores').snapshotChanges()
    // Obtener uids de los repartidores
    .pipe(map(repartidorSnaphots => {
      return repartidorSnaphots.map(snapshot => {
        return snapshot.payload.doc.id;
      })
    }))
    // Obtener usuarios con los uids encontrados
    .pipe(map(uidsRepartidores => {
      let usuarios = new Array<Usuario>();

      uidsRepartidores.forEach(async uid => {
        let usuario = await this.afs.collection<Usuario>('usuarios').doc<Usuario>(uid).valueChanges().toPromise();
        usuarios.push(usuario);
        /*let usuarioDoc = await this.afs.collection('usuarios').doc(uid).ref.get();
        usuarios.push({
          apellido: usuarioDoc.get('apellido'),
          direcciones: usuarioDoc.get('direcciones'),
          email: usuarioDoc.get('email'),
          foto: usuarioDoc.get('foto'),
          nombre: usuarioDoc.get('nombre'),
          posicion: usuarioDoc.get('posicion'),
          telefono: usuarioDoc.get('telefono'),
          uid: usuarioDoc.get('uid'),
        });*/
      });

      console.log('Los usuarios son', usuarios);

      return usuarios;
    }));
  }

  getRepartidorLibre2(): Observable<Repartidor> {
    console.log('getRepartidorLibre2()');

    return this.getRepartidores()
    .pipe(map(repartidores => {
      // Filtrar repartidores que esten libres

      console.log('Los repartidores son', repartidores);

      let repartidoresLibres = repartidores.filter(i => i.estado == 'Libre');

      // Obtener un repartidor al azar
      let index = this.randomInt(0, repartidoresLibres.length - 1);
      let repartidor = repartidoresLibres[index];

      return repartidor;
    }));
  }

  getRepartidorLibre3() {
    return this.afs.collection<Usuario>('usuarios').valueChanges()
    // Encontrar usuarios que sean repartidores
    .pipe(map(usuarios => {
      console.log('Usuarios', usuarios);
      return usuarios.filter(u => u.posicion == 'repartidor');
    }))
    // Convertir usuarios a repartidores
    .pipe(map(async usuariosReparidores => {
      console.log('Usuarios que son repartidores', usuariosReparidores);

      let repartidores = new Array<Repartidor>();

      for (let usuario of usuariosReparidores) {
        let repartidorDoc = await this.afs.collection('repartidores').doc(usuario.uid).ref.get();
        repartidores.push({
          apellido: usuario.apellido,
          calificacion: repartidorDoc.get('calificacion'),
          email: usuario.email,
          estado: repartidorDoc.get('estado'),
          foto: usuario.foto,
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          uid: usuario.uid,
        });
      }

      console.log('Repartidores', repartidores);

      // Filtrar repartidores que esten libres
      let repartidoresLibres = repartidores.filter(i => i.estado == 'Libre');

      // Obtener un repartidor random
      let index = this.randomInt(0, repartidoresLibres.length - 1);
      let repartidor = repartidoresLibres[index];

      if (repartidor == null) {
        throw new Error('No se encontro ningun repartidor :(');
      }

      return repartidor;
    }));
  }

  randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

