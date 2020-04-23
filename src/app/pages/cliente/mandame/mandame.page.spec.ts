import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MandamePage } from './mandame.page';

describe('MandamePage', () => {
  let component: MandamePage;
  let fixture: ComponentFixture<MandamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MandamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
