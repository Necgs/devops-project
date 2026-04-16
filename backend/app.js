const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ===============================
// LOGS
// ===============================

const logDir = path.join(__dirname, "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logPath = path.join(logDir, "app.log");

function writeLog(level, message) {
  const time = new Date().toISOString();
  const log = `[${time}] ${level}: ${message}\n`;
  fs.appendFileSync(logPath, log);
}


// ===============================
// CONEXIÓN A MONGO
// ===============================

const MONGO_URL = "mongodb://mongo:27017/devops";

mongoose.connect(MONGO_URL, {
  serverSelectionTimeoutMS: 5000, // evita que se quede colgado
})
.then(() => {
  console.log("🟢 MongoDB conectado correctamente");
  writeLog("INFO", "MongoDB conectado correctamente");
})
.catch((err) => {
  console.log("🔴 ERROR CONECTANDO A MONGO:", err.message);
  writeLog("ERROR", "Mongo error: " + err.message);
});

// ===============================
// MODELO RESERVA
// ===============================

const ReservaSchema = new mongoose.Schema({
  nombre: String,
  fecha: String,
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

// ===============================
// RUTAS
// ===============================

// Ruta principal
app.get("/", (req, res) => {
  writeLog("INFO", "Consulta realizada a /");
  res.send("API funcionando");
});

// Crear reserva
app.post("/reserva", async (req, res) => {
  try {
    const { nombre, fecha } = req.body;

    if (!nombre || !fecha) {
      writeLog("WARN", "Reserva con datos incompletos");
      return res.status(400).json({
        mensaje: "Faltan datos (nombre o fecha)",
      });
    }

    const nuevaReserva = new Reserva({ nombre, fecha });
    await nuevaReserva.save();

    writeLog("INFO", `Reserva guardada: ${nombre} - ${fecha}`);

    res.json({
      mensaje: "Reserva guardada correctamente",
      data: nuevaReserva,
    });
  } catch (error) {
    writeLog("ERROR", error.message);
    res.status(500).json({
      mensaje: "Error en el servidor",
    });
  }
});

// ===============================
// INICIAR SERVIDOR
// ===============================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
  writeLog("INFO", `Servidor iniciado en puerto ${PORT}`);
});
