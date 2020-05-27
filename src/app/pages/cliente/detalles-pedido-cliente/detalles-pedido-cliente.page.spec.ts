import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesPedidoClientePage } from './detalles-pedido-cliente.page';

describe('DetallesPedidoClientePage', () => {
  let component: DetallesPedidoClientePage;
  let fixture: ComponentFixture<DetallesPedidoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPedidoClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPedidoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
