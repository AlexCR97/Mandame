import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { Usuario } from 'src/app/dbdocs/usuario';
import { LoadingController, ToastController } from '@ionic/angular';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

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
    public guiUtils: GuiUtilsService,
    public loadingController: LoadingController,
    public registroService: RegistroService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  iniciarSesion() {
    this.guiUtils.cerrarCargando(this.cargandoDialog);

    console.log('Iniciando sesion...');

    this.router.navigateByUrl('/post-registro');
  }

  async intentarRegistro() {
    let credencialesValidas = await this.validarCredenciales();

    if (!credencialesValidas) {
        return;
    }  
    this.registrarUsuario();
  }

  async registrarUsuario() {
    this.cargandoDialog = await this.guiUtils.mostrarCargando('Registrando...');

    let usuario: Usuario = {
      apellido: '',
      direcciones: [],
      email: this.correo,
      foto: '',
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
        this.guiUtils.cerrarCargando(this.cargandoDialog);
        console.error('Error al registrar usuario');
        console.error(error);
        this.guiUtils.mostrarToast('La contraseña debe de tener al menos 6 caracteres', 3000, 'danger');
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
      this.guiUtils.mostrarToast('El correo no esta disponible', 3000, 'danger');
      return false;
    }

    if (this.contrasena != this.confirmarContrasena) {
      console.log('Las contrasenas no coinciden');
      this.guiUtils.mostrarToast('Las contrasenas no coinciden', 3000, 'danger');
      return false;
    }
    if (this.correo.toString() === '' ){
      console.log('El correo está vacío')
      this.guiUtils.mostrarToast('el correo está vacío', 3000, 'danger');
      return false;
    }

    if (this.contrasena.toString() === '' ){
      console.log('La contrasena está vacío')
      this.guiUtils.mostrarToast('La contrasena está vacía', 3000, 'danger');
      return false;
    }

    return true;
  }
}
