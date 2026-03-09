import mongoose from "mongoose";

const productoraSchema = new mongoose.Schema(
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
    slogan: {
      type: String,
      default: "",
      trim: true,
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Productora = mongoose.model("Productora", productoraSchema);

export default Productora;