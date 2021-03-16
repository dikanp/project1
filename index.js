const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error.controllers');
const app = express();
// const db = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');
const { response } = require('express');

// db.connect();
// db.query()
// db.query(`SELECT * FROM users`).then(res => console.log(res.fields[0].name))


// app.get mencari exact string yg sama sedangkan
// app.use mencari like after string

async function start(){
    try {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static(path.join(__dirname, 'public')));

        app.use(shopRoutes);
        app.use('/admin', adminRoutes );
        app.use('/tesAPI', (req ,res,next) => {
            let responseObject = {}
            responseObject['unix'] = new Date().getTime()
            // responseObject['utc'] = new Date().toUTCString()
            let utc = new Date().toUTCString()
            responseObject['utc'] = utc.toLocaleString('id-ID', {timeZone: 'Asia/Jakarta'})
            return res.json(responseObject);
        })
        app.use(errorController.get404);
        // app.use('/favicon.ico',(req,res,next)=>{
        //     res.sendStatus(204);
        //     res.end();
        // });
        app.listen(3000);
    }
    catch(e) {
        console.log('error while starting the server', e)
    }
}

start();