# Scaleway Servers Filter

Extension Chrome pour la page de commande Dedibox : https://console.online.net/fr/order/server

Ajoute un panneau en haut à droite avec deux filtres :

- **SSD / NVMe uniquement** : garde les serveurs dont la colonne « Disque(s) » contient SSD ou NVMe.
- **En stock uniquement** : garde les serveurs ayant un bouton « Commander ».

Choix mémorisés dans le `localStorage` de la page. Gammes vides masquées.

## Installation

1. Cloner le dépôt.
2. Ouvrir `chrome://extensions`, activer le « Mode développeur ».
3. « Charger l'extension non empaquetée », choisir le dossier cloné.

## Permissions

Aucune. Content script limité à `https://console.online.net/*/order/server*`.

## Limite

Dépend du balisage de la page (`table.server-availability`, colonne disque en 4e position). Un changement côté Scaleway peut casser le filtre.
