# Pokédex HTML / CSS / JS

## Description

Ce projet est un **Pokédex interactif** pour les **151 premiers Pokémon**.  
Il est développé en **HTML, CSS et JavaScript** et permet de :

- Afficher le nom, le type et les statistiques de chaque Pokémon.
- Afficher l’image officielle du Pokémon.
- Jouer le cri du Pokémon lorsque l’on clique sur son image.
- Naviguer facilement entre les Pokémon grâce à un fichier JSON structuré.

C’est un projet **personnel / éducatif** pour apprendre à manipuler JSON, DOM et médias (images et sons) en JavaScript.

## Fonctionnalités

- Affichage dynamique des Pokémon depuis un fichier `pokedex.json`.
- Images officielles des Pokémon intégrées.
- Sons des cris des Pokémon intégrés avec lecture au clic.
- Statistiques et informations détaillées : type(s), résistances, vulnérabilités, évolutions, statistiques de combat.
- Compatible avec tous les navigateurs modernes.

## Installation et utilisation

1. Cloner le projet ou télécharger les fichiers.
2. Vérifier que les dossiers suivants sont présents dans le projet :
   - `images/` → contenant les images officielles des Pokémon.
   - `sounds/` → contenant les fichiers audio des cris (`1.ogg`, `2.ogg`, …).
3. Ouvrir le fichier `index.html` dans un navigateur.
4. Cliquer sur l’image d’un Pokémon pour jouer son cri.

> Tous les fichiers sont utilisés à titre éducatif et personnel. Ne pas redistribuer à des fins commerciales.

## Structure du JSON

Le fichier `pokedex.json` contient un tableau d’objets, chaque Pokémon ayant les propriétés suivantes :

```json
{
  "id": 1,
  "name_fr": "Bulbizarre",
  "name_en": "Bulbasaur",
  "types": ["Plante", "Poison"],
  "stats": {
    "hp": 45,
    "attack": 49,
    "defense": 49,
    "sp_attack": 65,
    "sp_defense": 65,
    "speed": 45
  },
  "evolutions": {
    "prev": null,
    "next": 2
  },
  "image": "images/1.png",
  "cry_url": "sounds/1.ogg",
  "resistances": ["Plante", "Combat", "Eau", "Électrik"],
  "weaknesses": ["Feu", "Glace", "Poison", "Vol"]
}
```

## Crédits

Les fichiers audio utilisés pour les cris des Pokémon sont des extraits officiels.
Ils appartiennent à Nintendo, Game Freak et The Pokémon Company et sont utilisés uniquement à titre éducatif et personnel.

Les images utilisées sont les artworks officiels des Pokémon.
Elles appartiennent à Nintendo, Game Freak et The Pokémon Company et sont utilisées uniquement à titre éducatif et personnel.

Le développement et le code de ce projet ont été réalisés par Manon Poucet à des fins d'apprentissage et de démonstration.

## Licence

Ce projet est sous licence **MIT** pour le code et l’organisation du projet.

Les fichiers images et sons officiels ne sont pas libres de droits et leur usage est limité à des fins éducatives ou personnelles.