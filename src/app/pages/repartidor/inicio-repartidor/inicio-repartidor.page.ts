import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache/cache.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-repartidor',
  templateUrl: './inicio-repartidor.page.html',
  styleUrls: ['./inicio-repartidor.page.scss'],
})
export class InicioRepartidorPage implements OnInit {

  constructor(
    private cacheService: CacheService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    console.log('Iniciando cache...');
    this.cacheService.iniciarCache();
  }

  cerrarSesion() {
    this.cacheService.setOnBorrarCacheListener(() => {
      console.log('Cache de la app borrado!');
      this.navController.navigateBack('/login');
    });

    this.cacheService.borrarCache();
  }

}
