<?php

    require_once "Vue/Vue.php";

    class ControleurAccueil{
        public function  __construct(){
        }
        
        public function accueil() {
            $vue = new Vue("Accueil","Accueil","accueil");
            $vue->generer();
        }
    }

?>