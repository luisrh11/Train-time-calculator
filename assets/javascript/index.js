$(document).ready(function() {
    
    var config = {
        apiKey: "AIzaSyCm2UsZAXUYjhIZ1Wwb5iElZqaPzb4BTfw",
        authDomain: "train-time-calculator-f63c0.firebaseapp.com",
        databaseURL: "https://train-time-calculator-f63c0.firebaseio.com",
        projectId: "train-time-calculator-f63c0",
        storageBucket: "train-time-calculator-f63c0.appspot.com",
        messagingSenderId: "570212773164"
      };
      firebase.initializeApp(config);

    var database = firebase.database();

    $("#button").on("click", function(Event) {
        Event.preventDefault();
        
        // grabing the values on the input sections
        var trainN = $("#name").val().trim();
        var trainD = $("#destination").val().trim();
        var trainFirst = $("#first").val().trim();
        var trainFreq = $("#frequency").val().trim();
        
        var tFrequency =  trainFreq;
        var firstTime = trainFirst;
    
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
    
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        

        database.ref().push({
            name : trainN,
            destination: trainD,
            firstTrain : firstTime,
            frequency : tFrequency,
            joinDate: firebase.database.ServerValue.TIMESTAMP
        });

        database.ref().on("child_added", function(childSnapshot) {
            var name = childSnapshot.val().name;
            var destination = childSnapshot.val().destination;
            var firstTime = childSnapshot.val().firstTrain;
            var frequency = childSnapshot.val().frequency;
             console.log("name: "+name);
          console.log("destination: "+ destination);
          console.log("firsttrain: "+ firstTime);
          console.log("frequency: "+ frequency);
          console.log("------------------------");
    
          var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
             $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain)
          );
    
          $("#train-table > tbody").append(newRow);
        });
    });



    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    //     // Change the HTML to reflect
    //     $("#name-display").text(snapshot.val().name);
    //     $("#email-display").text(snapshot.val().email);
    //     $("#age-display").text(snapshot.val().age);
    //     $("#comment-display").text(snapshot.val().comment);
    //   });

});