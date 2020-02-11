# moneyexchange-web

Money Exchange es un proyecto encargado de intercambiar divisas

Este sistema fue desarrollado en:

- SPA angular 8
- Servicios api rest .net core 2.2 (documentacion swagger.html)
- Base de Datos Sql server
- Conección con Entity Framework Core
- Los Unit Test se encuentrar dentro de los repositorios de cada repositorio (front y back)

## Los proyectos se desplegaron y sus links de acceso son los siguientes:

- app: http://moneyexchange-dev.s3-website.us-east-2.amazonaws.com
- api: http://appscurrencyexchangeeu2.azurewebsites.net (acceso disponible a documentación swagger.html)

## Los links de los repositorios son los siguientes

- app: https://github.com/linkinrodx/moneyexchange-web
- api: https://github.com/linkinrodx/moneyexchange-api

## Cadena de conneccion a la bd sql server

- "MoneyExchange": "Server=tcp:asdbcurrencyexchangeeu2.database.windows.net,1433;Initial Catalog=adbcedeveu2;Persist Security Info=False;User ID=linkinrodx;Password=Facil12345;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

## Usuarios de prueba para acceso al sistema (user : password)

- admin     :     admin
- Rodrigo   :     Facil12345
- Carlos    :     123456
- Pedro     :     Pedro123

## Listado de Servicios (documentacion en swagger.html)

- Currency/Exchange
- Security/Login