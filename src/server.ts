import express from "express";
import { rateLimiter } from "./middleware/rateLimiter";
import { rateLimitRules } from "./config/rateLimitRules";

const app = express();

app.set("trust proxy", true);

app.use(rateLimiter(rateLimitRules.default));

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.post(
  "/login",
  rateLimiter(rateLimitRules.login),
  (req, res) => {
    res.send("Login endpoint");
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});