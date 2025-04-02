

window.onload = function startLoading() {
  let progress = 0;
  const progressBar = document.querySelector(".loading::after");
  const progressText = document.querySelector(".progress");

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
    } else {
      progress += 1;
      document.querySelector(".loading").style.setProperty("--progress", progress + "%");
      progressText.textContent = progress + "%";
      document.querySelector(".loading").style.setProperty("background", `linear-gradient(to right, rgb(255,16,240) ${progress}%, #333 ${progress}%)`);
    }
  }, 50);
};

