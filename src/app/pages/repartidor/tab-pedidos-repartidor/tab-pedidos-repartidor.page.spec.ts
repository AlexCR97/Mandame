import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabPedidosRepartidorPage } from './tab-pedidos-repartidor.page';

describe('TabPedidosRepartidorPage', () => {
  let component: TabPedidosRepartidorPage;
  let fixture: ComponentFixture<TabPedidosRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPedidosRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPedidosRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
