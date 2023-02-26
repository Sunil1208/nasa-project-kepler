const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

const data_file_path = path.join(__dirname, "..", "..", "data", "kepler_data.csv");

function isHabitablePlanet(planet) {
    return planet["koi_disposition"] === "CONFIRMED"
        && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11  // comparision of the amount of light entering the planet (i.e. the amount of energy it gets from the sun)
        & planet["koi_prad"] < 1.6; // comparision of the size of planet with reference to radiys of earth
};

fs.createReadStream(data_file_path)
    .pipe(parse({
        comment: "#",
        columns: true,
    }))
    .on("data", (data) => {
        if(isHabitablePlanet(data)){
            habitablePlanets.push(data);
        }
    })
    .on("error", (err) => {
        console.log("error");
        console.log(err);
    })
    .on("end", () => {
        console.log(habitablePlanets.map((planet) => {
            return planet["kepler_name"]
        }));
        console.log("No of potential planets: ", habitablePlanets.length);
        console.log("done");
    });

module.exports = {
    planets: habitablePlanets,
};