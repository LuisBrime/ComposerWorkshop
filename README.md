# Composer Workshop - ITESM CCM
---
PART OF HYPERLEDGER MEETUP MEXICO CITY @ TEC CCM

Este proyecto fue hecho para propósitos educacionales y para el 'Blockchain Workshop' del
ITESM CCM.

El proyecto es una Red de Negocios de 'Blockchain' en Hyperledger Composer para vender casas.
La idea es que personas tienen una forma de verificar fácil y directamente quién es el dueño
de cada casa, de poner una casa a la venta y de crear acuerdos de compra. Todas las transacciones
son grabadas en el Blockchain de Fabric y son inmutables.

- Para más información acerca de [Hyperledger Composer](https://hyperledger.github.io/composer/latest/introduction/introduction.html).
- Para más información acerca de [Hyperledger Fabric](http://hyperledger-fabric.readthedocs.io/en/release/)

Si quieres instalar Composer de manera local, da click [aquí](#composer-local)
---
Detalles de los participantes:
#### Personas
```js
{
    "email": String, // ID
    "firstName": String,
    "lastName": String,
}
``` 
---
Detalles de los activos:
Los activos son los elementos que son intercambiados, modificados, leídos, etc por los participantes.
### Casas
```js
{
    "houseId": String,
    "houseAddress": {
        "street": String,
        "postCode": String,
        "colonia": String,
        "city": String
    },
    "price": Integer,
    "info": String[],
    "houseSize": String,
    "onSale": Boolean,
    "owner": Persona
}
``` 

### Acuerdo de venta
```js
{
    "seller": Persona,
    "buyer": Persona,
    "houseInSale": Casa
}
``` 
El acuerdo de venta es utilizado para poder realizar una transacción de venta entre dos participantes.
---
Detalles de las transacciones:
### Registrar casa para venta
```js
{
    "house": Casa
}
``` 
Permite que una casa esté disponible para venta.

### Venta de casa
```js
{
    "sA": Acuerdo de venta
}
``` 
Esta transacción se realiza cuando se quiere vender la casa, aquí se hace un cambio de "owner" dentro del activo
Casa.
---
## Prueba en Composer Playground
Playground es una herramienta de Hyperledger Composer para realizar pruebas visibles con las redes de negocio.
Se puede usar de manera local o de manera remota.
Para instalar de manera local puedes seguir este [tutorial](https://hyperledger.github.io/composer/latest/installing/installing-index).

Aquí veremos un breve tutorial para probar una red de manera remota.
1. Entra al siguiente [link](https://composer-playground.mybluemix.net/).
![playground_1](./img/playground_1.png "Pantalla de inicio de Playground")
2. Da click en "Deploy a New Business Network".
![playground_2](./img/playground_2.png "Creación de nueva Red de Negocios")
3. Llena los datos que te pide: Nombre de la red, descripción y nombre de la tarjeta de adminitrador de red.
4. Selecciona el tipo de red que desees probar. Puede ser una ya creada, o subir tu propio archivo .bna.
![playground_3](./img/playground_3.png "Selección de Red de Negocios")
5. Da click en "Deploy".
6. Diviértete.

![Have fun gif](https://media.giphy.com/media/3o6UBfwmyyFM9ieUgM/giphy.gif)
---
## Composer local
Se recomienda utilizar un sistema basado en Linux para su fácil instalación. Instalar los [prerequisitos](https://hyperledger.github.io/composer/installing/installing-prereqs).
Es esencial tener nvm, npm, node y Docker.

### Para instalar el ambiente de desarrollo
#### Herramientas (Son opcionales pero necesarias para desarrollo) -- Opcional
composer-cli son los comandos básicos de desarrollo de Composer.
composer-rest-server ayuda a montar una API REST para poder interactuar con la red.
generator-hyperledger-composer ayuda a generar esqueletos de desarrollo de red.
yo es una herramienta para crear esqueletos de aplicaciones o de red.
```
npm install -g composer-cli
npm install -g composer-rest-server
npm install -g generator-hyperledger-composer
npm install -g yo
```
#### Playground (Para probar de manera "bonita" las redes) -- Opcional
```
npm install -g composer-playground
```
### Fabric -- Requerido
1. En un directorio (~/fabric-dev-servers recomendado), descargar el archivo .zip con las herraminetas:
```
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
```
2. Usar los scripts para descargar Hyperledger Fabric de manera local.
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./downloadFabric.sh
```
3. Si es la primera vez que se instala el ambiente, hay que crear una PeerAdmin card:
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh
```
Al terminar de usar Fabric, se puede detener y quitar Fabric:
```
./stopFabric.sh
./teardownFabric.sh
```
Si se utiliza el comando de teardown, hay que volver a crear una PeerAdminCard la próxima vez que se use.

NOTA: Si se quiere reinstalar una nueva versión o estás usando una versión anterior de Composer, se deben de matar y eliminar los contenedores de Docker:
```
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

4. Para empezar la red:
- Hay que crear el archivo .bna:
```
composer archive create -t dir -n . -a dist/house-selling-network.bna
```

- Empezar el ambiente de Composer:
```
cd dist/
composer runtime install -c PeerAdmin@hlfv1 -n house-selling-network
```

- Comenzar con la red de negocios:
```
composer network start -c PeerAdmin@hlfv1 -A admin -S adminpw --archiveFile house-selling-network.bna --file networkadmin.card
```

- Importar la identidad de administrador para poder usarla:
```
composer card import --file networkadmin.card
```

- Para probar si la red está funcionando, se puede hacer un ping:
```
composer network ping -c admin@house-selling-network
```