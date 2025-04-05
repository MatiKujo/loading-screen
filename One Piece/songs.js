const songs = [
  { id: 1, title: "Jaja na twardo", author: "rów babicze", url: "songs/nuta1.mp3" },
  { id: 2, title: "RysunKOwY PoTwóR", author: "chivas", url: "songs/nuta2.mp3" },
  { id: 3, title: "Hej czy ty wiesz", author: "Dawid Jasper", url: "songs/nuta3.mp3" },
  { id: 4, title: "Zwariowana noc", author: "Dawid Jasper", url: "songs/nuta4.mp3" }
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
  const songInfoContainer = document.querySelector('.song-info');
  const song = songs[index];

  const html = `
    <div class="song-window">
      <p>${song.title}</p>
      <p>${song.author}</p>
    </div>
  `;

  songInfoContainer.innerHTML = html;
  audio.src = song.url;
  isPlaying = false;
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

window.onload = () => {
  loadSong(currentSongIndex);
  rangeSlide(currentVolume); // opcjonalnie, jeśli chcesz też od razu ustawić suwak głośności
};

