<?php

require_once "ControleurAccueil.php";
require_once "ControleurPodcast.php";
require_once "ControleurClicker.php";
require_once "ControleurQuestion.php";

class Routeur{
    private $ctrlAccueil;
    private $ctrlPodcast;
    private $ctrlClicker;

    public function __construct(){
        $this->ctrlAccueil = new ControleurAccueil();
        $this->ctrlPodcast = new ControleurPodcast();
        $this->ctrlClicker = new ControleurClicker();

    }

    public function dirigerRequete(){
        if (isset($_GET['action'])) {
            if($_GET['action']=="captcha"){

            }else if($_GET['action']=="meteo"){

            }else if($_GET['action']=="clicker"){
                $this->ctrlClicker->clicker();
            }else if($_GET['action']=="question"){
                $question = new ControleurQuestion();
                $question->question();
            }else if($_GET['action']=="podcast"){
                $this->ctrlPodcast->podcast();
            }
        }else{
                $this->ctrlAccueil->accueil();
        }
    }
}



?>