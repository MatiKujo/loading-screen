const songs = [
  { id: 1, url: "songs/nuta1.mp3" },
  { id: 2, url: "songs/nuta2.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentVolume = 100;
const audio = new Audio(songs[currentSongIndex].url);
audio.volume = currentVolume / 100;

// Aktualizacja głośności i paska
const rangeSlide = (value) => {
  const volume = value / 100;
  audio.volume = volume;
  currentVolume = parseInt(value);
  document.querySelector('.rangeValue').innerText = value + "%";
  document.querySelector('.range').value = value;
};

// Załaduj nowy utwór
const loadSong = (index) => {
  audio.src = songs[index].url;
  audio.play();
  isPlaying = true;
  updatePlayPauseIcon();
};

// Przejdź do następnego utworu
const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
};

// Przejdź do poprzedniego utworu
const prevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
};

// Odtwarzaj / pauzuj
const toggleSongPause = () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseIcon();
};

// Aktualizacja ikony play/pause
const updatePlayPauseIcon = () => {
  const icon = document.getElementById('playPauseIcon');
  icon.className = isPlaying ? "ri-pause-line" : "ri-play-line";
};

// Obsługa klawiszy
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    toggleSongPause();
  }

  if (event.code === 'ArrowRight') {
    event.preventDefault();
    nextSong();
  }

  if (event.code === 'ArrowLeft') {
    event.preventDefault();
    prevSong();
  }

  if (event.code === 'ArrowDown') {
    event.preventDefault();
    if (currentVolume > 0) {
      currentVolume -= 1;
      if (currentVolume < 0) currentVolume = 0;
      rangeSlide(currentVolume);
    }
  }

  if (event.code === 'ArrowUp') {
    event.preventDefault();
    if (currentVolume < 100) {
      currentVolume += 1;
      if (currentVolume > 100) currentVolume = 100;
      rangeSlide(currentVolume);
    }
  }
});

// Automatyczne przejście do następnej piosenki
audio.addEventListener('ended', nextSong);
