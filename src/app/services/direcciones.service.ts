import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroService } from 'src/app/services/registro.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Direccion } from '../dbdocs/direccion';
import { Usuario } from '../dbdocs/usuario';
import { Observable } from 'rxjs';

export enum OperacionDireccion {
  agregar = 'agregar',
  editar = 'editar',
}

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(
    public afs: AngularFirestore,
    public afa: AngularFireAuth,
    public registroService: RegistroService,
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

  actualizarDireccion(direccionUid: string,  direccion: Direccion): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();
  
    let direccionDocRef = db.collection('direcciones').doc(direccionUid);
    batch.update(direccionDocRef, direccion);

    return batch.commit();
  }

  getDireccion(uid: string): Observable<Direccion> {
    return this.afs.doc<Direccion>(`direcciones/${uid}`).valueChanges();
  }

  getDireccionesUsuario(usuarioUid: string, resolver: (direcciones: Direccion[]) => void) {
    this.registroService.getUsuario(usuarioUid).subscribe(usuario => {
      let direccionsUids = usuario.direcciones;
      let direcciones = Array<Direccion>();

      direccionsUids.forEach(async direccionUid => {
        let direccionDoc = await this.afs.firestore.collection('direcciones').doc(direccionUid).get();

        let direccion: Direccion = {
          calle: direccionDoc.get('calle'),
          entreCalle1: direccionDoc.get('entreCalle1'),
          entreCalle2: direccionDoc.get('entreCalle2'),
          numeroExterior: direccionDoc.get('numeroExterior'),
          numeroInterior: direccionDoc.get('numeroInterior'),
          colonia: direccionDoc.get('colonia'),
          uid: direccionDoc.get('uid'),
          // TODO anadir geolocalizacion
        };

        direcciones.push(direccion);
      });

      resolver(direcciones);
    });
  }

  agregarFavoritos(){
    
  }

}
