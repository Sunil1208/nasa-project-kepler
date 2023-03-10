const { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchByID } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
        return res.status(400).json({
            error: "Missing required launch property",
        });
    };
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date",
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
};

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if(!existLaunchWithId(launchId)){
        return res.status(400).json({
            err: "Launch not found",
        });
    }
    
    const aborted = abortLaunchByID(launchId);
    return res.status(200).json(aborted);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};