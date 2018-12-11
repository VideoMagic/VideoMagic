document.addEventListener("DOMContentLoaded", function(e) {
    // Your code to run since DOM is loaded and ready

    let video = document.querySelector("video");
    let container = document.querySelector(".boxes");
    let types = ["Topic Conversion", "Idea", "Decision", "Custom"];
    let counter = [0, 0, 0, 0];
    let total = 0;

    let result = "";

    data.forEach(function(ele, i) {

        let typeNumber = types.indexOf(ele.type);
        counter[typeNumber]++;
        total++;

        result += '<div class="box b' + typeNumber + ' margin' + i + '"><b>' + ele.type + '</b> <span class="speaker ' + ele.speaker + '">(' + ele.speaker + ')</span><br>' + 
        '<span class="time">' + ele.start + ' - ' + ele.end + '</span><br>' + 
        '<div class="memo">' + ele.memo + '</div></div>';

    });

    document.querySelector(".signals").innerHTML = ("<span class='color0'>" + counter[0] + " Topic Conversions</span> / <span class='color1'>" + counter[1] + " Idea & Suggestions </span> / <span class='color2'>" + counter[2] + " Decision </span><br>TOTAL: " + total + " items<br>");
    container.innerHTML += result;

    let boxes = Array.from(container.querySelectorAll(".box"));

    data.forEach(function(ele, i) {
        let time = ele.start.split(":");
        let timeStart = parseInt(time[0]) * 60 + parseInt(time[1]);

        time = ele.end.split(":");
        let timeEnd = ((parseInt(time[0]) * 60 + parseInt(time[1])) - timeStart) * 1000;

        boxes[i].addEventListener("click", function(e) {
            console.log("clicked");

            video.currentTime = timeStart;
            video.play();

            console.log(timeEnd);
            setTimeout(function() {
                video.pause();
                console.log("paused");
            }, timeEnd);
        })
    });

    

});
