import express from 'express';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 9090;

app.get(/api/products, async (req,res)=>{
      try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if (limit) {
          res.json(products.slice(0, parseInt(limit)));
        } else {
          res.json(products);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).send("Error interno del servidor");
      }
    }
);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})