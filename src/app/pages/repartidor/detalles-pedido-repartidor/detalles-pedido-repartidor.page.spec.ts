import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesPedidoRepartidorPage } from './detalles-pedido-repartidor.page';

describe('DetallesPedidoRepartidorPage', () => {
  let component: DetallesPedidoRepartidorPage;
  let fixture: ComponentFixture<DetallesPedidoRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPedidoRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPedidoRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
