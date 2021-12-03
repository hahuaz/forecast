const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

//PATHS
const publicPath = path.join(__dirname, "../public");

const app = express();
app.use(cors());

app.use(express.static(publicPath)); /* app.use used for customize server*/
/*with express.static we set root of web-server to "public"
 mow, / it will look public folder. if it's /about.html, it will serve about.html
*/

//ROUTING
app.get("", (req, res) => {
  res.send({
    message: "this API is developed by hahuaz."
  });
});

app.get("/api", async (req, res) => {
  let adress = req.query.adress;
  /* escape some characters like ı */
  adress = encodeURI(adress);

  if (!adress) {
    return res.status(404).send({
      error: "query must provide adress"
    });
  }
  let mostRelevantPlace;

  try {
    ({
      data: {
        features: [mostRelevantPlace]
      }
    } = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=${process.env.MAPBOX_API_KEY}`
    ));

    if (!mostRelevantPlace) {
      return res.status(404).send({
        error: "Invalid adress. Try another place."
      });
    }
  } catch (error) {
    console.error("there was error with mapbox api");
    return res.status(500).send({
      error: "internal error occured."
    });
  }

  const placeName = mostRelevantPlace.place_name;
  const longutide = mostRelevantPlace.center[0];
  const latitude = mostRelevantPlace.center[1];

  let current, daily;
  try {
    /* TODO get language from user and make request according to it. */
    ({
      data: { current, daily }
    } = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longutide}&exclude=minutely,hourly&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    ));
  } catch (error) {
    console.error("there was error with openweather api", error);
    return res.status(500).send({
      error: "internal error occured."
    });
  }
  res.status(200).send({
    placeName,
    current,
    daily
  });
});

app.get("*", (req, res) => {
  res.status(404).send(`No endpoint as such`);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is started on port: ${port}`);
});
