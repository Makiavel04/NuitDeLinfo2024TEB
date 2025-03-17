<?php

class Question{
    private $question;
    private $tab_reponses;
    private $reponse;

    public function __construct($ficname="Modele/Questions.json"){
        $this->tab_reponses = array();
        $Quizzjson = file_get_contents($ficname);
        $decode_json = json_decode($Quizzjson, true);
        srand(floor(time()));
        $n = rand(0,count($decode_json) - 1);
        $this->question = $decode_json[$n]["question"];
        array_push($this->tab_reponses, $decode_json[$n]["reponse1"], $decode_json[$n]["reponse2"], $decode_json[$n]["reponse3"]);
        $this->reponse = $decode_json[$n]["reponse"];
    }

    public function getQuestion(){
        return ["question" => $this->question, "choix" => $this->tab_reponses, "reponse" => $this->reponse];
    }
}

?>