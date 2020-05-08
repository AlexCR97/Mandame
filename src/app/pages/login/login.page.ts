import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';
import { CacheUsuario } from 'src/app/services/cache-usuario';
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

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Iniciando sesión...');

    this.registroService.iniciarSesion(this.email, this.password,
    usuario => {
      console.log('Exito al iniciar sesion :D');
      this.guiUtils.cerrarCargando(this.cargandoDialog);

      CacheUsuario.usuario = usuario;

      this.router.navigateByUrl('/inicio');
    },
    error => {
      console.error('Error al iniciar sesion :(');
      console.error(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('Verifica tu correo y contraseña', 3000, 'danger');
    });
  }
}
