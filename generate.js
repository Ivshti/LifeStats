#!/usr/bin/env node 
var _ = require("lodash"),
	moment = require("moment"),
	mpath = require("mpath"),
	strptime = require("micro-strptime").strptime;

var datas = { activities: require("./moves/activities"), places: require("./moves/places") };
var charts = require("./charts");

var dateFormat = function(d) { return strptime(d,"%Y%m%dT%H%M%S%Z") }

var results = [];
charts.forEach(function(chart) {
	var data = datas[chart.from].map(function(x) {
		var date = x.date.slice(0,4)+"-"+x.date.slice(4,6)+"-"+x.date.slice(6,8);

		var filtered = _.filter(x.summary || x.segments, chart.query).map(function(seg) {
			// add duration to places
			// TODO: clamp start and end times to the limits of this day
			var start = moment(date).startOf("day").toDate().getTime(),
				end = moment(date).endOf("day").toDate().getTime();
			if (! seg.duration) seg.duration = Math.round((Math.max(dateFormat(seg.endTime).getTime(), start) -  Math.min(end, dateFormat(seg.startTime).getTime()))/1000);
			return seg;
		});

		return { 
			date: date,
			data: filtered,
			result: chart.aggregate && filtered.map(function(x) { return mpath.get(chart.aggregate, x) }).reduce(function(a, b) { return a+b }, 0)
		}
	});

	var truePeriod = [], longestPeriod = [];
	data.forEach(function(day) {
		var isTrue = !!day.result;
		if (isTrue) truePeriod.push(day);
		if (truePeriod.length > longestPeriod.length) longestPeriod = truePeriod;

		if (! isTrue) truePeriod = [];
	});
	console.log({ 
		days: data,
		overall: data.map(function(x) { return x.result }).reduce(function(a,b) { return a+b }, 0),
		trueLength: data.filter(function(x) { return x.result }).length,
		truePeriod: longestPeriod
	});
});