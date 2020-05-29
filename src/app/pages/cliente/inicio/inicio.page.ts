import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Usuario } from 'src/app/dbdocs/usuario';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosPorCategoria } from 'src/app/dbdocs/producto';
import { RestaurantesPorCategoria } from 'src/app/dbdocs/restaurant';
import { CacheService } from 'src/app/cache/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario = CacheUsuario.usuario;

  anchorToolbar = false;
  showTitle = false;

  private segmentSuperior = 'ofertas';
  private segmentCentral = 'Pizzería';
  private segmentInferior = 'especialidades';

  private menuPrincipal;
  private menuOpciones;
  private menuCuenta;

  public ofertasItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  public masVendidosItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  public proximamenteItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  public productosPorCategoria: ProductosPorCategoria[];
  public restsPorCategoria: RestaurantesPorCategoria[];

  constructor(
    public cacheService: CacheService,
    public productosService: ProductosService,
    public restaurantService: RestaurantService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Iniciando cache...');
    this.cacheService.iniciarCache();

    console.log('Obteniendo restaurantes por categoria...');
    this.restaurantService.getRestaurantesPorCategoria().subscribe(
      rests => {
        console.log('Se obtuvieron los restaurantes por categoria! :D');
        console.log(rests);
        this.restsPorCategoria = rests;
      },
      error => {
        console.error('Error al obtener los restaurantes por categoria :(');
        console.error(error);
      }
    );

    console.log('Obteniendo productos por categoria...');
    this.productosService.getProductosPorCategoria().subscribe(
      productos => {
        console.log('Se obtuvieron los productos por categoria! :D');
        console.log(productos);
        this.productosPorCategoria = productos;
        console.log("segunda", this.productosPorCategoria.length);
      },
      error => {
        console.error('Error al obtener los productos por categoria :(');
        console.error(error);
      }
    )
    
  }

  abrirRestaurante(uidRestaurant: string) {
    console.log('Abriendo restaurant con uid', uidRestaurant);
    
    this.router.navigate(['/restaurant'], {
      queryParams: {
        uidRestaurant: uidRestaurant,
      }
    });
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.anchorToolbar = scrollTop >= 70;
      this.showTitle = scrollTop >= 70;
    }
  }
}
