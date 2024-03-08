import { Router } from "express";
import ProductManager from "../ProductManager.js";
import fs from "fs";
import { error } from "console";

let productManager = new ProductManager();

const router = Router();

let products = [];

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    let products = await getProducts();
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

router.get("/:pid", async (req, res) => {
  try {
    let { pid } = req.params;
    console.log(pid);
    let products = await getProducts();
    if (products.find((product) => product.id === parseInt(pid))) {
      res.json(products.find((product) => product.id === parseInt(pid)));
    } else {
      res.send({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/:pid", async (req, res) => {
  let { pid } = req.params;
  let products = getProducts();
  if (products.find((i) => i.id === parseInt(id))) {
    let product = products.find((i) => i.id === parseInt(pid));
    let indexProduct = products.indexOf(product, 0);
    products.splice(indexProduct, 1);
    await rewriteJSON(products);
    res.send({ status: "Success", message: "Producto Eliminado." }); //Si no se indica retorna status HTTP 200 OK.
  } else {
    res.send({ msg: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  let product = req.body;
  await productManager.createProduct(product);
  res.send({ status: "Success", message: "Producto Agregado." });
});

export default router;

const getProducts = async () => {
  try {
    let productsFile = await fs.promises.readFile(
      "../files/products.JSON",
      "utf-8"
    );
    products = JSON.parse(productsFile);
    return products;
  } catch (error) {
    console.error("error en obtener JSON");
  }
};

const rewriteJSON = async (products) => {
  try {
    await fs.promises.writeFile(
      "../files/products.JSON",
      JSON.stringify(products)
    );
  } catch (error) {
    console.error("error en reescribir JSON");
  }
};
