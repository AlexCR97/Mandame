import { Direccion } from '../dbdocs/direccion';

export class CacheDirecciones {

    /**
     * Las direcciones se guardan con el uid del usuario al que pertenecen dichas direcciones
     */
    public static direcciones = new Map<string, Direccion[]>();

    public static clear() {
        this.direcciones.clear();
    }
    
    public static getDireccion(uidDireccion: string): Direccion {
        return this.getAllDirecciones()
            .find(d => d.uid == uidDireccion);
    }

    public static getAllDirecciones(): Direccion[] {
        let todasLasDirecciones = Array<Direccion>();

        Array.from(this.direcciones.values()).forEach(direcciones => {
            todasLasDirecciones = todasLasDirecciones.concat(direcciones);
        });

        return todasLasDirecciones;
    }

    public static getAllDireccionesDeUsuario(uidUsuario: string): Direccion[] {
        return this.direcciones.get(uidUsuario);
    }

    public static setAllDireccionesDeUsuario(uidUsuario: string, direcciones: Direccion[]) {
        this.direcciones.clear();
        this.direcciones.set(uidUsuario, direcciones);
    }

    public static addDireccion(uidUsuario: string, direccion: Direccion) {
        let direcciones = this.direcciones.get(uidUsuario);
        direcciones.push(direccion);

        this.direcciones.set(uidUsuario, direcciones);
    }
}
