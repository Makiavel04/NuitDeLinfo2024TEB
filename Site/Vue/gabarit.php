<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<link rel="stylesheet" href=<?="Contenu/{$style}.css"?> />
<title><?= $titre ?></title>
</head>
<body>
	
		<header>
			<a class="menu" href="./index.php">Accueil</a>
			<a class="menu" href="./index.php?action=podcast">Podcasts</a>
			<a class="menu" href="./index.php?action=clicker">Memory méchant</a>
			<a class="menu" href="./index.php?action=question">Quizz</a>
			<a class="menu" href="./GameTcha/GameTcha.html">GameTcha</a>
			<a class="menu" href="./meteo/meteo.html">Météo</a>

		</header>
		<div id="contenu">
			<?= $contenu ?>
        </div>
		<!-- #contenu -->
		<footer id="piedBlog"> 
			<p>Site réalise pour la nuit de l'info 2024 par TEB</p>
			<p>Réalisé avec PHP, HTML5 et CSS.</p> 
		</footer>
</body>
</html>