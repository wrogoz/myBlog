const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');
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

    app.use(expressSanitizer());
   
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
        req.body.body = req.sanitize( req.body.body );
        const title = req.body.title;
        const image = req.body.image;
        const body = req.body.body;
        Blog.create({title: title, image: image, body: body},  (err, Blog)=>{
            if(err){
                res.render('new')
            }else{
                res.redirect('/blogs');
            }
    });
    
});

    //SHOW

    app.get('/blogs/:id', (req,res)=>{
        Blog.findById(req.params.id, (err,foundedBlog)=> {
            if(err){
                res.redirect('/blogs');
            
            }else{
                res.render('show',{foundedBlog: foundedBlog})
            }
        })
    })

    //EDIT ROUTE

    app.get('/blogs/:id/edit',(req,res)=>{
        Blog.findById(req.params.id,(err,foundedBlog)=>{
            if(err){
                res.redirect('/blogs'); 
            }else{
                res.render('edit',{blog:foundedBlog});
            }
        });
    });
    //UPDATE ROUTE
    app.put('/blogs/:id',urlencodedParser, (req,res)=>{
        req.body.body = req.sanitize( req.body.body );
        const title = req.body.title;
        const image = req.body.image;
        const body = req.body.body;
        Blog.findByIdAndUpdate(req.params.id, /*NEW DATA */ {title: title, image: image, body: body}, (err,update)=>{
            if(err){
                res.redirect('/blogs')
            }else{
                res.redirect(`/blogs/${req.params.id}`);
                
            }
        })
    });

    app.delete('/blogs/:id', (req,res)=>{
        Blog.findByIdAndRemove(req.params.id,(err)=>{
            if(err){
                res.redirect('/blogs');
            }else{
                res.redirect('/blogs');
            }
        })
    } )
  
};

