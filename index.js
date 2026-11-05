const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id: uuidv4(),
        username: "arpita",
        image: "https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        caption: "My cute dog 🐶"
    },
    {
        id: uuidv4(),
        username: "arpita",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        caption: "Beautiful nature 🌿"
    },
    {
        id: uuidv4(),
        username: "arpita",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        caption: "Travel memories ✈️"
    }
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { image, caption } = req.body;
    let id = uuidv4();

    posts.push({
        id,
        username: "arpita",
        image,
        caption
    });

    res.redirect("/posts");
});
app.patch("/posts/:id",(req,res) =>{
    let{id} = req.params;
    let newCaption = req.body.caption;
    let post = posts.find((p)=> id === p.id);
    post.caption = newCaption;
    console.log(post);
    res.redirect("/posts");
    
});
app.get("/posts/:id/edit",(req,res) =>{
    let{id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
    
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log("listening to port")
});