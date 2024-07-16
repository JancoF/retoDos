import { mensajes } from './mensajes.js';

export function validarCampo(campo) {
    const tipoDeError = campo.validity;
    
    if (tipoDeError.valid) {
        campo.parentElement.querySelector('[data-error]').textContent = '';
        campo.parentElement.classList.remove('formulario__campo--invalido');
        return true;
    } else {
        campo.parentElement.classList.add('formulario__campo--invalido');
        mostrarMensajeDeError(campo, tipoDeError);
        return false;
    }
}

function mostrarMensajeDeError(campo, tipoDeError) {
    let mensaje = '';
    const errores = Object.keys(tipoDeError);
    
    for (let error of errores) {
        if (tipoDeError[error] && mensajes[campo.name] && mensajes[campo.name][error]) {
            mensaje = mensajes[campo.name][error];
            break;
        }
    }
    
    if (!mensaje) {
        mensaje = `Por favor, complete el campo ${campo.name}`;
    }
    
    campo.parentElement.querySelector('[data-error]').textContent = mensaje;
}