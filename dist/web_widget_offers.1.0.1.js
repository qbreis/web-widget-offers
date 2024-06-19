(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.web_widget_offers = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
var css = "body{font-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif}#ww-main-container{max-width:1024px;margin:0 auto}#ww-main-container div,#ww-main-container label,#ww-main-container span{font-size:1rem}#ww-main-container p{margin:0!important;line-height:1.4rem;font-size:1.1rem}#ww-main-container{padding:2em;background-color:#f3f3f3}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
'use strict';

// Importing CSS
const css = require('./css/style.css');

// Importing language strings
const ww_languagesStrings = require(`./lang/languages.js`);

// Main widget initialization function
function initWidget(options){
    console.log('Initializing widget with options:', options);

    // Fetch the corresponding language strings
    const WW_STRINGS = ww_languagesStrings.getString(
        // Default to 'es' if no language is specified
        (options.language) ? options.language : 'es'
    );

    // Handle missing translations
    if (!WW_STRINGS) {
        console.error(`No language strings found for language code: ${languageCode}`);
        return;
    }

    console.log('Language strings:', WW_STRINGS);








/*
    fetch(options.endpointUrl)
    .then(response => {
        // check if the response is ok
        if (!response.ok) {
            throw new Error('error fetching the data');
        }
        // parse the response
        return response.json();
    })
    .then(data => {
        console.log('data:', data);
    });
*/




//const helpers = require('./session.js');
//console.log('helpers.getSession():', helpers.getSession());







/*
INLINE WORKING JS SNIPPET TO UNDERSTAND THE FETCH API
fetch(
    'https://leskarellis.resalys.com/rsl/graphql', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            query: `
                query session($username: String! ) {
                    getSession(input: { 
                        username: $username
                    }) {
                        name
                    }
                }
            `,
            variables: { username: 'web_fr' }
        }) // Convertir la consulta a formato JSON
    }
)
.then(response => {
    if (!response.ok) {
        throw new Error('Error al realizar la solicitud HTTP a getSession');
    }
    return response.json();
})
.then(data => {
    // Manejar los datos recibidos
    console.log('Datos recibidos getSession hardcoded kinda:', data);
})
.catch(error => {
    console.error('Error getSession:', error);
});
*/























const GRAPHQL_ENDPOINT = 'https://leskarellis.resalys.com/rsl/graphql';

// Define the GraphQL query as a string
const getSessionQuery = `
    query session($username: String!) {
        getSession(input: { username: $username }) {
            name
        }
    }
`;

// Define a function to fetch session data
const fetchSessionData = async (username) => {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: getSessionQuery,
                variables: { username: username },
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP a getSession');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getSession:', error);
        throw error;
    }
};

// Function to handle the received data
const handleSessionData = (data) => {
    console.log('Datos recibidos getSession in refactored code:', data);
};

// Main function to execute the fetch and handle logic
const main = async () => {
    const username = 'web_fr'; // Define the username variable
    try {
        const data = await fetchSessionData(username);
        handleSessionData(data);
    } catch (error) {
        // Handle errors if needed
        console.error('Error en main:', error);
    }
};

// Execute the main function
main();

























    

    // Building the widget's HTML
    let html = `
        <div id="ww-main-container">
            wtd-contain-dispos-group in versions/1.0.4/index.js
            <p>${WW_STRINGS.translation_example}</p>
            <p>options.endpointUrl: ${options.endpointUrl}</p>
        </div>
    `;

    // Injecting the HTML into the specified container
    const container = document.getElementById(options.id);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error(`Element with id ${options.id} not found.`);
    }

}

module.exports = {initWidget};
},{"./css/style.css":2,"./lang/languages.js":4}],4:[function(require,module,exports){
function getString(ww_languageCode){
    let ww_translationChains = {};
    switch(ww_languageCode){
        case 'es':
            ww_translationChains = {
                'translation_example': 'Ejemplo de traducción',
                'code_lang': 'es-es',
                'days' : [
                    {'value': 1 , 'name': 'LUNES'},
                    {'value': 2 , 'name': 'MARTES'},
                    {'value': 3 , 'name': 'MIERCOLES'},
                    {'value': 4 , 'name': 'JUEVES'},
                    {'value': 5 , 'name': 'VIERNES'},
                    {'value': 6 , 'name': 'SABADO'},
                    {'value': 0 , 'name': 'DOMINGO'},
                ],
            }
            break;  
        case 'en':
            ww_translationChains = {
                'translation_example': 'Translation example',
                'code_lang': 'en-gb',
                'days': [
                    {'value': 1 , 'name': 'MONDAY'},
                    {'value': 2 , 'name': 'TUESDAY'},
                    {'value': 3 , 'name': 'WEDNESDAY'},
                    {'value': 4 , 'name': 'THUESDAY'},
                    {'value': 5 , 'name': 'FRIDAY'},
                    {'value': 6 , 'name': 'SATURDAY'},
                    {'value': 0 , 'name': 'SUNDAY'},
                ],
            }
            break;
        case 'fr':
            ww_translationChains = {
                'translation_example': 'Example de traduction',
                'code_lang': 'fr-fr',
                'days': [
                    {'value': 1 , 'name': 'LUNDI'},
                    {'value': 2 , 'name': 'MARDI'},
                    {'value': 3 , 'name': 'MERCREDI'},
                    {'value': 4 , 'name': 'JEUDI'},
                    {'value': 5 , 'name': 'VENDREDI'},
                    {'value': 6 , 'name': 'SAMEDI'},
                    {'value': 0 , 'name': 'DIMANCHE'},
                ],
        }
        break;
        
    }
    return ww_translationChains;
}
module.exports = { getString };
},{}]},{},[3])(3)
});
