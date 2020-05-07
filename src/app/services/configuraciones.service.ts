import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../dbdocs/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ConfiguracionesService {

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }
}
