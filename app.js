const express = require('express')
const app = express()
const blogController = require('./controllers/blogController')
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
blogController(app);


app.listen(3000,()=>{
    console.log('server is listening on localhost:3000')
})