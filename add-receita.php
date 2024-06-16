<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Receita</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header-adicionar-receita">
        <a href="index.html" class="btn-voltar">Voltar</a>
        <h1>Adicionar Nova Receita</h1>
    </header>
    <main>
        <section class="form-receita">
            <form action="inserirRecita.js" method="post" enctype="multipart/form-data">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" name="titulo" required>
                
                <label for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" required></textarea>
                
                <label for="ingredientes">Ingredientes</label>
                <textarea id="ingredientes" name="ingredientes" required></textarea>
                
                <label for="preparo">Modo de Preparo</label>
                <textarea id="preparo" name="preparo" required></textarea>
                
                <label for="imagem">Adicionar Imagem</label>
                <div class="upload-wrapper" onclick="document.getElementById('imagem').click()">
                    <input type="file" id="imagem" name="imagem" accept="image/*" onchange="previewImage(event)">
                    <div class="upload-content">
                        <img id="preview" src="" alt="Preview" style="display:none;"/>
                        <p id="upload-text">Clique ou arraste a imagem aqui</p>
                    </div>
                </div>
                
                <button type="submit" class="btn">Salvar Receita</button>
            </form>
        </section>
    </main>
    <script>
        function previewImage(event) {
            const input = event.target;
            const reader = new FileReader();
            reader.onload = function() {
                const preview = document.getElementById('preview');
                const uploadText = document.getElementById('upload-text');
                preview.src = reader.result;
                preview.style.display = 'block';
                uploadText.style.display = 'none';
            };
            if (input.files && input.files[0]) {
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
</body>
</html>