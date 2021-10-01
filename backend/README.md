# Parte back 

Esta es la parte frobackendntend hecha en Node con typescript para el challenge provisto por Pickit.

## Endpoints

#
### Autos:
* GET http://localhost:8000/autos Obtiene el listado de los autos. 
* POST http://localhost:8000/autos Alta de auto.

* GET http://localhost:8000/autos/{:id} Detalle del auto por id. 
* PUT http://localhost:8000/autos/{:id} Modificación del auto. 
* DELETE http://localhost:8000/autos/{:id} Eliminarción del auto.

* GET http://localhost:8000/autos/{:id}/transacciones Obtiene las transacciones del auto.
* POST http://localhost:8000/autos/{:id}/transacciones Crea una transacción para el auto.

### Servicios:
* GET http://localhost:8000/servicios Obtiene el listado de los servicios. 
* POST http://localhost:8000/servicios Alta de auto.

* GET http://localhost:8000/servicios/{:id} Detalle del servicio por id. 
* PUT http://localhost:8000/servicios/{:id} Modificación del servicio. 
* DELETE http://localhost:8000/servicios/{:id} Eliminarción del servicio.
### Propietarios:
* GET http://localhost:8000/propietarios Obtiene el listado de los propietarios. 
* POST http://localhost:8000/propietarios Alta de propietario.

* GET http://localhost:8000/propietarios/{:id} Detalle del propietario por id. 
* PUT http://localhost:8000/propietarios/{:id} Modificación del propietario. 
* DELETE http://localhost:8000/propietarios/{:id} Eliminarción del propietario.

## Variables de entorno
    export DB_HOST="localhost"
    export DB_USER="root"
    export DB_PWD=""
    export DB_NAME="mecanicos"

## Script
#
En la carpeta del directorio podes correr este comando, para evitar errores es necesario tener la parte del backend levantada:

### `npm run dev`

Runs the app in the development mode.\
Abrir [http://localhost:8000](http://localhost:3000) para verlo en el navegador

