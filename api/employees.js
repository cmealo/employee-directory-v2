import express from "express";
import employees from "#db/employees";

const router = express.Router();

// GET /employees
router.get("/", (_req, res) => {
  res.json(employees);
});

// GET /employees/random  (keep the “random” route)
router.get("/random", (_req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// GET /employees/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (!employee) return res.status(404).send("Employee not found");
  res.json(employee);
});

// POST /employees  (V2 requirement)
router.post("/", (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("Request must have a body.");
  }
  const { name } = req.body ?? {};
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Name must be provided.");
  }

  const nextId = employees.length
    ? Math.max(...employees.map((e) => e.id)) + 1
    : 1;

  const created = { id: nextId, name: name.trim() };
  employees.push(created);
  return res.status(201).json(created);
});

export default router;
