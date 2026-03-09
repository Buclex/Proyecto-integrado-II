// src/models/Media.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    sinopsis: {
      type: String,
      default: "",
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    portada: {
      type: String,
      default: "",
      trim: true,
    },
    anioEstreno: {
      type: Number,
      required: true,
    },
    genero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genero",
      required: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
      required: true,
    },
    productora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productora",
      required: true,
    },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tipo",
      required: true,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
