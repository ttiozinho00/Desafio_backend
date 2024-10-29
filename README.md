# Desafio_backend


- instalar modulos

```
yarn install ou npm install
```

- instalar modulos docker

```
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 rabbitmq
```


```
docker run -d --name redis -p 6379:6379 redis
```


- iniciar o servidor

```
yarn dev ou npm dev
``` 

- iniciar modulos docker

```
sudo docker start redis
```


```
sudo docker start some-rabbit
```

- testar a aplicação

```
http://localhost:3000/send-message
```

- use o metodo POST com postman ou insomnia.


```
{
  "phone": "+5511999999999",
  "message": "Olá, seja bem-vindo(a)!"
}
```

- formato em json para informar os dados