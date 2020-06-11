import { EsperaPedido, EstadoPedido } from 'src/app/services/pedidos.service';

export class CacheCarrito {

	public static restaurante = 'restaurante ejemplo';
	private static uidUltimoPedido = '';

	private onRestaurantesListener: () => void;
	private onRestaurantesError: (error: any) => void;
	private onProductosListener: () => void;
	private onProductosError: (error: any) => void;
	private onChatsListener: () => void;
	private onChatsError: (error: any) => void;
	private onMensajesListener: () => void;
	private onMensajesError: (error: any) => void;

	constructor() { }

	private static carrito = {
		aproximacion: 0,
		cantidad: [ ],
		cliente: 'uidcliente',
		comentarios: [],  // arr of numbers
		direccion: 'dirusuario',
		estado: EstadoPedido.Confirmado.toString(),
		espera: EsperaPedido.EnTransito.toString(),
		fechaHora: 'fecha',
		precios: [], // arr of numbers
		preciosComplementos: [], // arr of numbers
		productos: [], // arr of strings
		adicionales: [],
		complementos: [],
		repartidor: 'uidrepartidor',
		restaurante: 'uidrestaurante',
		uid: '' // uid pedido
		// nombreRepartidor?: string,
		// nombreRestaurante?: string,
		// foto_perfil?: string,
	};

	public static vaciarCarrito() {
		this.carrito = {
			aproximacion: 0,
			cantidad: [ ],
			cliente: 'uidcliente',
			comentarios: [],  // arr of numbers
			direccion: 'dirusuario',
			estado: EstadoPedido.Confirmado.toString(),
			espera: EsperaPedido.EnTransito.toString(),
			fechaHora: 'fecha',
			precios: [], // arr of numbers
			preciosComplementos: [], // arr of numbers
			productos: [], // arr of strings
			adicionales: [],
			complementos: [],
			repartidor: 'uidrepartidor',
			restaurante: 'uidrestaurante',
			uid: '' // uid pedido
		}
	}

	public static agregarAlCarrito(pedido) {
		// CLIENTE IS GONNA BE ADDED ON pre-pedido PAGE
		// COMPLEMENTOS ALSO ARE GONNA BE ADDED ON pre-pedido PAGE
		this.carrito.cantidad.push(pedido.cantidad);
		this.carrito.comentarios.push(pedido.comentario);
		this.carrito.precios.push(pedido.total);
		this.carrito.productos.push(pedido.producto.nombre);

		pedido.adicionales.forEach(adicional => {
			this.carrito.adicionales.push({
				uid: adicional.uid,
				nombre: adicional.nombre,
				precio: adicional.precio
			});
		});

		this.carrito.restaurante = pedido.uidRestaurante;
	}

	public static getCarrito() {
		return this.carrito;
	}

	public static getUidRestaurante(): string {
		return this.carrito.restaurante;
	}

	public static getProductosSimplificados() {
		let productos = [];

		for (let i = 0; i < this.carrito.productos.length; i++) {
			let producto = {
				'nombre': this.carrito.productos[i],
				'precio': this.carrito.precios[i],
				'cantidad': this.carrito.cantidad[i],
				'uid': ''
			};

			productos.push(producto);
		}

		return productos;
	}

	public static agregarComplemento(complemento: string, precio: number) {
		console.log('agregarComplemento()');
		this.carrito.complementos.push(complemento);
		this.carrito.preciosComplementos.push(precio);
		console.log('complementos: ', this.carrito.complementos);
	}

	public static eliminarComplemento(uid: string) {
		console.log('eliminarComplemento()');
		let pos = this.carrito.complementos.indexOf(uid);
		this.carrito.complementos = this.carrito.complementos.filter(c => c !== uid);
		this.carrito.preciosComplementos = this.carrito.preciosComplementos.splice(pos, 1);
		console.log('complementos: ', this.carrito.complementos);	
	}

	public static agregarUsuario(uidUsuario) {
		this.carrito.cliente = uidUsuario;
	}

	public static agregarRepartidor(uidRepartidor) {
		this.carrito.repartidor = uidRepartidor;
	}

	public static agregarRestaurante(uidRestaurante) {
		this.carrito.restaurante = uidRestaurante;
	}

	public static agregarDireccion(uidDireccion) {
		this.carrito.direccion = uidDireccion;
	}

	public static agregarFechaHora(fechaHora: string) {
		this.carrito.fechaHora = fechaHora;
	}

	public static agregarUidPedido(uidPedido: string) {
		// this.carrito.uidPedido = uidPedido;
		this.uidUltimoPedido = uidPedido;
	}

	public static getUltimoPedidoUid(): string {
		return this.uidUltimoPedido;
	}

	public static getUidPedido(): string {
		return this.carrito.uid;
	}

	public static isCarritoEmpty(): boolean {
		return this.carrito.productos.length == 0;
	}

}
