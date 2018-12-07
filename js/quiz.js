let quiz = [
	{
		q: "크팩은 무엇의",
		e: "줄임말일까요?",
		a: "크리에이티브팩토리"
	},
	{
		q: "바지걸이 뒤쪽을 확인하시오.",
		e: "손잡이에 적힌 5글자 회사이름은?",
		a: "유한킴벌리"
	},
	{
		q: "책장에 꽂힌 '미학오디세이 3'의",
		e: "320페이지를 펼치시오.",
		a: "마고"
	},
	{
		q: "형이 준 예쁜 파카",
		e: "주머니를 보시오",
		a: "삼각김밥"
	},
	{
		q: "책상 위 수지(ㅡ3ㅡ)와 이종석이 있는",
		e: "마우스패드를 들추어보시오",
		a: "띠뚜"
	},
	{
		q: "오늘 재윤이가 들은",
		e: "수업 이름을 쓰시오",
		a: "자료구조"
	},
	{
		q: "재윤이에게 카카오톡으로 사랑한다고 말하시오",
		e: "재윤이가 답을 알려줄 것이오 ^0^",
		a: "나두"
	},
	{
		q: "문을 여시오",
		e: "천천히 여시오",
		a: "생일축하해"
	}
];

let expiredDate = new Date();
expiredDate.setHours(expiredDate.getHours() + 14);

let curr = 0;

// init 
// 첫번째 퀴즈 보여주기
// curr 업데이트 후 cookie에 저장
if ( getCookie("current") ) {
	curr = getCookie("current");
	showQuiz( curr );
}

document.querySelector("#submit").onclick = function() {
	let answer = document.getElementById("answer");
	if ( checkAnswer(answer.value, curr) ) {
		curr++;
		if ( curr >= 8) {
    		window.location.href="yay"
		}
		showQuiz(curr);
	}
	else {
		answer.classList.add("error");
	}
}

// 틀리면 틀림 표시

// 맞으면 curr 업데이트 후 cookie에 저장
// 그리고 다음 퀴즈 보여주기
// 그 전에 로딩 화면 보이도록


function updateCookie(i) {
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=jisu.jaeyoon.io;path=/";
}

function getCookie(cookieName) {
  // Parse the cookie string to get the information I need
  var cookies = document.cookie;
  var cookieValue = "";
  cookies = cookies.split(";"); // cookies = ["username=j", "age=22"]
  for (var i = 0; i < cookies.length; i++) {
    var temp = cookies[i].split("="); // temp = ["username", "j"]
    if (temp[0].trim() == cookieName) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
}

function showQuiz(i) {
	document.querySelector("#loader").style.opacity = 1;
	answer.classList.remove("error");
	answer.value = "";
	setTimeout( function() {
		document.querySelector("#question").innerHTML = "<strong>" + quiz[i].q + "</strong><br>" + quiz[i].e;
		document.querySelector("#loader").style.opacity = 0;
	}, 1500);
}

function checkAnswer(val, i) {
  if (val === quiz[i].a) {
  	updateCookie(i);
    return true;
  }
  return false;
}
