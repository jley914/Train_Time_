$(document).ready(function () {
	// Firebase
	var config = {
		apiKey: "AIzaSyD8uPPbOKNgdoCyUmaOOXiOk7Vs3-M1VO8",
		authDomain: "train-time-a644c.firebaseapp.com",
		databaseURL: "https://train-time-a644c.firebaseio.com",
		projectId: "train-time-a644c",
		storageBucket: "train-time-a644c.appspot.com",
		messagingSenderId: "419976550626"
	};


	firebase.initializeApp(config);


	// v database

	var database = firebase.database();




	//button on click from user
	$("#addTrainBtn").on("click", function (event) {
		event.preventDefault();
		//val for each varible inindex
		moment().format();
		var name = $("#trainName-input").val().trim();
		var dest = $("#destination-input").val().trim();

		var time = moment($("#trainTTime-input").val().trim(), "HH:MM").subtract(1, "years").format("X");

		var freq = $("#trainFreq-input").val().trim();

		var currentTime = moment().format("LTS");
		console.log(currentTime);





		console.log("Name" + name);
		console.log("Destination:" + dest);
		console.log("Time" + time);
		console.log("Frequency" + freq);


		var newTrain = {

			train: name,
			trainDest: dest,
			trainTime: time,
			trainX: freq

		};




		//new entry push to firebase
		database.ref().push(newTrain);

		//clearing elements befor new text is available
		$("#trainName-input").val("");
		$("#destination-input").val("");
		$("#trainTTime-input").val("");
		$("#trainFreq-input").val("");

		//prevents 
		return false
	});
	//on click child function
	database.ref().on("child_added", function (childSnapshot, prevChildKey) {
		// console.log(childSnapshot.val());
		// store at a v
		var name = childSnapshot.val().train;
		var dest = childSnapshot.val().trainDest;
		var time = childSnapshot.val().trainTime;
		var freq = childSnapshot.val().trainX;

		// console.log(train);
		// console.log(trainDest);
		// console.log(trainTime);
		// console.log(trainX);

		// time train less wet
		var trainTTime = moment.unix(time).format("HH:MM");

		//calc diffrence in time
		var diffrenceT = moment().diff(moment(trainTTime), "minutes");

		//time Remainder
		var trainRemain = diffrenceT % freq;

		// min till arival
		var minTill = freq - trainRemain;

		// following arrival ttime
		var nextArr = moment().add(minTill, "minutes").format("HH:MM");

		//add info to Dom
		$("#train-Table").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArr + "</td><td>" + minTill + "</td></tr>");






	});
	$("#removeTrain").on("click", function (event) {
		event.preventDefault();
		$("#trainName-input").empty();
		$("#destination-input").empty();
		$("#freq-input").empty();
		$("#nextArr").empty();
		$("#mintill").empty();

	});
	$(document).ready(function ({
		$("#currentTime").text(currentTime)
	})
});	
