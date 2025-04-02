const backgrounds = [
  "assets/gta.jpg", 
  "assets/gta2.jpg", 
  "assets/gta3.jpg",
  "assets/gta4.jpg",
];

let currentBackgroundIndex = 0;

const changeBackground = () => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  document.body.style.transition = "background-image 1s ease-in-out"; // Dodaj płynne przejście
  document.body.style.backgroundImage = `url("${backgrounds[currentBackgroundIndex]}")`;
};

// Zmiana tła co 10 sekund
setInterval(changeBackground, 10000);
