const axios = require("axios");
const { _getDate, _categorize } = require("./helpers.js");

const callAPI = () => {
    let dates = _getDate();

    return axios
        .get(
            `https://api.predicthq.com/v1/events?active.gte=${
            dates.currentDateStr
            }&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`,
            { headers: { Authorization: process.env.API_KEY_PREDICTHQ } }
        )
        .then(res => {
            return res.data.results;
        });
};

const restructureData = async data => {
    let events = [];
    data.forEach(event => {
        if (event.state === "active") {
            let restructured = {};

            restructured.source_API = "predictHQ";
            const { title } = event;

            restructured.name = title || null;
            restructured.url = null;

            restructured.event_id = event.id;
            restructured.time_start = event.start;
            restructured.time_end = null;
            if (event.end) {
                restructured.time_end = event.end;
            }
            restructured.category = "Other";
            if (event.category) {
                restructured.category = _categorize(event.category);
            }
            restructured.image = null;
            restructured.venue = null;
            if (event.entities[0]) {
                restructured.venue = event.entities[0].name;
            }
            restructured.location = "Austin"; //here until we can scale
            restructured.price_min = null;
            restructured.price_max = null;
            restructured.description = null;
            if (event.description !== "") {
                restructured.description = event.description;
            }
            events.push(restructured);
        }
    });
    return events;
};

const getData = () => {
    return callAPI().then(data => restructureData(data));
};

getData();
module.exports = { getData };
