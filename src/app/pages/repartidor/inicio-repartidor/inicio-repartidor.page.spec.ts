import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioRepartidorPage } from './inicio-repartidor.page';

describe('InicioRepartidorPage', () => {
  let component: InicioRepartidorPage;
  let fixture: ComponentFixture<InicioRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
