function getString(wwo_languageCode){
    let wwo_translationChains = {};
    switch(wwo_languageCode){
        case 'es':
            wwo_translationChains = {
                'translation_example': 'Ejemplo de traducción',
                'code_lang': 'es-es',
                'dows' : ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
                'dows-short' : ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
                'months' : ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                'monts-short' : ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                'from' : 'desde',
                'to' : 'hasta',
                'all' : 'Todos',
                'no_offers' : 'No hay ofertas disponibles',
                'square-meters' : 'm2',
                'people-max' : 'personas máx.',
                'beds': 'camas',
                'nights': 'noches',
            }
            break;  
        case 'en':
            wwo_translationChains = {
                'translation_example': 'Translation example',
                'code_lang': 'en-gb',
                'dows' : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
                'dows-short' : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                'months' : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                'monts-short' : ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                'from' : 'from',
                'to' : 'to',
                'all' : 'All',
                'no_offers' : 'No offers available',
                'square-meters' : 'm2',
                'people-max' : 'pers max',
                'beds': 'beds',
                'nights': 'nights',
            }
            break;
        case 'fr':
            wwo_translationChains = {
                'translation_example': 'Example de traduction',
                'code_lang': 'fr-fr',
                'dows' : ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                'dows-short' : ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
                'months' : ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                'monts-short' : ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
                'from' : 'du',
                'to' : 'au',
                'all' : 'Tous',
                'no_offers' : 'Aucune offre disponible',
                'square-meters' : 'm2',
                'people-max' : 'pers max',
                'beds': 'lits',
                'nights': 'nuits',
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };