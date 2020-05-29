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

  actualizarDireccion(direccionUid: string,  direccion: Direccion): Promise<void> {
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

  //Obtener las direcciones del usuario
  getDireccionesUsuario(usuarioUid: string, resolver: (direcciones: Direccion[]) => void) {
    console.log('START getDireccionesUsuario...');

    this.reg.getUsuario(usuarioUid).subscribe(usuario => {

      console.log('usuario obtenido:');
      console.log(usuario);

      let direccionsUids = usuario.direcciones;
      let direcciones = Array<Direccion>();

      console.log('direcciones del usuario');
      console.log(direccionsUids);

      direccionsUids.forEach(async direccionUid => {
        let direccionDoc = await this.afs.firestore.collection('direcciones').doc(direccionUid).get();

        let direccion: Direccion = {
          calle: direccionDoc.get('calle'),
          numeroExterior: direccionDoc.get('numeroExterior'),
          numeroInterior: direccionDoc.get('numeroInterior'),
          colonia: direccionDoc.get('colonia'),
        };

        console.log('direccion obtenida:');
        console.log(direccion);
        
        direcciones.push(direccion);
      });

      resolver(direcciones);

      console.log('END getDireccionesUsuario...');
    });
  }

}