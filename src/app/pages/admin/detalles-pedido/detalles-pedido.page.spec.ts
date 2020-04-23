import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesPedidoPage } from './detalles-pedido.page';

describe('DetallesPedidoPage', () => {
  let component: DetallesPedidoPage;
  let fixture: ComponentFixture<DetallesPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
