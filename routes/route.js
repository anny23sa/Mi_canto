const express = require('express');
const router = express.Router();
const fs = require('fs')
const readRepertorio = () => JSON.parse(fs.readFileSync("./repertorio.json", "utf8"));
const writeRepertorio = (data) => fs.writeFileSync("./repertorio.json", JSON.stringify(data, null, 2), "utf8");
// GET: Leer todas las canciones
router.get("/canciones", (req, res) => {
try {
const repertorio = readRepertorio();
res.json(repertorio);
} catch (error) {
console.error("Error al leer el archivo:", error);
res.status(500).send("Error al leer el archivo.");
}
});
// POST: Crear una nueva canción
router.post("/canciones", (req, res) => {
try {
const nuevaCancion = req.body;
const repertorio = readRepertorio();
repertorio.push(nuevaCancion);
writeRepertorio(repertorio);
res.status(201).send("Canción agregada correctamente.");
} catch (error) {
console.error("Error al agregar la canción:", error);
res.status(500).send("Error al agregar la canción.");
}
});
// PUT: Actualizar una canción existente
router.put("/canciones/:id", (req, res) => {
try {
const { id } = req.params;
const datosActualizados = req.body;
const repertorio = readRepertorio();
const index = repertorio.findIndex((cancion) => cancion.id === parseInt(id));
if (index !== -1) {
repertorio[index] = { ...repertorio[index], ...datosActualizados };
writeRepertorio(repertorio);
res.send("Canción actualizada correctamente.");
} else {
res.status(404).send("Canción no encontrada.");
}
} catch (error) {
console.error("Error al actualizar la canción:", error);
res.status(500).send("Error al actualizar la canción.");
}
});
// DELETE: Eliminar una canción
router.delete("/canciones/:id", (req, res) => {
try {
const { id } = req.params;
const repertorio = readRepertorio();
const nuevoRepertorio = repertorio.filter((cancion) => cancion.id !== parseInt(id));
if (repertorio.length !== nuevoRepertorio.length) {
writeRepertorio(nuevoRepertorio);
res.send("Canción eliminada correctamente.");
} else {
res.status(404).send("Canción no encontrada.");
}
} catch (error) {
console.error("Error al eliminar la canción:", error);
res.status(500).send("Error al eliminar la canción.");
}
});






//router.get('/canciones', (req, res)=>{ 
    try {
        const repertorio = JSON.parse(fs.readFileSync("./repertorio.json", "utf8"));
        res.json(repertorio)
    } catch (error) {
        console.error('error al leer el archivo:', error);
        res.status(500).send("Error al leer el archivo.");
    }
//});
//importar
module.exports = router;