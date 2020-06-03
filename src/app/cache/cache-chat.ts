import { Usuario } from '../dbdocs/usuario';
import { Mensaje } from '../dbdocs/mensaje';
import { Repartidor } from '../dbdocs/repartidor';

export interface VistaChat {
    foto: string;
    apellidoRepartidor: string;
    nombreRepartidor: string;
    fechaUltimoMensaje: string;
    ultimoMensaje: string;
    uidRepartidor: string;
}

export class CacheChat {

    private static chatsUsuarios = new Map<string, Usuario>();
    private static mensajes = new Map<string, Mensaje[]>();

    public static clear() {
        this.clearChats();
        this.clearMensajes();
    }

    public static clearChats() {
        this.chatsUsuarios.clear();
    }

    public static clearMensajes() {
        return this.mensajes.clear();
    }

    public static chatExiste(uidReceptor: string): boolean {
        return this.getChatUsuario(uidReceptor) != null;
    }

    public static getAllChatsUsuarios(): Usuario[] {
        return Array.from(this.chatsUsuarios.values());
    }

    public static getChatUsuario(uidReceptor: string): Usuario {
        return this.getAllChatsUsuarios().find(u => u.uid == uidReceptor);
    }

    public static getMensajes(uid: string): Mensaje[] {
        return this.mensajes.get(uid);
    }

    public static getVistasChats(): VistaChat[] {
        let vistasChats = new Array<VistaChat>();
        let chatsUsuarios = this.getAllChatsUsuarios();

        chatsUsuarios.forEach(usuario => {
            let menajesConUsuario = this.getMensajes(usuario.uid);
            if (menajesConUsuario == null) {
                return;
            }

            let ultimoMensaje = menajesConUsuario.pop();
            if (ultimoMensaje == null) {
                return;
            }

            vistasChats.push({
                foto: usuario.foto,
                nombreRepartidor: usuario.nombre,
                apellidoRepartidor: usuario.apellido,
                fechaUltimoMensaje: ultimoMensaje.fechaHora,
                ultimoMensaje: ultimoMensaje.contenido,
                uidRepartidor: usuario.uid,
            });
        });

        return vistasChats;
    }

    public static isChatsEmpty(): boolean {
        return this.chatsUsuarios.size == 0;
    }

    public static isMensajesEmpty(): boolean {
        return this.mensajes.size == 0;
    }

    public static pushMensaje(uidReceptor: string, mensaje: Mensaje) {
        let mensajes = this.mensajes.get(uidReceptor);
        mensajes.push(mensaje);
        this.setMensajes(uidReceptor, mensajes);
    }

    public static repartidorToUsuario(repartidor: Repartidor): Usuario {
        return {
            apellido: repartidor.apellido,
            direcciones: [],
            email: repartidor.email,
            foto: repartidor.foto,
            nombre: repartidor.nombre,
            posicion: 'repartidor',
            telefono: repartidor.telefono,
            uid: repartidor.uid,
        };
    }

    public static setChatUsuario(usuario: Usuario) {
        this.chatsUsuarios.set(usuario.uid, usuario);
    }

    public static setAllChatUsuario(usuarios: Usuario[]) {
        usuarios.forEach(u => this.setChatUsuario(u));
    }

    public static setMensajes(uid: string, mensajes: Mensaje[]) {
        this.mensajes.set(uid, mensajes);
    }
}
