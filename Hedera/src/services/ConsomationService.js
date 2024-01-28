let consommationTotale = 0;
let nombreAppareils = 0;
let appareils = [];


function calculerPrixInstallation(_kWClient, _prixPanneau, _productionPanneau) {
    let nombrePanneaux = Math.ceil((_kWClient + _productionPanneau - 1) / _productionPanneau);
    return _prixPanneau * nombrePanneaux;
}

function calculerConsommation(_nombrePersonnes, _surfaceMaison, _nombreChambres) {
    let consommationBase = (_nombrePersonnes * 1000) + (_surfaceMaison * 100);
    consommationTotale += consommationBase;
}

function ajouterAppareil(_nomAppareil, _puissance, _heuresUtilisation) {
    let consommationAppareil = _puissance * _heuresUtilisation;
    consommationTotale += consommationAppareil;

    appareils.push({ nomAppareil: _nomAppareil, puissance: _puissance, heuresUtilisation: _heuresUtilisation });
    nombreAppareils++;
}

function getConsommationParAppareil(index) {
    if (index >= nombreAppareils) {
        throw new Error("Index invalide");
    }
    return [appareils[index].nomAppareil, appareils[index].puissance * appareils[index].heuresUtilisation];
}
