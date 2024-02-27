import express from 'express';
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 9090;

app.get('/ping', (req, res)=>{
  res.send({status:"ok"})
})

app.use('/api/products', productsRoutes) //punto de entrada a router
app.use('/api/cart', cartsRoutes) 



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})