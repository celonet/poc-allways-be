## **Sobre o projeto All Ways**

O projeto All Ways é uma iniciativa interna da Concrete que tem como objetivo formar os novos colaboradores simulando um projeto real. Para isso, trabalhamos em times multidisciplinares e alinhados aos principios do Scrum, para criar produtos de forma empírica, interativa e incremental.

Encare esta aplicação como um meio para entender os principios do mindset agile, e o fortalecimento do trabalho em equipe.

## **Por que usar docker-compose?**

Para iniciar esse mini tutorial, vamos esclarecer a necessidade de usar a solução do Docker Compose.

Vamos imaginar um cenário onde há necessidade de prover vários ambientes para distintos serviços, sendo eles o servidor de frontend, o banco de dados e uma API para aplicação node.
Configurar um container para cada aplicação e fazer com que eles se comuniquem é bem complicado, e exige um esforço maior do desenvolvedor para entender cada componente da estrutura e administrar tudo isso.

O Docker Compose tem o objetivo de facilitar essa configuração e permitir que ela seja reproduzível em qualquer ambiente no qual o Docker esteja instalado.

## **O que é o Docker Compose?**

O Docker Compose tem o propósito de orquestrar a criação e administração de um conjunto de containers a partir do uso de um simples arquivo de configuração em formato YAML. Nesse arquivo definimos todos os containers que serão usados pelo projeto, as conexões entre si, volumes usados (para permitir o armazenamento de dados de forma persistente), e demais configurações que você pode passar para o Docker.

Com esse arquivo de configuração, basta um simples comando na mesma pasta no qual o arquivo está localizado para que o Docker comece a trabalhar: Em alguns segundos, ele cria os containers, faz download das imagens correspondentes se necessário, e também inicia os containers especificados no arquivo, de forma bastante automatizada e segura.

## **Hands-On: Instalação e configuração do Docker Compose**

### Pré-requisitos:

I. Ter o Docker e Docker Compose instalados na sua máquina

- [Link para instalação do Docker](https://docs.docker.com/install/)
- [Link para instalação do Docker Compose](https://docs.docker.com/compose/install/)

Caso você esteja trabalhando com OSX, o Docker Compose já vem por padrão no instalador do Docker. As instruções de instalação para cada sistema operacional, estão descritas nos links acima.

**Sempre siga a documentação oficial do Docker** :wink:

II. Realize o download do repositório do projeto All Ways com o seguinte comando:

`git clone <URL do repositório>`

III. Navegue até a pasta onde foi realizado o download do repositório e certifique-se sobre a existência do arquivo docker-compose.yml com o comando:

`ls`

Para visualizar o contéudo do arquivo, execute:

`cat docker-compose.yml`

Neste momento, você deve estar visualizando um conteúdo semelhante a este:


```
version: '2'

services:
  api: # Node.js App
    container_name: api
    build: ./server/
    ports:
      - "3000:3000" # Expose API port
      - "9229:9229" # Expose Node process debug port (disable in production)
    environment: # Set ENV vars
     - NODE_ENV=local
     - PORT=3000
     - DBURL=mongodb://mongo
    volumes: # Attach local book data directory
      - ./server:/usr/src/app
    links:
      - database

  database: # Container for MongoDB
    container_name: mongo
    image: mongo
    volumes: # Attach volume local data directory
      - ./mongo:/data/configdb
    ports: # Expose Mongo port
      - "27017:27017"
```


Breve descrição dos serviços:

- Dois containers, o primeiro criando a imagem da api do node a partir do Dockerfile, localizado na pasta server. O segundo é o nosso banco de dados MongoDB.
- No parâmetro ports, definimos as portas que o computador local deve redirecionar para as portas dos containers.
- Em volumes, definimos o caminho da máquina hospedeira, onde os dados do docker serão armazenados, apontando para o volume do container. (persistência de dados).
- O parâmetro image serve para fazer o download das imagens dos nossos serviços.
- Em links, definimos a comunicação entre os containers. Nesse exemplo, a API do Node se comunica com o Mongo.

IV. Agora na pasta no qual o docker-compose.yml foi configurado, vamos executar o comando `docker-compose up --build`, parar criar e executar o containers definidos no arquivo.

Para validar se os containers foram criados, e estão de pé, execute o comando `docker-compose ps`

Caso você queira acompanhar os logs, podemos executar o comando `docker-compose logs`.

Dica: Sempre que precisar gerenciar a estrutura do compose como um todo, utilize sempre o comando `docker-compose` para iniciar, parar e remover TODOS os containers.


Seu ambiente de desenvolvimento está pronto! :smile:

Caso vc tenha mais dúvidas sobre o Docker, sugiro a leitura dos posts abaixo:

- [As vantagens de usar Docker](https://www.concrete.com.br/2017/11/08/as-vantagens-com-a-utilizacao-do-docker/)
- [Docker Compose: O que é? Para que serve? O que come?](https://www.concrete.com.br/2017/12/11/docker-compose-o-que-e-para-que-serve-o-que-come/)

Esse documento é completamente empírico, interativo e incremental, sinta-se a vontade para sugestões e melhorias. Bom trabalho!

## **Create default .env file:**
```
NODE_ENV=development

PORT=3000

DB_URL=mongodb://localhost:27017/allways
DB_URL_TEST=mongodb://localhost:27017/allways-test
```
