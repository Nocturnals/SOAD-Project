var express = require("express");
var bodyParser = require("body-parser");
var request = require("request-promise");
const { ServiceaccountModel } = require("../../models/serviceaccount");

const router = express.Router();

router.post("/postdatatoFlask", async function(req, res) {
  var data = req.body;
  // var data = {
  //   dataOne:
  //     "If you like GeeksforGeeks and would like to contribute, you can also write an article using contribute.geeksforgeeks.org or mail your article to contribute@geeksforgeeks.org. See your article appearing on the GeeksforGeeks main page and help other Geeks.",
  //   dataTwo:
  //     "If you like GeeksforGeeks and would like to contribute, you can also write an article using contribute.geeksforgeeks.org or mail your article to contribute@geeksforgeeks.org. See your article appearing on the GeeksforGeeks main page and help other Geeks."
  // };
  console.log(data);

  const serviceKey = await ServiceaccountModel.find({
    key: req.body.dataThree
  });

  if (
    serviceKey[0] &&
    JSON.stringify(serviceKey[0].service == "Document Matching")
  ) {
    var options = {
      method: "POST",
      uri: "http://localhost:5000/postdata",
      body: data,
      json: true // Automatically stringifies the body to JSON
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
  } else {
    return res.status(400).json({ message: "Invalid API-KEY" });
  }

  // res.send(returndata);
  // console.log(returndata);
  if (returndata) {
    return res.status(200).json(returndata);
  } else {
    return res.status(400).json({ message: "Backend not working" });
  }
});

// router.post("/postdatatoFlask", (req, res) => {
//   console.log(req.body);
// });

module.exports = router;

// var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.listen(3000);
