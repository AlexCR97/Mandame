import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { LoadingController } from '@ionic/angular';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { Direccion } from 'src/app/dbdocs/direccion';


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  direcciones: Direccion[];

  constructor(
    public loadingController: LoadingController,
    public direccionesService: DireccionesService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log("Usuario")
    let cliente = CacheUsuario.usuario;
    console.log(cliente) 
    let n = cliente.direcciones.length;
    this.direccionesService.getDireccionesUsuario(cliente.uid,
      direcciones => {
        direcciones.forEach(direccion => this.direcciones.push(direccion));
      }
      
    );
    
  }

  actualizarDireccion(uidDireccion: string) {
    this.router.navigate(['/actualizar-direccion'], {
      queryParams: {
        uidDireccion: uidDireccion,
      }
    });
  }

  irAgregarDireccion(){
    this.router.navigateByUrl('agregar-direccion');
  }
}