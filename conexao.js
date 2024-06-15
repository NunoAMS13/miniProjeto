const endpoint = "https://miniprojeto2324.documents.azure.com:443/";
const primaryKey = "8NE06gN3wpYz5YKydhig7GOISpNGASUWaTq3I6Ge0ATjISURKYGPLnLXiqKDqzEq964jsIzO15DYACDb795lIA==";
const databaseId = "Miniprojeto";
const containerId = "Receitas";

const connectionOptions = {
    endpoint: endpoint,
    primaryKey: primaryKey
};

const client = new Cosmos.Db.DocumentClient(connectionOptions);

const database = client.selectDatabase(databaseId);

const container = database.selectContainer(containerId);