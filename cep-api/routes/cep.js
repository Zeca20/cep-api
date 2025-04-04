import express from "express";
import { buscarCEP } from "../services/cepService.js";

const router = express.Router();

router.get("/:cep", async (req, res) => {
  const { cep } = req.params;

  if (!/^\d{5}-?\d{3}$/.test(cep)) {
    return res.status(400).json({ erro: "Formato de CEP inválido." });
  }

  try {
    const resultado = await buscarCEP(cep);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;
