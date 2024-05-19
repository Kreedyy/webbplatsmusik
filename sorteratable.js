
$(document).ready(function(){
    // Initialisera tablesorter på alla tabeller
    $("table").each(function() {
        $(this).tablesorter({
            // Anpassad parser för kolumnen "Lyssnare (Spotify)"
            headers: {
                2: { sorter: 'digit' } // Specificera den anpassade parsern för den 3:e kolumnen (0-baserat index)
            },
            // Anpassad parserfunktion för numeriska värden med mellanslag
            textExtraction: function(node) {
                return $(node).text().replace(/\s+/g, ''); // Ta bort mellanslag från textinnehållet
            },
            parsers: {
                'digit': {
                    id: 'digit', // Unik parser ID
                    is: function(s) {
                        return false; // Returnera false för att inaktivera standardparsern
                    },
                    format: function(s, table, cell, cellIndex) {
                        // Extrahera numeriskt värde och konvertera det till ett nummer
                        return parseFloat(s.replace(/\s+/g, '')); 
                    },
                    type: 'numeric' // Ange datatypen
                }
            }
        });
        
        // Sortera tabellen efter den första kolumnen (Plats) i stigande ordning
        $(this).trigger("update");
        $(this).trigger("sorton", [[[0,0]]]);
    });
});

