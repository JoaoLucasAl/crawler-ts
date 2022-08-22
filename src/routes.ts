import { Router } from "express";
require("dotenv/config");
import axios from "axios";
import fs from "fs";
const csv = require("fast-csv");
const routes = Router();


let infos: Array<object> = [];
let file: Array<object> = [];


const toWrite = fs.createWriteStream("./src/data/enderecos-geocodificados.csv");
const toRead = fs.createReadStream("./src/data/enderecos.csv");


const enderecos = csv.parse().on("data", (data: object) => {
  file.push(data);
});
toRead.pipe(enderecos);

async function geolocation(entrada: Array<object>) {
  try {
    for (let index in entrada) {
      const response = await axios.get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          String(entrada[index]) +
          ".json?access_token=" +
          process.env.API_KEY
      );
      const id = response.data.features[0].id;
      const endereço = response.data.features[0].place_name;
      const latitude = response.data.features[0].center[1];
      const longitude = response.data.features[0].center[0];
      const data = {
        id,
        endereço,
        longitude,
        latitude,
      };
      infos.push(data);
    }

    console.log('Geocodificamento terminado!')
    return infos;
  } catch (e) {
    console.log(e);
  }
}




routes.get("/", (req, res) => {
  geolocation(file).then((data) => {
    res.json(data);
    csv
      .write(data, { headers: ["id", "endereco", "latitude", "longitude"] })
      .pipe(toWrite);
  });
});

routes.get("/:address", async (req, res)=> {
    const address = req.params.address
    let response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + address + '.json?access_token='
        + process.env.API_KEY);
        const id = response.data.features[0].id;
        const endereço = response.data.features[0].place_name;
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];
        const data = {
          id,
          endereço,
          longitude,
          latitude,
        };
    res.json(data)
    
})


export default routes;
