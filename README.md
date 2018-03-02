# Composer Workshop - ITESM CCM
---
Este proyecto fue hecho para propósitos educacionales y para el 'Blockchain Workshop' del
ITESM CCM.

El proyecto es una Red de Negocios de 'Blockchain' en Hyperledger Composer para vender casas.
La idea es que personas tienen una forma de verificar fácil y directamente quién es el dueño
de cada casa, de poner una casa a la venta y de crear acuerdos de compra. Todas las transacciones
son grabadas en el Blockchain de Fabric y son inmutables.

- Para más información acerca de [Hyperledger Composer](https://hyperledger.github.io/composer/latest/introduction/introduction.html).
- Para más información acerca de [Hyperledger Fabric](http://hyperledger-fabric.readthedocs.io/en/release/)

---
Detalles de los participantes:
#### Personas
```json
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
```json
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
```json
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
```json
{
    "house": Casa
}
``` 
Permite que una casa esté disponible para venta.

### Venta de casa
```json
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
4. Da click en "Deploy".
5. Diviértete.
![Have fun gif](https://media.giphy.com/media/3o6UBfwmyyFM9ieUgM/giphy.gif)