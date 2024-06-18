var express = require('express')
const { CosmosClient } = require("@azure/cosmos");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const endpoint = "https://miniprojeto2324.documents.azure.com:443/";
const key = "PA98XhkQ1aIL5n3ICgmj13YDip514b2mXTmEwktqWK7cyIxrIodJz5bqAWQfpjO7oAKr7iLsJMPOACDbtiZQqA==";
const databaseId = "MiniProjeto";
const containerId = "Receitas";

const client = new CosmosClient({ endpoint, key });

var app = express()
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use('/detalhes-receita', express.static('public'));

app.get('/', async (req, res) => {
    try {
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        const { container } = await database.containers.createIfNotExists({ id: containerId });

        const { resources } = await container.items.query("SELECT * from Receitas").fetchAll();


        let receitasHtml = '';
        for (const receita of resources) {
            receitasHtml += `
            <article class="receita-item">
                <h2>${receita.nome}</h2>
                <img src="${receita.imagem}" alt="${receita.nome}" style="max-width: 90%;">
                <p>${receita.descricao}</p>
                <a href="/detalhes-receita/${receita.id}" class="btn">Ver Detalhes</a>
            </article>`;
        }

        const html = `<!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Minhas Receitas</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>

            <main>
                <section class="intro" style="width: 100%">
                    <h1>Bem vindo ao nosso site de receitas!</h1>
                    <p>Aqui você pode visualizar as suas receitas favoritas de maneira fácil e prática. </p>
                </section>
                <section class="receitas-lista" style="display: flex;">
                    ${receitasHtml}
                </section>
            </main>
        </body>
        </html>`;

        res.send(html);
    } catch (error) {
        console.error('Failed to retrieve Cosmos DB key:', error);
        res.status(500).send('Erro ao recuperar receitas');
    }
});
app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/detalhes-receita/:index', async (req, res) => {
        const index = req.params.index;
        try {
            const { database } = await client.databases.createIfNotExists({ id: databaseId });
            const { container } = await database.containers.createIfNotExists({ id: containerId });
    
            const query = `SELECT * from r WHERE r.id = '${index}'`;
            const { resources } = await container.items.query(query).fetchAll();
            if (resources.length > 0) {
                const receita = resources[0];
                console.log(receita);
    
                const ingredientesHtml = receita.ingredientes.map(ingrediente => `<li>${ingrediente.quantidade} de ${ingrediente.nome}</li>`).join('');
                const preparacaoHtml = receita.preparacao.map(passo => `<li>${passo}</li>`).join('');
    
                const html = `<!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Detalhes da Receita</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <header>
                        <h1>Detalhes da Receita</h1>
                        <a href="/" class="btn">Voltar</a>
                    </header>
                    <main>
                        <section class="detalhes-receita">
                            <img src="${receita.imagem}" alt="${receita.nome}" style="max-width: 90%;">
                            <h2>${receita.nome}</h2>
                            <p><strong>Descrição:</strong> ${receita.descricao}</p>
                            <p><strong>Ingredientes:</strong></p>
                            <ul>${ingredientesHtml}</ul>
                            <p><strong>Modo de Preparo:</strong></p>
                            <ul>${preparacaoHtml}</ul>
                        </section>
                    </main>
                </body>
                </html>`;
    
                res.send(html);
            } else {
                res.status(404).send('Receita não encontrada');
            }
        } catch (error) {
            console.error('Failed to retrieve Cosmos DB key:', error);
            res.status(500).send('Erro ao recuperar receitas');
        }
    });

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = async function (context, myTimer) {
    if (myTimer.isPastDue) {
        context.log('A execução da função está atrasada.');
    }

    try {
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        const { container } = await database.containers.createIfNotExists({ id: containerId });
        context.log('Conexão com Cosmos DB estabelecida com sucesso.');
    } catch (error) {
        context.log.error('Falha ao conectar à Cosmos DB:', error);
        context.done(error);
        return;
    }

    context.done();
};


