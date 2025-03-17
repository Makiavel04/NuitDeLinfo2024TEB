<?php

    require_once "Vue/Vue.php";
    require "Modele/Question.php";

    class ControleurQuestion{

        private $question;

        public function  __construct(){
            $this->question = new Question();
        }
        
        public function question() {
            $vue = new Vue("Question","Quizz","quizz");
            $vue->generer($this->question->getQuestion());
        }
    }

?>