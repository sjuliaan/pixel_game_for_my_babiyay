console.log("Jasmine and Chippoy's Adventure Initialized");

// script.js (This is for the Main Menu logic)

function startGame() {
    // Redirect to the actual game page
    window.location.href = "game.html";
}

function continueGame() {
    alert("Save system coming soon!");
}

function exitGame() {
    // Browsers often block window.close() for security, 
    // but we can redirect to a 'thanks for playing' page or similar.
    if(confirm("Are you sure you want to exit?")) {
        window.close(); 
    }
}