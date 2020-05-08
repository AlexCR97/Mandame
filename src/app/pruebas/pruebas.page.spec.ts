import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PruebasPage } from './pruebas.page';

describe('PruebasPage', () => {
  let component: PruebasPage;
  let fixture: ComponentFixture<PruebasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PruebasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
