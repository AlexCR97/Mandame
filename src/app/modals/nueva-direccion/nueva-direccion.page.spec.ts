import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaDireccionPage } from './nueva-direccion.page';

describe('NuevaDireccionPage', () => {
  let component: NuevaDireccionPage;
  let fixture: ComponentFixture<NuevaDireccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaDireccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaDireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
