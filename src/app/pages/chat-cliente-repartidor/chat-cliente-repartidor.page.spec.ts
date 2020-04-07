import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatClienteRepartidorPage } from './chat-cliente-repartidor.page';

describe('ChatClienteRepartidorPage', () => {
  let component: ChatClienteRepartidorPage;
  let fixture: ComponentFixture<ChatClienteRepartidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatClienteRepartidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatClienteRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
