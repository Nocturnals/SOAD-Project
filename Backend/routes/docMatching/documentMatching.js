var express = require("express");
var bodyParser = require("body-parser");
var request = require("request-promise");

const router = express.Router();

router.get("/postdatatoFlask", async function(req, res) {
  var data = {
    // this variable contains the data you want to send
    data1:
      "Once upon a time, there was a little girl who lived in a village near the forest.",
    data2:
      "Whenever she went out, the little girl wore a red riding cloak, so everyone in the village called her Little Red Riding Hood."
  };

  var options = {
    method: "POST",
    uri: "http://localhost:5000/postdata",
    body: data,
    json: true // Automat   ically stringifies the body to JSON
  };

  var returndata;
  var sendrequest = await request(options)
    .then(function(parsedBody) {
      console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
      returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function(err) {
      console.log(err);
    });

  res.send(returndata);
});

module.exports = router;

// var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.listen(3000);
