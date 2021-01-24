const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const app = express();

const services = require("./routes/services");


//Middlewares
app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.get("/", (req,res) => {
  res.send('<h1>Bienvenido</h1>');
});

app.use("/api", services);

app.set('port', process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}!`);
});