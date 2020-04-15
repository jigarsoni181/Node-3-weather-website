const path = require('path');
const express = require('express');
const hbs = require('hbs');

const foreCast = require('./utils/forecast.js');
const geoCode = require('./utils/geocode.js');

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public' ));

 const app = express();

 //define path for express config
const viewsPath = path.join(__dirname,'../templates/views');
const publicDirectory = path.join(__dirname , '../public');//for using publice directory
const partialsPath = path.join(__dirname , '../templates/partials');

//set up handlebars engine and views location
 app.set('view engine','hbs');
 app.set('views',viewsPath);
 hbs.registerPartials(partialsPath);

//set up static directories to serve
app.use(express.static(publicDirectory));


 app.get('',(req , res) => {
     res.render('index',{
         title : 'Weather App',
         name : 'Jigar',
     });

 });

app.get('/about',(req , res) => {
    res.render('about',{
        title : 'About Jigar',
        name  : 'mayank',
    });
});

app.get('/help',(req ,res) => {
    res.render('help',{
        title : 'Help others',
        name : 'Helping hand',
        team : 'Mumbai Indians',

    });
});


app.get('',(req , res) => {
     res.send('<h1>Weather</h1>');
});

// app.get('/help',(req , res)=>{
//      res.send([{
//          name : 'jigar',
//      }, {
//          age : 24,
//      }]);
// });

//app.com
//app.com/help
//app.com/about

// app.get('/about',(req , res) => {
//     res.send('<marquee>jigar</marquee>');
// });

app.get('/weather',(req , res) => {
    if(!req.query.address){
       return res.send({
            error:'plz provide the address',
        })
    }
    geoCode(req.query.address , (error , { latitude , longitude , location } = {} ) => {

        if(error){
           return res.send({error});
        }

        foreCast(latitude , longitude ,(error , forecastdata) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                forecastdata,
                Address :req.query.address,
            });
        })
    })




    // res.send({
    //     forecast : 'cloudy',
    //     location : 'Mumbai',
    //     address : req.query.address,
    // });
    // console.log(req.query.address);
});

app.get('/products',(req , res) => {
      if(!req.query.search){
         return res.send({
              error:'you must provide a search',
          })
      }


    console.log(req.query.search);
    res.send({
        product:[],
    });
});


app.get('/help/*',(req , res) => {
   res.render('404',{
    title : 'error handling',
    name : 'Error Jigar',
    errorMessage : 'help articles not found.',
   });
});

app.get('*',(req , res) => {
    res.render('404',{
        title : 'error handling',
        name : 'Error Jigar',
        errorMessage : 'Page not found',

    });
});



app.listen(3000,()=>{
    console.log('server is up on port 3000.');
});