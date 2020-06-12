import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabChatsRepartidorPage } from './tab-chats-repartidor.page';

describe('TabChatsRepartidorPage', () => {
  let component: TabChatsRepartidorPage;
  let fixture: ComponentFixture<TabChatsRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabChatsRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabChatsRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
