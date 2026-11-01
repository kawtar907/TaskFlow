/* ============================================================
data.js : outils + 27 tâches (3 types x 9 étapes)
Ces textes ne sont JAMAIS enregistrés dans le localStorage :
modifier ce fichier met à jour tous les utilisateurs
sans effacer leur avancement.

Dans les textes, [[Nom de l'outil]] devient un lien vert cliquable
avec info-bulle (le nom doit exister dans OUTILS).
   ============================================================ */

const OUTILS = {
    "HTML": {
        url: "https://www.w3schools.com/html/",
        description: "Le langage de balisage qui structure le contenu des pages web."
    },
    "CSS": {
        url: "https://www.w3schools.com/css/",
        description: "Le langage de style qui gère les couleurs, les polices et la mise en page."
    },
    "JavaScript": {
        url: "https://www.w3schools.com/js/",
        description: "Le langage qui rend les pages interactives et dynamiques."
    },
    "Flexbox": {
        url: "https://www.w3schools.com/css/css3_flexbox.asp",
        description: "Un modèle CSS pour aligner et répartir des éléments en ligne ou en colonne."
    },
    "SQL": {
        url: "https://www.w3schools.com/sql/",
        description: "Le langage de requêtes pour créer, lire et modifier des données."
    },
    "Tailwind": {
        url: "https://tailwindcss.com/docs",
        description: "Un framework CSS fait de classes utilitaires pour styliser rapidement."
    },
    "Figma": {
        url: "https://help.figma.com",
        description: "Un outil de conception pour dessiner des maquettes d'interfaces."
    },
    "VS Code": {
        url: "https://code.visualstudio.com/docs",
        description: "L'éditeur de code gratuit de Microsoft, extensible avec des modules."
    },
    "Notion": {
        url: "https://www.notion.com/help",
        description: "Un espace de notes et de documents pour organiser un projet."
    },
    "Node.js": {
        url: "https://nodejs.org/docs",
        description: "Un environnement pour exécuter du JavaScript côté serveur."
    },
    "Git": {
        url: "https://git-scm.com/doc",
        description: "Le système de gestion de versions pour suivre et partager son code."
    },
    "Chrome DevTools": {
        url: "https://developer.chrome.com/docs/devtools",
        description: "Les outils intégrés à Chrome pour inspecter et déboguer une page."
    },
    "React Native": {
        url: "https://reactnative.dev/docs/getting-started",
        description: "Un framework pour créer des applications mobiles avec JavaScript et React."
    },
    "Electron": {
        url: "https://www.electronjs.org/docs",
        description: "Un framework pour créer des applications de bureau avec HTML, CSS et JavaScript."
    },
    "Android Studio": {
        url: "https://developer.android.com/studio/run/emulator",
        description: "L'environnement officiel Android, avec émulateur pour tester ses applications."
    }
};

function tache(numero, titre, resultat, priorite, outils, duree, description, checklist) {
    return {
        numero: numero,
        titre: titre,
        description: description,
        resultat: resultat,
        priorite: priorite,      // "Haute" | "Moyenne" | "Basse"
        duree: duree,
        outils: outils,
        checklist: checklist,
        statut: "À faire"
    };
}

const TYPES = {

    /* ====================== APPLICATION WEB ====================== */
    web: {
        id: "web",
        nom: "App Web",
        titre: "Application Web",
        categorie: "Web Development",
        taches: [
            tache(1, "Analyse des besoins", "Cahier des charges", "Haute", ["Notion"], "2 h",
                "Définissez précisément ce que l'application doit faire, pour qui et avec quelles fonctionnalités. Regroupez tout dans un document unique sur [[Notion]].",
                ["Lister les objectifs et les utilisateurs cibles",
                 "Décrire les fonctionnalités principales dans [[Notion]]",
                 "Classer les fonctionnalités par priorité",
                 "Faire valider le cahier des charges"]),
            tache(2, "Conception UI/UX", "Maquettes des interfaces", "Haute", ["Figma"], "4 h",
                "Dessinez les écrans avant de coder : parcours de l'utilisateur, navigation et composants, avec [[Figma]].",
                ["Dessiner le parcours utilisateur",
                 "Créer les maquettes des écrans principaux dans [[Figma]]",
                 "Choisir la palette de couleurs et les polices",
                 "Faire valider les maquettes"]),
            tache(3, "Structure HTML", "Structure des pages", "Haute", ["HTML", "VS Code"], "3 h",
                "Écrivez le squelette de chaque page en [[HTML]] avec des balises sémantiques, depuis [[VS Code]].",
                ["Créer l'arborescence des fichiers dans [[VS Code]]",
                 "Écrire la structure [[HTML]] de chaque page",
                 "Ajouter les formulaires et les liens de navigation",
                 "Vérifier la sémantique des balises"]),
            tache(4, "Style CSS / Tailwind", "Interface responsive", "Haute", ["CSS", "Tailwind"], "6 h",
                "Mettez en forme les pages avec [[CSS]] et [[Tailwind]] pour obtenir une interface propre qui s'adapte à tous les écrans.",
                ["Mettre en page avec [[Flexbox]]",
                 "Styliser les composants avec [[CSS]]",
                 "Ajouter les classes [[Tailwind]] nécessaires",
                 "Tester l'affichage sur mobile et sur ordinateur"]),
            tache(5, "Développement JavaScript", "Interface interactive", "Moyenne", ["JavaScript", "VS Code"], "8 h",
                "Ajoutez le comportement de l'application : événements, validation des formulaires et mise à jour de la page en [[JavaScript]].",
                ["Gérer les clics et les événements en [[JavaScript]]",
                 "Valider les formulaires",
                 "Mettre à jour l'affichage dynamiquement",
                 "Enregistrer les données dans le navigateur"]),
            tache(6, "Backend et API", "Services fonctionnels", "Basse", ["Node.js", "Git"], "8 h",
                "Créez le serveur et les routes de l'API avec [[Node.js]], et versionnez votre travail avec [[Git]].",
                ["Initialiser le projet [[Node.js]]",
                 "Créer les routes de l'API",
                 "Gérer les erreurs et les réponses",
                 "Enregistrer le travail avec [[Git]]"]),
            tache(7, "Base de données", "Données persistantes", "Basse", ["SQL"], "4 h",
                "Concevez les tables et écrivez les requêtes [[SQL]] qui conservent les données de l'application.",
                ["Dessiner le schéma des tables",
                 "Créer les tables avec [[SQL]]",
                 "Écrire les requêtes d'ajout, de lecture et de modification",
                 "Relier la base à l'API"]),
            tache(8, "Tests et débogage", "Application testée", "Moyenne", ["Chrome DevTools"], "4 h",
                "Testez chaque fonctionnalité et corrigez les bugs à l'aide de [[Chrome DevTools]].",
                ["Tester chaque fonctionnalité une par une",
                 "Repérer les erreurs dans la console de [[Chrome DevTools]]",
                 "Corriger les bugs trouvés",
                 "Vérifier le résultat sur plusieurs navigateurs"]),
            tache(9, "Déploiement", "Site en ligne", "Moyenne", ["Git"], "2 h",
                "Mettez le site en ligne : préparez le dépôt [[Git]], choisissez un hébergeur et publiez.",
                ["Pousser le code sur un dépôt [[Git]]",
                 "Choisir un hébergeur",
                 "Publier le site",
                 "Tester le site en ligne"])
        ]
    },

    /* ====================== APPLICATION MOBILE ====================== */
    mobile: {
        id: "mobile",
        nom: "App Mobile",
        titre: "Application Mobile",
        categorie: "Mobile Development",
        taches: [
            tache(1, "Analyse des besoins", "Spécifications mobiles", "Haute", ["Notion"], "2 h",
                "Définissez les usages de l'application sur téléphone : qui l'utilise, dans quelles situations et avec quelles fonctions. Notez tout dans [[Notion]].",
                ["Identifier les utilisateurs et leurs usages",
                 "Lister les fonctionnalités dans [[Notion]]",
                 "Choisir les plateformes visées (Android, iOS)",
                 "Valider les spécifications"]),
            tache(2, "Maquettes mobiles", "Maquettes des écrans", "Haute", ["Figma"], "4 h",
                "Dessinez chaque écran au format téléphone, avec une navigation pensée pour le pouce, dans [[Figma]].",
                ["Dessiner la liste des écrans",
                 "Créer les maquettes dans [[Figma]]",
                 "Relier les écrans pour simuler la navigation",
                 "Faire valider les maquettes"]),
            tache(3, "Configuration du projet", "Projet prêt à coder", "Haute", ["React Native", "Node.js"], "3 h",
                "Installez les outils et créez le projet de base avec [[React Native]] et [[Node.js]].",
                ["Installer [[Node.js]]",
                 "Créer le projet [[React Native]]",
                 "Lancer l'application de démarrage",
                 "Organiser les dossiers du projet"]),
            tache(4, "Navigation et écrans", "Navigation fonctionnelle", "Haute", ["React Native"], "6 h",
                "Construisez les écrans et permettez de passer de l'un à l'autre avec [[React Native]].",
                ["Créer les écrans principaux",
                 "Mettre en place la navigation entre les écrans",
                 "Ajouter une barre d'onglets ou un menu",
                 "Tester tous les parcours"]),
            tache(5, "Fonctionnalités principales", "Fonctions opérationnelles", "Moyenne", ["React Native", "JavaScript"], "8 h",
                "Programmez les fonctions au cœur de l'application en [[JavaScript]] dans votre projet [[React Native]].",
                ["Programmer la première fonctionnalité en [[JavaScript]]",
                 "Programmer les fonctionnalités suivantes",
                 "Gérer les états et les erreurs",
                 "Tester chaque fonction"]),
            tache(6, "API et stockage", "Données accessibles", "Moyenne", ["React Native", "Node.js"], "6 h",
                "Connectez l'application à une API et enregistrez les données sur l'appareil.",
                ["Créer ou choisir une API avec [[Node.js]]",
                 "Récupérer les données dans [[React Native]]",
                 "Enregistrer les données sur l'appareil",
                 "Gérer le mode sans connexion"]),
            tache(7, "Permissions et fonctionnalités natives", "Accès natifs configurés", "Basse", ["React Native"], "4 h",
                "Demandez les autorisations nécessaires (caméra, position, notifications) et utilisez les fonctions du téléphone avec [[React Native]].",
                ["Lister les permissions nécessaires",
                 "Configurer les permissions dans [[React Native]]",
                 "Utiliser une fonction native (caméra, position…)",
                 "Gérer le cas où l'utilisateur refuse"]),
            tache(8, "Tests sur appareils", "Application validée", "Moyenne", ["Android Studio"], "4 h",
                "Vérifiez le fonctionnement sur émulateur avec [[Android Studio]] et sur un vrai téléphone.",
                ["Lancer l'émulateur dans [[Android Studio]]",
                 "Tester sur un vrai téléphone",
                 "Corriger les problèmes d'affichage et les bugs",
                 "Valider l'application"]),
            tache(9, "Build et publication", "Application distribuable", "Moyenne", ["Git"], "3 h",
                "Générez la version finale de l'application et préparez sa publication, avec le code archivé dans [[Git]].",
                ["Archiver la version finale dans [[Git]]",
                 "Générer le fichier d'installation",
                 "Préparer la fiche de l'application",
                 "Publier ou distribuer l'application"])
        ]
    },

    /* ====================== APPLICATION DESKTOP ====================== */
    desktop: {
        id: "desktop",
        nom: "App Desktop",
        titre: "Application Desktop",
        categorie: "Desktop Development",
        taches: [
            tache(1, "Analyse des besoins", "Spécifications du logiciel", "Haute", ["Notion"], "2 h",
                "Précisez le rôle du logiciel, ses utilisateurs et les systèmes visés (Windows, macOS, Linux). Rassemblez tout dans [[Notion]].",
                ["Définir le but du logiciel",
                 "Lister les fonctionnalités dans [[Notion]]",
                 "Choisir les systèmes d'exploitation visés",
                 "Valider les spécifications"]),
            tache(2, "Conception de l'interface", "Maquettes de bureau", "Haute", ["Figma"], "4 h",
                "Dessinez les fenêtres, menus et boîtes de dialogue du logiciel dans [[Figma]].",
                ["Dessiner la fenêtre principale",
                 "Dessiner les menus et les boîtes de dialogue dans [[Figma]]",
                 "Choisir les couleurs et les icônes",
                 "Faire valider les maquettes"]),
            tache(3, "Configuration du projet", "Projet configuré", "Haute", ["Electron", "Node.js"], "3 h",
                "Créez la base du logiciel avec [[Electron]] et [[Node.js]].",
                ["Installer [[Node.js]]",
                 "Initialiser le projet [[Electron]]",
                 "Ouvrir une première fenêtre",
                 "Organiser les dossiers du projet"]),
            tache(4, "Développement de l'interface", "Interface fonctionnelle", "Haute", ["Electron", "HTML"], "6 h",
                "Construisez l'interface du logiciel en [[HTML]], affichée dans une fenêtre [[Electron]].",
                ["Écrire la structure [[HTML]] des fenêtres",
                 "Styliser l'interface",
                 "Créer le menu de l'application avec [[Electron]]",
                 "Tester l'affichage à plusieurs tailles de fenêtre"]),
            tache(5, "Logique métier", "Fonctionnalités opérationnelles", "Moyenne", ["JavaScript"], "8 h",
                "Programmez en [[JavaScript]] les règles et les fonctions qui font le cœur du logiciel.",
                ["Programmer la première fonctionnalité en [[JavaScript]]",
                 "Relier l'interface à la logique",
                 "Programmer les fonctionnalités suivantes",
                 "Tester chaque fonction"]),
            tache(6, "Gestion des fichiers et données", "Données persistantes", "Moyenne", ["SQL"], "5 h",
                "Lisez, enregistrez et organisez les données du logiciel, par exemple dans une base [[SQL]] locale.",
                ["Choisir où stocker les données",
                 "Créer la base avec [[SQL]]",
                 "Enregistrer et relire les données",
                 "Gérer l'ouverture et la sauvegarde de fichiers"]),
            tache(7, "Gestion des erreurs", "Traitements robustes", "Basse", ["JavaScript"], "3 h",
                "Faites en sorte que le logiciel ne plante pas : anticipez les erreurs et affichez des messages clairs en [[JavaScript]].",
                ["Repérer les erreurs possibles",
                 "Intercepter les erreurs avec try / catch en [[JavaScript]]",
                 "Afficher des messages compréhensibles",
                 "Enregistrer les erreurs dans un journal"]),
            tache(8, "Tests et compatibilité", "Logiciel testé", "Moyenne", ["Git"], "4 h",
                "Testez le logiciel sur plusieurs systèmes et suivez les corrections avec [[Git]].",
                ["Tester sur Windows",
                 "Tester sur macOS ou Linux",
                 "Corriger les bugs et valider chaque correction avec [[Git]]",
                 "Valider la version finale"]),
            tache(9, "Packaging et installation", "Logiciel installable", "Moyenne", ["Electron"], "3 h",
                "Créez l'installateur du logiciel avec [[Electron]] pour que n'importe qui puisse l'installer.",
                ["Configurer le packaging avec [[Electron]]",
                 "Générer l'installateur",
                 "Tester l'installation sur une machine propre",
                 "Rédiger une courte notice d'installation"])
        ]
    }
};

const ORDRE_TYPES = ["web", "mobile", "desktop"];