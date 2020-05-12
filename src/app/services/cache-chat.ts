import { Usuario } from '../dbdocs/usuario';
import { Mensaje } from '../dbdocs/mensaje';
import { Repartidor } from '../dbdocs/repartidor';

export class CacheChat {

    private static chatsUsuarios = new Map<string, Usuario>();
    private static mensajes = new Map<string, Mensaje[]>();

    public static getAllChatsUsuarios(): Usuario[] {
        return Array.from(this.chatsUsuarios.values());
    }

    public static getChatUsuario(uidReceptor: string): Usuario {
        return this.getAllChatsUsuarios().find(u => u.uid == uidReceptor);
    }

    public static getMensajes(uid: string): Mensaje[] {
        return this.mensajes.get(uid);
    }

    public static pushMensaje(uid: string, mensaje: Mensaje) {
        let mensajes = this.mensajes.get(uid);
        mensajes.push(mensaje);
        this.setMensajes(uid, mensajes);
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
