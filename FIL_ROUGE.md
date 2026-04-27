### Création du projet
Pour créer votre projet, vous allez cette fois utiliser Vue CLI. À partir du répertoire parent souhaité pour votre projet, exécutez la commande :

`vue create NOM_PROJET`

Si des questions vous sont posées, choisissez les options par défaut (sélectionnez bien **Vue.js version 2**).

Une fois le projet créé, prenez le temps de passer en revue les fichiers et dossiers créés dans votre répertoire projet. Quels sont ceux que vous connaissez ? Quelle est leur fonction ?

À partir des instructions fournies dans le fichier README.md, démarrez votre application Vue.js pour le développement.


### 2) Écran d'accueil.

Dans un premier temps, nous voulons changer l'écran d'accueil : ce dernier contiendra un lien vers la liste des produits de votre catalogue de vente en ligne.

- Faites les modifications nécessaires sur la page d'accueil qui a été générée automatiquement

- Ajoutez dans votre composant App la méthode `onListClick` qui se contentera pour l'instant de faire une [alerte](https://developer.mozilla.org/fr/docs/Web/API/Window/alert) pour marquer le fait qu'un utilisateur a cliqué dessus.

### 3) Préparation des écrans.

Nous voulons préparer la page "produits" de votre dispositif e-commerce, qui affichera une liste de produits. En Vue.js chaque écran est un composant : pour cet écran, il nous faudra donc 1 nouveau composant.

- Créez donc un fichier `ProductsList.vue`. Le template de ce composant sera très simple dans un premier temps, par exemple un simple titre H1 contenant 'Nom du projet - Produits' est suffisant.

- Faites en sorte d'ajouter ce composant Vue.js au template de votre app.

➡️**Commiter dans git avec un message explicite, par exemple "fin étape 3" ou même "Ajout composant ProductsList"**

### 4) Mise en place d'un routeur.

Le problème est que nous ne voulons pas avoir une seule page sur notre application.
Nous devons avoir la possibilité de naviguer d'une page à l'autre, sans recharger la page ou sans afficher une nouvelle page HTML : pour cela, nous avons besoin de mettre en place **un routeur**.

C'est la même chose qu'avec le framework Laravel, sauf qu'ici le routeur est côté client : nous devons définir nos routes côté client et avoir moyen d'en changer.

Cela tombe bien, Vue.js a un routeur tout prêt que nous allons utiliser, [vue-router](https://router.vuejs.org/fr/)

##### 4.1) Installation.

Faites l'installation avec npm comme décrite dans la documentation. N'oubliez pas d'ajouter après l'installation ces deux lignes :

```
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

##### 4.2) Configuration.

Nous voulons déclarer une route `/produits` avec la liste des produits.

- Déclarez votre tableau de routes dans le fichier `index.js` du répertoire `router` en faisant référence au composant créé auparavant.

- Initialisez l'objet router de Vue contenant ces routes et injectez-le dans la création de l'app Vue, votre code doit ressembler à :

```
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

- Supprimez maintenant le composant `ProductsList` du template de notre composant `App.vue`.

Vous devriez retomber sur un écran correspondant à l'étape 1 plus haut.

Nous avons initialisé notre composant mais nous ne l'avons pas utilisé.

##### 4.3) Utilisation.

Pour l'utiliser nous devons utiliser les deux composants fournis par VueRouter :

- `<router-view></router-view>` affiche le contenu de la route correspondant au composant spécifié dans la déclaration.
- `<router-link to="" ></router-link>` permet de passer d'une page à l'autre.

Ajoutez donc `<router-view></router-view>` à la fin du template de notre composant `App.vue` et utilisez `<router-link to="NOM_ROUTE" ></router-link>` pour passer d'une page à l'autre dans le même composant.

### 5) Création d'un composant pour représenter les détails d'un produit.

A ce stade, la liste des produits est vide, il n'y a donc pas de navigation possible à partir de la liste. Nous allons cependant créer la vue détaillée d'un produit, qui pourra être rendue accessible soit via un bouton `<router-link to="..." ></router-link>` (temporaire) ou en saisissant l'URL directement comme indiqué en fin de section.

##### 5.1) Composant statique dans une nouvelle route.

Créez dans un premier temps une nouvelle route `'/produit'` qui va représenter un nouveau composant à créer, `Product.vue`.

Ce composant aura comme `data` un objet javascript qui va reprendre la modélisation de vos produits en base de données, par exemple :

```
{
    name: 'Produit 1', // nom du produit
    price: 123.0, // prix 
    description: 'Descriptif du produit 1', // texte descriptif
    updatedAt: new Date() // date de dernière mise à jour
}
```

Vous être libre de choisir le rendu du composant, à partir du moment où il exploite les différents champs de l'objet `data` ci-dessus.

Notes :

- Pour afficher la date, la méthode [toLocaleString()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/toLocaleString) de `Date()` devrait vous aider.
- On a déclaré une route mais pas donné de lien explicite dans l'application pour y accéder, mais vous pouvez directement [changer l'url du navigateur](http://localhost:8080/#/product).

➡️**Faites un commit avec un message explicite**

##### 5.2) Passage de props au composant Product.

Nous avançons bien ! Notre dernier composant va nous aider à construire l'écran comprenant la liste de nos produits. Mais aujourd'hui il a une limite : on ne peut pas définir le nom ou le prix de notre produit sans toucher au code, il faut trouver un moyen de paramétrer notre composant. Pour cela nous allons utiliser la notion de props dans Vue.js.

Pensez aux props comme aux paramètres d'une fonction :
Pour rendre paramétrable une fonction il faut ajouter des paramètres. Pour rendre paramétrable un composant, il faut ajouter des props.

- Dans un premier temps, appelez le composant `Product` dans le composant `ProductsList`. Vous devriez donc avoir le même rendu visuel aux urls `/produits` et `/produit`.

- Ajoutez le fait que le composant `Product` a une `props` pour chaque propriété de l'objet `data` défini en 5.1 (`name`, `price`, `description`, et `updatedAt` si on reprend l'exemple). Supprimez les données du `data` du composant `Product`, puis ajoutez les dans le composant `ProductsList`.

* Modifiez le composant `ProductsList` pour passer les props `name`, `price`, `description`, et `updatedAt`.

À ce stade, vous devriez avoir la même chose qu'avant en terme de rendu, néanmoins nous sommes prêts à faire notre liste de produits car nous avons un composant `Product` qui est désormais paramétrable grâce aux props !

➡️**Faites un commit avec un message explicite**

### 6) Création d'une liste.

➡️ Modifiez le composant `ProductsList` pour que son objet `data` contienne une liste de produits, par exemple :

```js
{
  products: [
    {
      id: 1,
      name: 'Produit 1',
      price: 49.90,
      description: 'Descriptif produit 1',
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Produit 2',
      price: 34.95,
      description: 'Descriptif produit 2',
      updatedAt: new Date()
    }
  ]
}
```

➡️ Bouclez maintenant sur cette donnée pour appeler autant de fois le composant `Product` qu'il y a d'objets dans ce nouveau `data` de `ProductsList`.

**Question :** Remarquez que nous avons ajouté une clef `id` à nos objets, pourquoi ?

**Votre réponse :**

➡️ Modifiez un peu le style pour que les éléments de la liste soient mieux visibles.

➡️**Faites un commit avec un message explicite**

##### 6.1) Mise en forme des dates
Un timestamp complet n'est pas agréable à lire, encore moins répété dans une liste.
La librairie `timeago.js` nous permet de formatter les dates pour afficher un temps relatif, plus parlant.

➡️ Ajoutez la libraire à votre projet avec npm pour afficher la valeur de `updatedAt` avec un temps relatif.

https://github.com/hustcc/timeago.js

> Il est toujours fondamental de savoir évaluer avant de se lancer un package ou un projet sur github ou même npm.

**Question :** Prenez le temps de regarder la page, qu'est ce qui vous inspire confiance, ou au contraire, méfiance ?

**Votre réponse :**

➡️**Faites un commit avec un message explicite**

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

Jusqu'ici, les caractéristiques des produits du catalogue étaient codées "en dur" dans les composants Vue.js. Vous allez désormais faire appel à une API pour récupérer de véritables produits à partir de votre projet Laravel. _N'hésitez pas à solliciter la formatrice ou le formateur si vous avez des questions sur le déploiement de votre projet Laravel._
**Si vous aviez mis en place une couche d'authentification sur votre API Laravel, il est préférable de la désactiver dans le cadre de ce module.**

Pour effectuer un test d'appel à l'API, accédez à l'URL de déploiement utilisée pour votre projet Laravel, par exemple :
https://monprojet.fr/api/products.json

Quel est le format de retour de l'API ? Quels sont les champs qui vont vous permettre de récupérer les caractéristiques de vos produits ?

##### 7.1) Installation d'une librairie permettant de faire des appels HTTP.

Pour pouvoir faire des appels à une API, Vue.js préconise l'utilisation de la librairie [axios](https://github.com/axios/axios).

Prenez toujours le temps d'analyser cette librairie sur github, qu'est ce qui vous inspire confiance ? Ayez le réflexe de chercher la librairie sur [npm](https://www.npmjs.com/package/axios) pour notamment voir le nombre de téléchargements.

- Installez la librairie avec npm.
- Prenez connaissance du [tutoriel Vue.js pour utiliser axios dans une application Vue.js](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

Quelle est la différence entre axios et la fonction `fetch` que vous avez manipulée en début de module ?

➡️**Faites un commit avec un message explicite**

##### 7.2) Utilisation dans le projet.

Au préalable, (re)lisez le guide MDN sur les promesses en Javascript, car ces dernières vont être importantes pour la suite. [Guide MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses).
Nous allons afficher la liste des produits du catalogue provenant de l'URL de votre projet Laravel.

Comme vous avez pu le voir, une promesse a plusieurs états :

- En cours.
- Terminée et succès.
- Terminée et erreur.

Nous devons suivre ces états dans notre composant, ajoutez donc à l'objet `data` deux clefs `loading` et `error` permettant de savoir si la requête est en cours et si il y a eu une erreur.

Aussi, retirez les données des produits que nous avions mis tout à l'heure "en dur" dans l'objet data.

Votre `data` devrait désormais ressembler à ça :

```js
data: function() {
    return {
      products: [], // au début la liste des produits est vide
      loading: false, 
      error: null,
    }
}
```

Avant d'aller plus loin, il faut choisir quand lancer la requête. La solution communément admise est de dire : "Quand le composant est créé, lance la requête".

Vue.js nous permet de déclencher des actions (ou _hooks_) à certains moments précis de la vie d'un composant. La liste est disponible [ici](https://fr.vuejs.org/v2/api/index.html#Options-Cycle-de-vie-des-hooks). Celui qui nous intéresse est le `created`.

- Ajoutez donc l'appel http avec axios permettant d'afficher la liste des produits.

- Faites en sorte d'afficher un texte `requête en cours` si jamais la requête est en cours et une erreur en rouge si jamais la requête produit une erreur.

➡️**Faites un commit avec un message explicite**

### 8) Gestion du panier

Nous allons maintenant utiliser la réactivité de Vue.js pour mettre en place la gestion du panier.

##### 8.1) Ajout d'un composant dédié

Ajoutez tout d'abord un nouveau composant `Cart` à votre projet. Associez-lui une route dans la configuration du router (`/panier` par exemple).

##### 8.2) Boutons ajouter / retirer 

Au sein de votre composant `ProductsList`, introduisez un nouveau champ dans votre objet data, qui contiendra la liste des produits ajoutés au panier.

Modifier le composant `Product` pour lui ajouter un bouton : si le produit est dans le panier, le bouton doit afficher "Retirer du panier", sinon il doit afficher "Ajouter au panier".

Faites en sorte que lorsqu'on clique sur le bouton l'opération correspondante soit réalisée sur le panier (ajout / retrait). 

➡️**Faites un commit avec un message explicite**

##### 8.3) Afficher le panier

Dans votre template App, ajouter un lien transverse qui permet d'accéder au panier. 

Modifiez le composant `Cart` pour faire en sorte que :
- le composant soit initialisé avec la liste des produits sélectionnés
- le composant affiche la liste des produits
- les produits disparaissent automatiquement lors du clic sur "Retirer du panier"

Une fois votre panier rempli, rafraîchissez votre page : que constatez-vous ? Pourquoi observez-vous ce comportement ? Quelle solution peut être envisagée pour l'éviter ? 

➡️**Faites un commit avec un message explicite**

##### 8.4) Enregistrer le panier

Pour éviter le phénomène observé ci-dessus, nous allons enregistrer le panier côté client.
Après avoir étudié le fonctionnement du localStorage (voir https://fr.vuejs.org/v2/cookbook/client-side-storage.html et https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), mettez en place un traitement qui permet de garder le panier en mémoire, même après rafraîchissement de la page.

➡️**Faites un commit avec un message explicite**
