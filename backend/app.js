const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// ===============================
// CONFIGURACIÓN DE LOGS
// ===============================

// Carpeta de logs dentro del backend
const logDir = path.join(__dirname, "logs");

// Crear carpeta si no existe (IMPORTANTE para Docker/AWS)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Archivo de log
const logPath = path.join(logDir, "app.log");

// Función de logs
function writeLog(level, message) {
  const time = new Date().toISOString();
  const log = `[${time}] ${level}: ${message}\n`;
  fs.appendFileSync(logPath, log);
}

// ===============================
// RUTAS
// ===============================

// Ruta principal
app.get("/", (req, res) => {
  writeLog("INFO", "Consulta realizada a /");
  res.send("API funcionando");
});

// Crear reserva
app.post("/reserva", (req, res) => {
  try {
    const { nombre, fecha } = req.body;

    if (!nombre || !fecha) {
      writeLog("WARN", "Intento de reserva con datos incompletos");
      return res.status(400).json({
        mensaje: "Faltan datos (nombre o fecha)",
      });
    }

    writeLog("INFO", `Reserva creada para ${nombre} en ${fecha}`);

    res.json({
      mensaje: "Reserva guardada correctamente",
      data: { nombre, fecha },
    });
  } catch (error) {
    writeLog("ERROR", `Error al crear reserva: ${error.message}`);
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
