const express = require("express")
const morgan = require("morgan")
//roter
const router = require('./routes/route')
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan("dev"))
app.use('/', router)
app.use(cors()); 

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))