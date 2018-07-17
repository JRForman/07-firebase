var config = {
    apiKey: "AIzaSyCQg8yePtsbBCbP833xFhiBk99vhEdDXvQ",
    authDomain: "trainschedule-d308f.firebaseapp.com",
    databaseURL: "https://trainschedule-d308f.firebaseio.com",
    projectId: "trainschedule-d308f",
    storageBucket: "trainschedule-d308f.appspot.com",
    messagingSenderId: "772854599821"
  };
  firebase.initializeApp(config);

var database = firebase.database();

console.log("I'm here")

$("#submit-button").on("click", function () {

    console.log("click");
    var newTrain = $("#submitTrainName").val();
    var newDestination = $("#submitDestination").val();
    var newStartTime = $("#submitStartTime").val();
    var newFrequency = $("#submitFrequency").val();


    database.ref().push({
        Train: newTrain,
        Destination: newDestination,
        StartTime: newStartTime,
        Frequency: newFrequency

    });
    $("#submitTrainName").val("");
    $("#submitDestination").val("");
    $("#submitStartTime").val("");
    $("#submitFrequency").val("");


});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    var firstTimeConverted = moment(sv.StartTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % sv.Frequency;
    var tMinutesTillTrain = sv.Frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var nextArrival = moment(nextTrain).format("hh:mm");
    var minutesAway = tMinutesTillTrain;

    var tBody = $("#trainsTable");
    var tRow = $("<tr>");
    var colName = $("<td>").text(sv.Train);
    var colDestination = $("<td>").text(sv.Destination);
    var colStartTime = $("<td>").text(sv.StartTime);
    var colFrequency = $("<td>").text(sv.Frequency);
    //!Calc Arrival
    var colNextArrival = $("<td>").text(nextArrival);
    //!Calc Minutes Away
    var colMinutesAway = $("<td>").text(minutesAway);

    tRow.append(colName, colDestination, colFrequency, colNextArrival, colMinutesAway);
    tBody.append(tRow);


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


