import { Router } from "express";

const router = Router();

let products = [];

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;

    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/:pid", (req, res) => {
  try {
    let { pid } = req.params;
    console.log(pid);

    const product = productManager.getProductById(pid);
    if (product) {
      res.json({ product });
    } else {
      res.send({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
