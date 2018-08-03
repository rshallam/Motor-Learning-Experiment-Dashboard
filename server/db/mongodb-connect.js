const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) {
    return console.log("unable to connect to mongodb server");
  }
  console.log("connected to mongodb server");

  const db = client.db("Expt");

  const TrialData = db.collection("Trial Data")

  TrialData.insertOne({
    something: "whazzup"
  }, (err, res) => {
    if (err) {
      return console.log("unable to insert");
    }
    console.log("inserted");

  });

  client.close();
});
