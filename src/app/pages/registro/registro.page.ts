import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { Usuario } from 'src/app/dbdocs/usuario';
import { LoadingController } from '@ionic/angular';
import { CacheUsuario } from 'src/app/services/cache-usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  cargandoDialog;

  constructor(
    public loadingController: LoadingController,
    public registroService: RegistroService,
    public router: Router,
  ) { }

  ngOnInit() { }

  async cerrarCargando() {
    this.cargandoDialog.dismiss();
  }

  iniciarSesion() {
    this.cerrarCargando();

    console.log('Iniciando sesion...');

    this.router.navigateByUrl('/post-registro');
  }

  async intentarRegistro() {

    console.log('Obteniendo direcciones...');

    this.registroService.getDirecciones().subscribe(direcciones => {
      console.log(direcciones);
    });

    return;

    let credencialesValidas = await this.validarCredenciales();

    if (!credencialesValidas) {
      return;
    }
    
    this.registrarUsuario();
  }

  async mostrarCargando(mensaje: string) {
    this.cargandoDialog = await this.loadingController.create({
      message: mensaje,
    });

    await this.cargandoDialog.present();
  }

  registrarUsuario() {
    this.mostrarCargando('Registrando...');

    let usuario: Usuario = {
      direcciones: [],
      email: this.correo,
      foto: '',
      apellido:'',
      nombre: '',
      posicion: 'cliente',
      telefono: '',
      uid: '',
    }

    this.registroService.registrarUsuario(usuario, this.contrasena,
      usuarioRegistrado => {
        console.log('Usuario registrado es:');
        console.log(usuarioRegistrado);

        CacheUsuario.usuario = usuarioRegistrado;

        this.iniciarSesion();
      },
      error => {
        this.cerrarCargando();
        console.log('Error es: ' + error);
      }
    );
  }

  async validarCredenciales(): Promise<boolean> {
    console.log('correo: ' + this.correo);
    console.log('contrasena: ' + this.contrasena);
    console.log('confirmar contrasena: ' + this.confirmarContrasena);

    let correoDisponible = await this.registroService.correoDisponible(this.correo);

    if (!correoDisponible) {
      console.log('El correo no esta disponible');
      return false;
    }

    if (this.contrasena != this.confirmarContrasena) {
      console.log('Las contrasenas no coinciden');
      return false;
    }

    return true;
  }

}
