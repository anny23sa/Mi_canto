const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/canciones', (req, res)=>{ 
    try {
        const repertorio = JSON.parse(fs.readFileSync("./repertorio.json", "utf8"));
        res.json(repertorio)
    } catch (error) {
        console.error('error al leer el archivo:', error);
        res.status(500).send("Error al leer el archivo.");
    }
});