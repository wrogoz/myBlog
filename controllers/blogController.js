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

   
//RESTfull ROUTES
 
// INDEX
    app.get('/', (req,res)=>{
       res.redirect('/blogs');
    })

    app.get('/blogs', (req, res) => {
        Blog.find({},(err,blogs)=>{
            if(err){
                console.log('db error')
            }else{
                res.render('index',{blogs:blogs})
            }
        })
        

    });
// NEW ROUTE
    app.get( '/blogs/new', (req,res)=> {
        res.render('new');
    });



//CREATE ROUTE

app.post('/blogs', urlencodedParser, (req,res)=> {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    Blog.create({title: title, image: image, body: body},  (err, Blog)=>{
        if(err){
            res.render('new')
        }else{
            res.redirect('/blogs');
        }
    })
    
});

//SHOW

app.get('/blogs/:id', (req,res)=>{
    Blog.findById(req.params.id, (err,foundedBlog)=> {
        if(err){
            res.redirect('/blogs');
        
        }else{
            res.render('/show',{foundedBlog:foundedBlog});
        }
    })
})

};

