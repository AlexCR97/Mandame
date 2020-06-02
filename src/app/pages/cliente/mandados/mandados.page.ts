import { Component, OnInit } from '@angular/core';
import { Mandado } from 'src/app/dbdocs/mandado';
import { MandadoService } from 'src/app/services/mandado.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { EsperaPedido } from 'src/app/services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mandados',
  templateUrl: './mandados.page.html',
  styleUrls: ['./mandados.page.scss'],
})
export class MandadosPage implements OnInit {

  mandadosPendientes = new Array<Mandado>();
  mandadosConcluidos = new Array<Mandado>();

  constructor(
    private mandadoService: MandadoService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Obtener informacion del cache si se tiene conexion a internet

    // TODO Cambiar por mandados pendientes
    this.mandadoService.getMandadosDeUsuario(CacheUsuario.usuario.uid, EsperaPedido.Todos).subscribe(
      mandados => {
        console.log('Se obtuvieron los mandados pendientes :D');
        console.table(mandados);

        this.mandadosPendientes = mandados;
      },
      error => {
        console.error('Error al obtener mandados pendientes :(');
        console.error(error);
      }
    );

    // TODO Cambiar por mandados concluidos
    this.mandadoService.getMandadosDeUsuario(CacheUsuario.usuario.uid, EsperaPedido.Todos).subscribe(
      mandados => {
        console.log('Se obtuvieron los mandados concluidos :D');
        console.table(mandados);

        this.mandadosConcluidos = mandados;
      },
      error => {
        console.error('Error al obtener mandados concluidos :(');
        console.error(error);
      }
    );
  }

  abrirDetallesMandado(uidMandado: string) {
    this.router.navigate(['/mandame'], {
      queryParams: {
        uidMandado: uidMandado,
      }
    });
  }

}
