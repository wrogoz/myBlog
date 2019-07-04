const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const url = "mongodb+srv://test:test@camps-un0gw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true});

const blogSchema =new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date, default: Date.now}
});

const Blog = mongoose.model( 'Blog', blogSchema );



module.exports = (app)=>{


 
    app.get('/', (req, res) => {

        res.send('Hello World!')

    });

 

};