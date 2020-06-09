import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache/cache.service';

@Component({
  selector: 'app-inicio-repartidor',
  templateUrl: './inicio-repartidor.page.html',
  styleUrls: ['./inicio-repartidor.page.scss'],
})
export class InicioRepartidorPage implements OnInit {

  constructor(
    private cacheService: CacheService,
  ) { }

  ngOnInit() {
    console.log('Iniciando cache...');
    this.cacheService.iniciarCache();
  }

}
