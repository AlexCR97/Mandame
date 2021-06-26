import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { LoadingController } from '@ionic/angular';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Usuario } from 'src/app/dbdocs/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  segmentLogin = 'login';
  segmentRegistro = 'registro';
  segmentId = this.segmentLogin;

  subTitulos = new Map<string, string>([
    [this.segmentLogin, '¡Bienvendio a Mándame!'],
    [this.segmentRegistro, 'Para usar nuestro servicio'],
  ]);

  titulos = new Map<string, string>([
    [this.segmentLogin, 'Inicia Sesión'],
    [this.segmentRegistro, 'Regístrate'],
  ]);
  
  btnTexts = new Map<string, string>([
    [this.segmentLogin, 'Iniciar Sesión'],
    [this.segmentRegistro, 'Regístrarme'],
  ]);

  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  cargandoDialog;

  loginType: "cliente" | "repartidor" | "admin" = "cliente";

  constructor(
    public guiUtils: GuiUtilsService,
    public loadingController: LoadingController,
    public registroService: RegistroService,
    public router: Router,
  ) { }

  ngOnInit() { }

  onBtnClick() {
    switch (this.loginType) {

      case 'cliente': {
        this.router.navigateByUrl('/inicio');
        break;
      }

      case 'repartidor': {
        this.router.navigateByUrl('/inicio-repartidor/tab-pedidos-repartidor');
        break;
      }

      case 'admin': {
        this.router.navigateByUrl('/inicio-admin');
        break;
      }

      default: {
        this.guiUtils.mostrarToast('Este correo no parece estar vinculado con ninguna cuenta', 3000, 'danger');
        break;
      }
    }
  }

  onLinkClickLoginRegistro(segmentId: string) {
    console.log('onLinkClick()');
    console.log(segmentId);
    this.segmentId = segmentId;
  }

  async intentarLogin() {
    console.log('Iniciando sesion...');

    let credencialesValidas = await this.validarCredenciales();

    if (!credencialesValidas) {
      return;
    } else {
      this.cargandoDialog = await this.guiUtils.mostrarCargando('');

      this.registroService.iniciarSesion(this.correo, this.contrasena,
        usuario => {
          console.log('Exito al iniciar sesion :D');
          this.guiUtils.cerrarCargando(this.cargandoDialog);

          CacheUsuario.usuario = usuario;

          console.log('Usuario obtenido:');
          console.log(usuario);

          
        },
        error => {
          console.error('Error al iniciar sesion :(');
          console.error(error);
          this.guiUtils.cerrarCargando(this.cargandoDialog);
          this.guiUtils.mostrarToast('Verifica tu correo y contraseña', 3000, 'danger');
        });
    }
  }

  async validarCredenciales(): Promise<boolean> {
    console.log('correo: ' + this.correo);
    console.log('contrasena: ' + this.contrasena);
    if (this.correo.trim().toString() === '') {
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('Correo vacío', 3000, 'danger');
      return false;
    }
    if (this.contrasena.toString() === '') {
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('contraseña vacía', 3000, 'danger');
      return false;
    }
    return true;
  }

  async intentarRegistro() {
    let credencialesValidas = await this.validarCredencialesRegistro();

    if (!credencialesValidas) {
      return;
    }
    
    this.registrarUsuario();
  }

  async registrarUsuario() {
    this.cargandoDialog = await this.guiUtils.mostrarCargando('');

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

        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.router.navigateByUrl('/post-registro');
      },
      error => {
        this.guiUtils.cerrarCargando(this.cargandoDialog);
        console.error('Error al registrar usuario');
        console.error(error);
        this.guiUtils.mostrarToast('La contraseña debe de tener al menos 6 caracteres', 3000, 'danger');
      }
    );
  }

  async validarCredencialesRegistro(): Promise<boolean> {
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

    return true;
  }
}
