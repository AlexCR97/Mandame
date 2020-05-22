import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { ModalController } from '@ionic/angular';

interface restaurant {
  calificacion : number[]
  categoria : string
  estado : string
  id : string
  nombre : string
  tiempoaprox : number[]
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  showToolbar = false;
  select: string;
  nombreRestaurant : string;

  public Restaurant : any = [];
  public Productos : any = [];
  public productosPorCategoria = [];

  constructor(public restaurantservice : RestaurantService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.select = "Lorem";

    this.restaurantservice.getRestaurant("8fXc1YIaCjXTjb6Ry5t4").subscribe(restaurants => {
      console.log('RESTAURANTS');

      this.Restaurant = restaurants;
      console.log(this.Restaurant);
    });

    this.restaurantservice.getProductos("8fXc1YIaCjXTjb6Ry5t4").subscribe(productos => {
     
      
      this.Productos = productos;
      //console.log(this.Productos);
      
      //console.log('Todos los Productos')
      //console.log(this.Productos);

      this.mostrarCategorias(this.Productos);
    });
  }

  mostrarCategorias(productos: any []){
    let categoriasRepetidas = productos.map(producto => producto.categoria);
    let categoriasUnicas = new Set<string>(categoriasRepetidas);

    

    categoriasUnicas.forEach(categ =>{
      let prods = productos.filter(prod => prod.categoria == categ);

      this.productosPorCategoria.push({
        categoria: categ,
        productos: prods,
      });
    });

    console.log('PRODUCTOS por categoria');
    console.log(this.productosPorCategoria);
  }

  segmentChanged(ev: any) {
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }

  // TODO: Change the btnClick name to another most meaningful
  btnClick() {
    console.log('Down Button Click');
    this.presentPrePedidoModal();
  }

  async presentSeguirPedidoModal(uidpedido) {
    const modal = await this.modalController.create({
      component: ModalAlertPage,
      componentProps: {
        'uid': uidpedido
      },
      cssClass: "dialog-modal"
    });
    return await modal.present();
  }

  async presentPrePedidoModal() {
    const modal = await this.modalController.create({
      component: PrePedidoPage
    });
    modal.onDidDismiss().then((data) => {
      if(data.data) {
        this.presentSeguirPedidoModal(data.data);
      }
      // TODO: CHANGE COLOR ANV ALUES OF DOWN BUTTON
    });
    return await modal.present();
  }
}