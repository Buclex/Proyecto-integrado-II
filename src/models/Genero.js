import mongoose from "mongoose";

const generoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo",
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // genera automáticamente createdAt y updatedAt
  }
);

const Genero = mongoose.model("Genero", generoSchema);

export default Genero;