<?php

    require_once "Vue/Vue.php";

    class ControleurClicker{
        public function  __construct(){
        }
        
        public function clicker() {
            $vue = new Vue("Clicker","Memory méchant","clicker");
            $vue->generer();
        }
    }

?>