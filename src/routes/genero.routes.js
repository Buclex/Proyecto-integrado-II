// src/routes/genero.routes.js
import { Router } from "express";
import Genero from "../models/Genero.js";

const router = Router();

// Obtener todos los géneros
router.get("/", async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un género por ID
router.get("/:id", async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) return res.status(404).json({ msg: "No encontrado" });
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un género
router.post("/", async (req, res) => {
  try {
    const nuevoGenero = new Genero(req.body);
    const guardado = await nuevoGenero.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un género
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Genero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // aplica validaciones del esquema
    });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un género
router.delete("/:id", async (req, res) => {
  try {
    await Genero.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;