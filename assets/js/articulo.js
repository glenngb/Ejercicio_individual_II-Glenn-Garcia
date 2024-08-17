export class Articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    get getNombre() {
        return this.nombre;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }

    get getPrecio() {
        return this.precio;
    }

    set setPrecio(precio) {
        this.precio = precio;
    }
}
