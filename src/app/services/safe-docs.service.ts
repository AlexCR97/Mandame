import { Injectable } from '@angular/core';
import { Direccion } from '../dbdocs/direccion';

@Injectable({
  providedIn: 'root'
})
export class SafeDocsService {

  constructor() { }

  direccion(direccion: Direccion) {
    let safe: Direccion = {
      calle: direccion.calle,
      numeroExterior: direccion.numeroExterior,
      colonia: direccion.colonia,
    };

    if (direccion.entreCalle1 != null) {
      safe.entreCalle1 = direccion.entreCalle1;
    }

    if (direccion.entreCalle2 != null) {
      safe.entreCalle2 = direccion.entreCalle2;
    }

    if (direccion.numeroInterior != null) {
      safe.numeroInterior = direccion.numeroInterior;
    }

    if (direccion.uid != null) {
      safe.uid = direccion.uid;
    }

    return safe;
  }
}
