import { Articulo } from './Articulo.js';

export class Proveedor {
    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.articulos = [];
    }

    agregarArticulo(articulo) {
        this.articulos.push(articulo);
    }

    eliminarArticulo(nombreArticulo) {
        this.articulos = this.articulos.filter(articulo => articulo.nombre !== nombreArticulo);
    }

    getInfoProveedor() {
        return `Proveedor: ${this.nombre}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }

    // Método para calcular el impuesto total
    calcularImpuestoTotal(porcentajeImpuesto) {
        return this.articulos.reduce((total, articulo) => {
            return total + (articulo.getPrecio * porcentajeImpuesto / 100);
        }, 0);
    }

    get getNombre() {
        return this.nombre;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }

    get getEmail() {
        return this.email;
    }

    set setEmail(email) {
        this.email = email;
    }

    get getTelefono() {
        return this.telefono;
    }

    set setTelefono(telefono) {
        this.telefono = telefono;
    }

    get getArticulos() {
        return this.articulos;
    }
}
