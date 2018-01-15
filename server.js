// server.js
// where your node app starts

// init project
var express = require('express');
// // var bodyParser = require('body-parser')
var app = express();
// var morgan = require('morgan');


// // use combined preset, see https://github.com/expressjs/morgan#combined
// // app.use(morgan('combined'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get('/', (req, res)  => {
// //   res.send('Hello from Express.js server!')
    res.sendFile(process.cwd() + '/views/index.html');

});


// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));



//     var http = require('http')
//     var url = require('url')
    
    function parsetime (time) {
      console.log(isNaN(time.getTime()))
      if (isNaN(time.getTime())) {
              return {
        unixtime: null, 
        natural: null
      }
      }
      return {
        unixtime: time.getTime(), 
        natural: formatDate(time)
      }
    }
    

  
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' '+day+ ', ' + year;
}

// console.log(formatDate(new Date())); 
    
    app.use(function (req, res) {
    var result
    var time
    
               // console.log(req.url.slice(1))
               // console.log(decodeURI(req.url.slice(1)) == req.url.slice(1))
               // console.log(typeof new Date(req.url.slice(1)))      
    var date = req.url.slice(1)
      // if (req.url =='/'){
      //   	res.sendFile(process.cwd() + '/views/index.html');
      // }  
      
      // if(!isDate(decodeURI(date)) ){
      //   result = {
      //   unixtime: null, 
      //   natural: null
      // };
      // } else {
        
             if (decodeURI(date) != date){
                 time = new Date(decodeURI(date))
                 result = parsetime(time) 

               } else if(decodeURI(date) == date){
                 time = new Date(Number(date))
                 result = parsetime(time)   

              }
             // }
      
      
    // result = parsetime(time)    //  {"hour":16,"minute":16,"second":53}
    // console.log(time)
//       if (/^\/api\/parsetime/.test(req.url)) {
//         result = parsetime(time)
//       } else if (/^\/api\/unixtime/.test(req.url)) {
//         result = unixtime(time)
//       }
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    // server.listen(Number(process.argv[2]))








// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });





// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });
// app.use(bodyParser.json())
// console.log(bodyParser.json())
// // app.use(bodyParser.urlencoded({extended: false}))

// // Simple in-memory store for now
// var dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// // listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
