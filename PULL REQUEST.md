# Backend da aplicação <h1>
**Dados salvos em mémoria**
**rota padrão -> http://localhost:3333/**
**Swagger -> http://localhost:3333/api**

## O que foi utilizado
- [NestJs](https://docs.nestjs.com)
- [Prisma](https://www.prisma.io/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)

## Por que NestJS? 
NestJs é um dos frameworks que mais cresceu ao longo dos anos. Ele nos traz uma certa simplicidade e liberdade de criação, além de proporcionar uma alta velocidade de configuração.

### Como criei o Backend

Como dito anteriormente, Nest traz uma facilidade na criação.
Iniciei com o comando ` $ nest new project-name` e ele traz a **node_modules** e seus arquivos, além de também criar a **/src** e os arquivos essenciais, após dei um `$npm run start` para iniciar a aplicação.

- exemplo:

![terminal](https://miro.medium.com/max/1400/1*pPXgnwNwxvR4BmOBlkoRqQ.png)

Com a base criada, partimos para o comando `nest g resource name` para criar um [CRUD](https://docs.nestjs.com/recipes/crud-generator) em Nestjs, optei pela [RestAPI](https://docs.github.com/pt/rest) e com o endpoints básicos.
Após, fiz a instalação do Prisma.

## Por que o Prisma?

Ela possui ótimas características, como:

- tipagem dinâmica;
- simplicidade de tipos;
- rápida, leve e não consome muito recuso da máquina;
- fácil manuseio e aprendizado.

Instalei com `npm i prisma` e após um `npm i @prisma/client` para agilizar.
Feito isso, ele cria uma pasta chamada **prisma** onde contém o arquivo **schema.prisma** e é nele que a mágica  acontece!
Nele você poderá fazer a modelagem do seu banco, seguindo esse exemplo:
![model](https://cdn.hashnode.com/res/hashnode/image/upload/v1641486697612/YYMTmfrph.png?auto=compress,format&format=webp)
ainda dentro disso, criamos um  arquivo **.env** onde ele irá armazenar a url do DATABASE que utilizamos (**PostgreSQL**) que precisa ser colocada no schema.
assim, damos um `npx prisma db push` para enviar o nosso modelo para o banco de dados. 
E pra finalizar a parte do Prisma, usamos um `npx prisma generate` para garantir que estamos no banco certo e também se não contém nenhum erro.

## Por que PostgreSQL?
As principais vantagens são a economia, alto desempenho e código aberto.  **Além de ser gratuito**,
ele suporta um intenso fluxo de dados e se mantém estável.

configurando esta parte, parti para a criação das rotas.

### Service

chegando no service, fiz a injeção do PrismaService no meu service para ter a conversação do que quero fazer com o banco.
- exemplo: 
**@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}**

##### Rota **findAll()**
Nela colocamos uma [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) do objeto (no nosso caso o Car) e declaramos que ela vai ser um [Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
do mesmo.
- exemplo: findAll:Promise<Car[]>
e o retorno dela vai ser um [findMany({})](https://www.prisma.io/docs/concepts/components/prisma-client/crud#read) que trará todos os carros salvos no nosso banco.

##### Rota **Create(dto:dto)**
Nela declarei uma constante com um novo sujestivo (newCar) e armazenei **this.prisma.car.create**, declarando que seu **data** e utilizei o nosso DTO lá de cima para dizer para a aplicação o que cada um vai ser.

- exemplo básico:

data:{
    name: dto.name
}
 após, dei um retorno dessa criação -> **return newCar**

 caso tudo esteja correto, quando chegar na rota de criação ele vai receber os valores e enviar para nosso banco.

##### Rota **FindById(id)**
Nela declaramos uma constante que armazena this.prisma.findUnique, que procura no nosso banco a ÚNICA aparição e utiliza o ID para localizar, já utilizamos um [TRY/CATCH](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch) para garantir que se ele passar faz a ação e se tiver algo errado devolver uma resposta usando o **throw new**.

##### Rota **Update(id, dto)**
Nela temos que chamar a nossa findById(id) para garantir que estamos no carro correto e após fazer um [TRY/CATCH](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch). Na tentativa, passamos um this.prisma.car.update para realizar a atualização do nosso caro. Passamos no where o ID e no data, tipamos as variáveis como o nosso updateDto (que é uma [extensão](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes/extends) do nosso dto de criação).
no erro, passamos um [BadRequest](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/400) caso tenha algo errado.


##### Rota **Delete(id)**
Nela armazenos numa constante o this.findById(id) para temos certeza de que estamos no carro certo e após um [TRY/CATCH](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch). Na tentativa passamos um this.prisma.delete com o Id e retornamos o carro que foi excluido. Caso dê algum problema, temos um [NotFound](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/404) sinalizando que não encontrou o ID digitado.

**FINALIZAMOS O SERVICE**


Agora nos sobrou o controller. Mas este é rápido e fácil de configurar.

Nele utilizamos as ApiTags para nosso swagger sinalizar sobre o que se trata.


##### Rota **Create(dto:dto)**

usamos o método [POST](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) para inserir o carro criado.

##### Rota **FindAll(**

usamos o método [GET](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) para requisitar todos os carros.

##### Rota **FindOne(id)**

usamos o método [GET](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) para requisitar apenas um carro utilizando o ID respectivo.

##### Rota **Update(id, dto)**

usamos o método [PATCH](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) para modificar o que quiseremos do nosso carro.

##### Rota **Remove(id)**

usamos o método [DELETE](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) para retirarmos o nosso carro da aplicação.

