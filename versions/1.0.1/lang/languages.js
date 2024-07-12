function getString(wwo_languageCode){
    let wwo_translationChains = {};
    switch(wwo_languageCode){
        case 'es':
            wwo_translationChains = {
                'translation_example': 'Ejemplo de traducción',
                'code_lang': 'es-es',
                'dows' : ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
                'dows-short' : ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'],
                'months' : ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                'monts-short' : ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                'from' : 'desde',
                'to' : 'hasta',
            }
            break;  
        case 'en':
            wwo_translationChains = {
                'translation_example': 'Translation example',
                'code_lang': 'en-gb',
                'dows' : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                'dows-short' : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                'months' : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                'monts-short' : ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                'from' : 'from',
                'to' : 'to',
            }
            break;
        case 'fr':
            wwo_translationChains = {
                'translation_example': 'Example de traduction',
                'code_lang': 'fr-fr',
                'dows' : ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
                'dows-short' : ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'],
                'months' : ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                'monts-short' : ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
                'from' : 'du',
                'to' : 'au',
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };