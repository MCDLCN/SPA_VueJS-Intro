# Comment faire en JavaScript vanilla ?

Il aurait fallu :

## a) Stocker les données soi-même

let title = "My title";
let inputData = "";
let isRed = false;
let showImage = false;

## b) Manipuler le DOM directement

Exemple pour le titre :

document.querySelector("h1").textContent = title;

## c) Gérer les événements manuellement

Input :

document.querySelector("input").addEventListener("input", (e) => {
  inputData = e.target.value;
});

Bouton :

document.querySelector("button").addEventListener("click", () => {
  title = inputData;
  document.querySelector("h1").textContent = title;
});

## d) Gérer les checkbox

document.querySelector("#redCheckbox").addEventListener("change", (e) => {
  isRed = e.target.checked;
  document.querySelector("h1").classList.toggle("red", isRed);
});

## e) Affichage conditionnel

document.querySelector("#imageCheckbox").addEventListener("change", (e) => {
  showImage = e.target.checked;

  document.querySelector("img").style.display =
    showImage ? "block" : "none";
});


On remarque vite que :

beaucoup de querySelector
beaucoup de manipulation DOM répétitive
logique et affichage mélangés
risque d’incohérences si plusieurs états changent

# Avec Vue.js, tout ça est simplifié grâce à :

## Réactivité automatique

Quand une variable change → l’UI se met à jour seule.

## Déclaration au lieu de manipulation

On ne dit plus “modifie le DOM”, mais :

```<h1>{{ title }}</h1>```

## Liaison automatique

Plus besoin d’écouter les événements manuellement.

## Code plus lisible et structuré

données dans data()
actions dans methods
affichage dans le template

## Moins d’erreurs

Vue gère :

synchronisation UI / données
mise à jour du DOM
état de l’application