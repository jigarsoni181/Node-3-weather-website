const request = require('request');

const geoCode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaWppZ2FyIiwiYSI6ImNrOHVobXFsdjA2ZXkzbnBsa3QzbW5lamQifQ.I5i95URwQHVgVq3ncAW71g&limit=1';
 
    request({url , json : true} ,( error , {body}={} )=>{
 
       if(error){
             callback('Unable to connect to location service',undefined);
       }
       else if (body.features.length == 0) {
             callback('Unable to find location. Try another Search.',undefined);
       }else{
             const longitude = body.features[0].center[0];
             const latitude = body.features[0].center[1];
             callback(undefined,{
                   //latitude : latitude,
                   latitude,
                   //longitude : longitude,
                   longitude,
                   location : body.features[0].place_name,
             });
       }
    });
      
 }

module.exports = geoCode;