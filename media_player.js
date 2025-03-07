const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const albumSelection = document.getElementById('album-selection');
const mediaPlayer = document.getElementById('media-player');

const music = new Audio();

const albums = [
    {
        name: 'Fate/Grand Order: Zettai Majuu Sensen Babylonia Original Soundtrack I',
        cover: 'assets/Fate_Grand-Order_-Zettai-Majuu-Sensen-Babylonia-OST-Vol.-1.jpg',
        tracks: [
            {
                path: 'https://dl.dropboxusercontent.com/s/dudkt0wpfobs9hz/01%20Absolute%20Demonic%20Front.mp3',
                displayName: 'Absolute Demonic Front',
                artist: 'Fate/Grand Order'
            },
            {
                path: 'https://dl.dropboxusercontent.com/s/4nqmko5typctkhv/02%20To%20Hold%20This%20Shield.mp3',
                displayName: 'To Hold This Shield',
                artist: 'Fate/Grand Order'
            },
            {
                path: 'https://dl.dropboxusercontent.com/s/15xkotsczpnt83k/03%20Your%20Wish.mp3',
                displayName: 'Your Wish',
                artist: 'Fate/Grand Order'
            },
        ]
    },
    {
        name: 'Fate/Grand Order: Zettai Majuu Sensen Babylonia Original Soundtrack II',
        cover: 'assets/Fate_Grand-Order_-Zettai-Majuu-Sensen-Babylonia-OST-Vol.-2.jpg',
        tracks: [
            {
                path: 'https://dl.dropboxusercontent.com/s/h3imssd9jzd64o2/01%20Hero%27s%20Mission.mp3',
                displayName: "Hero's Mission",
                artist: 'Fate/Grand Order'
            },
            {
                path: 'https://dl.dropboxusercontent.com/s/5823jiq9ew6zcik/02%20Mage%20of%20Flowers.mp3',
                displayName: 'Mage of Flowers',
                artist: 'Fate/Grand Order'
            },
            {
                path: 'https://dl.dropboxusercontent.com/s/sswc3iltw6ens3i/03%20Jaguar%20in%20the%20Jungle.mp3',
                displayName: 'Jaguar in the Jungle',
                artist: 'Fate/Grand Order'
            }
        ]
    }
];

let albumIndex = 0;
let musicIndex = 0;
let isPlaying = false;

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = albums[albumIndex].cover;
    background.src = albums[albumIndex].cover;

    document.title = `${song.displayName} // ${song.artist}`;
}

function changeMusic(direction) {
    let currentAlbum = albums[albumIndex].tracks;
    musicIndex = (musicIndex + direction + currentAlbum.length) % currentAlbum.length;
    loadMusic(currentAlbum[musicIndex]);
    playMusic();
}

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

document.querySelectorAll('.album').forEach(album => {
    album.addEventListener('click', (e) => {
        albumIndex = parseInt(e.currentTarget.getAttribute('data-album'));
        musicIndex = 0;
        albumSelection.classList.add('hidden');
        mediaPlayer.classList.remove('hidden');
        loadMusic(albums[albumIndex].tracks[musicIndex]);
    });
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
