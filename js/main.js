document.addEventListener("DOMContentLoaded", function(e) {
    // Your code to run since DOM is loaded and ready
    let video = document.querySelector("video");
    let container = document.querySelector(".boxes");

    // rate changer
    var rateOutput = document.getElementById('rateOutput');
    var rateSlider = document.getElementById('rateSlider');

    let types = ["Topic Conversion", "Idea", "Decision", "Custom"];
    let counter = [0, 0, 0, 0];
    let total = 0;
    let isPlaying = false;
    let currentRate = 1.0;

    // display summary
    let result = "";

    data.forEach(function(ele, i) {

        let typeNumber = types.indexOf(ele.type);
        counter[typeNumber]++;
        total++;

        result += '<div class="box b' + typeNumber + ' margin' + i + '"><b>' + ele.type + '</b> <span class="speaker ' + ele.speaker + '">(' + ele.speaker + ')</span><br>' + 
        '<span class="time">' + ele.start + ' - ' + ele.end + '</span><br>' + 
        '<div class="memo">' + ele.memo + '</div></div>';

        // let time = ele.start.split(":");
        // let timeStart = parseInt(time[0]) * 60 + parseInt(time[1]);
        // time = ele.end.split(":");
        // let timeEnd = ((parseInt(time[0]) * 60 + parseInt(time[1])) - timeStart);
        // a += timeEnd;

    });

    document.querySelector(".signals").innerHTML = ("TOTAL: " + total + " items<br><span class='color0'>" + counter[0] + " Topic Conversions</span> / <span class='color1'>" + counter[1] + " Idea & Suggestions </span> / <span class='color2'>" + counter[2] + " Decision </span><br>");
    container.innerHTML += result;

    // play individual clip
    let boxes = Array.from(container.querySelectorAll(".box"));
    let timeOut;

    data.forEach(function(ele, i) {
        let time = ele.start.split(":");
        let timeStart = parseInt(time[0]) * 60 + parseInt(time[1]);

        time = ele.end.split(":");
        let timeEnd = ((parseInt(time[0]) * 60 + parseInt(time[1])) - timeStart) * 1000 + 200;

        boxes[i].addEventListener("click", function(e) {

            if (isPlaying) {
                stopPlayAll();
            }
            console.log("clicked");

            rateSlider.disabled = true;
            video.classList.add("hidden");

            clearTimeout(timeOut);
            video.currentTime = timeStart;
            video.play();

            activate(boxes, i);

            timeOut = setTimeout(function() {
                video.pause();
                boxes[i].style.backgroundColor = "transparent";

            }, timeEnd / currentRate);

        });
    });

    // play summary
    let btn = document.getElementById("playAll");

    btn.onclick = function(e) {
        console.log(isPlaying);
        if (!isPlaying) {
            isPlaying = true;
            this.innerText = "Stop Summary";
            video.controls = false;
            playAll(0);
        }
        else {
            stopPlayAll();
            video.pause();
        }
    }

    video.onpause = function() {
        if (!isPlaying)
            clearTimeout(timeOut);
        rateSlider.disabled = false;
        video.classList.remove("hidden");
    }

        
    rateSlider.onchange = function(event) {
        // When the slider is moved, changed the video's playback rate
        currentRate = rateSlider.value
        video.playbackRate = currentRate;
    };
    
    video.onplay = function(event) {
        // We can only change the playbackRate once the video has started playing
        currentRate = rateSlider.value;
        video.playbackRate = currentRate;
    };
    
    video.onratechange = function(event) {
        // When the playback rate changes, display the new value
        currentRate = video.playbackRate;
        rateOutput.textContent = currentRate;
    };
    
    rateOutput.textContent = rateSlider.value;

    function stopPlayAll() {
        btn.innerText = "Play Summary";
        isPlaying = false;
        video.controls = true;
    }

    function playAll(i) {
        if (!isPlaying) return;

        rateSlider.disabled = true;

        let ele = data[i];
        let time = ele.start.split(":");
        let timeStart = parseInt(time[0]) * 60 + parseInt(time[1]);

        time = ele.end.split(":");
        let timeEnd = ((parseInt(time[0]) * 60 + parseInt(time[1])) - timeStart) * 1000 + 200;

        console.log(timeStart + ", " + timeEnd);
        clearTimeout(timeOut);
        video.currentTime = timeStart;
        video.play();

        activate(boxes, i);

        timeOut = setTimeout(function() {
            video.pause();
            boxes[i].style.backgroundColor = "transparent";
            if (i < boxes.length - 1)
                playAll(i + 1);
            else
                stopPlayAll();
        }, timeEnd / currentRate);

    }

    function activate(boxes, index) {
        boxes.forEach(function(ele, i) {
            if (i == index) {
                ele.style.backgroundColor = "rgba(200, 100, 100, 0.1)";
                ele.scrollIntoView(false);
            }
            else {
                ele.style.backgroundColor = "transparent";
            }
        });
    }

    

});
