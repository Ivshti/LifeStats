module.exports = [
	{ name: "cycling", query: { group: "cycling" }, from: "activities", aggregate: "distance", color: "cyan" },
	{ name: "Divine", query: function(x) { return x.place.name == "Divine" }, from: "places", aggregate: "duration", color: "pink" }

];