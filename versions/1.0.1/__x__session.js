const querys = require('./querys.js');
const config = require('./config.js');
const cookies = require('./cookies.js');


const getSession = function(){
            
    let query = querys.GET_SESSION;
    let variables = { username: config.username };
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            query ,
            variables
        }) // Convertir la consulta a formato JSON
    };
    
    // Realizar la solicitud HTTP
    fetch(config.urlGql, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP a getSession');
        }
        return response.json();
    })
    .then(data => {
        // Manejar los datos recibidos
        session = data.data.getSession.name;
        cookies.setCookie('session', data.data.getSession.name)
        console.log('Datos recibidos getSession:', data);
    })
    .catch(error => {
        console.error('Error getSession:', error);
    });
    
}    


const esperarSessionDefinida = function(session) {
    return new Promise(resolve => {
        if (typeof session !== 'undefined') {
            resolve(session);
        } else {
            const intervalo = setInterval(() => {
                if (typeof session !== 'undefined') {
                    clearInterval(intervalo);
                    resolve(session);
                }
            }, 100); // Verificar cada 100 milisegundos
        }
    });
}


module.exports = {getSession, esperarSessionDefinida};