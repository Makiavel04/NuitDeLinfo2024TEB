<?php
require_once "Vue/Vue.php";
require_once "Modele/Podcast.php";

class ControleurPodcast{


    public function podcast(){
        $podcasts = new Podcast();
        $vue = new Vue("Podcast","Podcasts","accueil");
        $vue->generer($podcasts->getPodcasts());
    }
}



?>