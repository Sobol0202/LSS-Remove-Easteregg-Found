// ==UserScript==
// @name         LSS Remove Easteregg Found
// @namespace    www.leitstellenspiel.de
// @version      1.0
// @description  Entfernt die Gefundenmeldung, wenn das Easteregg geklickt wurde.
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Entfernen des Alert-Elements
    function removeAlertElement() {
        var elements = document.querySelectorAll('.alert.fade.in.alert-success');
        elements.forEach(function(element) {
            element.remove();
        });
    }

    // Funktion zum Überwachen von DOM-Änderungen
    function observeDOM() {
        var targetNode = document.body;

        // Konfiguration des Observers mit einer Callback-Funktion
        var config = { childList: true, subtree: true };

        // Callback-Funktion wird ausgeführt, wenn Änderungen im DOM festgestellt werden
        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // Überprüfe, ob das Alert-Element hinzugefügt wurde
                    var alertElement = document.querySelector('.alert.fade.in.alert-success');
                    if (alertElement) {
                        // Wenn das Alert-Element gefunden wurde, entferne es
                        removeAlertElement();
                    }
                }
            }
        };

        // Erstelle einen Observer mit der angegebenen Konfiguration und Callback-Funktion
        var observer = new MutationObserver(callback);

        // Starte die Überwachung des Zielknotens für Änderungen
        observer.observe(targetNode, config);
    }

    // Führe das Skript direkt nach dem Laden der Seite aus
    observeDOM();
})();
