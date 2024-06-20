function getString(wwo_languageCode){
    let wwo_translationChains = {};
    switch(wwo_languageCode){
        case 'es':
            wwo_translationChains = {
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
            wwo_translationChains = {
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
            wwo_translationChains = {
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
    return wwo_translationChains;
}
module.exports = { getString };