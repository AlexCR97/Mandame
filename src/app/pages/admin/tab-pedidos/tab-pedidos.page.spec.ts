import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabPedidosPage } from './tab-pedidos.page';

describe('TabPedidosPage', () => {
  let component: TabPedidosPage;
  let fixture: ComponentFixture<TabPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
