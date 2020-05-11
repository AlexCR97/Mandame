import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroService } from 'src/app/services/registro.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Direccion } from '../dbdocs/direccion';
import { Usuario } from '../dbdocs/usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(
    public afs: AngularFirestore,
    public afa: AngularFireAuth,
    public reg :RegistroService,
  ) { }

  agregarDireccion(usuario: Usuario, direccion: Direccion): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();

    // registrar nueva direccion
    let direccionUid = this.afs.createId();
    let direccionDocRef = db.collection('direcciones').doc(direccionUid);

    batch.set(direccionDocRef, direccion);

    // agregar uid de la nueva direccion al array de direcciones del usuario
    usuario.direcciones.push(direccionUid);

    // actualizar usuario
    let usuarioDocRef = db.collection('usuarios').doc(usuario.uid);

    batch.update(usuarioDocRef, usuario);

    // terminar transaccion
    return batch.commit();
  }

  actualizarDireccion(usuario: Usuario, direccionUid: string,  direccion: Direccion): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();
  
    let direccionDocRef = db.collection('direcciones').doc(direccionUid);
    batch.update(direccionDocRef, direccion);

    return batch.commit();
  }
  //Obtencion de dirrecion unica
  getDireccion(uid): Observable<Direccion> {
    return this.afs.doc<Direccion>(`direcciones/${uid}`).valueChanges();
  }

  //Obtencion de las direeciones de un usuario
  getDireccionesUsuario(usuarioUid: string, resolver: (direcciones: Direccion[]) => void) {
    //Buscamos el usuario
    this.reg.getUsuario(usuarioUid).subscribe(usuario => {
      
      let direccionsUids = usuario.direcciones;
      //Creamos los Arreglos para guardar
      let direcciones = Array<Direccion>();
      //Recorremos las direcciones esperando resultados
      direccionsUids.forEach(async direccionUid => {
        let direccion = await this.getDireccion(direccionUid).toPromise();
        //cada resultado se inserta
        direcciones.push(direccion);
      });
//Ya terminado regresamos las direcciones en Arreglo
      resolver(direcciones);
    });
  }

}




