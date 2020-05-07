import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../dbdocs/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  private agregarUsuario(usuario: Usuario) {
    return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).set(usuario);
  }

  async correoDisponible(correo: string) {
    let methods = await this.afa.auth.fetchSignInMethodsForEmail(correo);
    return methods.length == 0;
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
      let usuario = await this.getUsuario(result.user.uid).toPromise();
      resolver(usuario);
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
