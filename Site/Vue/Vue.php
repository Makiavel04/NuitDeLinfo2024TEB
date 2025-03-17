<?php

class Vue
{

    // Nom du fichier associé à la vue
    private $fichier;
    private $titre;
    private $style;

    public function __construct($action, $titre, $style)
    {
        $this->fichier = "Vue/Vue" . $action . ".php";
        $this->titre = $titre;
        $this->style = $style;
    }

    public function generer($donnees=array())
    {
        $contenu=$this->genererFichier($this->fichier,$donnees);
        $vue = $this->genererFichier('Vue/gabarit.php', array('titre' => $this->titre, 'contenu' => $contenu, 'style' => $this->style));
        echo $vue;
    }

    // Génère un fichier vue et renvoie le résultat produit
    private function genererFichier($fichier, $donnees)
    {
        if(file_exists($fichier)){
            extract($donnees);
            ob_start();
            require $fichier;
        return  ob_get_clean();
        }
    }
}