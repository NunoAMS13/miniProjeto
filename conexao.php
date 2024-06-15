<?php

$endpoint = "https://miniprojeto2324.documents.azure.com:443/";
$primaryKey = "8NE06gN3wpYz5YKydhig7GOISpNGASUWaTq3I6Ge0ATjISURKYGPLnLXiqKDqzEq964jsIzO15DYACDb795lIA==";
$databaseId = "Miniprojeto";
$containerId = "Receitas";

$connectionOptions = [
    "endpoint" => $endpoint,
    "primaryKey" => $primaryKey
];

$client = new \Cosmos\Db\DocumentClient($connectionOptions);

$database = $client->selectDatabase($databaseId);

$container = $database->selectContainer($containerId);


?>