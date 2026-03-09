import { Router } from "express";
import Tipo from "../models/Tipo.js";

const router = Router();

// Obtener todos
router.get("/", async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) return res.status(404).json({ msg: "No encontrado" });
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear
router.post("/", async (req, res) => {
  try {
    const nuevoTipo = new Tipo(req.body);
    const guardado = await nuevoTipo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Tipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Tipo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;