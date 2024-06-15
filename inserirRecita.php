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
if ($container->createItem($receita)) {
    echo "<script>alert('Receita inserida com sucesso!')</script>";
    sleep(3);
    header("Location: index.php");
} else {
    echo "<script>alert('Falha ao inserir a receita!')</script>";
    sleep(3);
    header("Location: index.php");
}


?>
