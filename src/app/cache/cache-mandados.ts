import { Mandado } from '../dbdocs/mandado';
import { EsperaPedido } from '../services/pedidos.service';

export class CacheMandados {

    public static mandados = new Map<string, Mandado>();
    
    public static clear() {
        this.mandados.clear();
    }

    public static getMandado(uidMandado: string): Mandado {
        return this.mandados.get(uidMandado);
    }

    public static getAllMandados(espera: EsperaPedido): Mandado[] {
        if (espera == EsperaPedido.Todos) {
            return Array.from(this.mandados.values());
        }

        return Array.from(this.mandados.values())
            .filter(mandado => mandado.espera == espera.toString())
            .sort((m1, m2) => (new Date(m1.fechaHora)).getTime() - (new Date(m2.fechaHora)).getTime());
    }

    public static getAllMandadosDeUsuario(uidUsuario: string, espera: EsperaPedido): Mandado[] {
        return this.getAllMandados(espera)
            .filter(p => p.uidCliente == uidUsuario);
    }

    public static setAllMandados(mandados: Mandado[]) {
        this.mandados.clear();
        mandados.forEach(mandado => this.setMandado(mandado.uid, mandado));
    }

    public static setMandado(uidMandado: string, mandado: Mandado) {
        this.mandados.set(uidMandado, mandado);
    }
}
