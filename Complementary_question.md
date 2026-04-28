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

# id

The id is mainly used so Vue can uniquely identify each item when rendering a list with v-for.

Example:

<City
  v-for="city in cities"
  :key="city.id"
/>

key helps Vue track which item changed, was added, or removed. Without a unique key, updates can behave oddly or less efficiently.

So id is not for display here—it is an internal unique identifier for each city. Later it can also be useful for routing (/ville/1), editing, deleting, or database storage.

# timeago

Inspires confidence:

- Popular package with many users/downloads
- Clear documentation
- Public source code on GitHub
- Simple focused purpose
- Open issues / maintenance visible

Causes caution:

- If no recent updates
- Very few contributors
- Many unresolved issues
- No tests / poor docs
- Excessive permissions or suspicious install scripts

alternative

Use native JavaScript:

Intl.RelativeTimeFormat

or packages like:

date-fns
dayjs
moment.js (older)

# Préambule - Point d'étape sur l'architecture de l'application

## Laravel application

| Web server             | Web browser       |
| ---------------------- | ----------------- |
| Store application data | Display web pages |
| Route HTTP requests    |                   |
| Render web pages       |                   |
| Execute business logic |                   |

## Vue.js application (SPA)

| Web server             | Web browser                          |
| ---------------------- | ------------------------------------ |
| Store application data | Route requests (client-side routing) |
| (API if present)       | Render web pages                     |
|                        | Display web pages                    |
|                        | Execute business logic               |


## Key difference

In Laravel, everything important (logic, data, rendering) is handled on the server.
In Vue.js, most of the logic and rendering happens in the browser.

## How to secure data in Vue.js

You should not expose data directly in the frontend. Instead:

- Use a backend API (Node, Laravel, etc.)
- Require authentication (JWT, sessions)
- Validate and authorize every request on the server
- Only return necessary data to the client

The frontend becomes just a consumer of a secured API.