var songs = [
    {
        id: 1,
        title: "Synthwave Drifter",
        artist: "Lazerpunk",
        cover: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Chill Lofi Beats",
        artist: "Quiet Mornings",
        cover: "https://plus.unsplash.com/premium_photo-1759379166523-8dc97148dcb8?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Neon Tokyo",
        artist: "Midnight City",
        cover: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Ocean Drive",
        artist: "Miami Nights",
        cover: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Star Gazer",
        artist: "Cosmic Array",
        cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        title: "Forest Rain",
        artist: "Nature Sounds",
        cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 7,
        title: "Desert Mirage",
        artist: "Oasis",
        cover: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 8,
        title: "Deep House",
        artist: "Club Mix",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

var songsContainer = document.getElementById('songs-container');
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');

var audioPlayer = document.getElementById('audio-player');
var playBtn = document.getElementById('play-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');

var currentCover = document.getElementById('current-cover');
var currentTitle = document.getElementById('current-title');
var currentArtist = document.getElementById('current-artist');

var progressBar = document.getElementById('progress-bar');
var currentTimeEl = document.getElementById('current-time');
var durationTimeEl = document.getElementById('duration-time');

var currentSongIndex = 0;
var isPlaying = false;

function renderSongs(songsToRender) {
    if (!songsContainer) return;
    songsContainer.innerHTML = '';

    if (songsToRender.length === 0) {
        songsContainer.innerHTML = '<p>No songs found.</p>';
        return;
    }

    for (var i = 0; i < songsToRender.length; i++) {
        var song = songsToRender[i];

        var card = document.createElement('div');
        card.className = 'card';

        card.innerHTML =
            '<img src="' + song.cover + '" alt="Cover image for ' + song.title + '">' +
            '<h3>' + song.title + '</h3>' +
            '<p>' + song.artist + '</p>';

        card.addEventListener('click', createClickHandler(song));

        songsContainer.appendChild(card);
    }
}

function createClickHandler(songItem) {
    return function () {
        currentSongIndex = -1;

        for (var i = 0; i < songs.length; i++) {
            if (songs[i].id === songItem.id) {
                currentSongIndex = i;
                break;
            }
        }

        if (currentSongIndex !== -1) {
            loadSong(songs[currentSongIndex]);
            playSong();
        }
    };
}

function loadSong(song) {
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentCover.src = song.cover;
    currentCover.style.display = 'block';
    audioPlayer.src = song.audioSrc;
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '⏸';
    audioPlayer.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '▶';
    audioPlayer.pause();
}

playBtn.addEventListener('click', function () {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', function () {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
});

nextBtn.addEventListener('click', function () {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
});

audioPlayer.addEventListener('ended', function () {
    nextBtn.click();
});

progressBar.addEventListener('input', function () {
    var seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

if (songsContainer) {
    renderSongs(songs);
}

