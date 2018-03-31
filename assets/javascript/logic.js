$(document).ready(function () {

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD29HvUapqevl1C0HphKw97wvFkDWvWYgE",
    authDomain: "train-app-7c5ce.firebaseapp.com",
    databaseURL: "https://train-app-7c5ce.firebaseio.com",
    projectId: "train-app-7c5ce",
    storageBucket: "",
    messagingSenderId: "488538182409"
  };
  firebase.initializeApp(config);
  
// global variable
var database = firebase.database();

// on click function that captures user input values and push that value into the database
$('#subBtn').on("click", function(event){
    // to prevent page refreshing everytime submit button is clicked
//    event.preventDefault();
   var trainName = $('#trainInput').val().trim();
   var destination = $('#destinationInput').val().trim();
   var firstTrain = $('#firstTrain').val().trim();
   var frequency = $('#freqInput').val().trim();

    console.log(trainName);
// pushing those captured values into the database to store
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrain,
        frequency: frequency
    });
    return false;
    $('#trainInput').val("");
});

database.ref().on('child_added', function(childSnapshot){
    var newTrain = childSnapshot.val().trainName;
    var newDestination = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFrequency = childSnapshot.val().frequency;

    var currentTime = moment();
    var convertStartTime = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // difference between train times 
    var trainDifference = moment().diff(moment(convertStartTime), "minutes");

    // remaining time 
    var timeRemain = trainDifference % newFrequency;

    // upcoming train
    var nextTrain = moment().add(minsTillTrain, "minutes");
    

    // minutes away until next train
    var minsTillTrain = newFrequency - timeRemain;
    var nextArrival = moment(nextTrain).format("HH:mm");

    
    // append data on page
    $('#dataTable').append(
        `<tr> <td>${newTrain}</td> <td>${newDestination}</td> <td>${newFrequency}</td> <td>${nextArrival}</td> <td>${minsTillTrain}</td> </tr>`
    );

   

});


 // clear inputs when entered
 $('#trainInput, #destinationInput', '#firstTrain', '#freqInput').val("");

 return false;








});