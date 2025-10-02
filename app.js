import express from "express";
import employeesRouter from "#api/employees"; // <-- ADDED

const app = express();
export default app;

// Parse JSON bodies (must be before routes that read req.body)
app.use(express.json());

// simple logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// root route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// ✅ Mount ALL /employees routes via the router
app.use("/employees", employeesRouter);

// 404 for anything else
app.use((req, res) => {
  res.sendStatus(404);
});

//  Catch-all error handler (500)
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.sendStatus(500);
});
