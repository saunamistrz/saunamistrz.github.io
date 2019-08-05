<?php

$recepient = "youmail@ya.ru";
$sitename = "Saunamistrrz";

$name = trim($_GET["name"]);
$phone = trim($_GET["phone"]);
$text = trim($_GET["text"]);

$pagetitle = "new zajawka z sajta\"$sitename\"";
$message = "name: $name \nTelefon: $phone \ntext: $text";
mail($recepient, $pagetitle, $message,"Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");