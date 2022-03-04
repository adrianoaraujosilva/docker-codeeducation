Para rodar essa imagem execute o comando:

```diff
docker-compose up -d
```

e acesse a url: localhost:8080

```diff
- A primeira vez que roda o BD demora alguns segundos(máximo 2 minutos) até criar a estrutura do banco e tabela,
- como o NODE aguarda o BD está ON para ficar disponível caso acesse o NGINX nessa "janela" ele irá retornar "502 Bad Gateway".
- Aguarde alguns segundos e atualize a página que o resultado será exibido.
```
