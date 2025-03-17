<h1> Ready, Set, Save the ocean </h1>
<ul>
<?php
$cpt=0;
foreach($files as $file){
    ++$cpt;
    echo <<<TEXT
    <li>
    <h2>Podcasts {$cpt} : </h2>
    <audio controls>
        <source src="Data/podcasts/{$file}" type="audio/mp3">
        Votre navigateur ne supporte pas la lecture audio.
    </audio>
    </li>
    TEXT;
}
?>
</ul>