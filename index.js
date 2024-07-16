const express = require("express");
const app = express();

const { connectToMongodb, disconnectToMongodb } = require("./src/mongodb");

app.use(express.json());

//Middleware global para todos los endpoint de nuestra aplicación
app.use((req, res, next) => {
  res.header("content-type", "application/json; charset=utf-8");
  next();
});
// MENSAJE INICIAL
app.get("/", (req, res) => {
  res.status(200).send("Hola pagina principal de entrada");
});
// TODOS LOS ARTICULOS
app.get("/articulos", async (req, res) => {
  const client = await connectToMongodb();
  if (!client) {
    res.status(500).send("error conexion cliente");
    return;
  }
  const db = client.db("productos");
  const articulos = await db.collection("articulos").find().toArray();
  await disconnectToMongodb();
  res.json(articulos);
});
// BUSQUEDA X COD ARTICULO
app.get("/articulos/:id", async (req, res) => {
  const articuloId = parseInt(req.params.id) || 0;
  //console.log(req.params.id);
  //console.log(articuloId);
  const client = await connectToMongodb();
  if (!client) {
    res.status(500).send("error conexion cliente");
    return;
  }
  const db = client.db("productos");
  const articulo = await db
    .collection("articulos")
    .findOne({ COD: articuloId });
  await disconnectToMongodb();
  //console.log(articuloId);
  !articulo
    ? res.status(404).send("No existe ese articulo")
    : res.json(articulo);
});
// BUSQUEDA X DESCRIPCION ARTICULO
app.get("/articulos/nombre/:nombre", async (req, res) => {
  const nombreArticulo = req.params.nombre.toLowerCase();

  const client = await connectToMongodb();
  if (!client) {
    return res.status(500).send("Error de conexión con la base de datos");
  }
  // console.log(nombreArticulo);
  try {
    const db = client.db("productos");

    const articulos = await db
      .collection("articulos")
      .find({ DESCRI: { $regex: `.*${nombreArticulo}.*`, $options: "i" } })
      .toArray();

    if (articulos.length === 0) {
      return res.status(404).send("No existen artículos con ese nombre");
    }

    res.json(articulos);
  } catch (err) {
    console.error("Error al buscar artículos:", err);
    res.status(500).send("Error interno al buscar artículos");
  } finally {
    await disconnectToMongodb(client);
  }
});

//inserto registro
app.post("/articulos/:COD", async (req, res) => {
  const nuevoArticulo = req.body;
  //console.log(req.body, nuevoArticulo);
  if (Object.keys(nuevoArticulo).lenght === 0) {
    res.status(422).send("Error en el tipo de datos");
  }
  const client = await connectToMongodb();
  if (!client) {
    res.status(500).send("error conexion cliente");
    return;
  }
  const collection = client.db("productos").collection("articulos");
  collection
    .insertOne(nuevoArticulo)
    .then((response) => res.status(201).json(nuevoArticulo))
    .catch((error) =>
      res.status(500).send("Error al crear el nuevo articulo..")
    )
    .finally(async () => {
      await disconnectToMongodb();
    });
  // res.send("OK");
});

//MODIFICAR REGISTRO
app.put("/articulos/:COD", async (req, res) => {
  const COD = parseInt(req.params.id) || 0;
  const modiArticulo = req.body;
  // console.log(req.body, modiArticulo);
  if (Object.keys(modiArticulo).lenght === 0) {
    res.status(422).send("Error al actualizar el registro..");
  }
  const client = await connectToMongodb();
  if (!client) {
    res.status(500).send("error conexion cliente");
    return;
  }
  collection = client.db("productos").collection("articulos");
  collection
    .updateOne({ COD }, { $set: modiArticulo })
    .then((response) => res.status(200).json(modiArticulo))
    .catch((error) => res.status(500).send("Error al actualizar el registro"))
    .finally(async () => {
      await disconnectToMongodb();
    });
});

//BORRAR REGISTRO
app.delete("/articulos/:id", async (req, res) => {
  const COD = parseInt(req.params.id) || 0;
  if (!req.params.id) {
    res.status(422).send > "Error en el formato de los datos";
    return;
  }
  const client = await connectToMongodb();
  if (!client) {
    res.status(500).send("Error de conección..");
  }
  const collection = client.db("productos").collection("articulos");
  //console.log(COD);
  collection
    .deleteOne({ COD })
    .then((response) => {
      if (response.deletedCount === 0) {
        res.status(404).send(`No existe el registro con ID: ${id}`);
      } else {
        res.status(201).send(`Registro eliminado con exito`);
      }
    })
    .catch((error) => res.status(500).send("Error al borrar el registro.."))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});
// DEFINICION DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
