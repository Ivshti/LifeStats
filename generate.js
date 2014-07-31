#!/usr/bin/env node 
var _ = require("lodash"),
	moment = require("moment");

var datas = { activities: require("./moves/activities"), places: require("./moves/places") };
var charts = require("./charts");

// Normalize the data
/*storyline.forEach(function(elem) {
	elem.date = elem.date.slice(0,4)+"-"+elem.date.slice(4,6)+"-"+elem.date.slice(6,8);
});
*/

var results = [];
charts.forEach(function(chart) {
	var data = datas[chart.from].map(function(x) {
		return { 
			date: x.date.slice(0,4)+"-"+x.date.slice(4,6)+"-"+x.date.slice(6,8),
			data: _.filter(x.summary || x.segments, chart.query)
		}
	})
	console.log(data)
});