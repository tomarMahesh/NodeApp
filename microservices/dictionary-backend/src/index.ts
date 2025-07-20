import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerDoc } from "./swagger";

export const app = express();

app.use(cors({
  origin: "http://localhost:3001",  // Allow only frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(bodyParser.json());

// Register routes
app.use("/api", router);

// Enable Swagger ONLY in development
if (NODE_ENV === "development") {
  console.log("✅ Swagger enabled in dev mode");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

// Only start server if not in test
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
