import { Injectable } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  actualizarImagenUsuario(uidUsuario: string, foto: string): Promise<void> {
    return this.afs.collection('usuarios').doc(uidUsuario).update({ foto: foto });
  }

  subirImagen(
    imagen: File,
    ruta: string,
    observadorPorcentaje: (porcentaje: number) => void,
    observadorUrlDescarga: (url: string) => void,
    manejarError: (error: any) => void
  ) {
    let task = this.storage.upload(ruta, imagen);
    
    task.percentageChanges().subscribe(
      porcentaje => observadorPorcentaje(porcentaje),
      error => manejarError(error)
    );

    task.snapshotChanges().pipe(
      finalize(() => {
        this.storage.ref(ruta).getDownloadURL().subscribe(
          url => observadorUrlDescarga(url),
          error => manejarError(error)
        );
      })
    )
    .subscribe(
      () => console.log('La imagen se subio con exito! :D'),
      error => manejarError(error)
    );
  }

}
