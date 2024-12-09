# postgree não utilizados
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker run --name some2-postgres -p 5432:5432 -e POSTGRES_PASSWORD=senha -d postgres
docker run -d --name some3-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydatabase -p 5432:5432 postgres


# postgre utilizado
docker run -d --name local-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 postgres

# pgadmin
docker pull dpage/pgadmin4
docker run -d --name pgadmin -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=admin -p 5050:80 dpage/pgadmin4:latest

# iniciando projeto de api com Postgre, Sequelize
npm init -y
npm install express
npm install nodemon
npx eslint --init   ## commonjs
npm install --save-dev eslint-config-prettier    ## ver aqruivo eslint.config.mjs

# sequelize https://sequelize.org/docs/v6/getting-started/
npm install --save sequelize
npm install --save pg pg-hstore ## Postgres
npm install --save-dev sequelize-cli
# criar o arquivo .sequelizerc com os caminhos das configurações e executar o comando em seguida
npx sequelize init
# verificar as configurações em /home/mcsomenzari/Documents/git/tasklist/src/config/config.json
npx sequelize db:create  ### Cria o banco de dados
npx sequelize migration:create --name=create-users   ### Cria o migration da tabela users
npx sequelize db:migrate   ### cria a tabela no banco de dados
npx sequelize migration:create --name=create-tasks 
npx sequelize db:migrate   ### cria a tabela no banco de dados

# ao executar a aplicação verificar o caminho do arquivo src/config/config.json no arquivo de configuração
# src/db/models/index.js (linha 9)

# para gerar hash
npm install bcrypt

# para trabalhar com token jwt
npm install jsonwebtoken

# validar de campos/objetos
npm install yup