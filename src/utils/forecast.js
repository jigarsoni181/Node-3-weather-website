const request = require('request');

const foreCast = (latitude,longitude, callback)=>{

    const url =  'http://api.weatherstack.com/current?access_key=ed83dde83d351f73e5f47a9468eb01c4&query=' + latitude+','+longitude + '';
    
    request({url , json : true}, ( error , {body} ) => {
        
        if(error){
            callback('Unable to connect to weather service',undefined);
        }else if(body.error){
            callback('Unable to find location ,Try another search',undefined);
        }
        else{
            const temp = body.current.temperature;
            const precip = body.current.precip;
            const weatherDescription = body.current.weather_descriptions[0];
            //console.log(body);

            callback(undefined,weatherDescription+" It is currently "+temp+" degrees out. There is "+precip+"% chances of rain. It feels like "+body.current.feelslike+" degrees out. The Humidity is "+body.current.humidity+"% .");
            //       }

            
        }
    })
};


module.exports = foreCast;