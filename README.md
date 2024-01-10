# Seidor Car


Projeto de teste técnico para Seidor. Esse é um sistema Web que permite controlar a utilização
de automóveis de uma empresa, para isso foi criado um registro para carros, motorista e também as requisições de veículos

## Requisitos

Este é um projeto base utilizando o NestJS como framework para desenvolvimento de servidores em Node.js, o Prisma para ORM (Object-Relational Mapping) e o Docker para facilitar a gestão do ambiente de desenvolvimento.

- Docker
- Node ^18
- Nestjs
- Prisma ORM
- Class Validator
- Class Transformer
- Eslint
- Jest

##  Executar

Para executar o projeto, basta rodar o docker compose:

Para facilitar, o Docker está se baseando no arquivo .env.exemple para executar,
caso alguma das porta utilizada de erro, basta alterar no .env.exemple e no docker-compose.yml

```bash
  docker compose up -d
```

em seguida execute o codigo para fazer o deploy do banco de dados dentro do docker

```bash
  docker exec -ti seidor-car-api sh
```
e
```bash
  yarn prisma generate | yarn prisma migrate deploy
```
## Regras de negocio

Para esse projeto tomei a liberdade de adicionar algumas regras de negócio:

- Carros:
  A placa do veículo deve ser única no sistema, ao qual verifica se existe quando cadastrar e atualizar, gerando uma exceção caso já exista
Para o cadastro do veículo, todos os campos do body são obrigatórios.
  ````json
    {
      "brand": "Ford",
      "color": "green",
      "plate": "ABC-132A"
    }
  ````

 - Motorista:
    O email de cadastro é único, ao qual se verifica se existe quando cadastrar e atualizar, gerando uma exceção caso já exista.
    ````json
    {
      "name":  "Fulano de tal",
      "document":  "00000000000",
      "license":   "ABC-1234",
      "email":   "test@com.com",
      "phone" : "31999999999"
    }
    ````
## Rotas

O projeto está rodando na porta ``http://localhost:3000``

``Criar Carro``
Rota Post

``http://localhost:3000/car``
body:
````json
{
    "brand": "Ford",
    "color": "green",
    "plate": "ABC-132A"
}
````
````bash
curl --location 'http://localhost:3000/car' \
--header 'Content-Type: application/json' \
--data '{
    "brand": "Ford",
    "color": "green",
    "plate": "ABC-132A"
}'
````
---
``Buscar Carro``

Rota Get

``http://localhost:3000/car``
Variações dessa rota:
```
-Paginado
'http://localhost:3000/car?limit=10&page=1'

-Busca por Cor
http://localhost:3000/car?limit=10&page=1&color=blue

-Busca por Marca

http://localhost:3000/car?limit=10&page=1&color=blue&Bland=Ford

```
````bash
curl --location 'http://localhost:3000/car?limit=10&page=1&color=blue&brand=Ford'
````
---

``Buscar Carro por Id``

Rota Get

``http://localhost:3000/car/cf789bf2-42f7-499d-a8da-fe9fe55a8772``

```bash curl --location 'http://localhost:3000/car/cf789bf2-42f7-499d-a8da-fe9fe55a8772'```

---
``Criar motorista``
Rota Post:

``http://localhost:3000/driver``

Body:
````json
{
  "name":  "Fulano de tal",
  "document":  "00000000000",
  "license":   "ABC-1234",
  "email":   "test@com.com",
  "phone" : "31999999999"
}

````

```bash
 curl --location 'http://localhost:3000/driver' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name":  "Fulano de tal",
  "document":  "00000000000",
  "license":   "ABC-1234",
  "email":   "test@com.com",
  "phone" : "31999999999"
}'
 ```
---

``Buscar Motorista``
Rota Get

``http://localhost:3000/driver``

Variações dessa rota:
```
-Paginado
'http://localhost:3000/driver?limit=10&page=1'

-Busca por nome
http://localhost:3000/driver?limit=10&page=1&name=Fulano


```
````bash
curl --location 'http://localhost:3000/driver?limit=10&page=1&name=Fulano'
````
---

``Buscar Por Id``

Rota get

``http://localhost:3000/driver/cf789bf2-42f7-499d-a8da-fe9fe55a8772``

```bash curl --location 'http://localhost:3000/driver/cf789bf2-42f7-499d-a8da-fe9fe55a8772'```

---

``Solicitação de carro``

``Criar Solicitação``

Rota Post

``http://localhost:3000/pick-up-car``

Body:
````json
{
    "idCar": "f259bfff-4b00-42b5-a52c-331480084eaa",
    "idDriver": "3a158048-8442-40d5-8f1d-e5a3a0382af4",
    "description": "levando o chefe para o trabalho",
    "initPicKUp": "2024-01-10T13:51:38.423"
}
````

````bash
curl --location 'http://localhost:3000/pick-up-car' \
--header 'Content-Type: application/json' \
--data '{
    "idCar": "f259bfff-4b00-42b5-a52c-331480084eaa",
    "idDriver": "3a158048-8442-40d5-8f1d-e5a3a0382af4",
    "description": "levando o chefe",
    "initPicKUp": "2024-01-10T13:51:38.423",
    "endPickUp": "2024-01-13T13:51:38.423"
}'
````
---
