let currentTime;
const timeText = document.querySelector("#timeElement");

function updateTime() {
  currentTime = new Date().toLocaleString();
  timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
updateTime();

function dragElement(element) {
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = element.offsetTop - currentY + "px";
    element.style.left = element.offsetLeft - currentX + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

let biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element));
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

function initializeWindow(appName) {
  const windowElement = document.getElementById(appName);
  const closeButton = document.getElementById(appName + "close");

  if (windowElement) {
    dragElement(windowElement);
    addWindowTapHandling(windowElement);
  }

  if (closeButton && windowElement) {
    closeButton.addEventListener("click", function () {
      closeWindow(windowElement);
      handleWindowCloseSync(appName);
    });
  }
}

const welcomeScreen = document.querySelector("#welcome");
const notesScreen = document.querySelector("#notes");

initializeWindow("welcome");
initializeWindow("notes");

const welcomeScreenOpen = document.querySelector("#welcomeopen");
welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
  const welcomeDockItem = document.querySelector(
    '.dock-item[data-app="welcome"]',
  );
  if (welcomeDockItem) {
    clearAllSelection();
    welcomeDockItem.classList.add("selected");
    selectedIcon = welcomeDockItem;
  }
});

let selectedIcon = undefined;

function clearAllSelection() {
  const dockItems = document.querySelectorAll(".dock-item");
  dockItems.forEach(function (item) {
    item.classList.remove("selected");
  });
}

function handleIconTap(iconElement) {
  const appTarget = iconElement.getAttribute("data-app");
  const targetWindow = document.getElementById(appTarget);

  if (iconElement.classList.contains("selected")) {
    iconElement.classList.remove("selected");
    selectedIcon = undefined;
    closeWindow(targetWindow);
  } else {
    if (selectedIcon) {
      selectedIcon.classList.remove("selected");
    }
    iconElement.classList.add("selected");
    selectedIcon = iconElement;
    openWindow(targetWindow);
  }
}

function handleWindowCloseSync(appName) {
  const correspondingDockItem = document.querySelector(
    '.dock-item[data-app="' + appName + '"]',
  );
  if (
    correspondingDockItem &&
    correspondingDockItem.classList.contains("selected")
  ) {
    correspondingDockItem.classList.remove("selected");
    if (selectedIcon === correspondingDockItem) {
      selectedIcon = undefined;
    }
  }
}

const dockItems = document.querySelectorAll(".dock-item");
dockItems.forEach(function (item) {
  item.addEventListener("click", function () {
    handleIconTap(item);
  });
});
