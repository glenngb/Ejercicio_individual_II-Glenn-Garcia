import { Proveedor } from './Proveedor.js';
import { Articulo } from './Articulo.js';

let proveedores = [];
let currentProveedorIndex = -1;

// Función para agregar datos al DataTable
const agregarFilaTabla = (proveedor, articulo) => {
    const porcentajeImpuesto = 19; // Porcentaje de impuesto 19
    const precio = parseFloat(articulo.getPrecio); // Convertir a número
    const impuesto = precio * porcentajeImpuesto / 100;

    const table = $('#dataTable').DataTable();
    table.row.add([
        proveedor.getNombre,
        proveedor.getEmail,
        proveedor.getTelefono,
        articulo.getNombre,
        `$${precio.toFixed(0)}`,
        `$${impuesto.toFixed(0)}`,  // Muestra el impuesto calculado
        `<i class="fas fa-edit btn-edit text-warning" style="cursor: pointer;"></i>
         <i class="fas fa-trash-alt btn-delete text-danger" style="cursor: pointer; margin-left: 10px;"></i>`
    ]).draw(false);
};


// Función para editar datos en el DataTable
const editarFilaTabla = (row, proveedor, articulo) => {
    const porcentajeImpuesto = 19; // Porcentaje de impuesto
    const precio = parseFloat(articulo.getPrecio); // Convertir a número
    const impuesto = precio * porcentajeImpuesto / 100;

    const table = $('#dataTable').DataTable();
    table.row(row).data([
        proveedor.getNombre,
        proveedor.getEmail,
        proveedor.getTelefono,
        articulo.getNombre,
        `$${precio.toFixed(0)}`,  // Muestra el precio formateado
        `$${impuesto.toFixed(0)}`,  // Muestra el impuesto calculado
        `<i class="fas fa-edit btn-edit text-warning" style="cursor: pointer;"></i>
         <i class="fas fa-trash-alt btn-delete text-danger" style="cursor: pointer; margin-left: 10px;"></i>`
    ]).draw(false);
};



// Función para eliminar una fila de la tabla
const eliminarFilaTabla = (row) => {
    const table = $('#dataTable').DataTable();
    table.row(row).remove().draw(false);

};

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreProveedor = document.getElementById('nombreProveedor').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const nombreArticulo = document.getElementById('nombreArticulo').value;
    const precioArticulo = document.getElementById('precioArticulo').value;

    const articulo = new Articulo(nombreArticulo, precioArticulo);

    if (currentProveedorIndex === -1) {
        const proveedor = new Proveedor(nombreProveedor, email, telefono);
        proveedor.agregarArticulo(articulo);
        proveedores.push(proveedor);
        agregarFilaTabla(proveedor, articulo);
    } else {
        const proveedor = proveedores[currentProveedorIndex];
        proveedor.setNombre = nombreProveedor;
        proveedor.setEmail = email;
        proveedor.setTelefono = telefono;
        proveedor.eliminarArticulo(nombreArticulo);
        proveedor.agregarArticulo(articulo);
        const row = $('#dataTable').DataTable().row(currentProveedorIndex).node();
        editarFilaTabla(row, proveedor, articulo);
        currentProveedorIndex = -1;
    }

    document.getElementById('formulario').reset();
});

// Eventos para botones de edición y eliminación
$('#dataTable tbody').on('click', '.btn-edit', function () {
    const row = $(this).closest('tr');
    currentProveedorIndex = $('#dataTable').DataTable().row(row).index();
    const proveedor = proveedores[currentProveedorIndex];
    
    document.getElementById('nombreProveedor').value = proveedor.getNombre;
    document.getElementById('email').value = proveedor.getEmail;
    document.getElementById('telefono').value = proveedor.getTelefono;

    const articulo = proveedor.getArticulos[0];  // Asumiendo un artículo por fila
    document.getElementById('nombreArticulo').value = articulo.getNombre;
    document.getElementById('precioArticulo').value = articulo.getPrecio;
});

$('#dataTable tbody').on('click', '.btn-delete', function () {
    const row = $(this).closest('tr');
    const index = $('#dataTable').DataTable().row(row).index();
    proveedores.splice(index, 1);
    eliminarFilaTabla(row);
});

$(document).ready(() => {
    $('#dataTable').DataTable();
});
