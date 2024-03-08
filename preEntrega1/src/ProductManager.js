import fs from "fs";

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    (this.id = id), (this.title = title);
    (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

class ProductManager {
  #products;
  #productsDirPath;
  #productsFilePath;
  #filesystem;

  constructor() {
    this.#products = [];
    this.#productsDirPath = "./files/";
    this.#productsFilePath = this.#productsDirPath + "products.JSON";
    this.#filesystem = fs;
  }

  //metodos
  createProduct = async (title, description, price, thumbnail, code, stock) => {
    let products = await this.getProducts();
    for (let i = 0; i < products.length; i++) {
      if (products[i].code == code) {
        console.log(`El codigo ${code} se repite`);
        return;
      }
    }

    let newProduct = new Product(
      products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.#products.push(newProduct);
    await this.rewriteJSON();
  };

  getProducts = async () => {
    let productsFile = await this.#filesystem.promises.readFile(
      this.#productsFilePath,
      "utf-8"
    );
    //console.log(productsFile);

    this.#products = JSON.parse(productsFile);
    //console.log(this.#products);
    return this.#products;
  };

  getProductById = async (id) => {
    this.#products = await this.getProducts();
    if (this.#products.find((product) => product.id === parseInt(id))) {
      return this.#products.find((product) => product.id === parseInt(id));
    } else {
      console.log(`Product ID ${id} Not found`);
      return undefined;
    }
  };

  deleteProductById = async (id) => {
    let product = await this.getProductById(id);
    this.#products = await this.getProducts();
    if (!(product === undefined)) {
      let product = this.#products.find((i) => i.id === parseInt(id));
      let indexProduct = this.#products.indexOf(product, 0);
      this.#products.splice(indexProduct, 1);
      console.log("El producto fue eliminado.");
      console.log(this.#products);
      await this.rewriteJSON();
    }
  };

  updateProductById = async (id) => {
    console.log();
  };

  rewriteJSON = async () => {
    await this.#filesystem.promises.writeFile(
      this.#productsFilePath,
      JSON.stringify(this.#products)
    );
  };
}

export default ProductManager;
