module.exports = [
	{ name: "cycling", query: { group: "cycling" }, from: "activities", aggregate: "distance" },
	{ name: "Divine", query: function(x) { return x.place.name == "Divine" }, from: "places", aggregate: "duration" }

];