import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { NavController } from '@ionic/angular';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  correo = '';

  constructor(
    private guiUtils: GuiUtilsService,
    private navController: NavController,
    private registroService: RegistroService,
  ) { }

  ngOnInit() { }

  onBtnClick() {
    console.log(`onBtnClick(${this.correo})`);

    this.registroService.recuperarContrasena(this.correo)
    .then(() => {
      console.log('Se envio un correo de recuperación de contraseña :D');
      this.guiUtils.mostrarToast('Revisa tu correo para reestablecer tu contraseña', 3000, 'success');
      this.navController.back();
    })
    .catch(error => {
      console.error('Error al enviar correo de recuperacion :(');
      console.error(error);
      this.guiUtils.mostrarToast('Ocurrió un error. Verifica tu correo e intenta de nuevo', 3000, 'danger');
    });
  }

  isCorreoValid() {
    if (this.correo.trim().length == 0) {
      return false;
    }

    if (!this.correo.includes('@') || !this.correo.includes('.')) {
      return false;
    }

    return true;
  }
}
