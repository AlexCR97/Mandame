import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesComidaSeleccionadaPage } from './detalles-comida-seleccionada.page';

describe('DetallesComidaSeleccionadaPage', () => {
  let component: DetallesComidaSeleccionadaPage;
  let fixture: ComponentFixture<DetallesComidaSeleccionadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesComidaSeleccionadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesComidaSeleccionadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
