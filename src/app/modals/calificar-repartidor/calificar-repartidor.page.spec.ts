import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalificarRepartidorPage } from './calificar-repartidor.page';

describe('CalificarRepartidorPage', () => {
  let component: CalificarRepartidorPage;
  let fixture: ComponentFixture<CalificarRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificarRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalificarRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
