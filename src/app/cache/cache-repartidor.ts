import { Repartidor } from '../dbdocs/repartidor';

export class CacheRepartidor {

    private static repartidores = new Map<string, Repartidor>();

    public static getRepartidor(uidUsuario: string): Repartidor {
        return this.repartidores.get(uidUsuario);
    }

    public static getAllRepartidores(): Repartidor[] {
        return Array.from(this.repartidores.values());
    }

    public static setRepartidor(repartidor: Repartidor) {
        this.repartidores.set(repartidor.uid, repartidor);
    }

    public static setAllRepartidores(repartidores: Repartidor[]) {
        repartidores.forEach(r => this.setRepartidor(r));
    }
}
