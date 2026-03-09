import { Router } from "express";
import Director from "../models/Director.js";

const router = Router();

// Obtener todos los directores
router.get("/", async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un director por ID
router.get("/:id", async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ msg: "No encontrado" });
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un director
router.post("/", async (req, res) => {
  try {
    const nuevoDirector = new Director(req.body);
    const guardado = await nuevoDirector.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un director
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un director
router.delete("/:id", async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;