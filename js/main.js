import { validarCampo } from './validaciones.js';
import { mensajes } from './mensajes.js';

const formulario = document.querySelector('[data-formulario]');
const listaProductos = document.querySelector('[data-lista-productos]');

const camposRequeridos = document.querySelectorAll('[required]');

camposRequeridos.forEach((campo) => {
    campo.addEventListener('blur', (evento) => validarCampo(evento.target));
    campo.addEventListener('invalid', evento => evento.preventDefault());
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    let formularioValido = true;
    camposRequeridos.forEach(campo => {
        if (!validarCampo(campo)) {
            formularioValido = false;
        }
    });

    if (formularioValido) {
        const nuevoProducto = {
            nombre: formulario.nombre.value,
            precio: formulario.precio.value,
            imagen: formulario.imagen.value
        };
        
        agregarProducto(nuevoProducto);
        guardarProductos();
        formulario.reset();
    }
});



function agregarProducto(producto) {
    const elementoProducto = crearElementoProducto(producto);
    listaProductos.appendChild(elementoProducto);
}

function crearElementoProducto(producto) {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    
    divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto__imagen">
        <h3 class="producto__nombre">${producto.nombre}</h3>
        <p class="producto__precio">$${producto.precio}</p>
        <button class="producto__boton-eliminar">🗑️</button>
    `;
    
    divProducto.querySelector('.producto__boton-eliminar').addEventListener('click', () => {
        divProducto.remove();
        guardarProductos();
    });
    
    return divProducto;
}

function guardarProductos() {
    const productos = Array.from(listaProductos.children).map(elemento => ({
        nombre: elemento.querySelector('.producto__nombre').textContent,
        precio: elemento.querySelector('.producto__precio').textContent.slice(1),
        imagen: elemento.querySelector('.producto__imagen').src
    }));
    
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.forEach(agregarProducto);
}

cargarProductos();