const express = require("express")
const morgan = require("")
const routes = require('./routes/route')
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan("dev"))
app.use('/', routes)
app.use(cors()); 

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))