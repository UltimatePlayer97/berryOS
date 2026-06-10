let currentTime;
let timeText = document.querySelector("#timeElement");
timeText.innerHTML = currentTime;

function updateTime() {
  currentTime = new Date().toLocaleString();
  timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);

// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  const header = document.querySelector(".topbar");
  const dragHandle = header || elmnt;

  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  dragHandle.onmousedown = (e) => {
    e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    const rect = elmnt.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;

    document.onmousemove = onDrag;
    document.onmouseup = stopDrag;
  };

  function onDrag(e) {
    e.preventDefault();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    elmnt.style.left = startLeft + dx + "px";
    elmnt.style.top = startTop + dy + "px";
  }

  function stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

dragElement(document.querySelector(".window"));

if (document.getElementById(elmnt.id + "header")) {
  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
} else {
  elmnt.onmousedown = dragMouseDown;
}

let welcomeScreen = document.querySelector("#welcome");
function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function () {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});
