const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.get mencari exact string yg sama sedangkan
// app.use mencari like after string
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);
app.use('/admin', adminData.routes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
// app.use('/favicon.ico',(req,res,next)=>{
//     res.sendStatus(204);
//     res.end();
// });


app.listen(3000);
