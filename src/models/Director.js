import mongoose from "mongoose";

const directorSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo",
    },
  },
  {
    timestamps: true, // genera automáticamente createdAt y updatedAt
  }
);

const Director = mongoose.model("Director", directorSchema);

export default Director;