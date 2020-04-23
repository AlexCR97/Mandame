import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabRepartidoresPage } from './tab-repartidores.page';

describe('TabRepartidoresPage', () => {
  let component: TabRepartidoresPage;
  let fixture: ComponentFixture<TabRepartidoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRepartidoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabRepartidoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
