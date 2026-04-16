const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

function log(message) {
  const logMsg = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("/app/logs/app.log", logMsg);
}

app.get("/", (req, res) => {
  log("INFO: Consulta realizada");
  res.send("API funcionando");
});

app.post("/reserva", (req, res) => {
  log("INFO: Nueva reserva creada");
  res.json({ mensaje: "Reserva guardada" });
});

app.listen(3000, () => {
  console.log("Backend corriendo en puerto 3000");
});
