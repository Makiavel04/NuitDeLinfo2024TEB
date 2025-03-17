<?php
class Podcast{

    public function getPodcasts(){
        $fic="Data/podcasts/listePodcasts.txt";
        if(file_exists($fic)){
            $str = file_get_contents($fic);
            $files = explode("\n",$str);
            $tab=array( "files" => $files);
            return $tab;
        }else return array();
    }
}


?>