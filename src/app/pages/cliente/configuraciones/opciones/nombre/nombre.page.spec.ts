import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NombrePage } from './nombre.page';

describe('NombrePage', () => {
  let component: NombrePage;
  let fixture: ComponentFixture<NombrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
