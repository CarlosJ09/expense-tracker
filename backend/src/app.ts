import express from "express";
import cors from "cors";
import { router } from "./routes";
import "dotenv/config";
import errorHandler from "@/middlewares/error";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
