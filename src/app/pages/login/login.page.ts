import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { LoadingController } from '@ionic/angular';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  cargandoDialog;

  constructor(
    public guiUtils: GuiUtilsService,
    public loadingController: LoadingController,
    public registroService: RegistroService,
    public router: Router,
  ) { }

  ngOnInit() { }

  async intentarLogin() {
    console.log('Iniciando sesion...');

    let credencialesValidas = await this.validarCredenciales();

    if (!credencialesValidas) {
      return;
    } else {
      this.cargandoDialog = await this.guiUtils.mostrarCargando('Iniciando sesión...');

      this.registroService.iniciarSesion(this.email, this.password,
        usuario => {
          console.log('Exito al iniciar sesion :D');
          this.guiUtils.cerrarCargando(this.cargandoDialog);

          CacheUsuario.usuario = usuario;

          console.log('Usuario obtenido:');
          console.log(usuario);

          switch (usuario.posicion) {

            case 'cliente': {
              console.log('Cuenta de cliente detectada. Iniciando sesion...');
              this.router.navigateByUrl('/inicio');
              break;
            }

            case 'repartidor': {
              console.log('Cuenta de repartidor detectada. Iniciando sesion...');
              this.router.navigateByUrl('/inicio-repartidor/tab-pedidos-repartidor');
              break;
            }

            case 'admin': {
              console.log('Cuenta de admin detectada. Iniciando sesion...');
              this.router.navigateByUrl('/inicio-admin');
              break;
            }

            default: {
              console.log('Ninguna cuenta detectada :(');
              this.guiUtils.mostrarToast('Este correo no parece estar vinculado con ninguna cuenta', 3000, 'danger');
              break;
            }
          }
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
    console.log('correo: ' + this.email);
    console.log('contrasena: ' + this.password);
    if (this.email.toString() === '') {
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('Correo vacío', 3000, 'danger');
      return false;
    }
    if (this.password.toString() === '') {
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('contraseña vacía', 3000, 'danger');
      return false;
    }
    return true;

  }

}
