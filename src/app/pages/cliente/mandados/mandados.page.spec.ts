import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MandadosPage } from './mandados.page';

describe('MandadosPage', () => {
  let component: MandadosPage;
  let fixture: ComponentFixture<MandadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MandadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
