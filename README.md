# Api Teste Ilumeo

Para executar a aplicação , é nescessario ter no ambiente local Docker e docker compose

## Referência

- [Docker](https://www.docker.com/)
- [docker compose](https://docs.docker.com/compose/)

## Executanto o Projeto

Apos ter baixado o repositorio e as dependencias acima citadas , execute o docker compose pra rodar o projeto

```bash
   docker compose up --build
```

Apos completar o comando acima , o servidor estara up em

http://localhost:33333/

## Rodando os testes

Para rodar os testes, acesse a instancia do docker e execute os teste

```bash
  docker exec -it app bash
  npm test
```

### Deploy

deploy realizado no render

https://api-ilumeo.onrender.com
