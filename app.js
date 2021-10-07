const express=require("express");
const bodyParser=require("body-parser");
const ejs =require("ejs");
const _=require("lodash");


const app=express();
const adi="Adi is a good Boy";
const about="this is awesome";
const contact="lol";

let posts=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("index",{
        aditya:posts
    });
    
});

app.get("/about",(req,res)=>{
    res.render("about",{
        aboutus:about
    });
});


app.get("/contact",(req,res)=>{
    res.render("contact",{
        contactus:contact
    });
    console.log(posts);
});

app.get("/compose",(req,res)=>{
    res.render("compose",{
        contactus:contact
    });
});

app.post("/compose",(req,res)=>{
    const publishblog={
        title:req.body.titlename,
        post:req.body.postname
    };
    posts.push(publishblog);
    res.redirect("/");
});

app.get("/posts/:noice",(req,res)=>{
    const reqtitle=_.lowerCase(req.params.noice);

    posts.forEach((post)=>{
        const storedtitle=_.lowerCase(post.title);
        if(storedtitle===reqtitle){
            res.render("anotherpost",{
                anothertitle:post.title,
                anothercontent:post.post
            });
        }
    });
  
});




app.listen(3000,()=>{
    console.log("server running on port 3000");
});

