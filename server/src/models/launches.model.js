const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Explorer",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "kepler-442 b",
    customer: ["NASA", "SpaceX"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId){
    return launches.has(launchId);
};

function getAllLaunches(){
    return Array.from(launches.values());
};

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        succes: true,
        upcoming: true,
        customers: ["NASA", "SpaceX"],
        flightNumber: latestFlightNumber,
    }));
};

function abortLaunchByID(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchByID,
};