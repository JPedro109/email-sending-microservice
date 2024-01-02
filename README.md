# Microsserviço de Envio de Email - Back-end
[![Coverage Status](https://coveralls.io/repos/github/JPedro109/email-sending-microservice/badge.svg?branch=staging)](https://coveralls.io/github/JPedro109/email-sending-microservice?branch=staging)

<p>🚀 Aplicação voltada para envio de email</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Envio de Email

# Tecnologias
- Node
- Typescript
- RabbitMQ
- Nodemailer
- Jest

# Padrões Utilizados
- Conceitos de Clean Architecture
- SOLID
- Adapter

# Execução

Para executar a aplicação, instale as dependências com o comando abaixo:
```sh
  yarn install
```

Depois crie um arquivo .env com suas variáveis de ambiente e execute a orquestração de contêineres, com o comando abaixo:

```sh
  docker-compose up -d
```

Por último crie a fila com o nome definido nas variáveis de ambiente na url http://localhost:15672 e depois rode os testes para validar o funcionamento da aplicação com o comando abaixo:

```sh
  docker exec -it email-sending-microservice yarn test
```