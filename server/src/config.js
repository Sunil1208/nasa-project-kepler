const whitelist = ["http://localhost:3000", "http://localhost:8000"]

const corsOptions = {
    // origin: function(origin, callback) {
    //     if(whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Not allowed by CORS"))
    //     }
    // }
    origin: "*"
};

module.exports = {
    corsOptions,
};