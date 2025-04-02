const songs = [
  { id: 1, url: "songs/nuta1.mp3" },
  { id: 2, url: "songs/nuta2.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSongIndex].url);

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

// Obsługa klawisza spacji do odtwarzania/pauzy
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    toggleSongPause();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight') {
    event.preventDefault();
    nextSong();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    event.preventDefault();
    prevSong();
  }
});

// Automatyczne przejście do następnej piosenki po zakończeniu
audio.addEventListener('ended', nextSong);

// Aktualizacja głośności
const rangeSlide = (value) => {
  const volume = value / 100; // Konwersja zakresu 0-100 na 0-1
  audio.volume = volume;
  document.querySelector('.rangeValue').innerText = value + "%";
};
