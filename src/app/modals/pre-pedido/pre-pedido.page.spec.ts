import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrePedidoPage } from './pre-pedido.page';

describe('PrePedidoPage', () => {
  let component: PrePedidoPage;
  let fixture: ComponentFixture<PrePedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrePedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
