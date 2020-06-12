import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesMandadoRepartidorPage } from './detalles-mandado-repartidor.page';

describe('DetallesMandadoRepartidorPage', () => {
  let component: DetallesMandadoRepartidorPage;
  let fixture: ComponentFixture<DetallesMandadoRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesMandadoRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesMandadoRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
