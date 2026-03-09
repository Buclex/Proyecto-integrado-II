// src/routes/productora.routes.js
import { Router } from "express";
import Productora from "../models/Productora.js";

const router = Router();

// Obtener todas
router.get("/", async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) return res.status(404).json({ msg: "No encontrada" });
    res.json(productora);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear
router.post("/", async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body);
    const guardada = await nuevaProductora.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Productora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // aplica validaciones
    );
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Productora.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;