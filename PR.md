
# Eurovisão - EngWeb2025

## 1. Persistência de Dados

A aplicação usa uma base de dados MongoDB para persistir a informação sobre as edições do Festival Eurovisão da Canção.

- **Base de dados**: `eurovisao`
- **Coleção**: `edicoes`
- Cada documento representa uma edição e inclui:
  - `anoEdicao`
  - `organizacao`
  - `vencedor`
  - `musicas` (array com informações sobre as músicas: título, intérprete, país, etc.)

Os dados foram importados para o MongoDB a partir de um ficheiro JSON corrigido, garantindo que não existem campos com acentos (por exemplo, `pais` em vez de `país`).

---

## 2. Setup da Base de Dados

Para configurar a base de dados:

1. Certificar-se que o MongoDB está instalado e a correr localmente na porta padrão `27017`.
2. Importar os dados usando:

```bash
mongoimport --db eurovisao --collection edicoes --file dataset_ready.json --jsonArray
```

3. Confirmar que a coleção foi corretamente criada:

```bash
mongosh
use eurovisao
db.edicoes.find()
```

---

## 3. Instruções de Execução

### 🛠️ Backend (API de Dados)

1. Aceder à pasta `ex1`.
2. Instalar as dependências:

```bash
npm install
```

3. Iniciar o servidor backend:

```bash
npm start
```

O servidor estará disponível em [http://localhost:25000](http://localhost:25000).

### Rotas implementadas:

- `GET /edicoes`: Lista todas as edições (informação básica).
- `GET /edicoesFull`: Lista todas as edições (informação completa com músicas).
- `GET /edicoes/:id`: Devolve o detalhe de uma edição.
- `GET /paises?papel=org`: Lista de países organizadores.
- `GET /paises?papel=venc`: Lista de países vencedores.
- `GET /interpretes`: Lista de intérpretes (nome + país).
- `POST /edicoes`: Adiciona uma nova edição.
- `PUT /edicoes/:id`: Atualiza uma edição.
- `DELETE /edicoes/:id`: Remove uma edição.

---

### 🖥️ Frontend (Interface Web)

1. Aceder à pasta `ex2`.
2. Instalar as dependências:

```bash
npm install
```

3. Iniciar o servidor frontend:

```bash
npm start
```

O servidor estará disponível em [http://localhost:25001](http://localhost:25001).

---

### 🗺️ Navegação Web

- `/`: Lista de todas as edições.
- `/:id`: Página com o detalhe de uma edição.
- `/paises/:pais`: Página com:
  - Tabela de edições em que o país participou (com a música e intérprete).
  - Tabela de edições organizadas por esse país.
- `/interpretes/:interprete`: Página com todas as músicas associadas a um intérprete.

---

## 4. Considerações Técnicas

- **MongoDB** usado como sistema de persistência.
- **Express.js** para o servidor API e para o servidor de frontend.
- **Pug** para a renderização das views HTML.
- **Axios** para a comunicação entre o frontend e o backend.
- **W3.CSS** foi usado para dar um estilo simples às páginas.

---

## 5. Respostas Textuais Pedidas

- As respostas às queries podem ser encontradas no ficheiro queries.txt tal como pedido.

## 6. Notas
- Os dados foram processados para garantir que não existiam campos com caracteres especiais nos nomes (e.g., `pais` em vez de `país`).
- As rotas implementadas seguem a especificação fornecida.
- A separação entre API (dados) e Interface (frontend) foi respeitada.


