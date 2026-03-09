import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import generoRoutes from "./routes/genero.routes.js";
import directorRoutes from "./routes/director.routes.js";
import productoraRoutes from "./routes/productora.routes.js";
import tipoRoutes from "./routes/tipo.routes.js";
import mediaRoutes from "./routes/media.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api/generos", generoRoutes);
app.use("/api/directores", directorRoutes);
app.use("/api/productoras", productoraRoutes);
app.use("/api/tipos", tipoRoutes);
app.use("/api/medias", mediaRoutes);

//img
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});