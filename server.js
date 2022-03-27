const express = require("express");
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const routerHandlebars = express.Router()
const PORT = 8080
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const Products = require ('./class/productClass')
const storeProducts = new Products()

const Messages = require('./class/messageClass')
const chat = new Messages()

app.set('view engine', 'hbs')
app.set('views', './views')

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerHandlebars)


io.on('connection', async (socket) => {
   const message = await chat.loadMessage()
   socket.emit('messages', message )
  
   socket.on('message-new',async data => {
       await chat.saveMessage(data)
       const message2 = await chat.loadMessage()
       io.sockets.emit('messages', message2 );
   });
})

app.get('/', (req, res) => {
  res.render('main')
})

routerHandlebars
  .get('/', (req, res) => {
      const productsList = storeProducts.allProducts
      res.render('table', {productsList})
  })

  .post('/', (req, res) => {
      const newProduct = storeProducts.saveProduct(req.body)
      console.log(newProduct)
      res.render('main');
  })


httpServer.listen(PORT, function () {
  console.log(`Servidor corriendo en Puerto ${PORT} http://localhost:8080`);
});