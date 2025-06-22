require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const db = require('./connection');
const cookieparser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const Blog = require('./models/blog');


const app = express();
const PORT = process.env.PORT || 8000;

db();

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public'))); //to render image from public folder---express don"t allow directly static assests..so this middleware helps to upload..
app.use((req, res, next) => {  // ye middleware globally user ko availabe kar dega..now i can use user fullname in nay ejs file..
    res.locals.user = req.user;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find();
    res.render('home', {
        user : req.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
