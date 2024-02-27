class Product {
    constructor(
      id,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    ) {
      (this.id = id), (this.title = title);
      (this.description = description), (this.status = true);
      (this.code = code),
      (this.price = price),
      (this.stock = stock),
      (this.category = category),
      (this.thumbnails = thumbnails);
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
      this.#filesystem = require("fs");
    }
  
    //metodos
    createProduct = async (title, description, code, price, stock, category,thumbnails) => {
      await this.getProducts();
      for (let i = 0; i < products.length; i++) {
        if (products[i].code == code) {
          console.log(`El codigo ${code} se repite`);
          return;
        }
      }
      let id=this.#products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1
  
      let newProduct = new Product(
        id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
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

}