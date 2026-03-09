import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

const Tipo = mongoose.model("Tipo", tipoSchema);

export default Tipo;