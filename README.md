# Module JS / SPA - Vue.js

---
#### Info formateurs / formatrices : la branche "main" de ce dépôt est désormais basée sur la version 3 de Vue.js. Le support utilisant la version 2 a été archivé dans la branche v2.
---

## Préambule
En préambule de ce module, familiarisez-vous avec le concept de Single Page Application (SPA). L'objectif est de répondre aux questions suivantes :
* Quand et pourquoi ce type d'applications a vu le jour ?
* Quels sont les avantages et inconvénients de cette approche ?
* Quels sont les principaux frameworks utilisés pour développer des "SPA" de nos jours ? 

**Livrables**
1. Un schéma simplifié illustrant le fonctionnement d'une SPA
2. Un tableau comparatif des principaux frameworks, comportant les informations suivantes :
    * Date de création
    * Communauté / entreprise assurant le développement
    * License
    * Points forts
    * Points faibles


## Mise en place des outils de développement Vue.js
Tout comme de nombreux frameworks web, Vue.js propose des outils permettant de faciliter le développement. 
Nous allons ici découvrir ces outils dans votre environnement de développement.

### Extension de navigateur web - _Vue DevTools_ pour debugger
Installez l'extension Vue DevTools pour votre navigateur web en suivant les instructions : https://github.com/vuejs/vue-devtools

### Outil de build - _Vite_ pour générer le livrable 
Vite est l'outil préconisé par Vue.js pour générer les livrables de votre application Vue.js, à la fois dans votre environnement de développement puis pour le déploiement en production.
Vite sera installé en même temps que Vue.js dans les prochains exercices, cependant, son usage n'est pas limité à Vue.js.
Prenez un moment pour vous familiariser avec cet outil grâce aux ressources qui suivent (notamment la vidéo qui est très complète).

**Livrables :**
- Un projet Vite sur votre machine contenant:
  - Un import d'une fonction javascript provenant d'un nouveau fichier
  - Du style CSS utilisant le préprocesseur SASS
  - Un dossier `dist` contenant vos fichiers minifiés et prêts pour la production (après avoir lancé la commande de build)

**Ressources :**
- Documentation officielle : https://vitejs.dev/guide/
- Article d'introduction Vite et Vue.js : https://blog.ninja-squad.com/2022/02/23/debuter-avec-vite-et-vue/  
- Vidéo : https://grafikart.fr/tutoriels/javascript-vite-1351

## Découverte de Vue.js

#### IMPORTANT - À LIRE AVANT DE COMMENCER ####

* __Dans tout le module, la version de Vue.js à utiliser sera la version 3. Lorsque vous consultez un support en ligne, assurez-vous que la version utilisée est la bonne car les ressources utilisant Vue.js version 2 sont encore nombreuses.__
* __Vue 3 propose 2 syntaxes : l'API "Options" et l'API "Composition". Nous utiliserons dans ce module l'API "Options", c'est donc celle-ci qu'il faudra choisir à chaque fois que le choix se présentera à vous.__ 

### Objectifs
* Prendre en main les outils de développement de Vue.js
* Découvrir Vue.js avec des fonctionnalités simples
* Stocker la donnée de sa page dans l'objet data de Vue

### Consignes

A l'aide du [playground officiel de VueJs](https://play.vuejs.org/#eNp9UcFqAyEQ/RWZUwthl5JbWAJtyaE9tKXN0Yu4k42pq6JjuhDy71U3m+QQIqLje2+GN+MBnp2r9hFhAQ1h77QgXHLDWLN9Wq4VeWzqFHHT1Fd0egbplaMS4+CsJ9biRkRN7JDTW0Hi4bGEjHmk6M1I5DXex3ylI+2mPpWDGVCQ1mxUV+2CNclWyeIgbe+URv/pSFkTOCymehyE1vbvvWDkI84mXG5R/t7Ad2HIGIcvjwH9HjmcORK+Qxrp1c8HDik+k71to07qO+Q3Bqtj9jjKXqJpk+0rXXH71ueZKdOtw2ogNGFqKhstgyl6DulvXu+0frE7r+bTQOH4DyiRmfk=) :
* Rendez votre application réactive : affichez dans le titre du texte qui sera renseigné en Javascript, dans l'objet data de Vue.
* Modifiez la valeur de votre data dans l'extension Vue DevTools.
* Un champ input permettant de mettre à jour le contenu d’une balise H1
* Un champ input permettant de mettre à jour le contenu d’une balise H1 au clic sur un bouton. Attention, pas seulement quand l'input perd le focus ! 
* Une checkbox permettant d’ajouter la classe "red" aux H1 et H2 quand elle est cochée
* Une checkbox pour afficher / masquer une image

Question complémentaire : prenez le temps de comparer ce premier usage de Vue.js à vos réalisations précédentes avec Javascript. Comment aurait-on pu procéder pour réaliser les mêmes fonctionnalités avec du Javascript "vanilla" ? Quel est l'intérêt de Vue.js par rapport à du vanilla ?  

*Vue.js est aussi utilisable comme une librairie externe, en le chargeant simplement dans notre page [comme montré sur ce jsfiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/).*

### Ressources
* Les exemples interactifs proposés sur le site officiel Vue.js (__comme indiqué plus haut, on utilisera l'API "Options" ainsi que le rendu "HTML" ici__) : https://vuejs.org/examples/#hello-world
* Ressource complète sur le framework : https://worldline.github.io/vuejs-training/fr/
* https://codepen.io/romainpetit/pen/jJyaKx
* https://codepen.io/romainpetit/pen/XGpzyw
* https://codepen.io/romainpetit/pen/MxJmOm

## Un premier projet Vue.js
Vous allez maintenant créer un projet Vue.js basé sur un cas d'usage plus réaliste. Vous allez concevoir et développer 
une application web qui affiche les relevés météo de villes au format liste et sur une carte interactive.

Ce projet est à mener en autonomie, des points collectifs seront organisés par les formateurs afin de revoir les notions importantes abordées au cours du module.

### Création du projet
Pour ce projet, vous allez démarrer avec un environnement complet Vue.js intégrant notamment l'outil Vite vu en introduction.
Commencez par créer le projet via la commande :

`npm init vue@latest`

Au cours de la création du projet, plusieurs questions vont vous être posées.
Dans le cadre du module, nous n'utiliserons __pas__ JSX ni Typescript. Veillez donc bien à désactiver ces options.
Pour les autres options, vous pouvez utiliser les valeurs proposées par défaut.

Une fois le projet créé, prenez le temps de passer en revue les fichiers et dossiers créés dans votre répertoire projet. Quels sont ceux que vous connaissez ? Quelle est leur fonction ?

À partir des instructions fournies dans le fichier README.md, démarrez votre application Vue.js pour le développement.


### 2) Écran d'accueil.

Dans un premier temps, nous voulons changer l'écran d'accueil : ce dernier va comporter un lien qui permettra d'accéder à la liste des données météo des villes.

- Faites les modifications nécessaires sur la page d'accueil qui a été générée automatiquement en enlevant les contenus ajoutés par défaut

- Ajoutez dans votre composant App la méthode `onListClick` qui se contentera pour l'instant de faire une [alerte](https://developer.mozilla.org/fr/docs/Web/API/Window/alert) pour marquer le fait qu'un utilisateur a cliqué dessus.

### 3) Préparation des écrans.

Nous voulons préparer l'écran de la liste des villes. En Vue.js chaque écran est un composant : pour cet écran, il nous faudra donc 1 nouveau composant.

- Créez donc un fichier `CitiesList.vue` dans le dossier `views` de votre projet. Le template de ce composant sera très simple dans un premier temps, par exemple un simple titre H1 contenant 'Météo - Liste des villes' est suffisant.

- Faites en sorte d'ajouter ce composant Vue.js au template de votre app afin de l'afficher.

Vous avez peut-être remarqué que votre projet comporte à la fois un dossier `views` et un dossier `components`. Quelle est la différence entre ces 2 emplacements ? 

➡️ **Commiter dans git avec un message explicite, par exemple "fin étape 3" ou même "Ajout composant CitiesList"**

### 4) Mise en place d'un routeur.

Le problème est que nous ne voulons pas avoir une seule page sur notre application.
Nous devons avoir la possibilité de naviguer d'une page à l'autre, sans recharger la page ou sans afficher une nouvelle page HTML : pour cela, nous avons besoin de mettre en place **un routeur**.

C'est la même chose qu'avec le framework Laravel, sauf qu'ici le routeur est côté client : nous devons définir nos routes côté client et avoir moyen d'en changer.

Cela tombe bien, Vue.js a un routeur tout prêt que nous allons utiliser, [vue-router](https://router.vuejs.org/). Si vous avez sélectionné les options par défaut
lors de la création de votre projet, vue-router a déjà dû être installé. Si ça n'est pas le cas, installez-le via la commande décrite ci-dessous.

##### 4.1) Installation.

Si nécessaire, faites l'installation de vue-router avec npm comme décrite dans la documentation.
N'oubliez pas d'indiquer à votre application qu'elle doit utiliser le routeur :

```
...
const router = createRouter(...);

const app = createApp(App);
app.use(router);
app.mount('#app')
```

##### 4.2) Configuration.

Nous voulons déclarer une route `/villes` avec la liste des villes.

- Déclarez ou mettez à jour votre tableau de routes dans le fichier `index.js` du répertoire `router` en faisant référence au composant créé auparavant.

- Assurez-vous que le router utilisé par votre app est bien initialisé avec le tableau de routes :

```
const router = createRouter({
  ...
  routes: [ // vos routes doivent figurer ici ]
  ...
})
```

- Supprimez maintenant le composant `CitiesList` du template de notre composant `App.vue`.

Vous devriez retomber sur un écran correspondant à l'étape 1 plus haut.

Nous avons initialisé notre composant mais nous ne l'avons pas utilisé.

##### 4.3) Utilisation.

Pour l'utiliser nous devons utiliser les deux composants fournis par VueRouter :

- `<router-view></router-view>` affiche le contenu de la route correspondant au composant spécifié dans la déclaration.
- `<router-link to="" ></router-link>` permet de passer d'une page à l'autre.

Ajoutez donc `<router-view></router-view>` à la fin du template de notre composant `App.vue` et utilisez `<router-link to="/CHEMIN_ROUTE" ></router-link>` pour passer d'une page à l'autre dans le même composant.

### 5) Création d'un composant pour représenter la météo d'une ville.

A ce stade, la liste de villes est vide, il n'y a donc pas de navigation possible à partir de la liste. Nous allons cependant créer la vue détaillée de la météo d'une ville, qui pourra être rendue accessible soit via un bouton `<router-link to="..." ></router-link>` (temporaire) ou en saisissant l'URL directement comme indiqué en fin de section.

##### 5.1) Composant statique dans une nouvelle route.

Créez dans un premier temps une nouvelle route `'/ville'` qui va représenter un nouveau composant à créer, `City.vue`. Veillez cette fois à créer ce composant dans le dossier `components` de votre projet. 

Ce composant aura comme `data` l'objet javascript suivant :

```
{
    name: 'Ma ville', // nom de la ville
    weather: 'Peu nuageux', // descriptif météo 
    temperature: 20.55, // température en °C
    updatedAt: new Date() // date de dernière mise à jour
}
```

Vous être libre de choisir le rendu du composant, à partir du moment où il exploite les différents champs de l'objet `data` ci-dessus. 

Notes :

- Pour afficher la date, la méthode [toLocaleString()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/toLocaleString) de `Date()` devrait vous aider.
- On a déclaré une route mais pas donné de lien explicite dans l'application pour y accéder, mais vous pouvez directement [changer l'url du navigateur](http://localhost:XXXX/ville).

➡️ **Faites un commit avec un message explicite**

##### 5.2) Passage de props au composant City.

Nous avançons bien ! Notre dernier composant va nous aider à construire l'écran comprenant la liste de nos villes. Mais aujourd'hui il a une limite : on ne peut pas définir le nom ni le statut de notre ville sans toucher au code, il faut trouver un moyen de paramétrer notre composant. Pour cela nous allons utiliser la notion de props dans Vue.js.

Pensez aux props comme aux arguments d'une fonction :
Pour rendre paramétrable une fonction il faut lui ajouter des arguments. Pour rendre paramétrable un composant, il faut ajouter des props.

- Dans un premier temps, appelez le composant `City` dans le composant `CitiesList`. Il vous faudra pour cela déclarer l'utilisation de `City` dans le composant `CitiesList` via la clé `components`. Vous devriez donc avoir la même page aux urls `/villes` et `/ville`.

- Ajoutez le fait que le composant `City` a 4 props qui s'appellent `name`, `weather`, `temperature`, et `updatedAt`, supprimez les clés correspondantes du `data` du composant `City` qui ne seront plus utiles désormais

* Modifiez le composant `CitiesList` pour passer les props `name`, `weather`, `temperature`, et `updatedAt` afin d'afficher les mêmes informations que précédemment

À ce stade, vous devriez avoir la même chose qu'avant en terme de rendu, néanmoins nous sommes prêts à faire notre liste de villes car nous avons un composant `City` qui est désormais paramétrable grâce aux props !

➡️ **Faites un commit avec un message explicite**

### 6) Création d'une liste.

➡️ Modifiez le composant `CitiesList` pour que son objet `data` contienne l'objet suivant :

```js
{
  cities: [
    {
      id: 1,
      name: 'Ville 1',
      weather: 'Ensoleillé',
      temperature: 22.0,
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Ville 2',
      weather: 'Peu nuageux',
      temperature: 19.5,
      updatedAt: new Date()
    }
  ]
}
```

➡️ Bouclez maintenant sur cette donnée pour appeler autant de fois le composant `City` qu'il y a d'objets dans ce nouveau `data` de `CitiesList`.

**Question :** Remarquez que nous avons ajouté une clef `id` à nos objets, pourquoi ?

**Votre réponse :**

➡️ Modifiez un peu le style pour que les éléments de la liste soient mieux visibles.

➡️ **Faites un commit avec un message explicite**

##### 6.1) Mise en forme des dates
Un timestamp complet n'est pas agréable à lire, encore moins répété dans une liste.
La librairie `timeago.js` nous permet de formatter les dates pour afficher un temps relatif, plus parlant.

➡️ Ajoutez la libraire à votre projet avec npm pour afficher la valeur de `updatedAt` avec un temps relatif.

https://github.com/hustcc/timeago.js

> Il est toujours fondamental de savoir évaluer avant de se lancer un package ou un projet sur github ou même npm.

**Question :** Prenez le temps de regarder la page, qu'est ce qui vous inspire confiance, ou au contraire, méfiance ?

**Votre réponse :**

**Bonus :** Quelle alternative à `timeago.js` pourrait-on utiliser dans le projet pour afficher le temps relatif ? 

➡️ **Faites un commit avec un message explicite**

### 7) Récupérer les données via une API externe.

☝️**Préambule - Point d'étape sur l'architecture de l'application**

Avant de passer à l'étape suivante, nous allons passer en revue l'architecture de notre application Vue.js.
Pour cela, constituez un tableau à 2 colonnes, la première colonne représentant le serveur web et la 2ème le navigateur web. Par exemple :

Serveur web | Navigateur web
--- | ---
abc | def
ghi | ...


Répartissez ensuite les étapes ci-dessous dans les 2 colonnes, selon qu’elles sont traitées selon vous par le serveur ou le navigateur :
- Stocker les données de l’application
- Router les requêtes HTTP
- Effectuer le rendu des pages web
- Afficher les pages web
- Exécuter le code métier de l’application

Effectuez l’exercice pour une application Laravel, puis pour une application Vue.js.

➡️ Constatez les différences : comment pourrait-on sécuriser l’accès aux données de l’application dans ce 2ème cas ?

**Votre réponse :**


Fin du préambule
* * *

Jusqu'ici, les données météo étaient codées "en dur" dans les composants Vue.js. Vous allez désormais faire appel à une API pour récupérer de véritables relevés météo dans les villes de la région. 

Pour cela, nous allons utiliser l'API [OpenWeatherMap](https://openweathermap.org/api). Cette dernière vous permettra de récupérer des données météo en ciblant un périmètre géographique.   

Pour effectuer un test d'appel à l'API, récupèrez un code d'accès auprès du formateur ou de la formatrice (ou créez un compte gratuit OpenWeatherMap), puis accédez à l'URL suivante :
https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=VOTRE_CODE_DACCES 

Quel est le format de retour de l'API ? Quels sont les champs qui vont vous permettre de récupérer les données météo recherchées ? 

##### 7.1) Faire des appels HTTP vers une API depuis l'application

Pour pouvoir faire des appels à une API, le Javascript met à disposition l'API [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

- Prenez connaissance de l'API fetch 
- Familiarisez-vous avec son utilisation via le [tutoriel MDN](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)  

Au passage, (re)lisez le guide MDN sur les promesses en Javascript, car ces dernières vont être importantes pour la suite. [Guide MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses).
Nous allons afficher la liste des données météo des villes provenant de cette [URL](https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=VOTRE_CODE_DACCES). Attention, veillez à bien indiquer votre code d'accès OpenWeatherMap dans l'URL fournie.

Comme vous avez pu le voir, une promesse a plusieurs états :

- En cours.
- Terminée et succès.
- Terminée et erreur.

Nous devons suivre ces états dans notre composant, ajoutez donc à l'objet `data` deux clefs `loading` et `error` permettant de savoir si la requête est en cours et si il y a eu une erreur.

Aussi, retirez les données des villes que nous avions mis tout à l'heure "en dur" dans l'objet data.

Votre `data` devrait désormais ressembler à ça :

```js
data: function() {
    return {
      cities: [], // au début la liste des villes est vide
      loading: false,
      error: null,
    }
}
```

Avant d'aller plus loin, il faut choisir quand lancer la requête. La solution communément admise est de dire : "Quand le composant est créé, lance la requête".

Vue.js nous permet de déclencher des actions (ou _hooks_) à certains moments précis de la vie d'un composant. La liste est disponible [ici](https://vuejs.org/guide/essentials/lifecycle.html). Celui qui nous intéresse est le `created`.

- Ajoutez donc l'appel http permettant d'afficher la liste des données météo des villes.

- Faites en sorte d'afficher un texte `requête en cours` si jamais la requête est en cours et une erreur en rouge si jamais la requête produit une erreur.

➡️ **Faites un commit avec un message explicite**

### 8) Affichage sur une carte interactive

Maintenant, essayons de visualiser les différentes données météo des villes sur une carte, chacune avec un marqueur.

##### 8.1) Ajout d'un composant dédié

Ajoutez tout d'abord un nouveau composant `CitiesMap` à votre projet. Associez-lui une route dans la configuration du router (`/carte` par exemple).

##### 8.2) Fond de carte

Pour générer une carte interactive, nous allons utiliser la librairie Leaflet couplée à un fond de carte. Pour intégrer cette carte au sein de votre application, il vous faudra :
- Installer le package [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) en suivant les instructions fournies
- Importer les composants et la feuille de style CSS Leaflet au sein de votre application, comme indiqué dans le dépôt de `vue-leaflet`
- (optionnel) Choisir [un fond de carte public compatible avec Leaflet](https://leaflet-extras.github.io/leaflet-providers/preview/) selon vos préférences
 
➡️ Affichez une carte dans votre composant `CitiesMap`.  

Prenez le temps de jouer sur les paramètres du composant `l-map` pour les comprendre et ajuster votre carte au besoin.

➡️ **Faites un commit avec un message explicite**

##### 8.3) Ajouter les marqueurs

Vous allez à présent ajouter un marqueur sur la carte pour chacune des villes récupérées via l'API.
Pour cela :
- Récupérez la liste des données météo dans un tableau `cities` de votre composant `CitiesMap` (comme vous l'avez fait pour `CitiesList`) 
- En bouclant sur la liste de résultats, affichez des marqueurs en exploitant les coordonnées GPS fournies pour chaque ville dans l'API OpenWeatherMap

➡️ Pour afficher un marqueur sur la carte, vous pourrez utiliser le composant `l-marker` :
```html
<l-marker :lat-lng="[45.45, 3.5]"></l-marker>
```
 
Le code CSS du marqueur pourra être ajouté dans le style de votre composant `CitiesMap`. Pour le moment, utilisez un rendu commun à tous les marqueurs, sous la forme :
```css
#map :deep(.leaflet-marker-icon) {
  /* vos styles ici */
}
```

➡️ Que signifie le sélecteur `deep` ci-dessus ? Pourquoi est-il nécessaire dans le cas présent ? 

##### 8.4) Afficher les données météo

Maintenant que chaque ville est représentée par un marqueur sur la carte, vous allez pouvoir remplacer ces marqueurs par un pictogramme représentant la météo directement sur la carte.

A l'aide de code CSS et des informations récupérées dans l'API, affichez pour chaque ville un marqueur qui représentera la météo de la ville (soleil, nuages, pluie...); 

➡️ **Faites un commit avec un message explicite**


