import { Direccion } from './direccion';
import { Usuario } from './usuario';
import { Restaurant } from './restaurant';

export enum DocsPlantillas {
    direccion,
    restaurant,
    usuario,
}

let restaurant: Restaurant = {
    calificacion: 0,
    categoria: '',
    complementos: '',
    adicionales: [],
    estado: '',
    foto_perfil: '',
    foto_portada: '',
    nombre: '',
    productos: [],
    tiempo_entrega: 0,
    uid: '',
};

let direccion: Direccion = {
    calle: '',
    entreCalle1: '',
    entreCalle2: '',
    numeroExterior: undefined as number,
    numeroInterior: undefined as number,
    colonia: '',
    ubicacion: {
        latitud: undefined as number,
        longitud: undefined as number,
    },
    uid: '',
};

let usuario: Usuario = {
    apellido: '',
    direcciones: [],
    email: '',
    foto: '',
    nombre: '',
    posicion: '',
    telefono: '',
    uid: '',
};

export function getPlantilla(plantilla: DocsPlantillas) {
    switch (plantilla) {
        case DocsPlantillas.direccion: return direccion;
        case DocsPlantillas.usuario: return usuario;
        case DocsPlantillas.restaurant: return restaurant;
    }
}
