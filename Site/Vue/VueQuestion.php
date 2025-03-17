
<?php
session_start();
if(!isset($_SESSION['count'])){
    $_SESSION['count']=0;
}

if(isset($_POST["rep"])){
    if($_POST["rep"] === $_POST["reponse"]){
        if(!isset($_SESSION['count'])){
            $_SESSION['count']=1;
        }
        else{
            $_SESSION['count']++;
        }
    }
}
if($_SESSION['count'] >= 5){
    $_SESSION['count'] =0;
    $victory = new Vue("Victoire","Victoire","accueil");
    $victory->generer();
    exit;
}
?>
<p><h1>Sauve L'océan</h1></p>
<p>Pour cela tu devras répondre correctement 5 fois à nos questions</p>
<form method="post" action="index.php?action=question">
    <div id="Quizz">
        <Label id = "question" class="question"> <?= $question ?></Label>
        <label for="rep1"> 
            <div id="r1" class="reponse">
                <label for="rep1"><?= $choix[0] ?> </label>
                <input type="radio" id="rep1" name="rep" value="<?=$choix[0]?>" required>
            </div>
        </label>
        <label for="rep2"> 
            <div id="r2" class="reponse">
                <label for="rep2"><?= $choix[1] ?> </label>
                <input type="radio" id="rep2" name="rep" value="<?=$choix[1] ?>" required>
            </div>
        </label>
        <label for="rep3"> 
            <div id="r3" class="reponse">
                <label for="rep3"><?= $choix[2] ?> </label>
                <input type="radio" id="rep3" name="rep" value="<?=$choix[2] ?>" required>
            </div>
        </label>
        <div id="submit">
        <input type="hidden" name="reponse" value="<?=$reponse ?>">
        <input type="hidden" name="count" value=<?=isset($_SESSION['count']) ?>>
            <input type="submit" value="Question">
        </div> 
</form>
    </div>
    <table>
        <tr>
<?php
    for($i = 0; $i < 6; $i++){
        if($i < $_SESSION["count"]){
            echo<<< BOAT
            <td class="clean">
            </td>
            BOAT;
        }
        if($i == $_SESSION["count"]){
            echo<<< BOAT
            <td class="boat">
                <img src="./Data/quizz/racewater.jpg";
            </td>
            BOAT;
        }
        if($i > $_SESSION["count"]){
            echo<<< BOAT
            <td class="dirty">
            </td>
            BOAT;
        }
    }
?>
    </tr>
</table>