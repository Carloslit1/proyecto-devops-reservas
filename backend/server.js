const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/reservasdb";

app.use(cors());
app.use(express.json());

const logsDir = path.join(__dirname, "logs");
const logFile = path.join(logsDir, "app.log");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function writeLog(level, message) {
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
  const line = `[${timestamp}] ${level}: ${message}\n`;
  fs.appendFileSync(logFile, line);
  console.log(line.trim());
}

mongoose.connect(MONGO_URI)
  .then(() => {
    writeLog("INFO", "Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    writeLog("ERROR", `Fallo en conexión a base de datos: ${err.message}`);
  });

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reserva = mongoose.model("Reserva", reservaSchema);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API de reservas funcionando ✅" });
});

app.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ createdAt: -1 });
    writeLog("INFO", "Consulta de reservas realizada");
    res.json(reservas);
  } catch (error) {
    writeLog("ERROR", `Error al consultar reservas: ${error.message}`);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

app.post("/reservas", async (req, res) => {
  try {
    const { nombre, fecha, hora } = req.body;

    if (!nombre || !fecha || !hora) {
      writeLog("ERROR", "Intento de crear reserva con datos incompletos");
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevaReserva = new Reserva({ nombre, fecha, hora });
    await nuevaReserva.save();

    writeLog("INFO", `Reserva creada para ${nombre} el ${fecha} a las ${hora}`);
    res.status(201).json({ message: "Reserva creada correctamente", reserva: nuevaReserva });
  } catch (error) {
    writeLog("ERROR", `Error al crear reserva: ${error.message}`);
    res.status(500).json({ error: "Error al crear reserva" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  writeLog("INFO", `Servidor backend levantado en puerto ${PORT}`);
});

