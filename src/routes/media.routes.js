import { Router } from "express";
import multer from "multer";
import path from "path";
import Media from "../models/Media.js";
import Genero from "../models/Genero.js";
import Director from "../models/Director.js";
import Productora from "../models/Productora.js";
import Tipo from "../models/Tipo.js";

const router = Router();

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar conflictos
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB por imagen
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Solo imágenes
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes (JPEG, PNG, GIF)"));
    }
  },
});

// Obtener todas las producciones
router.get("/", async (req, res) => {
  try {
    const medias = await Media.find()
      .populate("genero", "nombre estado")
      .populate("director", "nombres estado")
      .populate("productora", "nombre estado")
      .populate("tipo", "nombre");
    res.json(medias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("genero", "nombre estado")
      .populate("director", "nombres estado")
      .populate("productora", "nombre estado")
      .populate("tipo", "nombre");
    if (!media) return res.status(404).json({ msg: "No encontrado" });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva producción (con subida de imagen)
router.post("/", upload.single("portada"), async (req, res) => { // Cambia "caratula" a "portada" para coincidir con el modelo
  try {
    const { genero, director, productora } = req.body;

    // Validar que sean activos
    const gen = await Genero.findOne({ _id: genero, estado: "Activo" });
    const dir = await Director.findOne({ _id: director, estado: "Activo" });
    const prod = await Productora.findOne({ _id: productora, estado: "Activo" });

    if (!gen) return res.status(400).json({ error: "Género inactivo o no existe" });
    if (!dir) return res.status(400).json({ error: "Director inactivo o no existe" });
    if (!prod) return res.status(400).json({ error: "Productora inactiva o no existe" });

    // Asignar la ruta de la imagen subida
    const nuevaMediaData = { ...req.body };
    if (req.file) {
      nuevaMediaData.portada = `/uploads/${req.file.filename}`; // Ruta relativa para servir la imagen
    }

    const nuevaMedia = new Media(nuevaMediaData);
    const guardada = await nuevaMedia.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar producción
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar producción
router.delete("/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;