#!/usr/bin/env node 
var _ = require("lodash"),
	moment = require("moment"),
	traverse = require("traverse");

var datas = { activities: require("./moves/activities"), places: require("./moves/places") };
var charts = require("./charts");

var results = [];
charts.forEach(function(chart) {
	var data = datas[chart.from].map(function(x) {
		var filtered = _.filter(x.summary || x.segments, chart.query).map(function(seg) {
			// add duration to places
			if (! seg.duration) seg.duration = Math.round((new Date(seg.endTime).getTime() -  new Date(seg.startTime).getTime())/1000);
			return seg;
		});

		return { 
			date: x.date.slice(0,4)+"-"+x.date.slice(4,6)+"-"+x.date.slice(6,8),
			data: filtered,
			result: chart.aggregate && filtered.map(function(x) { return x[chart.aggregate] }).reduce(function(a, b) { return a+b }, 0)
		}
	});

	console.log({ 
		days: data,
		overall: data.map(function(x) { return x.result }).reduce(function(a,b) { return a+b }, 0)
	});
});