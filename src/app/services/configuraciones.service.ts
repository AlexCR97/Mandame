import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root' 
})
export class ConfiguracionesService {

  constructor(
    public afs: AngularFirestore,
    public afa: AngularFireAuth,
  ) { }

  actualizarNombre(uid: string, nombre: string, apellido: string): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();

    let usuarioDocRef = db.collection('usuarios').doc(uid);

    batch.update(usuarioDocRef, {
      nombre: nombre,
      apellido: apellido,
    });

    return batch.commit();
  }

  actualizarTelefono(uid: string, telefono: string): Promise<void> {
    const db = this.afs.firestore;
    const batch = db.batch();

    let usuarioDocRef = db.collection('usuarios').doc(uid);

    batch.update(usuarioDocRef, { telefono: telefono });

    return batch.commit();
  }

  actualizarContrasena(uid: string, nuevaContrasena: string): Promise<void> {
    return this.afa.auth.currentUser.updatePassword(nuevaContrasena);
  }
}
