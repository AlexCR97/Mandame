export interface Direccion {
    calle: string;
    numeroExterior: number;
    numeroInterior?: number;
    colonia: string;
    ubicacion?: {
        latitud: number,
        longitud: number,
    };
}

