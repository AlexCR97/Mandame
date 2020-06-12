export interface Mensaje {
    contenido: string;
    fechaExpandida: boolean;
    fechaHora: string;
    emisor: string;
    receptor: string;
    uid?: string;
}
