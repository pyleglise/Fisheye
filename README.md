# Créez un site accessible pour une plateforme de photographes

 

Ce projet a récemment été mis à jour pour l’améliorer ! Si vous avez commencé le projet avant le 10/11/2021, vous pouvez décider de continuer sur l’ancienne version. Dans ce cas, vous pouvez préciser "version avant 10-11-21" sur vos livrables.

De plus, les données JSON ont été mises à jour le 15 décembre 2021 pour ajouter des attributs "title" aux vidéo. Si vous avez commencé le projet avant cette date et ne voulez pas intégrer les nouveaux titres, vous pouvez.

Le nommage des livrables à déposer sur la plateforme a été changé et des indications sur les temps de soutenance ont été ajoutées le 16/03/2022.

Avant de démarrer votre travail sur ce projet, nous vous conseillons de:

    lire le scénario en entier, chaque section du projet ainsi que les documents fournis ;

    consulter le guide des étapes clés avec des recommandations et des ressources pour organiser votre travail ;

    préparer une liste de questions pour votre première session de mentorat.

Depuis quelques semaines, vous êtes développeur junior chez Techasite, une société de conseil spécialisée dans le développement de sites web et d'applications mobiles.

Logo de FishEye
Logo de FishEye

Avec votre cheffe de projet Amanda et le Designer UI, vous venez de faire une réunion de lancement du projet avec un nouveau client, FishEye. FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. Ils ont récemment levé des fonds et aimeraient mettre à jour leur site web. 

Après la réunion de lancement, vous voyez un mail de votre cheffe de projet concernant le projet FishEye. Vous l'ouvrez immédiatement :

    Objet : Réunion de lancement FishEye
    De : Amanda
    À : Moi

    Salut, 

    Merci d'avoir participé à la réunion de ce matin ! Pour résumer, notre objectif est de construire un prototype fonctionnel d'un nouveau site web que nous pourrons présenter à FishEye lors de notre prochaine réunion avec les clients. Tu seras chargé de fournir tout le HTML, le CSS et le JavaScript nécessaires au prototype. Notre équipe de back-end intégrera le système existant de FishEye une fois que tu auras terminé le code pour ta partie du projet.

    Pour t’aider à démarrer, voici toutes les informations que j'ai recueillies auprès du client :

    Mes notes de réunion détaillant les principales fonctionnalités et les exigences techniques à mettre en œuvre. Les maquettes approuvées, développées par notre designer. Tu vas créer une page principale ainsi qu’une page avec les informations pour chaque photographe de l’échantillon. Des exemples de photos et de vidéos de FishEye, que tu devras utiliser pour la conception des pages. Des exemples de données au format JSON, que tu pourras utiliser pour créer les différentes pages des photographes de façon dynamique. Ce format imite la structure des données dans la base de données, donc ne modifie pas les données existantes. 

    J'avais demandé à Zoé de s’occuper de ce projet, mais après avoir rédigé un premier jet très rapidement, elle a dû passer à autre chose. Tu trouveras la base de son code sur ce repo avec une partie du HTML et CSS mis en place, ce qui devrait t’aider. Tu peux forker son repo pour te lancer dans le code.

    Bien que le site web soit un prototype, il devrait correspondre aux maquettes et fonctionner correctement (pas d'erreur dans la console). Comme l'a mentionné le client lors de la réunion de lancement, sa priorité absolue est l'accessibilité. Veille à construire le site conformément aux exigences d'accessibilité indiquées dans mes notes.

    Une fois que tu m'auras envoyé le repo GitHub avec le code complété, nous passerons en revue et vérifierons toutes les fonctionnalités des pages. Je te demanderai également de faire une démonstration de la navigation du site au moyen du clavier pour qu’on s’assure qu'il est utilisable par les lecteurs d'écran.  

    De plus, avant de soumettre ton travail, assure-toi qu'il respecte bien les contraintes techniques indiquées dans mes notes de réunion.

    Bonne chance et montre-moi ce que tu sais faire !

    Amanda
    Cheffe de Projet @Techasite

Vous commencez par ouvrir les maquettes pour avoir une idée de ce qui doit être fait : 

# Maquettes du site de FishEye
Page d'accueil des photographes avec 6 profils visibles de photographes. Pour chacun, plusieurs infos sont affichées (nom, localisation, courte description, tags, prix par jour). Des zones de la page sont délimitées par des rectangles numérotés afin de décrire des zones d'interaction.

Lorsque vous commencez à regarder les maquettes, vous recevez un message instantané de Zoé, une développeuse senior que vous admirez beaucoup. Elle vous a encadré et a effectué un grand nombre de vos révisions de code :

    Zoé : Salut ! Amanda m'a dit qu'elle t'avait chargé de développer le premier prototype du projet FishEye, c'est bien ça ?

    Moi : Oui, je viens de commencer !

    Zoé : Tant mieux pour toi ! J'avais commencé ce projet, mais on m'a passé sur autre chose. Je pense que tu apprendras beaucoup au cours du processus. Je voulais juste te donner un petit conseil technique. Amanda a mentionné que FishEye a des vidéos et des photos pour le photographe. Pour ça il faudra que tu utilises un pattern Factory Method, ça sera idéal pour créer les media en distinguant les vidéos des photos.

    Moi : OK, je vais utiliser le pattern Factory Method. Merci encore !

Bon, il semble bien que vous ayez maintenant tous les éléments dont vous avez besoin pour démarrer.  Il est temps de se mettre au travail !

Pour vous aider à réaliser ce projet, voici un exemple de découpage des étapes à suivre. Vous y trouverez des conseils pour chaque étape, ainsi que sur l’utilisation des ressources pour ce projet.
Livrables

Pour ce projet, vous aurez besoin de créer les livrables suivants :

    Un fichier au format TXT contenant le lien vers votre code sur GitHub avec les fichiers HTML, CSS et JavaScript. 

Pour faciliter votre passage devant le jury, déposez sur la plateforme, dans un dossier zip nommé “Titre_du_projet_nom_prénom”, avec tous les livrables du projet comme suit : Nom_Prénom_n° du livrable_nom du livrable__date de démarrage du projet. Cela donnera :  

    Nom_Prénom_1_code_mmaaaa.

Par exemple, le premier livrable peut être nommé comme suit : Dupont_Jean_1_code_012022.
Soutenance

Lors de la présentation orale, votre évaluateur jouera le rôle d'Amanda, votre cheffe de projet. La présentation sera structurée comme suit : 

    Présentation des livrables (15 minutes) 

        Présenter le site web. 

        Faire une démonstration de la navigation au clavier sur le site et avec lecteur d'écran.

    Discussion (10 minutes) 

        Jouant le rôle d'Amanda, l'évaluateur vous posera des questions sur votre méthodologie et vos livrables.

        L'évaluateur remettra en question vos décisions, soyez donc prêt à défendre votre travail.

    Debrief (5 minutes)

        À la fin des sessions, l'évaluateur cessera de jouer le rôle d'Amanda afin que vous puissiez faire un débriefing ensemble. 

Votre présentation devrait durer 15 minutes (+/- 5 minutes). Puisque le respect de la durée des présentations est important en milieu professionnel, les présentations en dessous de 10 minutes ou au-dessus de 20 minutes peuvent être refusées. 

 
## Compétences évaluées

    Assurer l'accessibilité d'un site web

    Gérer les évènements d'un site avec JavaScript

    Développer une application web modulaire avec des design patterns

    Ecrire du code JavaScript maintenable
