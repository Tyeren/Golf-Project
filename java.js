//beginTimer();

var numplayers = document.getElementById('playerCount').value;
var numholes = document.getElementById('holeCount').value;
var teetime = 45;
var testCourse;
var seconds = 0;
var teeboxid;
function buildcard(){
    var numplayers = document.getElementById('playerCount').value;
    var numholes = document.getElementById('holeCount').value;
    var holecollection = "";
    var playercollection = "";
    var grandtotalcollection = "";


    // create column of player labels

    for(var pl = 1; pl <= numplayers; pl++ ){
        playercollection += "<input id='player" + pl +"' class='holebox playerbox' placeholder='player name' type='text'>"+"</input>";
        grandtotalcollection += "<div id='grand" + pl +"' class='holebox' ></div>";
    }

    // create golf hole columns before you add holes to them.
    for(var c = numholes; c >= 1; c-- ){
        var adjusthole = c -1;
        holecollection += "<div id='column" + c + "' class='holecol'><div class='holenumbertitle'><div>" + c + '<div> Par ' + (testCourse.course.holes[adjusthole].tee_boxes[0].par) + '<div> Yards ' + (testCourse.course.holes[adjusthole].tee_boxes[0].yards) + '<div> H ' + (testCourse.course.holes[adjusthole].tee_boxes[0].hcp) +"</div></div></div></div></div></div>";
}


    $("#leftcard").html(playercollection);
    $("#rightcard").html( ("<div class = 'holecol'>" + grandtotalcollection + "</div>") + holecollection);

    // call the function that builds the holes into the columns
    buildholes();
}

function buildholes() {

    // add 18 holes to the columns

    var numholes = document.getElementById('holeCount').value;
    var numplayers = document.getElementById('playerCount').value;
    for(var p = 1; p <= numplayers; p++ ){
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<input type='number' onkeyup='calculateScore(" + p +")' id='player" + p +"hole" + h +"' class='holebox'/>");
        }
    }
}

function calculateScore(theplayer) {
    var thetotal = 0;
    for(var t = 1; t <= numholes; t++){
        thetotal += Number($("#player" + theplayer + "hole" + t).val());
    }
    $("#grand" + theplayer).html(thetotal);
}

//Timer
//function beginTimer(){
    //var thetimer = setInterval(function(){clocktick()}, 1000);
//

//function clocktick(){
    //if(seconds > 0){
        //seconds --;
        //if(seconds < 10){
            //seconds = "0" + seconds;
        //}
    //}
    //else{
        //teetime --;
        //seconds = 59;
    //}
    //document.getElementById("countdown").innerHTML = teetime + ":" + seconds;
//}
//weather
//function getmyinfo() {
    //var xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function () {
        //if (xhttp.readyState == 4 && xhttp.status == 200){
            //var myobj = JSON.parse(xhttp.responseText);
            //document.getElementById("myNewDiv").innerHTML = myobj.weather[0].description;
            //document.getElementById("windSpeed").innerHTML = "wind speed " + myobj.wind.speed;
            //document.getElementById("windDirection").innerHTML ="wind direction " + myobj.wind.deg +" degrees";
            //document.getElementById("temperature").innerHTML ="Temperature" + myobj.main.temp;
            //document.getElementById("humidity").innerHTML = myobj.main.humidity;
            //document.getElementById("weatherImage").src = "http://openweathermap.org/img/w/" + myobj.weather[0].icon + ".png";
        //}
    //};
    //xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=84094,us&appid=e05fdb71af4d5a0c20867672e991c9a3", true);
    //xhttp.send();
//}
//Golf Course API
function getCourseInfo(id) {
    var golfxhttp = new XMLHttpRequest;
    golfxhttp.onreadystatechange = function () {
        if (golfxhttp.readyState == 4 && golfxhttp.status == 200) {
            testCourse = JSON.parse(golfxhttp.responseText);
            $("#golfcourselabel").html(testCourse.course.name);
            for(var t = 0; t < (testCourse.course.holes[0].tee_boxes.length -1); t++){
                var teeboxdisplay = "<option value='" + t + "'>"+ testCourse.course.holes[0].tee_boxes[t].tee_type +"</option>";
                $("#teeboxes").append(teeboxdisplay);
            }
        }
    };
    golfxhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    golfxhttp.send();
}

function setCourseInfo(teeboxid) {
    buildcard(teeboxid);
}
//#2

//delete a player
//function deleteplayer(playerid) {
    //$('#player' + playerid).remove();
    //$('#grand' + playerid).remove();
    //for(var p = 1; p <= numholes; p++){
        //$('#player' + playerid + 'hole' + p).remove();
    //}
//}
//message on total
var totalscore = 68;
var par = 78;
function getMessage() {
    if(totalScore < par) {
        $('#message').append('<div class="alert alert-success" role="alert">On to the PGA!</div>')
    }
else if (totalscore == par){
        $('#message').append('<div class="alert alert-info" role="alert">Nicely Done!</div>')

    }
else if (totalscore > par && totalscore < par + 10){
        $('#message').append('<div class="alert alert-success" role="alert">You need some training!</div>')

    }
    else {
        $('#message').append('<div class="alert alert-success" role="alert">Its the most points wins right?</div>')

    }
}



