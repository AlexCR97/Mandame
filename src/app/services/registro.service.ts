import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Direccion } from '../dbdocs/direccion';
import { Usuario } from '../dbdocs/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    public afa: AngularFireAuth,
    public afs: AngularFirestore,
  ) { }

  private agregarUsuario(usuario: Usuario) {
    return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).set(usuario);
  }

  completarPerfilUsuario(usuario: Usuario, direccion: Direccion): Promise<void> {
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

  async correoDisponible(correo: string) {
    let methods = await this.afa.auth.fetchSignInMethodsForEmail(correo);
    return methods.length == 0;
  }

  getDireccion(uid): Observable<Direccion> {
    return this.afs.doc<Direccion>(`direcciones/${uid}`).valueChanges();
  }

  getDirecciones(): Observable<Direccion[]> {
    return this.afs.collection<Direccion>('direcciones').valueChanges();
  }

  getDireccionesUsuario(usuarioUid: string, resolver: (direcciones: Direccion[]) => void) {
    console.log('START getDireccionesUsuario...');

    this.getUsuario(usuarioUid).subscribe(usuario => {

      console.log('usuario obtenido:');
      console.log(usuario);

      let direccionsUids = usuario.direcciones;
      let direcciones = Array<Direccion>();

      console.log('direcciones del usuario');
      console.log(direccionsUids);

      direccionsUids.forEach(async direccionUid => {
        let direccion = await this.getDireccion(direccionUid).toPromise();

        console.log('direccion obtenida:');
        console.log(direccion);

        direcciones.push(direccion);
      });

      resolver(direcciones);

      console.log('END getDireccionesUsuario...');
    });
  }

  getUsuario(uid: string): Observable<Usuario> {
    return this.afs.doc<Usuario>(`usuarios/${uid}`).valueChanges();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.afs.collection<Usuario>('usuarios').valueChanges();
  }

  iniciarSesion(correo: string, contrasena: string, resolver: (usuario: Usuario) => void, manejarError: (error: any) => void) {
    this.afa.auth.signInWithEmailAndPassword(correo, contrasena)
    .then(async result => {
      this.getUsuario(result.user.uid).subscribe(usuario => resolver(usuario));
    })
    .catch(error => {
      manejarError(error);
    });
  }

  private registrarConCorreo (correo: string, contrasena: string) {
    return this.afa.auth.createUserWithEmailAndPassword(correo, contrasena);
  }

  registrarUsuario(usuario: Usuario, contrasena: string, resolver: (usuario: Usuario) => void, manejarError: (error: any) => void) {
    this.registrarConCorreo(usuario.email, contrasena)
    .then(result => {
      console.log('Exito al registrar usuario con correo');
      console.log(result);

      console.log('Registrando usuario en base de datos...');

      usuario.uid = result.user.uid;

      this.agregarUsuario(usuario)
      .then(result2 => {
        console.log('Exito al registrar usuario en base de datos');

        resolver(usuario);
      })
      .catch(error => {
        console.error('Error al registrar usuario en base de datos');
        console.error(error);

        manejarError(error);
      });
    })
    .catch(error => {
      console.error('Error al registrar usuario con correo');
      console.error(error);

      manejarError(error);
    });
  }
}
