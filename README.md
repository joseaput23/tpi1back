**Trabajo Integrador nº1 (Backend)**

En este proyecto se esta desarrollando un CRUD donde a traves de una conexion a un base de datos y una colleccion de mongodb permitira la interaccion de datos donde se podra generar , consultar, modificar y borrar datos de la misma

1. **Preparar carpeta para instalar proyecto**

   Crear una carpeta donde clonar el repositorio o desconpactar el proyecto

2. **_Instalar dependencias:_**
   abrir el vscode y abriendo la consola o desde el cmd de windows entrando el directorio del proyecto

   ```bash
   npm install
   ```

   Se instalan las dependencias que estan definidas en el package.json y se generara la carpeta node_modules

3. **Configurar MongoDB:**
   Asegúrate de tener MongoDB instalado localmente o configurar la conexión con una base de datos remota editando el archivo `src/mongodb.js`.

## Uso

##### Ejecutar la aplicación

desde la consola se debe proceder a arrancar el servidor, Este comando inicia el servidor Node.js que ejecuta tu aplicación. Asegúrate de ejecutar npm install primero para instalar todas las dependencias necesarias listadas en package.json. El servidor estará disponible en http://localhost:3008 por defecto en caso de no definicion sera el 3000, a menos que especifiques un puerto diferente a través de la variable de entorno PORT. en el arcchivo

```bash
npm start o npm run dev
```

##### Endpoints Disponibles

los endpoints constituyen las rutas que van a permitir que el servidor reaccione de la forma necesaria a la accion que se quiere ejecutar

- `GET /`: Página principal de entrada.
- `GET /articulos`: Obtener todos los artículos.
- `GET /articulos/:id`: Buscar artículo por ID.
- `GET /articulos/nombre/:nombre`: Buscar artículo por nombre.
- `POST /articulos/:COD`: Insertar un nuevo artículo.
- `PUT /articulos/:COD`: Modificar un artículo existente.
- `DELETE /articulos/:id`: Eliminar un artículo por ID.

## Ejemplos de Uso

#### Obtener todos los artículos

```bash
 http://localhost:3000/articulos
```

trae todos los articulos

#### Buscar artículo por ID

```bash
 http://localhost:3008/articulos/123
```

trae el articulo 123 indicado o error en caso de no existir

#### Insertar un nuevo artículo

```bash
 -X POST http://localhost:3000/articulos/123 -H "Content-Type: application/json" -d '{"COD": 123, "DESCRI": "Nuevo artículo"}'
```

crea un nuevo articulo con el codigo indicado

#### Modificar un artículo existente

```bash
 -X PUT http://localhost:3000/articulos/123 -H "Content-Type: application/json" -d '{"DESCRI": "Artículo modificado"}'
```

modifica un articulo existente con el valor de los campos que se define

#### Eliminar un artículo por ID

```bash
 -X DELETE http://localhost:3000/articulos/123
```
