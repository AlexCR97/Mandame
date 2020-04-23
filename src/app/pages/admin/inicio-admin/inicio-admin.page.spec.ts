import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioAdminPage } from './inicio-admin.page';

describe('InicioAdminPage', () => {
  let component: InicioAdminPage;
  let fixture: ComponentFixture<InicioAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
