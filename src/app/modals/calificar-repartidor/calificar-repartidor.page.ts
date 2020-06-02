import { Component, OnInit } from '@angular/core';
import { CalificarRepartidoService } from 'src/app/services/calificar-repartido.service';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { ActivatedRoute } from '@angular/router';
import { format } from 'url';
import { Pedido } from 'src/app/dbdocs/pedido';



@Component({
  selector: 'app-calificar-repartidor',
  templateUrl: './calificar-repartidor.page.html',
  styleUrls: ['./calificar-repartidor.page.scss'],
})
export class CalificarRepartidorPage implements OnInit {

  nombre: string;
  foto: string;
  comentario: string;
  calificacion = 1;
  iconName: boolean[] = [true, true, true, false, false];
  uidPedido: string;
  pedido: Pedido;

  constructor(
    public activatedRoute: ActivatedRoute ,
    public calificarRepartidoService: CalificarRepartidoService,
  ) { }

  ngOnInit() {
    this.uidPedido = this.activatedRoute.snapshot.queryParamMap.get("uidPedido");

    console.log('Uid Pedido:', this.uidPedido);

    this.pedido = CachePedidos.pedidos.get(this.uidPedido);

    console.log('Pedido:', this.pedido);

    this.nombre = this.pedido.nombreRepartidor;
    this.foto = this.pedido.foto_perfil;
  }

  iconChanged(value: number) {
    for (let i = 0; i < 5; i++) {
      this.iconName[i] = false;
    }

    for (let i = 0; i < value; i++) {
      this.iconName[i] = true;
    }

    this.calificacion = value;
  }
  
  calificar() {
    console.log('Calificando pedido...');
    this.calificarRepartidoService.calificarYComentar(this.pedido.repartidor, this.calificacion, this.pedido.uid, this.comentario)
    .then(result => {
      console.log('Repartidor calificado y comentado! :D');
    })
    .catch(error => {
      console.error('Error al calificar y comentar repartidor :(');
      console.error(error);
    });
  }

}
