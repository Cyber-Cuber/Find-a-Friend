var data = require("../friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(data);
  });

  app.post("/api/new", function(req, res) {
    console.log("REQ BODY " + req.body.name);
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: req.body.scores
    };
    console.log("NEW FRIEND: " + newFriend);

    var userScores = newFriend.scores;

    var bestMatch = {
      name: "",
      photo: "",
      pointDiff: 100000000000
    };

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < userScores.length; j++) {
        var curFriendScore = data[i].scores[j];
        var curUserScore = userScores[j];
        var diff = Math.abs(parseInt(curUserScore) - parseInt(curFriendScore));
        // var totalDiff = Math.abs(diff + diff)
        console.log(typeof curUserScore);
      }

      if (diff <= bestMatch.pointDiff) {
        bestMatch.name = data[i].name;
      }
    }

    console.log(bestMatch.name);

    console.log("DIFF IS: " + diff);

    data.push(newFriend);
    res.json(bestMatch);
  });
};
