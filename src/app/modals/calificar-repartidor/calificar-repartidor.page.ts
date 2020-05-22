import { Component, OnInit } from '@angular/core';
import { CalificarRepartidoService } from 'src/app/services/calificar-repartido.service';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { ActivatedRoute } from '@angular/router';
import { format } from 'url';



@Component({
  selector: 'app-calificar-repartidor',
  templateUrl: './calificar-repartidor.page.html',
  styleUrls: ['./calificar-repartidor.page.scss'],
})
export class CalificarRepartidorPage implements OnInit {
  nombre:string;
  foto:string;
  comentario:string;
  calificacion = 1;
  iconName:boolean[] = [true,true,true,false,false];
  uidPedido:string;

  constructor(
    public activatedRoute:ActivatedRoute ,
    public calificarRepartidoService:CalificarRepartidoService,
  ) { }

  ngOnInit() {
    //TODO Descomentar esta chingadera cuando me envien el puto parametro!!!
    //this.uidPedido = this.activatedRoute.snapshot.queryParamMap.get("uidPedido");
    this.nombre = "Edgar";
    this.foto = "../../../assets/img/fotodegary.jpg";
  }
  iconChanged(value:number){
    for(let i = 0; i < 5; i++){
      this.iconName[i] = false;
    }
    for(let i = 0; i < value; i++){
      this.iconName[i] = true;
    }
    this.calificacion = value;
  }
  
  calificar() {
    let pedido = CachePedidos.pedidos.get(this.uidPedido);
    this.calificarRepartidoService.calificarYComentar(
      pedido.repartidor,this.calificacion,
      this.uidPedido,this.comentario
    )
  }

}
