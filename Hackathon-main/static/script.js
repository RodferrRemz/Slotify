let songs = [];  // Store the list of songs
let finalSong = null;  // Store the final selected song
 
// Load all songs when the page loads
async function loadSongs() {
    try {
        let response = await fetch("/get_all_songs");
        let data = await response.json();
        if (data.songs) {
            songs = data.songs;  // Store all songs for animation
        }
    } catch (error) {
        console.error("Error fetching song list:", error);
    }
}
 
// Function to spin reels
async function spin() {
    document.getElementById("message").innerText = "Spinning...";
    document.getElementById("youtubeButton").style.display = "none"; // Hide the button initially
    if (songs.length === 0) {
        console.error("Song list is empty! Make sure Flask is running and has data.");
        return;
    }
 
    let reelElements = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];
 
    let intervals = [];
 
    // Start spinning all reels
    for (let i = 0; i < reelElements.length; i++) {
        intervals[i] = setInterval(() => {
            let randomSong = songs[Math.floor(Math.random() * songs.length)];
            reelElements[i].innerText = randomSong.title; // Change text rapidly
        }, 100); // Speed of spin
    }
 
    // Get the final selected song
    finalSong = await fetchRandomTrack();
 
    // Stop reels one by one, keeping the same final song
    setTimeout(() => {
        clearInterval(intervals[0]);
        reelElements[0].innerText = finalSong.title;
    }, 2000);  // Stop first reel
 
    setTimeout(() => {
        clearInterval(intervals[1]);
        reelElements[1].innerText = finalSong.title;
    }, 3000);  // Stop second reel
 
    setTimeout(() => {
        clearInterval(intervals[2]);
        reelElements[2].innerText = finalSong.title;
        document.getElementById("message").innerText = `${finalSong.title} - ${finalSong.artist}`;
        document.getElementById("youtubeButton").style.display = "block"; // Show the button after spinning stops
    }, 4000);  // Stop third reel and show final song
}
 
// Fetch the final song after spinning
async function fetchRandomTrack() {
    try {
        let response = await fetch("/get_random_track");
        let data = await response.json();
        return data;  // Return the selected song
    } catch (error) {
        console.error("Error fetching track:", error);
    }
}
 
// Function to open YouTube link
function openYouTubeLink() {
    if (finalSong) {
        let query = encodeURIComponent(`${finalSong.title} ${finalSong.artist}`);
        let youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
        window.open(youtubeUrl, "_blank");
    }
}
 
// Load all songs when the page loads
window.onload = loadSongs;
