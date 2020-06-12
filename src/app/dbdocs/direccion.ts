export interface Direccion {
    calle: string;
    entreCalle1?: string;
    entreCalle2?: string;
    numeroExterior: number;
    numeroInterior?: number;
    colonia: string;
    ubicacion?: {
        latitud: number,
        longitud: number,
    };
    uid?: string;
}
