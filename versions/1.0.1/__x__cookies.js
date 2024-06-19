// Función para obtener el valor de una cookie
const getCookie = function(name) {
    // Separar las cookies individuales
    const cookies = document.cookie.split(';');

    // Buscar la cookie deseada en la lista de cookies
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Verificar si la cookie actual corresponde a la cookie que estamos buscando
        if (cookie.startsWith(name + '=')) {
            // Devolver el valor de la cookie
            return cookie.substring(name.length + 1);
        }
    }

    // Si no se encuentra la cookie, devolver null
    return null;
}

const setCookie = function(name, value, daysToExpire) {
    // Calcula la fecha de expiración
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    // Formatea la cookie
    const cookie = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;

    // Establece la cookie
    document.cookie = cookie;
}

const checkCookieExistence = function(name) {
    // Obtén todas las cookies del documento
    const cookies = document.cookie.split(';');

    // Recorre todas las cookies para verificar si la cookie deseada existe
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Verifica si la cookie actual tiene el nombre que estás buscando
        if (cookie.startsWith(name + '=')) {
            // La cookie existe
            return true;
        }
    }

    // La cookie no existe
    return false;
}
// Función para eliminar una cookie
const deleteCookie = function(name) {
    // Establece la fecha de expiración de la cookie en el pasado
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

module.exports = {getCookie, setCookie, checkCookieExistence, deleteCookie};