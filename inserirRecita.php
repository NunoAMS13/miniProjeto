<?php

require_once "conexao.php";
$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$ingredientes = $_POST['ingredientes'];
$preparo = $_POST['preparo'];


$receita = [
    "titulo" => $titulo,
    "descricao" => $descricao,
    "ingredientes" => $ingredientes,
    "preparo" => $preparo
];

$container->createItem($receita);

if() {
    echo "<Script> alert('Receita inserida com sucesso!') </script>";
    sleep(3);
    header("Location: index.php");
} else {
    echo "<Script> alert('Receita inserida com sucesso!') </script>";
    sleep(3);
    header("Location: index.php");
}

?>
