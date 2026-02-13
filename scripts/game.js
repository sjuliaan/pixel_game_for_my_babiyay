// --- CONFIGURATION ---
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SHOW_DEBUG_COLLISIONS = false;

// Global Zoom variable
let currentZoom = 3;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameScreen = document.getElementById("game-screen");

// DOM Elements
const mapImg = document.getElementById("world-map");
const houseImg = document.getElementById("house-bg");
const zootopiaImg = document.getElementById("zootopia-bg");
const forestBg = document.getElementById("forest-bg");
const forestVignette = document.getElementById("forest-vignette");
const jungleImg = document.getElementById("jungle-bg");
const jasmineImg = document.getElementById("player-sprite");
const chippoyImg = document.getElementById("chippoy-sprite");
const meowdomImg = document.getElementById("meowdom-bg");
const picnicImg = document.getElementById("picnic-bg");

// --- ITEMS & NPCS ---
let leashObj = document.getElementById("leash-item");
let shirtObj = document.getElementById("shirt-item");
let vestObj = document.getElementById("vest-item");

// NPCS & ITEMS
// NPCS & ITEMS
let guardObj = document.getElementById("guard-npc");
let guardDogObj = document.getElementById("guard-dog-npc");
let foodObj = document.getElementById("food-item"); // Old cat food
let boyfriendObj = document.getElementById("boyfriend-npc");
let wifeObj = document.getElementById("wife-npc");
let guardWifeObj = document.getElementById("guard-wife-npc");

// ZOOTOPIA ITEMS
let waterItemObj = document.getElementById("water-item");
let veggiesItemObj = document.getElementById("veggies-item");
let powerupItemObj = document.getElementById("powerup-item");

// REUNION VIDEO
const videoOverlay = document.getElementById("video-overlay");
const reunionVideo = document.getElementById("reunion-video");
const portalVideo = document.getElementById("portal-transition-video");
const skipVideoBtn = document.getElementById("skip-video");

// ZOOTOPIA PORTAL
let zootopiaPortalObj = document.getElementById("zootopia-portal");
let zootopiaPortalEffectObj = document.getElementById("zootopia-portal-effect");
let wifeIsFollowing = false;
let jungleEnemy1Obj = document.createElement("img");
jungleEnemy1Obj.id = "jungle-enemy-1";
jungleEnemy1Obj.className = "pixel-sprite";
jungleEnemy1Obj.src = "assets/1st_enemy.png";
jungleEnemy1Obj.style.display = "none";
document.getElementById("game-screen").appendChild(jungleEnemy1Obj);

let jungleEnemy2Obj = document.createElement("img");
jungleEnemy2Obj.id = "jungle-enemy-2";
jungleEnemy2Obj.className = "pixel-sprite";
jungleEnemy2Obj.src = "assets/guardian.png";
jungleEnemy2Obj.style.display = "none";
document.getElementById("game-screen").appendChild(jungleEnemy2Obj);

let jungleEnemy3Obj = document.createElement("img");
jungleEnemy3Obj.id = "jungle-enemy-3";
jungleEnemy3Obj.className = "pixel-sprite";
jungleEnemy3Obj.src = "assets/light.png";
jungleEnemy3Obj.style.display = "none";
document.getElementById("game-screen").appendChild(jungleEnemy3Obj);

let jungleEnemy4Obj = document.createElement("img");
jungleEnemy4Obj.id = "jungle-enemy-4";
jungleEnemy4Obj.className = "pixel-sprite";
jungleEnemy4Obj.src = "assets/sibling.png";
// Removed hue-rotate filter as we are using a specific asset now
jungleEnemy4Obj.style.display = "none";
jungleEnemy4Obj.style.display = "none";
document.getElementById("game-screen").appendChild(jungleEnemy4Obj);



let jungleFruitObj = document.createElement("img");
jungleFruitObj.id = "jungle-fruit";
jungleFruitObj.className = "pixel-sprite";
jungleFruitObj.src = "assets/veggies.png"; // Reusing veggies as a rare fruit
jungleFruitObj.style.display = "none";
document.getElementById("game-screen").appendChild(jungleFruitObj);

let lightFoodObj = document.createElement("img");
lightFoodObj.id = "light-food";
lightFoodObj.className = "pixel-sprite";
lightFoodObj.src = "assets/catfood.png"; // Using cat food sprite
lightFoodObj.style.display = "none";
document.getElementById("game-screen").appendChild(lightFoodObj);

let squeakyToyObj = document.createElement("img");
squeakyToyObj.id = "squeaky-toy";
squeakyToyObj.className = "pixel-sprite";
squeakyToyObj.src = "assets/sibling_toy.png"; // Updated item for Chippoy's sibling
squeakyToyObj.style.display = "none";
document.getElementById("game-screen").appendChild(squeakyToyObj);

let bobbyObj = document.createElement("img");
bobbyObj.id = "bobby-npc";
bobbyObj.className = "pixel-sprite";
bobbyObj.src = "assets/bobby.png";
bobbyObj.style.display = "none";
document.getElementById("game-screen").appendChild(bobbyObj);

let junglePortalObj = document.createElement("img");
junglePortalObj.id = "jungle-portal";
junglePortalObj.className = "pixel-sprite";
junglePortalObj.src = "assets/portal.png";
junglePortalObj.style.display = "none";
junglePortalObj.style.zIndex = "11"; // In front of effect
document.getElementById("game-screen").appendChild(junglePortalObj);

let junglePortalEffectObj = document.createElement("div");
junglePortalEffectObj.id = "jungle-portal-effect";
junglePortalEffectObj.className = "pixel-sprite";
junglePortalEffectObj.style.display = "none";
junglePortalEffectObj.style.zIndex = "10";
junglePortalEffectObj.style.background = "radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,100,255,0.2) 50%, transparent 70%)";
junglePortalEffectObj.style.borderRadius = "50%";
junglePortalEffectObj.style.filter = "blur(10px)";
junglePortalEffectObj.style.animation = "portal-swirl 4s infinite linear";
document.getElementById("game-screen").appendChild(junglePortalEffectObj);

let lilyObjects = [];
for (let i = 0; i < 3; i++) {
    let obj = document.createElement("img");
    obj.className = "pixel-sprite glowing-lily";
    obj.src = "assets/veggies.png"; // Placeholder for lily
    obj.style.filter = "hue-rotate(300deg) brightness(1.5)"; // Purple glow
    obj.style.display = "none";
    document.getElementById("game-screen").appendChild(obj);
    lilyObjects.push(obj);
}

let meowdomCatObjs = [];


let meowdomOverlay = document.createElement("div");
meowdomOverlay.id = "meowdom-overlay";
document.getElementById("game-screen").appendChild(meowdomOverlay);

// Decoration Flowers for Meowdom
let flowerObjs = [];


let instructionBox = document.createElement("div");

// --- DEBUG / DEV TOOLS ---
let debugBox = document.createElement("div");
debugBox.style.position = "absolute";
debugBox.style.top = "10px";
debugBox.style.left = "10px";
debugBox.style.color = "yellow";
debugBox.style.backgroundColor = "rgba(0,0,0,0.8)";
debugBox.style.padding = "8px";
debugBox.style.fontFamily = "monospace";
debugBox.style.fontSize = "14px";
debugBox.style.zIndex = "2000";
debugBox.style.pointerEvents = "none";
document.body.appendChild(debugBox);

// ⚡ DEV SKIP BUTTONS ⚡
const devBtn = document.createElement("button");
devBtn.innerText = "⚡ SKIP TO ZOOTOPIA ⚡";
devBtn.style.position = "absolute";
devBtn.style.top = "10px";
devBtn.style.right = "10px";
devBtn.style.zIndex = "3000";
devBtn.style.padding = "10px";
devBtn.style.cursor = "pointer";
devBtn.style.fontWeight = "bold";
devBtn.style.fontFamily = "'Press Start 2P', cursive";
devBtn.style.backgroundColor = "#ff4444";
devBtn.style.color = "white";
devBtn.style.border = "2px solid white";

devBtn.onclick = () => {
    questState = 4; // 4 = Arrived in Zootopia
    itemLeash.collected = true;
    itemShirt.collected = true;
    itemVest.collected = true;
    switchScene("zootopia");
};
devBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devBtn);

// ⚡ DEV SKIP TO JUNGLE BUTTON ⚡
const devJungleBtn = document.createElement("button");
devJungleBtn.innerText = "⚡ SKIP TO JUNGLE ⚡";
devJungleBtn.style.position = "absolute";
devJungleBtn.style.top = "60px"; // Below the first button
devJungleBtn.style.right = "10px";
devJungleBtn.style.zIndex = "3000";
devJungleBtn.style.padding = "10px";
devJungleBtn.style.cursor = "pointer";
devJungleBtn.style.fontWeight = "bold";
devJungleBtn.style.fontFamily = "'Press Start 2P', cursive";
devJungleBtn.style.backgroundColor = "#44ff44";
devJungleBtn.style.color = "black";
devJungleBtn.style.border = "2px solid black";

devJungleBtn.onclick = () => {
    questState = 6; // 6 = Ready for Jungle
    zootopiaQuestState = 3; // Completed Zootopia quest
    itemLeash.collected = true;
    itemShirt.collected = true;
    itemVest.collected = true;
    itemWater.collected = true;
    itemVeggies.collected = true;
    chippoyArmor.leash = true;
    chippoyArmor.shirt = true;
    chippoyArmor.vest = true;
    chippoyFed.water = true;
    chippoyFed.veggies = true;
    switchScene("jungle");
};
devJungleBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devJungleBtn);

// ⚡ DEV SKIP TO SIBLING BUTTON ⚡
const devSiblingBtn = document.createElement("button");
devSiblingBtn.innerText = "⚡ SKIP TO SIBLING ⚡";
devSiblingBtn.style.position = "absolute";
devSiblingBtn.style.top = "110px"; // Below the jungle button
devSiblingBtn.style.right = "10px";
devSiblingBtn.style.zIndex = "3000";
devSiblingBtn.style.padding = "10px";
devSiblingBtn.style.cursor = "pointer";
devSiblingBtn.style.fontWeight = "bold";
devSiblingBtn.style.fontFamily = "'Press Start 2P', cursive";
devSiblingBtn.style.backgroundColor = "#4444ff";
devSiblingBtn.style.color = "white";
devSiblingBtn.style.border = "2px solid white";

devSiblingBtn.onclick = () => {
    lightBefriended = true;
    questState = 7;
    switchScene("jungle");
    // Position near Sibling
    jasmine.x = enemy4.x - 50;
    jasmine.y = enemy4.y + 50;
    chippoy.x = jasmine.x - 20;
    chippoy.y = jasmine.y;
    startBattle(enemy4);
};
devSiblingBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devSiblingBtn);

// ⚡ DEV SKIP TO REUNION BUTTON ⚡
const devReunionBtn = document.createElement("button");
devReunionBtn.innerText = "⚡ SKIP TO REUNION ⚡";
devReunionBtn.style.position = "absolute";
devReunionBtn.style.top = "160px"; // Below the sibling button
devReunionBtn.style.right = "10px";
devReunionBtn.style.zIndex = "3000";
devReunionBtn.style.padding = "10px";
devReunionBtn.style.cursor = "pointer";
devReunionBtn.style.fontWeight = "bold";
devReunionBtn.style.fontFamily = "'Press Start 2P', cursive";
devReunionBtn.style.backgroundColor = "#ff77ff";
devReunionBtn.style.color = "white";
devReunionBtn.style.border = "2px solid white";

devReunionBtn.onclick = () => {
    questState = 5;
    zootopiaQuestState = 3;
    itemWater.collected = true;
    itemVeggies.collected = true;
    chippoyFed.water = true;
    chippoyFed.veggies = true;
    switchScene("zootopia");
    jasmine.x = zootopiaPortal.x - 20;
    jasmine.y = zootopiaPortal.y + 40;
    zootopiaPortal.visible = true;
    wife.x = jasmine.x - 30;
    wife.y = jasmine.y;
    wifeIsFollowing = true;
    playReunionVideo();
};
devReunionBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devReunionBtn);

// ⚡ DEV SKIP TO MEOWDOM BUTTON ⚡
const devMeowdomBtn = document.createElement("button");
devMeowdomBtn.innerText = "⚡ SKIP TO MEOWDOM ⚡";
devMeowdomBtn.style.position = "absolute";
devMeowdomBtn.style.top = "210px"; // Below reunion button
devMeowdomBtn.style.right = "10px";
devMeowdomBtn.style.zIndex = "3000";
devMeowdomBtn.style.padding = "10px";
devMeowdomBtn.style.cursor = "pointer";
devMeowdomBtn.style.fontWeight = "bold";
devMeowdomBtn.style.fontFamily = "'Press Start 2P', cursive";
devMeowdomBtn.style.backgroundColor = "#ffaa00";
devMeowdomBtn.style.color = "black";
devMeowdomBtn.style.border = "2px solid black";

devMeowdomBtn.onclick = () => {
    switchScene("meowdom");
};
devMeowdomBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devMeowdomBtn);

// ⚡ DEV SKIP TO PICNIC BUTTON ⚡
const devPicnicBtn = document.createElement("button");
devPicnicBtn.innerText = "⚡ SKIP TO PICNIC ⚡";
devPicnicBtn.style.position = "absolute";
devPicnicBtn.style.top = "260px"; // Below meowdom button
devPicnicBtn.style.right = "10px";
devPicnicBtn.style.zIndex = "3000";
devPicnicBtn.style.padding = "10px";
devPicnicBtn.style.cursor = "pointer";
devPicnicBtn.style.fontWeight = "bold";
devPicnicBtn.style.fontFamily = "'Press Start 2P', cursive";
devPicnicBtn.style.backgroundColor = "#ff77aa";
devPicnicBtn.style.color = "black";
devPicnicBtn.style.border = "2px solid black";

devPicnicBtn.onclick = () => {
    switchScene("picnic");
};
devPicnicBtn.style.display = "none"; // Hidden for production
document.body.appendChild(devPicnicBtn);



// UI
const promptBox = document.getElementById("interaction-prompt");
const dialogueBox = document.getElementById("dialogue-container");
const dialogueText = document.getElementById("dialogue-text");
const dialogueArrow = document.getElementById("dialogue-arrow");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// --- GAME STATE ---
const keys = {};
const camera = { x: 0, y: 0 };
let currentScene = "house";
let questState = 0;
let zootopiaQuestState = 0; // 0=Init, 1=ItemsFound, 2=FedChippoy, 3=Done
let isDialogueOpen = false;
let isCutscene = false; // Blocks input during animations
let isInventoryOpen = false;
let isFeedingOpen = false; // New state
let isCarryingChippoy = false;
let dialogueQueue = [];
let dialogueIndex = 0;
let lastHopTime = 0;
let lastBarkTime = 0;

// --- MODES ---
let isBuilderMode = false;
let buildStart = null;
let isGhostMode = false;

// --- BATTLE STATE ---
let isBattleActive = false;
let currentEnemy = null;
let playerStats = { hp: 100, maxHp: 100, atk: 15, def: 5, powerUp: 1, enchanted: false };
let enemyStats = { hp: 100, maxHp: 100, atk: 10, name: "Unknown" };

const enemy1 = { x: 353, y: 748, width: 25, height: 25, defeated: false, name: "Mysterious Grunt", hp: 60, atk: 12, src: "assets/1st_enemy.png" };
const enemy2 = { x: 1197, y: 305, width: 40, height: 40, defeated: false, name: "Ancient Guardian", hp: 3000, atk: 180, src: "assets/guardian.png" };
const enemy3 = { x: 1827, y: 1346, width: 30, height: 30, defeated: false, name: "Light", hp: 100, atk: 5, src: "assets/light.png" };
const enemy4 = { x: 550, y: 1650, width: 40, height: 40, defeated: false, name: "Chippoy's Sibling", hp: 3000, atk: 120, src: "assets/sibling.png" };
const itemPowerup = { x: 967, y: 954, radius: 50, collected: false, name: "Mystic Powerup" }; // Placed at specified jungle coordinates
const jungleFruit = { x: 150, y: 150, radius: 40, collected: false, height: 40, width: 40, visible: false };
const lightFood = { x: 973, y: 1684, radius: 40, collected: false, visible: false }; // New quest item
const squeakyToy = { x: 1600, y: 1550, radius: 40, collected: false, visible: false }; // Positioned for easier finding
const bobby = { x: 400, y: 400, width: 30, height: 30, name: "Bobby" };
const lilies = [
    { x: 200, y: 300, collected: false, visible: false },
    { x: 600, y: 200, collected: false, visible: false },
    { x: 500, y: 700, collected: false, visible: false }
];
const meowdomCats = [];

let meowdomParticleInterval = null;
const meowdomFlowers = [];

let lilyCount = 0;
let lightBefriended = false;
let siblingBefriended = false;
let bobbyFollowing = false;
let chippoyExhausted = false;
let siblingGuiding = false;
let meowdomScentActivated = false; // New flag for Meowdom scent tracking
const junglePortal = { x: 1018, y: 106, radius: 50, visible: false };

// --- ACTORS ---

const jasmine = {
    x: 136, y: 73,
    width: 20, height: 20,
    speed: 0.6,
    facing: "down", isMoving: false
};

const chippoy = {
    x: 65, y: 133,
    width: 24, height: 24,
    facing: "right",
    isMoving: false
};

const guard = { x: 357, y: 214, width: 22, height: 22, visible: true };
const guardWifeWorld = { x: 357, y: 214, width: 22, height: 22, visible: false }; // Replaces guard
const boyfriend = { x: 400, y: 300, width: 32, height: 32, visible: false };
const wife = { x: 3068, y: 598, width: 22, height: 22, visible: false };
const guardDog = { x: 400, y: 935, width: 25, height: 25, visible: false };
const zootopiaPortal = { x: 3046, y: 1776, width: 64, height: 64, visible: false };
const zootopiaPortalEffect = { x: 3046, y: 1776, width: 64, height: 64, visible: false };

const itemWater = { x: 3649, y: 2627, radius: 60, collected: false, name: "Fresh Water" };
const itemVeggies = { x: 610, y: 3066, radius: 60, collected: false, name: "Fresh Veggies" };
// itemPowerup moved above

// --- TRIGGERS & ITEMS DATA ---

const triggerEnterHouse = { x: 182, y: 123, radius: 30 };
const houseDoorRect = { x: 168, y: 90, w: 37, h: 20 };

const itemLeash = { x: 560, y: 52, radius: 30, collected: false, name: "Lucky Leash" };
const itemShirt = { x: 75, y: 24, radius: 25, collected: false, name: "Lucky Dog Shirt" };
const itemVest = { x: 318, y: 22, radius: 25, collected: false, name: "Lucky Dog Vest" };
const itemFood = { x: 196, y: 22, radius: 30, collected: false };

// --- COLLISION DATA ---

const houseWalls = [
    { x: 132, y: 126, w: 16, h: 15 },
    { x: 127, y: 131, w: 19, h: 12 },
    { x: 106, y: 145, w: 19, h: 40 },
    { x: 125, y: 144, w: 48, h: 22 },
    { x: 167, y: 166, w: 4, h: 19 },
    { x: 127, y: 166, w: 25, h: 12 },
    { x: 21, y: 62, w: 89, h: 58 },
    { x: 14, y: 62, w: 7, h: 59 },
    { x: 1, y: 61, w: 12, h: 60 },
    { x: 1, y: 121, w: 6, h: 29 },
    { x: 1, y: 157, w: 25, h: 25 },
    { x: 35, y: 165, w: 24, h: 15 },
    { x: 180, y: 163, w: 12, h: 21 },
    { x: 199, y: 167, w: 24, h: 18 },
    { x: 64, y: 162, w: 37, h: 21 },
    { x: 116, y: 60, w: 46, h: 42 },
    { x: 110, y: 71, w: 7, h: 22 },
    { x: 162, y: 72, w: 5, h: 21 },
    { x: 207, y: 68, w: 22, h: 24 },
    { x: 230, y: 63, w: 38, h: 110 },
    { x: 264, y: 172, w: 3, h: 28 },
    { x: 0, y: 197, w: 267, h: -1 },
    { x: 167, y: 22, w: 39, h: 76 },
];

const worldWalls = [
    { x: -50, y: 0, w: 50, h: 1000 },
    { x: 0, y: -50, w: 1000, h: 50 },
    { x: 0, y: 550, w: 1000, h: 50 },
    { x: 800, y: 0, w: 50, h: 1000 },
    { x: 148, y: 81, w: 89, h: 62 },
    { x: 2, y: 1, w: 734, h: 14 },
    { x: 1, y: 14, w: 76, h: 71 },
    { x: 78, y: 85, w: 11, h: 56 },
    { x: 93, y: 143, w: 13, h: 14 },
    { x: 106, y: 102, w: 8, h: 1 },
    { x: 103, y: 103, w: 15, h: 2 },
    { x: 99, y: 106, w: 22, h: 11 },
    { x: 98, y: 118, w: 20, h: 4 },
    { x: 101, y: 122, w: 13, h: 2 },
    { x: 105, y: 124, w: 9, h: 6 },
    { x: 107, y: 157, w: 17, h: 32 },
    { x: 123, y: 189, w: 19, h: 17 },
    { x: 140, y: 206, w: 27, h: 9 },
    { x: 173, y: 216, w: 22, h: 2 },
    { x: 199, y: 207, w: 43, h: 2 },
    { x: 241, y: 207, w: 17, h: 0 },
    { x: 246, y: 191, w: 17, h: 16 },
    { x: 263, y: 175, w: 21, h: 14 },
    { x: 185, y: 15, w: 1, h: 43 },
    { x: 189, y: 58, w: 58, h: 2 },
    { x: 262, y: 38, w: 0, h: 80 },
    { x: 263, y: 117, w: 19, h: -79 },
    { x: 247, y: 38, w: -1, h: 19 },
    { x: 248, y: 38, w: 14, h: 0 },
    { x: 247, y: 16, w: 50, h: 7 },
    { x: 278, y: 38, w: 5, h: 79 },
    { x: 297, y: 80, w: 15, h: 13 },
    { x: 342, y: 85, w: 17, h: 9 },
    { x: 357, y: 21, w: 2, h: 67 },
    { x: 263, y: 109, w: 19, h: 9 },
    { x: 297, y: 38, w: 2, h: 42 },
    { x: 263, y: 38, w: 34, h: 2 },
    { x: 398, y: 67, w: 21, h: 10 },
    { x: 412, y: 34, w: 7, h: 33 },
    { x: 366, y: 34, w: 53, h: 11 },
    { x: 365, y: 35, w: 6, h: 42 },
    { x: 419, y: 21, w: 102, h: 22 },
    { x: 437, y: 37, w: 70, h: 15 },
    { x: 466, y: 51, w: 40, h: 14 },
    { x: 485, y: 69, w: 21, h: 16 },
    { x: 524, y: 16, w: 14, h: 11 },
    { x: 485, y: 98, w: 28, h: 11 },
    { x: 485, y: 110, w: 39, h: 13 },
    { x: 486, y: 124, w: 40, h: 72 },
    { x: 283, y: 190, w: 15, h: 13 },
    { x: 296, y: 206, w: 34, h: 16 },
    { x: 329, y: 222, w: 29, h: 19 },
    { x: 470, y: 145, w: 16, h: 10 },
    { x: 468, y: 157, w: 18, h: 9 },
    { x: 438, y: 162, w: 48, h: 34 },
    { x: 419, y: 190, w: 71, h: 33 },
    { x: 391, y: 206, w: 51, h: 41 },
    { x: 527, y: 124, w: 115, h: 61 },
    { x: 585, y: 109, w: 127, h: 40 },
    { x: 619, y: 92, w: 93, h: 29 },
    { x: 630, y: 28, w: 81, h: 74 },
    { x: 618, y: 15, w: 109, h: 36 },
    { x: 574, y: 15, w: 20, h: 11 },
    { x: 581, y: 28, w: 7, h: 4 },
    { x: 515, y: 49, w: 20, h: 19 },
    { x: 520, y: 70, w: 10, h: 6 },
    { x: 344, y: 15, w: 8, h: 7 },
    { x: 609, y: 35, w: 13, h: 20 },
    { x: 602, y: 42, w: 14, h: 15 },
    { x: 609, y: 58, w: 7, h: 1 },
];

const zootopiaWalls = [
    { x: 328, y: 2566, w: 736, h: 78 },
    { x: 1050, y: 2117, w: 20, h: 1038 },
    { x: 330, y: 2563, w: 730, h: 92 },
    { x: 464, y: 2601, w: 419, h: 434 },
    { x: 327, y: 2823, w: 48, h: 93 },
    { x: 397, y: 2887, w: 47, h: 86 },
    { x: 907, y: 3080, w: 116, h: 86 },
    { x: 906, y: 2893, w: 51, h: 81 },
    { x: 966, y: 2826, w: 58, h: 90 },
    { x: 5, y: 644, w: 356, h: 90 },
    { x: 377, y: 459, w: 245, h: 360 },
    { x: 335, y: 648, w: 36, h: 211 },
    { x: 650, y: 630, w: 42, h: 165 },
    { x: 703, y: 389, w: 250, h: 430 },
    { x: 971, y: 720, w: 43, h: 86 },
    { x: 1046, y: 197, w: 26, h: 597 },
    { x: 1096, y: 712, w: 104, h: 81 },
    { x: 1130, y: 126, w: 467, h: 410 },
    { x: 1151, y: 533, w: 126, h: 103 },
    { x: 1546, y: 531, w: 51, h: 105 },
    { x: 1477, y: 708, w: 56, h: 81 },
    { x: 1557, y: 709, w: 152, h: 84 },
    { x: 1660, y: 192, w: 48, h: 537 },
    { x: 1733, y: 719, w: 52, h: 89 },
    { x: 1790, y: 390, w: 234, h: 430 },
    { x: 2050, y: 359, w: 308, h: 325 },
    { x: 2389, y: 264, w: 28, h: 1681 },
    { x: 2435, y: 1860, w: 432, h: 82 },
    { x: 2838, y: 1737, w: 25, h: 204 },
    { x: 2835, y: 1732, w: 216, h: 82 },
    { x: 3164, y: 1735, w: 193, h: 80 },
    { x: 3202, y: 1795, w: 121, h: 102 },
    { x: 3349, y: 1822, w: 22, h: 119 },
    { x: 3375, y: 1861, w: 722, h: 88 },
    { x: 3925, y: 1862, w: 61, h: 326 },
    { x: 3396, y: 2129, w: 49, h: 77 },
    { x: 3481, y: 2120, w: 607, h: 268 },
    { x: 3399, y: 2331, w: 54, h: 73 },
    { x: 3456, y: 2558, w: 501, h: 112 },
    { x: 3985, y: 2117, w: 32, h: 773 },
    { x: 3603, y: 2822, w: 420, h: 147 },
    { x: 3605, y: 2823, w: 27, h: 600 },
    { x: 1868, y: 1038, w: 177, h: 87 },
    { x: 1552, y: 1038, w: 170, h: 85 },
    { x: 1486, y: 1122, w: 40, h: 67 },
    { x: 1546, y: 1353, w: 169, h: 93 },
    { x: 1867, y: 1364, w: 173, h: 83 },
    { x: 1752, y: 1148, w: 78, h: 99 },
    { x: 1268, y: 1122, w: -36, h: 62 },
    { x: 387, y: 1144, w: 29, h: 401 },
    { x: 402, y: 1146, w: 798, h: 47 },
    { x: 1227, y: 1245, w: 41, h: 75 },
    { x: 337, y: 1439, w: 674, h: 440 },
    { x: 998, y: 1530, w: 76, h: 422 },
    { x: 1221, y: 1768, w: 51, h: 186 },
    { x: 1076, y: 711, w: 25, h: 77 },
    { x: 1484, y: 1770, w: 47, h: 187 },
    { x: 1535, y: 1620, w: 310, h: 286 },
    { x: 1677, y: 1523, w: 57, h: 174 },
    { x: 1565, y: 1596, w: 137, h: 88 },
    { x: 1725, y: 1529, w: 133, h: 252 },
    { x: 1917, y: 1582, w: 321, h: 322 },
    { x: 280, y: 1539, w: 44, h: 1916 },
    { x: 304, y: 3400, w: 1020, h: 84 },
    { x: 1300, y: 3428, w: 29, h: 284 },
    { x: 1326, y: 3654, w: 1281, h: 61 },
    { x: 2579, y: 3465, w: 25, h: 243 },
    { x: 2575, y: 3462, w: 278, h: 82 },
    { x: 2839, y: 3331, w: 23, h: 173 },
    { x: 2834, y: 3334, w: 800, h: 84 },
    { x: 411, y: 3179, w: 22, h: 116 },
    { x: 1238, y: 3114, w: 30, h: 53 },
    { x: 1489, y: 3119, w: 36, h: 46 },
    { x: 1606, y: 2208, w: 247, h: 904 },
    { x: 954, y: 1198, w: 245, h: 205 },
    { x: 571, y: 1198, w: 313, h: 196 },
    { x: 599, y: 2193, w: 34, h: 82 },
    { x: 346, y: 2462, w: 85, h: 99 },
    { x: 2109, y: 2318, w: 297, h: 197 },
    { x: 2564, y: 2311, w: 282, h: 223 },
    { x: 1872, y: 2447, w: 231, h: 82 },
    { x: 2070, y: 2529, w: 29, h: 65 },
    { x: 1927, y: 2515, w: 42, h: 83 },
    { x: 1881, y: 2846, w: 83, h: 135 },
    { x: 1870, y: 3025, w: 234, h: 86 },
    { x: 2446, y: 3020, w: 41, h: 87 },
    { x: 2127, y: 2966, w: 283, h: 148 },
    { x: 1097, y: 2120, w: 51, h: 97 },
    { x: 1101, y: 2574, w: 47, h: 87 },
    { x: 1487, y: 2847, w: 27, h: 69 },
    { x: 327, y: 2122, w: 232, h: 170 },
    { x: 1866, y: 2293, w: 1009, h: 49 },
    { x: 2767, y: 2796, w: 38, h: 53 },
    { x: 2817, y: 2815, w: 303, h: 294 },
    { x: 3213, y: 2944, w: 300, h: 168 },
    { x: 3128, y: 2929, w: 88, h: 53 },
    { x: 3526, y: 2935, w: 68, h: 43 },
    { x: 3521, y: 3025, w: 60, h: 83 },
    { x: 3467, y: 3264, w: 104, h: 72 },
    { x: 3398, y: 3309, w: 59, h: 36 },
    { x: 1334, y: 3460, w: 1172, h: 43 },
    { x: 4, y: 1220, w: 361, h: 80 },
    { x: 338, y: 1033, w: 32, h: 409 },
    { x: 2728, y: 1595, w: 242, h: 133 },
    { x: 2728, y: 1706, w: 101, h: 119 },
    { x: 3432, y: 1590, w: 184, h: 268 },
    { x: 3432, y: 1590, w: 184, h: 268 },
    { x: 2662, y: 1146, w: 300, h: 299 },
    { x: 2763, y: 1435, w: 50, h: 137 },
    { x: 3302, y: 1145, w: 308, h: 301 },
    { x: 3623, y: 1078, w: 150, h: 294 },
    { x: 3294, y: 507, w: 327, h: 471 },
    { x: 3790, y: 263, w: 307, h: 1602 },
    { x: 2390, y: 263, w: 1431, h: 90 },
    { x: 2657, y: 496, w: 246, h: 505 },
    { x: 1865, y: 1718, w: 51, h: 46 },
    { x: 2971, y: 537, w: 91, h: 188 },
    { x: 3161, y: 599, w: 76, h: 81 },
    { x: 3032, y: 2149, w: 100, h: 120 },
    { x: 2885, y: 2461, w: 40, h: 71 },
    { x: 3349, y: 2251, w: 152, h: 77 },
    { x: 2441, y: 2445, w: 120, h: 80 },
];

const jungleWalls = [

];

// --- NEW FEATURE: HIDDEN ZONES (Walking behind roofs) ---
const zootopiaHiddenZones = [
    { x: 3035, y: 1676, w: 147, h: 63 },
    { x: 2973, y: 444, w: 254, h: 133 },

    { x: 332, y: 1985, w: 243, h: 182 },
    { x: 1330, y: 3247, w: 270, h: 201 },
    { x: 1678, y: 3253, w: 240, h: 197 },
    { x: 1994, y: 3273, w: 244, h: 175 },
    { x: 2308, y: 3273, w: 253, h: 227 },
    { x: 2555, y: 2170, w: 307, h: 126 },
    { x: 2820, y: 2701, w: 704, h: 268 },
    { x: 1613, y: 2208, w: 99, h: -91 },
    { x: 2109, y: 2704, w: 320, h: 263 },
    { x: 2762, y: 2676, w: 33, h: 115 },
    { x: 1712, y: 2116, w: 142, h: 105 },
    { x: 2093, y: 2134, w: 343, h: 160 },
    { x: 1225, y: 2992, w: 36, h: 119 },
    { x: 1485, y: 2989, w: 28, h: 126 },
    { x: 390, y: 3122, w: 37, h: 126 },
    { x: 577, y: 1083, w: 331, h: 58 },
    { x: 725, y: 969, w: 35, h: 173 },
    { x: 592, y: 1065, w: 310, h: 21 },
    { x: 645, y: 1025, w: 109, h: 51 },
    { x: 694, y: 993, w: 213, h: 96 },
    { x: 695, y: 995, w: 89, h: 75 },
    { x: 720, y: 978, w: 40, h: 98 },
    { x: 1071, y: 953, w: 32, h: 184 },
    { x: 958, y: 1070, w: 140, h: 72 },
    { x: 992, y: 1036, w: 229, h: 127 },
    { x: 1028, y: 996, w: 81, h: 127 },
    { x: 1048, y: 983, w: 143, h: 167 },
    { x: 1058, y: 966, w: 150, h: 181 },
    { x: 1069, y: 954, w: 137, h: 188 },
    { x: 1225, y: 1010, w: 34, h: 112 },
    { x: 1479, y: 1012, w: 33, h: 112 },

];

window.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (e.key === "b" || e.key === "B") {
        if (!e.repeat) {
            try { audioManager.playBark(); } catch (e) { }
            checkScent();
        }
    }
    if (e.key === "F9") {
        isBuilderMode = !isBuilderMode;
        buildStart = null;
        alert(`BUILDER MODE: ${isBuilderMode ? "ON" : "OFF"}\nLeft Click: Wall\nRight Click: Hidden Zone (Roof)`);
    }
    if (e.key === "g" || e.key === "G") {
        isGhostMode = !isGhostMode;
        console.log("Ghost Mode:", isGhostMode);
    }
    if (e.key === "e" || e.key === "E") {
        if (isDialogueOpen) advanceDialogue();
        else checkInteraction();
    }
});
window.addEventListener("keyup", e => keys[e.key] = false);
dialogueBox.addEventListener("click", () => { if (isDialogueOpen) advanceDialogue(); });

// DISABLE CONTEXT MENU FOR RIGHT CLICK
gameScreen.addEventListener("contextmenu", e => e.preventDefault());

gameScreen.addEventListener("mousedown", (e) => {
    if (!isBuilderMode) return;
    const rect = gameScreen.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const gameX = Math.floor((clickX / currentZoom) + camera.x);
    const gameY = Math.floor((clickY / currentZoom) + camera.y);

    if (!buildStart) {
        buildStart = { x: gameX, y: gameY };
        const marker = document.createElement("div");
        marker.style.position = "absolute";
        marker.style.left = clickX + "px";
        marker.style.top = clickY + "px";
        marker.style.width = "5px";
        marker.style.height = "5px";
        marker.style.backgroundColor = e.button === 2 ? "blue" : "red"; // Blue for hidden zone
        marker.id = "temp-marker";
        gameScreen.appendChild(marker);
    } else {
        const width = gameX - buildStart.x;
        const height = gameY - buildStart.y;

        const type = e.button === 2 ? "HIDDEN ZONE" : "WALL";
        const codeString = `{ x: ${buildStart.x}, y: ${buildStart.y}, w: ${width}, h: ${height} },`;

        prompt(`Copy this ${type} code:`, codeString);

        buildStart = null;
        const m = document.getElementById("temp-marker");
        if (m) m.remove();
    }
});

// --- INVENTORY LOGIC ---
const inventoryUI = document.getElementById("armor-inventory");
const closeInvBtn = document.getElementById("close-inventory-btn");
const jasmineBag = document.getElementById("jasmine-bag");
const chippoySlots = document.querySelectorAll("#chippoy-slots .slot");
let chippoyArmor = { leash: false, shirt: false, vest: false, powerup: false };
let chippoyFed = { water: false, veggies: false, jungleFruit: false, lightFood: false }; // New feeding state

function setupInventory() {
    if (closeInvBtn) closeInvBtn.onclick = closeInventory;

    chippoySlots.forEach(slot => {
        slot.addEventListener("dragover", e => e.preventDefault());
        slot.addEventListener("dragenter", e => {
            e.preventDefault();
            slot.classList.add("drag-over");
        });
        slot.addEventListener("dragleave", () => {
            slot.classList.remove("drag-over");
        });
        slot.addEventListener("drop", (e) => {
            slot.classList.remove("drag-over");
            handleDrop(e);
        });
    });
}

function openInventory() {
    isInventoryOpen = true;
    if (inventoryUI) inventoryUI.style.display = "flex";
    renderInventory();
    try { audioManager.playSound('click'); } catch (e) { }
}

function closeInventory() {
    isInventoryOpen = false;
    if (inventoryUI) inventoryUI.style.display = "none";
    try { audioManager.playSound('click'); } catch (e) { }

    // Apply Powerup Stats if equipped
    if (chippoyArmor.powerup) {
        playerStats.powerUp = 10; // Massive boost to beat Guardian
        playerStats.maxHp = 500;
        playerStats.hp = playerStats.maxHp;
        playerStats.atk = 50;
    }

    // Check completion on close
    if (checkArmorCompletion() && questState === 2) {
        questState = 3;
        showInstruction("Task: Exit House & Explore");
        startDialogue([
            "CHIPPOY: Wow! It fits perfectly!",
            "CHIPPOY: I feel safe now.",
            "CHIPPOY: Let's go find Bobby and Seth!"
        ]);
    }
}

function checkArmorCompletion() {
    return chippoyArmor.leash && chippoyArmor.shirt && chippoyArmor.vest;
}

function hasItemsToEquip() {
    if (itemLeash.collected && !chippoyArmor.leash) return true;
    if (itemShirt.collected && !chippoyArmor.shirt) return true;
    if (itemVest.collected && !chippoyArmor.vest) return true;
    if (itemPowerup.collected && !chippoyArmor.powerup) return true;
    return false;
}

function renderInventory() {
    // Clear Bag
    jasmineBag.innerHTML = "";

    // Items to potentially show in bag
    const items = [
        { id: "leash", src: "assets/leash.png", name: "Leash" },
        { id: "shirt", src: "assets/shirt.png", name: "Shirt" },
        { id: "vest", src: "assets/vest.png", name: "Vest" },
        { id: "powerup", src: "assets/powerup.png", name: "Mystic Power" }
    ];

    items.forEach(item => {
        let isCollected = false;
        if (item.id === "leash") isCollected = itemLeash.collected;
        if (item.id === "shirt") isCollected = itemShirt.collected;
        if (item.id === "vest") isCollected = itemVest.collected;
        if (item.id === "powerup") isCollected = itemPowerup.collected;

        // If collected AND not yet equipped on Chippoy, show in bag
        if (isCollected && !chippoyArmor[item.id]) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "inventory-item";
            itemDiv.draggable = true;
            itemDiv.dataset.id = item.id;
            itemDiv.title = item.name;

            const img = document.createElement("img");
            img.src = item.src;

            itemDiv.appendChild(img);

            itemDiv.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", item.id);
            });

            jasmineBag.appendChild(itemDiv);
        }
    });

    // Update Slots
    chippoySlots.forEach(slot => {
        const type = slot.dataset.type;
        const labelText = slot.querySelector(".slot-label")?.textContent || type.toUpperCase();

        // Clear slot completely
        slot.innerHTML = "";

        if (chippoyArmor[type]) {
            const img = document.createElement("img");
            img.src = "assets/" + type + ".png";
            img.alt = type;
            slot.appendChild(img);
            slot.classList.add("equipped");
        } else {
            slot.classList.remove("equipped");
        }

        // Always add label last (it will overlay nicely with CSS)
        const label = document.createElement("div");
        label.className = "slot-label";
        label.textContent = labelText;
        slot.appendChild(label);
    });
}

function handleDrop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const slotType = e.currentTarget.dataset.type;

    if (itemId === slotType) {
        chippoyArmor[itemId] = true;
        renderInventory();
        try { audioManager.playSound('equip'); } catch (e) { }
    } else {
        // Optional: Error feedback
        console.log("Wrong slot!");
    }
}

// --- FEEDING LOGIC ---
const feedingUI = document.getElementById("feeding-interface");
const feedingBag = document.getElementById("feeding-bag");
const feedZone = document.getElementById("chippoy-feed-zone");
const feedingMessage = document.getElementById("feeding-message");
const closeFeedingBtn = document.getElementById("close-feeding-btn");

function setupFeeding() {
    if (closeFeedingBtn) closeFeedingBtn.onclick = closeFeeding;
    if (feedZone) {
        feedZone.addEventListener("dragover", e => e.preventDefault());
        feedZone.addEventListener("dragenter", e => {
            e.preventDefault();
            feedZone.classList.add("drag-over");
        });
        feedZone.addEventListener("dragleave", () => {
            feedZone.classList.remove("drag-over");
        });
        feedZone.addEventListener("drop", (e) => {
            feedZone.classList.remove("drag-over");
            handleFeedingDrop(e);
        });
    }
}

function openFeeding() {
    isFeedingOpen = true;
    if (feedingUI) feedingUI.style.display = "flex";
    renderFeeding();
    try { audioManager.playSound('click'); } catch (e) { }
}

function closeFeeding() {
    isFeedingOpen = false;
    if (feedingUI) feedingUI.style.display = "none";
    try { audioManager.playSound('click'); } catch (e) { }

    if (currentScene === "zootopia") {
        if (checkFeedingCompletion()) {
            zootopiaQuestState = 3;
            showInstruction("Task: Talk to Guard Dog again");
            startDialogue([
                "CHIPPOY: *Burp* Excuse me!",
                "CHIPPOY: Thank you Jasmine!",
                "JASMINE: You look much better."
            ]);
        }
    }
    else if (currentScene === "jungle") {
        if (jungleFruit.collected && chippoyFed.jungleFruit) {
            chippoyExhausted = false;
            isCarryingChippoy = false;
            playerStats.hp = playerStats.maxHp;
            startDialogue([
                "JASMINE: There you go, Chippoy. Eat up!",
                "CHIPPOY: *Munch Munch Munch*",
                "CHIPPOY: Woof! Woof! (I'm full of energy!)",
                "JASMINE: You're all better! I'll put you down now."
            ]);
            showInstruction("Task: Find Light!");
        }
    }
}

function renderFeeding() {
    feedingBag.innerHTML = "";
    const items = [
        { id: "water", src: "assets/water.png", collected: itemWater.collected },
        { id: "veggies", src: "assets/veggies.png", collected: itemVeggies.collected },
        { id: "jungleFruit", src: "assets/veggies.png", collected: jungleFruit.collected },
        { id: "lightFood", src: "assets/catfood.png", collected: lightFood.collected }
    ];

    items.forEach(item => {
        if (item.collected && !chippoyFed[item.id]) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "inventory-item";
            itemDiv.draggable = true;
            itemDiv.title = item.name;

            const img = document.createElement("img");
            img.src = item.src;

            itemDiv.appendChild(img);

            itemDiv.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", item.id);
            });

            feedingBag.appendChild(itemDiv);
        }
    });

    if (checkFeedingCompletion()) {
        feedingMessage.innerText = "All Full!";
        setTimeout(closeFeeding, 1500);
    }
}

function handleFeedingDrop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId === "water" || itemId === "veggies" || itemId === "jungleFruit" || itemId === "lightFood") {
        chippoyFed[itemId] = true;
        feedingMessage.innerText = (itemId === "water") ? "Slurp Slurp!" : "Crunch Crunch!";
        try { audioManager.playSound('feed'); } catch (e) { }

        // Visual feedback
        feedZone.classList.add("feed-success");
        setTimeout(() => feedZone.classList.remove("feed-success"), 500);

        renderFeeding();

        if (currentScene === "jungle" && itemId === "jungleFruit") {
            setTimeout(closeFeeding, 1500);
        }
    }
}

function checkFeedingCompletion() {
    if (currentScene === "zootopia") return chippoyFed.water && chippoyFed.veggies;
    if (currentScene === "jungle") return chippoyFed.jungleFruit;
    return false;
}

// --- INITIALIZATION ---
function init() {
    setupInventory();
    setupFeeding();
    instructionBox.id = "instruction-box";
    instructionBox.style.display = "none";
    gameScreen.appendChild(instructionBox);

    if (mapImg.complete) resizeMap();
    else mapImg.onload = resizeMap;

    switchScene("house");
    updateImages();
}

function resizeMap() {
    if (currentScene === "world") {
        mapImg.style.width = (mapImg.naturalWidth * currentZoom) + "px";
        mapImg.style.height = (mapImg.naturalHeight * currentZoom) + "px";
    }
    else if (currentScene === "zootopia") {
        zootopiaImg.style.width = (zootopiaImg.naturalWidth * currentZoom) + "px";
        zootopiaImg.style.height = (zootopiaImg.naturalHeight * currentZoom) + "px";
    }
}

// --- REUNION VIDEO LOGIC ---
let currentPlayingVideo = null;

function playReunionVideo() {
    isCutscene = true;
    jasmine.isMoving = false;
    currentPlayingVideo = reunionVideo;

    if (audioManager.currentMusic) audioManager.currentMusic.pause();

    videoOverlay.style.display = "flex";
    reunionVideo.style.display = "block";
    portalVideo.style.display = "none";
    reunionVideo.currentTime = 0;
    reunionVideo.play();
    reunionVideo.onended = endReunionVideo;
}

function endReunionVideo() {
    videoOverlay.style.display = "none";
    reunionVideo.style.display = "none";
    reunionVideo.pause();
    isCutscene = false;
    currentPlayingVideo = null;

    questState = 5;
    wifeIsFollowing = false;
    zootopiaPortal.visible = false;

    switchScene("world");
    updateCamera();
    showInstruction("Task: Talk to the Guard again");

    try { audioManager.playMusic("world"); } catch (e) { }

    const guardWorldPos = { x: 357, y: 214 };
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(guardWorldPos.x, guardWorldPos.y), i * 150);
    }

    setTimeout(() => {
        startDialogue([
            "JASMINE: Look! They are finally back together!",
            "GUARD: My dear wife! I was so worried!",
            "WIFE: I'm safe now, thanks to Jasmine and Chippoy.",
            "GUARD: Thank you so much! You've proven yourselves to be true heroes."
        ]);
    }, 100);
}

function playPortalVideo() {
    isCutscene = true;
    jasmine.isMoving = false;
    currentPlayingVideo = portalVideo;

    if (audioManager.currentMusic) audioManager.currentMusic.pause();

    videoOverlay.style.display = "flex";
    portalVideo.style.display = "block";
    reunionVideo.style.display = "none";
    portalVideo.currentTime = 0;
    portalVideo.play();
    portalVideo.onended = endPortalVideo;
}

function endPortalVideo() {
    videoOverlay.style.display = "none";
    portalVideo.style.display = "none";
    portalVideo.pause();
    isCutscene = false;
    currentPlayingVideo = null;

    switchScene("jungle");
}

function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.className = "reunion-heart";
    const screenX = (x - camera.x) * currentZoom;
    const screenY = (y - camera.y) * currentZoom;
    heart.style.left = (screenX + (Math.random() * 80 - 40)) + "px";
    heart.style.top = (screenY + (Math.random() * 80 - 40)) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

window.addEventListener("keydown", (e) => {
    if (videoOverlay.style.display === "flex" && (e.key === "s" || e.key === "S")) {
        if (currentPlayingVideo === reunionVideo) endReunionVideo();
        if (currentPlayingVideo === portalVideo) endPortalVideo();
    }
});

skipVideoBtn.addEventListener("click", () => {
    if (videoOverlay.style.display === "flex") {
        if (currentPlayingVideo === reunionVideo) endReunionVideo();
        if (currentPlayingVideo === portalVideo) endPortalVideo();
    }
});

function switchScene(newScene) {
    currentScene = newScene;
    try { audioManager.playMusic(newScene); } catch (e) { }

    // Reset visibility
    leashObj.style.display = "none";
    shirtObj.style.display = "none";
    vestObj.style.display = "none";
    guardObj.style.display = "none";
    foodObj.style.display = "none";
    boyfriendObj.style.display = "none";
    wifeObj.style.display = "none";
    guardWifeObj.style.display = "none";
    guardDogObj.style.display = "none";


    waterItemObj.style.display = "none";
    veggiesItemObj.style.display = "none";
    powerupItemObj.style.display = "none";
    junglePortalObj.style.display = "none";
    junglePortalEffectObj.style.display = "none";
    zootopiaPortalObj.style.display = "none";
    zootopiaPortalEffectObj.style.display = "none";
    zootopiaPortalEffectObj.style.display = "none";
    meowdomImg.style.display = "none";
    picnicImg.style.display = "none"; // Hide picnic bg

    // Meowdom Cleanup
    if (meowdomOverlay) meowdomOverlay.style.display = "none";
    meowdomCatObjs.forEach(obj => obj.style.display = "none");
    flowerObjs.forEach(obj => obj.style.display = "none");

    // Stop Particles if leaving Meowdom (or just clear strictly)
    if (meowdomParticleInterval && newScene !== "meowdom") {
        clearInterval(meowdomParticleInterval);
        meowdomParticleInterval = null;
        document.querySelectorAll(".meowdom-particle").forEach(p => p.remove());
    }

    // Reset opacity
    jasmineImg.style.opacity = "1";
    chippoyImg.style.opacity = "1";

    if (newScene === "house") {
        currentZoom = 3;
        mapImg.style.display = "none";
        houseImg.style.display = "block";
        zootopiaImg.style.display = "none";
        jungleImg.style.display = "none";

        document.body.style.backgroundColor = "#202020";
        camera.x = 0; camera.y = 0;

        if (questState === 0) {
            jasmine.x = 171; jasmine.y = 105;
            chippoy.x = 42; chippoy.y = 118;
            chippoy.facing = "right";
        } else {
            jasmine.x = 180; jasmine.y = 115;
        }

    } else if (newScene === "world") {
        currentZoom = 4.5;
        resizeMap();
        mapImg.style.display = "block";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        jungleImg.style.display = "none";

        if (questState < 6 && questState !== 5) {
            if (questState !== 4) {
                jasmine.x = triggerEnterHouse.x;
                jasmine.y = triggerEnterHouse.y + 40;
            } else {
                jasmine.x = guard.x - 40;
                jasmine.y = guard.y;
            }
        } else if (questState === 5) {
            jasmine.x = guard.x - 40;
            jasmine.y = guard.y;
            // Should be 356, 190 per request, but guard is at 357, 214. 
            // 356, 190 is slightly above/left of guard.
            jasmine.x = 356;
            jasmine.y = 190;
        }

        if (questState === 1) {
            leashObj.style.display = itemLeash.collected ? "none" : "block";
            shirtObj.style.display = itemShirt.collected ? "none" : "block";
            vestObj.style.display = itemVest.collected ? "none" : "block";
            showInstruction("Task: Find Leash, Shirt, & Vest");
        }

        if (questState === 5) {
            guardObj.style.display = "none";
            guardWifeObj.style.display = "block";
        } else {
            guardObj.style.display = "block";
        }

    } else if (newScene === "zootopia") {

        currentZoom = 0.7; // ZOOMED OUT

        resizeMap();
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "block";
        jungleImg.style.display = "none";

        // Jasmine start position in Zootopia
        // Jasmine start position in Zootopia
        jasmine.x = 217; jasmine.y = 935;

        guardDogObj.style.display = "block";

        // Items logic
        if (!itemWater.collected && zootopiaQuestState >= 1) waterItemObj.style.display = "block";
        if (!itemVeggies.collected && zootopiaQuestState >= 1) veggiesItemObj.style.display = "block";

        // Wife logic (Hidden until quest done)
        if (zootopiaQuestState >= 3) wifeObj.style.display = "block";
        else wifeObj.style.display = "none";

        showInstruction("Task: Talk to the Guard Dog");

    } else if (newScene === "meowdom") {
        currentZoom = 1.6; // Improved zoom for Meowdom
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        jungleImg.style.display = "none";
        meowdomImg.style.display = "block";

        // Hide Sibling here as requested
        jungleEnemy4Obj.style.display = "none";

        bobby.x = 147; bobby.y = 208;
        bobbyObj.style.display = "block";

        jasmine.x = 517; jasmine.y = 549; // Entry point in Meowdom
        chippoy.x = 477; chippoy.y = 549; // Chippoy follows closely
        chippoy.facing = "right";

        if (meowdomOverlay) meowdomOverlay.style.display = "block";

        // Arrival Effect
        zootopiaPortal.x = 517;
        zootopiaPortal.y = 549;
        triggerPortalClosing();

        // Update camera and images so they are centered when dialogue opens
        updateCamera();
        updateImages();

        startDialogue(["JASMINE: We made it! But... where are we?", "CHIPPOY: Woof! (Welcome to Meowdom!)"]);
        showInstruction("Explore Meowdom");

        // Start Ambient Particles
        if (!meowdomParticleInterval) {
            meowdomParticleInterval = setInterval(() => {
                const p = document.createElement("div");
                p.className = "meowdom-particle";
                p.style.left = Math.random() * 800 + "px"; // Spawns across width
                p.style.top = "-20px";
                document.getElementById("game-screen").appendChild(p);
                setTimeout(() => p.remove(), 4000);
            }, 300);
        }

        // Create Cats (Hidden)
        // meowdomCats logic removed as per request

        // Flowers logic removed as per request
    } else if (newScene === "picnic") {
        currentZoom = 1.2;
        picnicImg.style.display = "block";
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        jungleImg.style.display = "none";
        meowdomImg.style.display = "none";

        // Specific coordinates as per user request
        boyfriend.x = 691; boyfriend.y = 141;
        boyfriendObj.style.display = "block";

        bobby.x = 620; bobby.y = 160; // Further left but still near Seth
        bobbyObj.style.display = "block";

        jasmine.x = 1299; jasmine.y = 495;
        chippoy.x = 1260; chippoy.y = 495;
        jasmine.facing = "left"; // Look towards Seth

        updateCamera();
        updateImages();

        // startPicnicDialogue removed from here - now triggered by interaction
        showInstruction("Find Seth in the garden");
    } else if (newScene === "final") {
        currentZoom = 3;
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        document.body.style.backgroundColor = "#ffc0cb"; // Soft pink

        // Final Scene setup
        jasmine.x = 400; jasmine.y = 520;
        boyfriendObj.style.display = "block";
        bobbyObj.style.display = "block";
        boyfriend.x = 440; boyfriend.y = 520;
        bobby.x = 380; bobby.y = 520; // Left of Jasmine/Seth group
        chippoy.x = 350; chippoy.y = 520;

        // Add Sibling to final scene
        jungleEnemy4Obj.style.display = "block";
        jungleEnemy4Obj.style.filter = "none"; // Purified!
        enemy4.x = 320; enemy4.y = 500;

        startDialogue([
            "JASMINE: Bobby! Wait up!",
            "BOBBY: *Meow!* (We're here!)",
            "SETH: Jasmine? Is that you?",
            "JASMINE: Seth! I finally found you!",
            "SETH: I was waiting here with Bobby... I wanted to surprise you with this garden.",
            "JASMINE: It's beautiful... and Chippoy found his brother too!",
            "CHIPPOY: Woof! Woof!",
            "SETH: I love you, Jasmine.",
            "JASMINE: I love you too, Seth.",
            "THE END - You found your way home with love!"
        ]);
        hideInstruction();
    }

    else if (newScene === "forest") {
        currentZoom = 3;
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        jungleImg.style.display = "none";
        forestBg.style.display = "block";
        forestVignette.style.display = "block";

        // Start in middle of huge map
        jasmine.x = 2500; jasmine.y = 2500;

        showInstruction("Find Bobby in the Deep Forest!");
    }

    else if (currentScene === "jungle") {
        currentZoom = 0.8; // Zoomed out to fix "super zoomed in" issue
        mapImg.style.display = "none";
        houseImg.style.display = "none";
        zootopiaImg.style.display = "none";
        forestBg.style.display = "none";
        forestVignette.style.display = "none";
        jungleImg.style.display = "block";

        // Show jungle specific actors
        if (!enemy1.defeated) jungleEnemy1Obj.style.display = "block";
        if (!enemy2.defeated) jungleEnemy2Obj.style.display = "block";
        if (!enemy3.defeated) jungleEnemy3Obj.style.display = "block";
        // if (!enemy4.defeated) jungleEnemy4Obj.style.display = "block"; // Hidden as per user request
        jungleEnemy4Obj.style.display = "none";

        // Temporary Portal in Jungle (as per user request)
        zootopiaPortal.x = 428;
        zootopiaPortal.y = 259;

        // Trigger closing animation immediately upon entry
        triggerPortalClosing();

        if (!itemPowerup.collected) {
            powerupItemObj.style.display = "block";
            powerupItemObj.classList.add("glow-animation");
        }

        // Start position in the jungle
        jasmine.x = 400; jasmine.y = 400;
        chippoy.x = 360; chippoy.y = 400; // Ensure Chippoy is with Jasmine
        chippoy.facing = "right";

        showInstruction("Explore the forest");
    }

    updateImages();
}

// --- HITBOX LOGIC ---
function getPlayerHitbox(x, y) {
    if (currentScene === "house") {
        return { x: x + 8, y: y + 22, w: 14, h: 8 };
    }
    // SPECIAL HITBOX FOR ZOOTOPIA & JUNGLE (BIGGER SPRITES)
    else if (currentScene === "zootopia" || currentScene === "jungle") {
        // Adjusted for 6x Scale
        return { x: x + 40, y: y + 90, w: 30, h: 20 };
    }
    else {
        return { x: x + 8.5, y: y + 8, w: 5, h: 10 };
    }
}

function checkCollision(x, y) {
    if (isGhostMode) return false;

    let walls;
    if (currentScene === "house") walls = houseWalls;
    else if (currentScene === "world") walls = worldWalls;
    else if (currentScene === "zootopia") walls = zootopiaWalls;
    else if (currentScene === "forest") {
        // Simple bounds for forest
        walls = [
            { x: 0, y: 0, w: 4000, h: 50 }, // Top
            { x: 0, y: 0, w: 50, h: 4000 }, // Left
            { x: 0, y: 3950, w: 4000, h: 50 }, // Bottom
            { x: 3950, y: 0, w: 50, h: 4000 } // Right
        ];
    }
    else if (currentScene === "jungle") {
        walls = jungleWalls;
    }
    else return false;

    const playerBox = getPlayerHitbox(x, y);

    for (let wall of walls) {
        if (rectIntersect(playerBox, wall)) return true;
    }

    if (currentScene === "world" && questState < 6) {
        const guardBox = { x: guard.x, y: guard.y, w: guard.width, h: guard.height };
        if (rectIntersect(playerBox, guardBox)) return true;
    }

    return false;
}

// --- NEW FUNCTION: CHECK HIDDEN ZONES ---
function checkHiddenZones(x, y) {
    if (currentScene !== "zootopia") return false;

    const playerBox = getPlayerHitbox(x, y);
    for (let zone of zootopiaHiddenZones) {
        if (rectIntersect(playerBox, zone)) return true;
    }
    return false;
}

function rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.w ||
        r2.x + r2.w < r1.x ||
        r2.y > r1.y + r1.h ||
        r2.y + r2.h < r1.y);
}

function update() {
    if (isDialogueOpen || isInventoryOpen || isFeedingOpen || isBattleActive || isCutscene) return;

    jasmine.isMoving = false;
    let dx = 0, dy = 0;

    if (keys["ArrowUp"] || keys["w"]) { dy = -1; jasmine.facing = "up"; jasmine.isMoving = true; }
    if (keys["ArrowDown"] || keys["s"]) { dy = 1; jasmine.facing = "down"; jasmine.isMoving = true; }
    if (keys["ArrowLeft"] || keys["a"]) { dx = -1; jasmine.facing = "left"; jasmine.isMoving = true; }
    if (keys["ArrowRight"] || keys["d"]) { dx = 1; jasmine.facing = "right"; jasmine.isMoving = true; }

    if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);

        let moveStep = jasmine.speed;
        if (currentScene === "zootopia") {
            moveStep = 2.0;
        } else if (currentScene === "jungle") {
            moveStep = chippoyExhausted ? 0.6 : 1.2;
        } else if (currentScene === "meowdom") {
            moveStep = 0.8;
        } else if (currentScene === "picnic" || currentScene === "final") {
            moveStep = 1.5;
        }

        const nextX = jasmine.x + (dx / len) * moveStep;
        const nextY = jasmine.y + (dy / len) * moveStep;

        if (!checkCollision(nextX, jasmine.y)) jasmine.x = nextX;
        if (!checkCollision(jasmine.x, nextY)) jasmine.y = nextY;

        // Play hop sound effect
        if (Date.now() - lastHopTime > 350) {
            try { audioManager.playHop(); } catch (e) { }
            lastHopTime = Date.now();
        }
    }

    updateChippoy();
    updateSiblingGuide();
    updateWifeFollowing();
    updateCamera();

    if (debugBox) {
        debugBox.innerHTML = `
        [G]: Ghost Mode ${isGhostMode ? "ON" : "OFF"}<br>
        [B]: Builder ${isBuilderMode ? "ON" : "OFF"}<br>
        SCENE: ${currentScene}<br>
        Jasmine: ${Math.floor(jasmine.x)}, ${Math.floor(jasmine.y)}
        `;
    }
}

function updateSiblingGuide() {
    if (!siblingGuiding || currentScene !== "jungle") return;

    const targetX = 847;
    const targetY = 235;
    const siblingSpeed = 2.0;

    let dx = targetX - enemy4.x;
    let dy = targetY - enemy4.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
        let vx = (dx / dist) * siblingSpeed;
        let vy = (dy / dist) * siblingSpeed;
        enemy4.x += vx;
        enemy4.y += vy;
        enemy4.isMoving = true;
        enemy4.facing = (Math.abs(vx) > Math.abs(vy)) ? (vx > 0 ? "right" : "left") : (vy > 0 ? "down" : "up");

        // Use specifically requested walk-up asset while guiding
        if (jungleEnemy4Obj.src !== "assets/sibling_walk_up.png") {
            jungleEnemy4Obj.src = "assets/sibling_walk_up.png";
        }

        // Jasmine follows Sibling (staying slightly behind)
        let jTargetX = enemy4.x - 40;
        let jTargetY = enemy4.y + 20;
        let jdx = jTargetX - jasmine.x;
        let jdy = jTargetY - jasmine.y;
        let jdist = Math.sqrt(jdx * jdx + jdy * jdy);

        if (jdist > 10) {
            jasmine.x += (jdx / jdist) * siblingSpeed * 0.95;
            jasmine.y += (jdy / jdist) * siblingSpeed * 0.95;
            jasmine.isMoving = true;
            jasmine.facing = (Math.abs(jdx) > Math.abs(jdy)) ? (jdx > 0 ? "right" : "left") : (jdy > 0 ? "down" : "up");
        } else {
            jasmine.isMoving = false;
        }
    } else {
        // Arrived at portal
        siblingGuiding = false;
        junglePortal.visible = true;
        junglePortalObj.style.display = "block";
        jungleEnemy4Obj.src = "assets/sibling.png"; // Return to idle sprite
        startDialogue([
            "SIBLING: We are here... I can smell the strange magic of this place.",
            "SIBLING: This portal leads to where that cat Bobby was last seen.",
            "CHIPPOY: Woof! (Thank you, brother!)",
            "SIBLING: Go... find your friend. I'll stay here and guard the way.",
            "JASMINE: Thank you! We'll come back for you soon!"
        ]);
        showInstruction("Task: Enter the Portal");
        enemy4.isMoving = false;
    }
}

function updateWifeFollowing() {
    if (!wifeIsFollowing || currentScene !== "zootopia") return;

    // Follow Jasmine but keep a distance
    const targetX = jasmine.x - 30;
    const targetY = jasmine.y + 10;
    const speed = 1.5;

    let dx = targetX - wife.x;
    let dy = targetY - wife.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 15) {
        wife.x += (dx / dist) * speed;
        wife.y += (dy / dist) * speed;
        wife.isMoving = true;
    } else {
        wife.isMoving = false;
    }
}

function drawDebugCollisions() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!SHOW_DEBUG_COLLISIONS) return;

    let walls;
    if (currentScene === "house") walls = houseWalls;
    else if (currentScene === "world") walls = worldWalls;
    else if (currentScene === "zootopia") walls = zootopiaWalls;
    else if (currentScene === "jungle") walls = jungleWalls;
    else return;

    ctx.lineWidth = 3;

    // Draw Walls (Green/Red)
    for (let wall of walls) {
        let wx = (wall.x - camera.x) * currentZoom;
        let wy = (wall.y - camera.y) * currentZoom;
        let ww = wall.w * currentZoom;
        let wh = wall.h * currentZoom;
        ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
        ctx.strokeRect(wx, wy, ww, wh);
    }

    // Draw Hidden Zones (Blue)
    if (currentScene === "zootopia") {
        for (let zone of zootopiaHiddenZones) {
            let zx = (zone.x - camera.x) * currentZoom;
            let zy = (zone.y - camera.y) * currentZoom;
            let zw = zone.w * currentZoom;
            let zh = zone.h * currentZoom;
            ctx.strokeStyle = "rgba(0, 100, 255, 0.8)"; // Blue
            ctx.strokeRect(zx, zy, zw, zh);
        }
    }

    if (currentScene === "house") {
        ctx.strokeStyle = "yellow";
        let dx = (houseDoorRect.x - camera.x) * currentZoom;
        let dy = (houseDoorRect.y - camera.y) * currentZoom;
        ctx.strokeRect(dx, dy, houseDoorRect.w * currentZoom, houseDoorRect.h * currentZoom);
    }

    const box = getPlayerHitbox(jasmine.x, jasmine.y);
    let px = (box.x - camera.x) * currentZoom;
    let py = (box.y - camera.y) * currentZoom;
    ctx.strokeStyle = isGhostMode ? "cyan" : "red";
    ctx.strokeRect(px, py, box.w * currentZoom, box.h * currentZoom);
}

function checkInteraction() {
    const distToChippoy = getDistance(jasmine, chippoy);
    const distToGuard = getDistance(jasmine, guard);
    const distToWife = getDistance(jasmine, wife);
    const distToGuardDog = getDistance(jasmine, guardDog);
    const distToWater = getDistance(jasmine, itemWater);
    const distToVeggies = getDistance(jasmine, itemVeggies);

    if (currentScene === "house") {
        if (distToChippoy < 30) {
            handleChippoyDialogue();
            return;
        }
        const playerBox = getPlayerHitbox(jasmine.x, jasmine.y);
        if (rectIntersect(playerBox, houseDoorRect)) {
            if (questState === 0) {
                startDialogue(["I shouldn't leave without asking Chippoy first."]);
                return;
            }
            switchScene("world");
            return;
        }
    }

    else if (currentScene === "world") {
        if (getDistance(jasmine, triggerEnterHouse) < triggerEnterHouse.radius) {
            switchScene("house");
            return;
        }

        if (questState === 1) {
            let foundNewItem = false;
            let foundName = "";

            if (!itemLeash.collected && getDistance(jasmine, itemLeash) < itemLeash.radius) {
                itemLeash.collected = true;
                try { audioManager.playPickup(); } catch (e) { }
                leashObj.style.display = "none";
                foundName = "Lucky Leash";
                foundNewItem = true;
            }
            else if (!itemShirt.collected && getDistance(jasmine, itemShirt) < itemShirt.radius) {
                itemShirt.collected = true;
                try { audioManager.playPickup(); } catch (e) { }
                shirtObj.style.display = "none";
                foundName = "Lucky Dog Shirt";
                foundNewItem = true;
            }
            else if (!itemVest.collected && getDistance(jasmine, itemVest) < itemVest.radius) {
                itemVest.collected = true;
                try { audioManager.playPickup(); } catch (e) { }
                vestObj.style.display = "none";
                foundName = "Lucky Dog Vest";
                foundNewItem = true;
            }

            if (foundNewItem) {
                if (itemLeash.collected && itemShirt.collected && itemVest.collected) {
                    questState = 2;
                    showInstruction("Task: Return to House");
                    startDialogue([
                        `You found the ${foundName}!`,
                        "JASMINE: That's everything!",
                        "JASMINE: I have the Leash, Shirt, and Vest.",
                        "JASMINE: Time to bring these back to Chippoy."
                    ]);
                } else {
                    startDialogue([`You found the ${foundName}!`]);
                }
                return;
            }
        }
        if (distToGuard < 50) {
            handleGuardDialogue();
            return;
        }
        // Manual Portal Entry in World Scene
        if (zootopiaPortal.visible && getDistance(jasmine, zootopiaPortal) < 60) {
            playPortalVideo();
            return;
        }
    }

    // NEW: Zootopia Interaction
    else if (currentScene === "zootopia") {

        // Interaction with Guard Dog
        if (distToGuardDog < 60) {
            handleGuardDogDialogue();
            return;
        }

        // Interaction with Items
        if (zootopiaQuestState >= 1 && !itemWater.collected && distToWater < 100) {
            itemWater.collected = true;
            waterItemObj.style.display = "none";
            try { audioManager.playPickup(); } catch (e) { }
            startDialogue(["You found the Fresh Water!"]);
            checkZootopiaItems();
            return;
        }
        if (zootopiaQuestState >= 1 && !itemVeggies.collected && distToVeggies < 100) {
            itemVeggies.collected = true;
            veggiesItemObj.style.display = "none";
            try { audioManager.playPickup(); } catch (e) { }
            startDialogue([
                "You found the Fresh Veggies!",
                "JASMINE: Oh, veggies too? This is gonna make Chippoy happy!",
                "JASMINE: This is his favorite."
            ]);
            checkZootopiaItems();
            return;
        }

        // Interaction with Chippoy (Feeding)
        if (distToChippoy < 120 && zootopiaQuestState === 2) {
            openFeeding();
            return;
        }

        // Wife Interaction
        if (distToWife < 50 && wifeObj.style.display !== "none" && !wifeIsFollowing) {
            startDialogue([
                "WIFE: Oh! You are looking for me?",
                "WIFE: My husband is worried? Oh dear, I must have gotten lost while searching for flowers.",
                "WIFE: Thank you for finding me, Jasmine. Let's head back immediately!"
            ]);
            questState = 5; // Found wife - used in advanceDialogue to trigger portal logic
            return;
        }

        // Portal Interaction
        if (zootopiaPortal.visible && getDistance(jasmine, zootopiaPortal) < 150) {
            playReunionVideo();
            return;
        }
    }

    else if (currentScene === "picnic") {
        if (getDistance(jasmine, boyfriend) < 80) {
            startPicnicDialogue();
            return;
        }
    }

    else if (currentScene === "jungle") {
        // Temporary Portal Interaction (as per user request)
        if (zootopiaPortal.visible && getDistance(jasmine, zootopiaPortal) < 60) {
            playPortalVideo();
            return;
        }

        // Miscrit Battle Interactions - Larger distances for 6x scale
        const interactionDist = 100; // Increased for better feel

        if (!enemy1.defeated && getDistance(jasmine, enemy1) < interactionDist) {
            startBattle(enemy1);
            return;
        }

        if (!enemy2.defeated && getDistance(jasmine, enemy2) < interactionDist + 20) {
            if (!chippoyArmor.powerup) {
                startDialogue([
                    "JASMINE: This creature looks way too strong!",
                    "JASMINE: It's the Ancient Guardian!",
                    "CHIPPOY: *Whimper* (I can't face it like this...)",
                    "JASMINE: We need to find that Mystic Power-up nearby."
                ]);
            } else {
                startBattle(enemy2);
            }
            return;
        }

        if (!enemy3.defeated && getDistance(jasmine, enemy3) < interactionDist) {
            if (lightBefriended) {
                startDialogue(["LIGHT: Meow! (Ready to fight that powerful dog!)", "JASMINE: Let's do this, team!"]);
                return;
            }
            if (lightFood.collected) {
                // Trigger the Friendship sequence instead of battle
                lightBefriended = true;
                startDialogue([
                    "JASMINE: Hey Light! Look what I have...",
                    "LIGHT: *Meow!* (Is that Golden Salmon?)",
                    "LIGHT: *Crunch Munch Munch*",
                    "LIGHT: *Purrr...*",
                    "JASMINE: Chippoy, look! He's not scary at all.",
                    "CHIPPOY: Woof? (Friends?)",
                    "JASMINE: Now we can face your Sibling together!",
                    "LIGHT has joined your team!"
                ]);
                showInstruction("Task: Confront the Sibling");
            } else {
                startBattle(enemy3);
            }
            return;
        }

        if (!enemy4.defeated && getDistance(jasmine, enemy4) < interactionDist) {
            if (!lightBefriended) {
                startDialogue([
                    "JASMINE: Look! It's another dog... he looks just like Chippoy!",
                    "CHIPPOY: *Whimper* (That's... my big brother!)",
                    "JASMINE: Why is he blocking the path? He looks so angry!",
                    "CHIPPOY: Woof! (He's very strong... I'm too scared to face him alone!)",
                    "JASMINE: We need to find help... Maybe that cat Light can help us?"
                ]);
            } else {
                startDialogue([
                    "SIBLING: Grrr... So you finally came back, little brother?",
                    "SIBLING: And you brought a human and a... cat?!",
                    "LIGHT: *Hiss* (I'm not just a cat!)",
                    "CHIPPOY: Woof! (We just want to pass, brother!)",
                    "SIBLING: You aren't going anywhere until you prove your strength!",
                    "SIBLING: Prepare yourself!"
                ]);
                // We'll trigger startBattle after this dialogue in advanceDialogue hook
                questState = 7; // Temp state to trigger battle after dialogue
            }
            return;
        }

        if (chippoyExhausted && !isCarryingChippoy && getDistance(jasmine, chippoy) < interactionDist) {
            isCarryingChippoy = true;
            startDialogue(["JASMINE: Up you go, buddy!", "JASMINE: Let's find that medicine."]);
            showInstruction("Task: Find the Glowing Fruit (West)");
            return;
        }

        if (jungleFruit.visible && !jungleFruit.collected && getDistance(jasmine, jungleFruit) < interactionDist) {
            jungleFruit.collected = true;
            jungleFruitObj.style.display = "none";
            startDialogue(["JASMINE: I found it! The Glowing Jungle Fruit!", "JASMINE: Now I just need to feed this to Chippoy."]);
            showInstruction("Task: Press E on Chippoy to Feed");
            return;
        }

        if (isCarryingChippoy && jungleFruit.collected && getDistance(jasmine, chippoy) < interactionDist) {
            openFeeding();
            return;
        }

        if (lightFood.visible && !lightFood.collected && getDistance(jasmine, lightFood) < interactionDist) {
            lightFood.collected = true;
            lightFoodObj.style.display = "none";
            startDialogue(["JASMINE: This Golden Salmon smells delicious!", "JASMINE: Light will definitely love this!"]);
            showInstruction("Task: Bring the Salmon to Light");
            return;
        }

        if (lightFood.collected && !lightBefriended && getDistance(jasmine, enemy3) < interactionDist) {
            lightBefriended = true;
            startDialogue([
                "JASMINE: Hey Light! Look what I have...",
                "LIGHT: *Meow!* (Is that Golden Salmon?)",
                "LIGHT: *Crunch Munch Munch*",
                "LIGHT: *Purrr...*",
                "JASMINE: Chippoy, look! He's not scary at all.",
                "CHIPPOY: Woof? (Friends?)",
                "JASMINE: Now we can face your Sibling together!",
                "LIGHT has joined your team!"
            ]);
            showInstruction("Task: Confront the Sibling");
            return;
        }

        // Squeaky Toy Collection
        if (squeakyToy.visible && !squeakyToy.collected && getDistance(jasmine, squeakyToy) < interactionDist) {
            squeakyToy.collected = true;
            squeakyToyObj.style.display = "none";
            startDialogue([
                "JASMINE: I found it! The Squeaky Toy!",
                "JASMINE: It looks a bit worn out, but I'm sure the Sibling will love it.",
                "CHIPPOY: Woof! (Let's bring it back to my brother!)"
            ]);
            showInstruction("Task: Return the Toy to the Sibling");
            return;
        }

        // Give Toy to Sibling
        if (enemy4.defeated && squeakyToy.collected && !siblingBefriended && getDistance(jasmine, enemy4) < interactionDist) {
            siblingBefriended = true;
            startDialogue([
                "JASMINE: Here's your favorite toy!",
                "SIBLING: *Sniff Sniff* ... *SQUEAK!*",
                "SIBLING: My toy! You actually found it!",
                "CHIPPOY: Woof! (We care about you, brother.)",
                "SIBLING: I... I don't know what to say. I've been so bitter because of my eyes.",
                "SIBLING: Since you've been so kind... I will show you the way to the portal.",
                "SIBLING: Follow me. The cat you're looking for went through there."
            ]);
            showInstruction("Task: Follow the Sibling");
            siblingGuiding = true;
            return;
        }

        // Portal Interaction
        if (junglePortal.visible && getDistance(jasmine, junglePortal) < interactionDist + 20) {
            startDialogue([
                "JASMINE: This is it. The portal to the Cat World.",
                "CHIPPOY: Woof! (Ready when you are!)",
                "JASMINE: Let's find Bobby!"
            ]);
            switchScene("meowdom");
            return;
        }

        // Mystic Powerup Interaction
        if (!itemPowerup.collected && getDistance(jasmine, itemPowerup) < interactionDist) {
            if (!enemy1.defeated) {
                startDialogue(["JASMINE: I can't reach that item! That scouter is blocking the way."]);
            } else {
                collectPowerup();
            }
            return;
        }

        if (squeakyToy.visible && !squeakyToy.collected && getDistance(jasmine, squeakyToy) < interactionDist) {
            squeakyToy.collected = true;
            squeakyToyObj.style.display = "none";
            startDialogue(["JASMINE: I found it! The Squeaky Toy!", "JASMINE: This should cheer up Chippoy's sibling."]);
            showInstruction("Task: Give the toy to Sibling");
            return;
        }

        if (squeakyToy.collected && !siblingBefriended && getDistance(jasmine, enemy4) < interactionDist) {
            siblingBefriended = true;
            // Reveal sibling to be friendly
            jungleEnemy4Obj.style.display = "block";
            startDialogue([
                "JASMINE: Look! We found your toy!",
                "SIBLING: *Squeak Squeak!*",
                "SIBLING: Woof! Woof! (Thank you!)",
                "JASMINE: Chippoy, look how happy he is.",
                "CHIPPOY: Woof! (Brother!)",
                "SIBLING: Since you were so kind...",
                "SIBLING: I'll show you the way to the portal. It leads to the Cat World where Bobby is.",
                "SIBLING: Follow me! I'll open the path."
            ]);
            showInstruction("Task: Follow the Sibling");
            siblingGuiding = true;
            return;
        }


        // Generic Interaction with Chippoy to open inventory (ONLY IF WE HAVE ITEMS)
        if (getDistance(jasmine, chippoy) < interactionDist && !chippoyExhausted && hasItemsToEquip()) {
            openInventory();
            return;
        }
    }

    if (currentScene === "meowdom") {
        if (getDistance(jasmine, bobby) < 100) {
            questState = 10; // Trigger teleport after dialogue ends in advanceDialogue
            startDialogue([
                "BOBBY: *Meow!* (Who are you?)",
                "JASMINE: Hi Bobby! The Sibling sent us. We're looking for Seth.",
                "BOBBY: *Purrr* (Seth is waiting for you at the picnic spot!)",
                "BOBBY: (Follow me, I'll take you there right now!)"
            ]);
            return;
        }
    }

    else if (currentScene === "final") {
        if (getDistance(jasmine, boyfriend) < 60) {
            startDialogue([
                "SETH: Jasmine...",
                "SETH: You made it.",
                "SETH: I've been waiting for this moment.",
                "SETH: Will you let me court you?"
            ]);
        }
    }
}

function checkZootopiaItems() {
    if (itemWater.collected && itemVeggies.collected) {
        zootopiaQuestState = 2; // Ready to feed
        showInstruction("Task: Return to Chippoy and Feed him");
    }
}

function handleGuardDogDialogue() {
    if (zootopiaQuestState === 0) {
        startDialogue([
            "JASMINE: Excuse me! Do you know where the 'Wife' is?",
            "GUARD DOG: The Wife? Hmm...",
            "GUARD DOG: I might know where she is.",
            "GUARD DOG: But first...",
            "GUARD DOG: Your dog looks exhausted.",
            "JASMINE: Yeah, we've been walking a lot.",
            "GUARD DOG: Tell you what. Leave him here with me.",
            "GUARD DOG: I'll guard him while he rests.",
            "GUARD DOG: But he needs strength. Find Water and Veggies nearby.",
            "GUARD DOG: If you do, I'll help you find that 'Wife'.",
            "GUARD DOG: Dealing with scents is my specialty."
        ]);
        zootopiaQuestState = 1;
        waterItemObj.style.display = "block";
        veggiesItemObj.style.display = "block";
        showInstruction("Task: Find Water and Veggies");
    }
    else if (zootopiaQuestState === 1) {
        startDialogue([
            "GUARD DOG: Have you found the food and water?",
            "GUARD DOG: Chippoy is safe with me, don't worry."
        ]);
    }
    else if (zootopiaQuestState === 2) {
        startDialogue([
            "GUARD DOG: You have the supplies!",
            "GUARD DOG: Go ahead and feed him."
        ]);
    }
    else if (zootopiaQuestState === 3) {
        startDialogue([
            "GUARD DOG: Nice job. He looks full of energy.",
            "GUARD DOG: Wait. Before you go...",
            "GUARD DOG: Let me share her scent with your dog.",
            "GUARD DOG: Come closer, little one.",
            "CHIPPOY: *Waddle Waddle*"
        ]);
        // Trigger moved to end of dialogue
        wifeObj.style.display = "block";
        showInstruction("Task: Watch the Scent Transfer");
    }
}

function handleChippoyDialogue() {
    if (questState === 0) {
        startDialogue([
            "CHIPPOY: Woof! (Hi Jasmine!)",
            "JASMINE: Chippoy, do you know where Seth is?",
            "CHIPPOY: Sniff Sniff... I smell Bobby!",
            "CHIPPOY: But I can't go outside yet!",
            "CHIPPOY: I need 3 things for PROTECTION and LUCK:",
            "1. My Lucky Leash",
            "2. My 'Best Friend' Shirt",
            "3. My Dog Vest",
            "CHIPPOY: Please find them so we can be safe!"
        ]);
        questState = 1;
        showInstruction("Task: Find Leash, Shirt, & Vest outside");
    }
    else if (questState === 1) {
        let missing = [];
        if (!itemLeash.collected) missing.push("Leash");
        if (!itemShirt.collected) missing.push("Shirt");
        if (!itemVest.collected) missing.push("Vest");
        startDialogue([
            "CHIPPOY: I'm still missing my: " + missing.join(", ") + ".",
            "CHIPPOY: I need the luck boost to find Seth!"
        ]);
    }
    else if (questState === 2) {
        startDialogue([
            "JASMINE: I found everything!",
            "JASMINE: Let me put them on you."
        ]);
        // Open Inventory after dialogue closes? 
        // We can hook into closeDialogue or just set a flag.
        // Actually, startDialogue is async in UI but synchronous in code execution.
        // The dialogue system uses a queue. We need to trigger the inventory AFTER the dialogue ends.
        // We can check this in advanceDialogue or use a special callback.
        // For simplicity, let's modify advanceDialogue to check for this specific transition.
    }
    else if (questState === 3) {
        startDialogue(["CHIPPOY: We should look around for clues."]);
    }
}

function collectPowerup() {
    itemPowerup.collected = true;
    powerupItemObj.style.display = "none";
    try { audioManager.playPickup(); } catch (e) { }

    // SUPER VISUALLY APPEALING PICKUP EFFECT
    const rect = powerupItemObj.getBoundingClientRect();
    const effect = document.createElement("div");
    effect.className = "pickup-effect";
    effect.style.left = (rect.left + rect.width / 2) + "px";
    effect.style.top = (rect.top + rect.height / 2) + "px";

    const img = document.createElement("img");
    img.src = "assets/powerup.png";
    img.style.width = "48px";
    effect.appendChild(img);

    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1500);

    startDialogue([
        "JASMINE: Look Chippoy! This crystal is glowing with incredible energy.",
        "CHIPPOY: *Awoo!* (It smells like pure power!)",
        "JASMINE: This must be the 'Mystic Power' the legends talk about.",
        "JASMINE: I'll keep it safe in my bag for you.",
        "Task: EQUIP THE POWER from the inventory!"
    ]);
    questState = 8; // Special state to trigger inventory after dialogue
    showInstruction("Task: Equip the Mystic Power on Chippoy");
}

function handleGuardDialogue() {
    if (questState < 3) {
        startDialogue([
            "GUARD: Halt!",
            "GUARD: It's dangerous out here.",
            "GUARD: You need a guide (dog) with full gear to pass."
        ]);
        return;
    }

    if (questState === 3) {
        startDialogue([
            "JASMINE: Excuse me sir!",
            "JASMINE: Do you know where Bobby is?",
            "JASMINE: We really need to find Seth.",
            "GUARD: Bobby? The cat?",
            "GUARD: Yes, I know where he is.",
            "GUARD: But I have a problem first...",
            "GUARD: My Wife is lost in Zootopia.",
            "GUARD: Please find her and bring her back.",
            "GUARD: If you do, I'll tell you where Bobby is.",
            "GUARD: I will teleport you there now."
        ]);
        questState = 4;
        // Logic handled in advanceDialogue to switch scene to Zootopia
    }
    else if (questState === 5) {
        startDialogue([
            "GUARD: You found her! Thank you so much.",
            "WIFE: Yes, I was so lost! You're a hero, Jasmine.",
            "GUARD: As promised, I will tell you where Bobby is.",
            "GUARD: You must cross the forest to reach him.",
            "GUARD: But be warned, Jasmine...",
            "GUARD: This forest is very dangerous!",
            "GUARD: Many creatures lurk in the shadows.",
            "GUARD: Stay alert and keep Chippoy close.",
            "GUARD: I will teleport you there now. Good luck!",
            "GUARD: *RUMBLE... RUMBLE... RUMBLE*"
        ]);
        questState = 6;
        // Logic handled in advanceDialogue to switch scene to Jungle
    }
}

function updateChippoy() {
    if (currentScene === "house") {
        chippoy.x = 42; chippoy.y = 118;
        chippoy.facing = "right";
        chippoyImg.style.display = "block";
    }
    else if (currentScene === "world" || currentScene === "zootopia") {
        if (questState >= 3) {
            chippoyImg.style.display = "block";
            let tx = jasmine.x - 20; let ty = jasmine.y;

            // --- FIX FOR SEPARATION IN ZOOTOPIA ---
            let followDist = 20;

            // Random ambient bark (approx once every 8-12 seconds) - Moved here to work in all states
            if (Date.now() - lastBarkTime > 10000 && Math.random() < 0.008) {
                try { audioManager.playBark(); } catch (e) { }
                lastBarkTime = Date.now();
            }

            // IF IN ZOOTOPIA AND QUEST NOT DONE, CHIPPOY STAYS WITH GUARD DOG
            if (currentScene === "zootopia") {
                // If we have started the quest (state 1 or 2), Chippoy stays with Guard Dog
                if (zootopiaQuestState >= 1 && zootopiaQuestState < 3) {
                    // Stay at specific coordinate
                    let targetX = 330;
                    let targetY = 1016;
                    let cdx = targetX - chippoy.x;
                    let cdy = targetY - chippoy.y;

                    // Move to spot if not there
                    if (Math.abs(cdx) > 2 || Math.abs(cdy) > 2) {
                        chippoy.x += cdx * 0.08;
                        chippoy.y += cdy * 0.08;
                        chippoy.isMoving = true;
                        chippoy.facing = "right"; // Look towards guard/player
                    } else {
                        chippoy.isMoving = false;
                        chippoy.facing = "down";
                    }
                    return; // Don't follow Jasmine
                }

                // If quest not started (state 0) OR done (state 3+), he follows Jasmine
                followDist = 100;
            }
            // Dynamic follow position based on Jasmine's facing
            // Try to stay BEHIND her
            if (jasmine.facing === "left") {
                tx = jasmine.x + followDist;
                ty = jasmine.y;
            } else if (jasmine.facing === "right") {
                tx = jasmine.x - followDist;
                ty = jasmine.y;
            } else if (jasmine.facing === "up") {
                tx = jasmine.x;
                ty = jasmine.y + followDist;
            } else { // down
                tx = jasmine.x;
                ty = jasmine.y - followDist;
            }

            let cdx = tx - chippoy.x; let cdy = ty - chippoy.y;

            let followSpeed = 0.05;
            chippoy.x += cdx * followSpeed;
            chippoy.y += cdy * followSpeed;

            if (Math.abs(cdx) > 1 || Math.abs(cdy) > 1) {
                chippoy.isMoving = true;
                chippoy.facing = (Math.abs(cdx) > Math.abs(cdy)) ? (cdx > 0 ? "right" : "left") : (cdy > 0 ? "down" : "up");
            } else chippoy.isMoving = false;
        } else {
            chippoyImg.style.display = "none";
        }
    }
    else if (currentScene === "jungle" || currentScene === "forest" || currentScene === "meowdom" || currentScene === "picnic") {
        if (isCarryingChippoy) {
            // Jasmine carries Chippoy
            chippoy.x = jasmine.x;
            chippoy.y = jasmine.y - 12; // Position higher to look carried
            chippoy.facing = jasmine.facing;
            chippoy.isMoving = false;
            chippoyImg.style.display = "block";
            return;
        }
        if (chippoyExhausted) {
            // Chippoy stays put on the ground until picked up
            chippoyImg.style.display = "block";
            chippoy.isMoving = false;
            return;
        }
        // Chippoy follows Jasmine in jungle/forest
        chippoyImg.style.display = "block";
        let followDist = 80; // Increased distance for larger sprite scaling
        let tx, ty;

        // Position behind Jasmine based on her facing direction
        if (jasmine.facing === "left") {
            tx = jasmine.x + followDist;
            ty = jasmine.y;
        } else if (jasmine.facing === "right") {
            tx = jasmine.x - followDist;
            ty = jasmine.y;
        } else if (jasmine.facing === "up") {
            tx = jasmine.x;
            ty = jasmine.y + followDist;
        } else { // down
            tx = jasmine.x;
            ty = jasmine.y - followDist;
        }

        let cdx = tx - chippoy.x;
        let cdy = ty - chippoy.y;
        let followSpeed = 0.08; // slightly faster follow speed

        chippoy.x += cdx * followSpeed;
        chippoy.y += cdy * followSpeed;

        if (Math.abs(cdx) > 1 || Math.abs(cdy) > 1) {
            chippoy.isMoving = true;
            chippoy.facing = (Math.abs(cdx) > Math.abs(cdy)) ? (cdx > 0 ? "right" : "left") : (cdy > 0 ? "down" : "up");
        } else {
            chippoy.isMoving = false;
        }
    }
    else if (currentScene === "final") {
        chippoy.x = boyfriend.x - 50; chippoy.y = boyfriend.y;
        chippoyImg.style.display = "block";
    }
}

function updateCamera() {
    if (currentScene === "house") {
        camera.x = 0; camera.y = 0;
    } else if (currentScene === "final") {
        camera.x = 0; camera.y = 0;
    } else {
        camera.x = jasmine.x - (CANVAS_WIDTH / currentZoom / 2);
        camera.y = jasmine.y - (CANVAS_HEIGHT / currentZoom / 2);

        // Clamp camera for Zootopia so we don't see white space if possible
        if (currentScene === "zootopia" && zootopiaImg.complete) {
            if (camera.x < 0) camera.x = 0;
            if (camera.y < 0) camera.y = 0;
        } else if (currentScene === "picnic" && picnicImg.complete) {
            const mapW = picnicImg.naturalWidth;
            const mapH = picnicImg.naturalHeight;
            const visibleW = CANVAS_WIDTH / currentZoom;
            const visibleH = CANVAS_HEIGHT / currentZoom;

            if (camera.x < 0) camera.x = 0;
            if (camera.y < 0) camera.y = 0;
            if (mapW > visibleW) {
                if (camera.x > mapW - visibleW) camera.x = mapW - visibleW;
            }
            if (mapH > visibleH) {
                if (camera.y > mapH - visibleH) camera.y = mapH - visibleH;
            }
        } else if (currentScene === "jungle") {
            const mw = 2000;
            const mh = 2000;
            const visibleW = CANVAS_WIDTH / currentZoom;
            const visibleH = CANVAS_HEIGHT / currentZoom;

            if (camera.x < 0) camera.x = 0;
            if (camera.y < 0) camera.y = 0;
            if (camera.x > mw - visibleW) camera.x = mw - visibleW;
            if (camera.y > mh - visibleH) camera.y = mh - visibleH;
        } else {
            if (camera.x < 0) camera.x = 0;
            if (camera.y < 0) camera.y = 0;
        }
    }
}

function updateImages() {
    const mapX = Math.floor(-camera.x * currentZoom);
    const mapY = Math.floor(-camera.y * currentZoom);

    // Reset default scaling
    jasmineImg.style.width = (jasmine.width * currentZoom) + "px";
    chippoyImg.style.width = (chippoy.width * currentZoom) + "px";

    if (currentScene === "world") {
        mapImg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        leashObj.style.width = (16 * currentZoom) + "px"; leashObj.style.height = (16 * currentZoom) + "px";
        shirtObj.style.width = (16 * currentZoom) + "px"; shirtObj.style.height = (16 * currentZoom) + "px";
        vestObj.style.width = (16 * currentZoom) + "px"; vestObj.style.height = (16 * currentZoom) + "px";
        guardObj.style.width = (guard.width * currentZoom) + "px"; guardObj.style.height = (guard.height * currentZoom) + "px";
        guardWifeObj.style.width = (guardWifeWorld.width * currentZoom) + "px";
        guardWifeObj.style.height = (guardWifeWorld.height * currentZoom) + "px";

        updateSpritePosition(leashObj, itemLeash);
        updateSpritePosition(shirtObj, itemShirt);
        updateSpritePosition(vestObj, itemVest);
        updateSpritePosition(guardObj, guard);
        updateSpritePosition(guardWifeObj, guardWifeWorld);
        updateSpritePosition(foodObj, itemFood);
    }

    if (currentScene === "forest") {
        forestBg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        forestBg.style.width = (5000 * currentZoom) + "px";
        forestBg.style.height = (5000 * currentZoom) + "px";
    }

    if (currentScene === "jungle") {
        jungleImg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        // Scale the jungle map image
        if (jungleImg.complete) {
            // Scale to 2000x2000 to ensure all enemies (at 1234, etc) are covered
            jungleImg.style.width = (2000 * currentZoom) + "px";
            jungleImg.style.height = (2000 * currentZoom) + "px";
        }

        let zoomMulti = 6.0;
        jasmineImg.style.width = (jasmine.width * currentZoom * zoomMulti) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * zoomMulti) + "px";

        jungleEnemy1Obj.style.width = (enemy1.width * currentZoom * zoomMulti) + "px";
        jungleEnemy2Obj.style.width = (enemy2.width * currentZoom * zoomMulti * 1.5) + "px"; // Larger guardian!
        jungleEnemy3Obj.style.width = (enemy3.width * currentZoom * zoomMulti) + "px";
        jungleEnemy4Obj.style.width = (enemy4.width * currentZoom * zoomMulti * 0.7) + "px"; // Much smaller sibling
        powerupItemObj.style.width = (48 * currentZoom * zoomMulti) + "px";
        jungleFruitObj.style.width = (32 * currentZoom * zoomMulti) + "px";
        lightFoodObj.style.width = (32 * currentZoom * zoomMulti) + "px";
        squeakyToyObj.style.width = (32 * currentZoom * zoomMulti) + "px";

        // Center sprites by subtracting half their calculated width
        const centerSprite = (el, obj, extraScale = 1.0) => {
            const w = (obj.width || 32) * currentZoom * zoomMulti * extraScale;
            updateSpritePosition(el, obj);
            const sx = Math.floor((obj.x - camera.x) * currentZoom - (w / 2));
            const sy = Math.floor((obj.y - camera.y) * currentZoom - (w / 2));
            el.style.transform = `translate(${sx}px, ${sy}px)`;
            el.style.width = w + "px";
        };

        centerSprite(jungleEnemy1Obj, enemy1);
        centerSprite(jungleEnemy2Obj, enemy2, 1.5);
        centerSprite(jungleEnemy3Obj, enemy3);
        centerSprite(jungleEnemy4Obj, enemy4, 0.7);
        centerSprite(powerupItemObj, itemPowerup, 1.0);
        centerSprite(jungleFruitObj, jungleFruit, 1.0);
        centerSprite(lightFoodObj, lightFood, 1.0);
        centerSprite(squeakyToyObj, squeakyToy, 1.0);

        // Visibility Toggles
        jungleEnemy1Obj.style.display = enemy1.defeated ? "none" : "block";
        jungleEnemy2Obj.style.display = enemy2.defeated ? "none" : "block";
        // Light only appears after Guardian is defeated
        jungleEnemy3Obj.style.display = (enemy2.defeated && !enemy3.defeated) ? "block" : "none";
        // Sibling is always visible (or handled by quest logic)
        jungleEnemy4Obj.style.display = "block";

        if (junglePortal.visible) {
            junglePortalObj.style.display = "block";
            junglePortalEffectObj.style.display = "block";

            const pSize = 120 * currentZoom;
            const effectSize = pSize * 1.5;

            junglePortalObj.style.width = pSize + "px";
            junglePortalObj.style.height = pSize + "px";

            junglePortalEffectObj.style.width = effectSize + "px";
            junglePortalEffectObj.style.height = effectSize + "px";

            const sx = Math.floor((junglePortal.x - camera.x) * currentZoom);
            const sy = Math.floor((junglePortal.y - camera.y) * currentZoom);

            // Position both - transform: translate(-50%, -50%) will handle centering if added to CSS/style
            junglePortalObj.style.left = sx + "px";
            junglePortalObj.style.top = sy + "px";
            junglePortalObj.style.transform = "translate(-50%, -50%)";

            junglePortalEffectObj.style.left = sx + "px";
            junglePortalEffectObj.style.top = sy + "px";
            // Effect keeps the swirl transform from CSS (needs translate(-50%, -50%) too)
        } else {
            junglePortalObj.style.display = "none";
            junglePortalEffectObj.style.display = "none";
        }

        // Temporary Zootopia Portal Rendering in Jungle
        if (zootopiaPortal.visible) {
            zootopiaPortalObj.style.display = "block";
            zootopiaPortalEffectObj.style.display = "block";

            let scale = 1.0;
            if (zootopiaPortal.closing && typeof zootopiaPortal.scale !== 'undefined') {
                scale = zootopiaPortal.scale;
            }

            const pSize = 250 * currentZoom * scale;
            const effectSize = pSize * 1.5;

            zootopiaPortalObj.style.width = pSize + "px";
            zootopiaPortalObj.style.height = pSize + "px";
            zootopiaPortalEffectObj.style.width = effectSize + "px";
            zootopiaPortalEffectObj.style.height = effectSize + "px";

            let shakeX = 0;
            let shakeY = 0;
            if (zootopiaPortal.closing) {
                // Heavier rumble for the closing portal
                shakeX = (Math.random() - 0.5) * 80 * currentZoom;
                shakeY = (Math.random() - 0.5) * 80 * currentZoom;
            }

            const sx = Math.floor((zootopiaPortal.x - camera.x) * currentZoom);
            const sy = Math.floor((zootopiaPortal.y - camera.y) * currentZoom);

            zootopiaPortalObj.style.left = (sx + shakeX) + "px";
            zootopiaPortalObj.style.top = (sy + shakeY) + "px";
            zootopiaPortalObj.style.transform = "translate(-50%, -50%)";
            zootopiaPortalObj.style.zIndex = Math.floor(zootopiaPortal.y);

            zootopiaPortalEffectObj.style.left = (sx + shakeX) + "px";
            zootopiaPortalEffectObj.style.top = (sy + shakeY) + "px";
            zootopiaPortalEffectObj.style.transform = "translate(-50%, -50%)";
            zootopiaPortalEffectObj.style.zIndex = Math.floor(zootopiaPortal.y) - 1;
        } else {
            // Only hide if not in world/zootopia (handled by their own logic, but good safety)
            // Actually, since we are in "jungle" block, this is fine.
            // But wait, zootopiaPortalObj is shared. 
            // If zootopiaPortal.visible is false here, we should hide it.
            // However, switchScene handles initial hide. 
            // Let's just set display to none if not visible.
            // zootopiaPortalObj.style.display = "none"; 
            // zootopiaPortalEffectObj.style.display = "none";
            // We shouldn't aggressively hide it here if it's not visible, relying on switchScene reset is safer 
            // unless we want dynamic toggling within the scene.
            // Given it's a static placement for now:
        }

        // Sibling Sprite Logic
        // We now use sibling.png as a fixed asset unless moving logic is needed for GIFs.
        // During siblingGuiding, the sprite is handled in updateSiblingGuide.
        if (!siblingGuiding && jungleEnemy4Obj.src !== "assets/sibling.png") {
            jungleEnemy4Obj.src = "assets/sibling.png";
        }
    }

    if (currentScene === "zootopia") {
        zootopiaImg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        let zoomMulti = 6.0;
        jasmineImg.style.width = (jasmine.width * currentZoom * zoomMulti) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * zoomMulti) + "px";
        wifeObj.style.width = (wife.width * currentZoom * zoomMulti) + "px";
        guardDogObj.style.width = (guardDog.width * currentZoom * zoomMulti) + "px";
        waterItemObj.style.width = (48 * currentZoom * zoomMulti) + "px";
        veggiesItemObj.style.width = (48 * currentZoom * zoomMulti) + "px";
        waterItemObj.style.height = (48 * currentZoom * zoomMulti) + "px";
        veggiesItemObj.style.height = (48 * currentZoom * zoomMulti) + "px";

        updateSpritePosition(wifeObj, wife);
        updateSpritePosition(guardDogObj, guardDog);
        updateSpritePosition(waterItemObj, itemWater);
        // Center the larger water item
        const waterW = 48 * currentZoom * zoomMulti;
        const waterSX = Math.floor((itemWater.x - camera.x) * currentZoom - (waterW / 2));
        const waterSY = Math.floor((itemWater.y - camera.y) * currentZoom - (waterW / 2));
        waterItemObj.style.transform = `translate(${waterSX}px, ${waterSY}px)`;

        updateSpritePosition(veggiesItemObj, itemVeggies);
        // Center the larger veggies item
        const veggiesW = 48 * currentZoom * zoomMulti;
        const veggiesSX = Math.floor((itemVeggies.x - camera.x) * currentZoom - (veggiesW / 2));
        const veggiesSY = Math.floor((itemVeggies.y - camera.y) * currentZoom - (veggiesW / 2));
        veggiesItemObj.style.transform = `translate(${veggiesSX}px, ${veggiesSY}px)`;

        // Zootopia Portal Rendering
        if (zootopiaPortal.visible) {
            zootopiaPortalObj.style.display = "block";
            zootopiaPortalEffectObj.style.display = "block";

            const pSize = 180 * currentZoom;
            const effectSize = pSize * 1.5;
            zootopiaPortalObj.style.width = pSize + "px";
            zootopiaPortalObj.style.height = pSize + "px";
            zootopiaPortalEffectObj.style.width = effectSize + "px";
            zootopiaPortalEffectObj.style.height = effectSize + "px";

            const sx = Math.floor((zootopiaPortal.x - camera.x) * currentZoom);
            const sy = Math.floor((zootopiaPortal.y - camera.y) * currentZoom);

            zootopiaPortalObj.style.left = sx + "px";
            zootopiaPortalObj.style.top = sy + "px";
            zootopiaPortalObj.style.transform = "translate(-50%, -50%)";
            zootopiaPortalObj.style.zIndex = Math.floor(zootopiaPortal.y);

            zootopiaPortalEffectObj.style.left = sx + "px";
            zootopiaPortalEffectObj.style.top = sy + "px";
            zootopiaPortalEffectObj.style.transform = "translate(-50%, -50%)";
            zootopiaPortalEffectObj.style.zIndex = Math.floor(zootopiaPortal.y) - 1;
        } else {
            zootopiaPortalObj.style.display = "none";
            zootopiaPortalEffectObj.style.display = "none";
        }
    }

    if (currentScene === "world" && zootopiaPortal.visible) {
        zootopiaPortalObj.style.display = "block";
        zootopiaPortalEffectObj.style.display = "block";
        const pSize = 64 * currentZoom;
        const sx = Math.floor((zootopiaPortal.x - camera.x) * currentZoom);
        const sy = Math.floor((zootopiaPortal.y - camera.y) * currentZoom);
        zootopiaPortalObj.style.width = pSize + "px";
        zootopiaPortalObj.style.height = pSize + "px";
        zootopiaPortalObj.style.left = sx + "px";
        zootopiaPortalObj.style.top = sy + "px";
        zootopiaPortalObj.style.transform = "translate(-50%, -50%)";
        zootopiaPortalEffectObj.style.width = (pSize * 1.5) + "px";
        zootopiaPortalEffectObj.style.height = (pSize * 1.5) + "px";
        zootopiaPortalEffectObj.style.left = sx + "px";
        zootopiaPortalEffectObj.style.top = sy + "px";
        zootopiaPortalEffectObj.style.transform = "translate(-50%, -50%)";
    }

    if (currentScene === "meowdom") {
        meowdomImg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        if (meowdomImg.complete) {
            meowdomImg.style.width = (meowdomImg.naturalWidth * currentZoom) + "px";
            meowdomImg.style.height = (meowdomImg.naturalHeight * currentZoom) + "px";
        }
        let zoomMulti = 3.0;
        jasmineImg.style.width = (jasmine.width * currentZoom * zoomMulti) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * zoomMulti) + "px";

        bobbyObj.style.width = (bobby.width * currentZoom * zoomMulti) + "px";
        bobbyObj.style.display = "block";
        updateSpritePosition(bobbyObj, bobby);

    }

    if (currentScene === "picnic") {
        currentZoom = 1.2;
        picnicImg.style.transform = `translate(${mapX}px, ${mapY}px)`;
        if (picnicImg.complete) {
            picnicImg.style.width = (picnicImg.naturalWidth * currentZoom) + "px";
            picnicImg.style.height = (picnicImg.naturalHeight * currentZoom) + "px";
        }
        let zoomMulti = 4.0; // Reduced from 6.0 for better proportions
        jasmineImg.style.width = (jasmine.width * currentZoom * zoomMulti) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * zoomMulti) + "px";

        // Seth is now bigger
        let sethMulti = 0.45;
        boyfriendObj.style.width = (boyfriend.width * currentZoom * zoomMulti * sethMulti) + "px";
        updateSpritePosition(boyfriendObj, boyfriend);

        // Bobby is now smaller
        let bobbyMulti = 0.65;
        bobbyObj.style.width = (bobby.width * currentZoom * zoomMulti * bobbyMulti) + "px";
        updateSpritePosition(bobbyObj, bobby);
    }

    if (currentScene === "final") {
        let zoomMulti = 4.0; // Consistently smaller
        jasmineImg.style.width = (jasmine.width * currentZoom * zoomMulti) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * zoomMulti) + "px";

        let sethMulti = 0.45;
        boyfriendObj.style.width = (boyfriend.width * currentZoom * zoomMulti * sethMulti) + "px";
        updateSpritePosition(boyfriendObj, boyfriend);

        // Also scale Sibling and Bobby for final scene
        jungleEnemy4Obj.style.width = (enemy4.width * currentZoom * zoomMulti) + "px";

        let bobbyMulti = 0.65;
        bobbyObj.style.width = (bobby.width * currentZoom * zoomMulti * bobbyMulti) + "px";

        updateSpritePosition(jungleEnemy4Obj, enemy4);
        updateSpritePosition(bobbyObj, bobby);
    }

    if (currentScene === "house") {
        jasmineImg.style.width = (jasmine.width * currentZoom * 1.6) + "px";
        chippoyImg.style.width = (chippoy.width * currentZoom * 1.6) + "px";
    }

    updateCharacterSprite(jasmineImg, jasmine);
    updateCharacterSprite(chippoyImg, chippoy);
    checkPrompts();

    if (checkHiddenZones(jasmine.x, jasmine.y)) {
        jasmineImg.style.opacity = "0.4";
        chippoyImg.style.opacity = "0.4";
    } else {
        jasmineImg.style.opacity = "1";
        chippoyImg.style.opacity = "1";
    }
}

function updateSpritePosition(el, obj) {
    const sx = Math.floor((obj.x - camera.x) * currentZoom);
    const sy = Math.floor((obj.y - camera.y) * currentZoom);
    el.style.transform = `translate(${sx}px, ${sy}px)`;
}

function updateCharacterSprite(img, actor) {
    updateSpritePosition(img, actor);
    // Z-Index Logic: Y-based (Whoever is lower on screen is in front)
    let z = Math.floor(actor.y);
    img.style.zIndex = z;

    // Add specific visual sorting for jungle
    if (currentScene === "jungle") {
        img.style.zIndex = z + 1000;
    }

    let name = (img === jasmineImg) ? "jasmine" : "chippoy";
    let action = actor.isMoving ? "walk" : "idle";
    let face = actor.facing || "down";
    let src = `assets/${name}_${action}_${face}.gif`;
    if (img.dataset.last !== src) { img.src = src; img.dataset.last = src; }
}

function checkPrompts() {
    let show = false;
    if (currentScene === "house") {
        if (getDistance(jasmine, chippoy) < 30) show = true;
        const playerBox = getPlayerHitbox(jasmine.x, jasmine.y);
        if (rectIntersect(playerBox, houseDoorRect)) show = true;
    }
    else if (currentScene === "world") {
        if (getDistance(jasmine, triggerEnterHouse) < triggerEnterHouse.radius) show = true;
        if (questState === 1) {
            if (!itemLeash.collected && getDistance(jasmine, itemLeash) < itemLeash.radius) show = true;
            if (!itemShirt.collected && getDistance(jasmine, itemShirt) < itemShirt.radius) show = true;
            if (!itemVest.collected && getDistance(jasmine, itemVest) < itemVest.radius) show = true;
        }
        if (getDistance(jasmine, guard) < 50) show = true;
    }
    else if (currentScene === "zootopia") {
        if (getDistance(jasmine, guardDog) < 60) show = true;
        if (getDistance(jasmine, wife) < 50 && wifeObj.style.display !== "none") show = true;
        if (zootopiaQuestState >= 1 && !itemWater.collected && getDistance(jasmine, itemWater) < 50) show = true;
        if (zootopiaQuestState >= 1 && !itemVeggies.collected && getDistance(jasmine, itemVeggies) < 50) show = true;
        if (zootopiaQuestState === 2 && getDistance(jasmine, chippoy) < 120) show = true;
        if (zootopiaPortal.visible && getDistance(jasmine, zootopiaPortal) < 150) {
            show = true;
            showInstruction("Press E to enter the Portal");
        }
    }
    else if (currentScene === "jungle") {
        const checkDist = 100;
        let nearEnemy1 = !enemy1.defeated && getDistance(jasmine, enemy1) < checkDist;
        let nearEnemy2 = !enemy2.defeated && getDistance(jasmine, enemy2) < checkDist + 20;
        let nearEnemy3 = !enemy3.defeated && getDistance(jasmine, enemy3) < checkDist;
        let nearEnemy4 = !enemy4.defeated && getDistance(jasmine, enemy4) < checkDist;
        let nearPowerup = !itemPowerup.collected && getDistance(jasmine, itemPowerup) < checkDist;
        let nearFruit = jungleFruit.visible && !jungleFruit.collected && getDistance(jasmine, jungleFruit) < checkDist;
        let nearSalmon = lightFood.visible && !lightFood.collected && getDistance(jasmine, lightFood) < checkDist;
        let canPickUpChippoy = chippoyExhausted && !isCarryingChippoy && getDistance(jasmine, chippoy) < checkDist;
        let canFeedChippoy = isCarryingChippoy && jungleFruit.collected && !chippoyFed.jungleFruit;

        let canEquipChippoy = hasItemsToEquip() && getDistance(jasmine, chippoy) < checkDist && !chippoyExhausted;

        if (nearEnemy1 || nearEnemy2 || nearEnemy3 || nearEnemy4 || nearPowerup || nearFruit || nearSalmon || canPickUpChippoy || canFeedChippoy || canEquipChippoy) {
            show = true;
            if (canPickUpChippoy) showInstruction("Press E to carry Chippoy");
            else if (canFeedChippoy) showInstruction("Press E to feed Chippoy");
            else if (nearFruit) showInstruction("Press E to pick Fruit");
            else if (nearSalmon) showInstruction("Press E to pick Salmon");
            else if (nearPowerup) showInstruction("Press E to take Mystic Power");
            else if (nearEnemy3) {
                if (lightBefriended) showInstruction("Press E to talk to Light");
                else if (lightFood.collected) showInstruction("Press E to Befriend Light");
                else showInstruction("Press E to Interact with Light");
            }
            else if (nearEnemy4) {
                if (enemy4.defeated && squeakyToy.collected && !siblingBefriended) {
                    showInstruction("Press E to Give Toy to Sibling");
                } else if (!enemy4.defeated) {
                    showInstruction("Challenge the Sibling");
                } else {
                    showInstruction("Talk to the Sibling");
                }
            }
            else if (canEquipChippoy) showInstruction("Press E to equip Chippoy");
            else showInstruction("Fight the enemy");
        } else {
            // Task fallback logic (no prompt, just instruction at bottom)
            if (!enemy1.defeated) showInstruction("Explore the forest");
            else if (!itemPowerup.collected) showInstruction("Collect the powerup at 967, 954");
            else if (!enemy2.defeated) showInstruction("Confront the Guardian");
            else if (chippoyExhausted) showInstruction("Carry Chippoy to the Glowing Fruit");
            else if (!enemy3.defeated && !lightBefriended) showInstruction("Find the glowing creature 'Light'");
            else if (lightFood.visible && !lightFood.collected) showInstruction("Find the Golden Salmon (North)");
            else if (!enemy4.defeated) showInstruction("Confront the Sibling");
            else showInstruction("Explore the forest");
        }
    }
    else if (currentScene === "meowdom") {
        if (getDistance(jasmine, bobby) < 100) show = true;
    }
    else if (currentScene === "final") {
        if (getDistance(jasmine, boyfriend) < 60) show = true;
    }

    if (show && !isDialogueOpen && !isBattleActive) {
        promptBox.style.display = "block";
        let zoomMulti = (currentScene === "zootopia" || currentScene === "jungle") ? 6.0 : 1.0;
        const sx = (jasmine.x - camera.x) * currentZoom + (15 * zoomMulti);
        const sy = (jasmine.y - camera.y) * currentZoom - (20 * zoomMulti);
        promptBox.style.transform = `translate(${sx}px, ${sy}px)`;
    } else {
        promptBox.style.display = "none";
    }
}

function getDistance(o1, o2) {
    return Math.sqrt((o1.x - o2.x) ** 2 + (o1.y - o2.y) ** 2);
}

function showInstruction(text) {
    instructionBox.innerHTML = text;
    instructionBox.style.display = "block";
}

function hideInstruction() {
    instructionBox.style.display = "none";
}

function startDialogue(lines) {
    dialogueQueue = lines;
    dialogueIndex = 0;
    isDialogueOpen = true;
    dialogueBox.style.display = "flex";
    showNextLine();
}


let isTyping = false;
let typeInterval = null;
let currentFullText = "";

function showNextLine() {
    if (dialogueIndex < dialogueQueue.length) {
        currentFullText = dialogueQueue[dialogueIndex];
        dialogueText.innerHTML = ""; // Clear existing
        dialogueArrow.style.display = "none";

        isTyping = true;
        let charIndex = 0;

        if (typeInterval) clearInterval(typeInterval);

        typeInterval = setInterval(() => {
            if (charIndex < currentFullText.length) {
                const char = currentFullText.charAt(charIndex);
                dialogueText.innerHTML += char;
                charIndex++;

                // Play sound for non-space characters (every 2nd char to avoid annoying buzzing)
                if (char !== " " && charIndex % 2 === 0) {
                    try { audioManager.playTypewriter(); } catch (e) { }
                }
            } else {
                finishTyping();
            }
        }, 30); // Speed of typing

    } else {
        closeDialogue();
    }
}

function finishTyping() {
    isTyping = false;
    clearInterval(typeInterval);
    dialogueText.innerHTML = currentFullText;
    dialogueArrow.style.display = "block";
}

function advanceDialogue() {
    // If still typing, just show full text immediately (skip effect)
    if (isTyping) {
        finishTyping();
        return;
    }

    dialogueIndex++;
    if (dialogueIndex < dialogueQueue.length) showNextLine();
    else {
        closeDialogue();

        // --- QUEST LOGIC HOOKS ---
        if (currentScene === "house" && questState === 2 && !isInventoryOpen && !checkArmorCompletion()) {
            // Just finished "Let me put them on you" dialogue
            openInventory();
        }
        else if (currentScene === "world" && questState === 6) {
            performForestPortalSummon();
        }
        else if (currentScene === "world" && questState === 4) {
            switchScene("zootopia");
        }
        else if (currentScene === "zootopia" && questState === 5) {
            // After finding Wife, spawn return portal and make her follow
            zootopiaPortal.visible = true;
            wifeIsFollowing = true;
            showInstruction("Task: Enter the Portal to return");
            startDialogue(["WIFE: Follow me! The portal is just over there!"]);
            questState = 5.5; // Custom intermediate state to prevent re-triggering dialogue
        }
        else if (currentScene === "jungle" && questState === 8) {
            openInventory();
            questState = 6; // Return to normal jungle exploration state
        }
        else if (currentScene === "jungle" && questState === 7) {
            startBattle(enemy4);
        }
        else if (currentScene === "meowdom" && questState === 10) {
            switchScene("picnic");
        }
        else if (currentScene === "zootopia" && zootopiaQuestState === 3 && dialogueQueue[dialogueQueue.length - 1].includes("Waddle")) {
            performScentTransfer();
        }
    }
}

function performScentTransfer() {
    isCutscene = true;
    jasmine.isMoving = false;

    // Smoothly move Chippoy to face Guard Dog
    // Guard Dog: x=400, y=935
    // Target pos for Chippoy: 370, 935 (face right)
    const targetX = 370;
    const targetY = 935;

    // Simple animation loop via interval (or could use requestAnimationFrame with state)
    const duration = 1500;
    const fps = 60;
    const steps = duration / (1000 / fps);
    let step = 0;
    const startX = chippoy.x;
    const startY = chippoy.y;

    const anim = setInterval(() => {
        step++;
        const progress = step / steps; // simplistic lerp
        chippoy.x = startX + (targetX - startX) * progress;
        chippoy.y = startY + (targetY - startY) * progress;
        chippoy.facing = "right"; // Look at guard dog
        chippoy.isMoving = true;

        if (step >= steps) {
            clearInterval(anim);
            chippoy.isMoving = false;

            // Interaction Phase
            setTimeout(() => {
                // Shake slightly (sniffing)
                shakeElement(chippoyImg);
                try { audioManager.playTypewriter(); } catch (e) { } // sniff sound

                setTimeout(() => {
                    // Trigger visual effects
                    triggerScentSharing();

                    setTimeout(() => {
                        isCutscene = false; // Release control
                    }, 3000); // 3 seconds for particle visual
                }, 800);
            }, 500);
        }
    }, 1000 / fps);
}

function performForestPortalSummon() {
    isCutscene = true;
    jasmine.isMoving = false;

    // 1. Rumble Effect (Shake Screen)
    shakeElement(gameScreen, true);
    try { audioManager.playSound('rumble'); } catch (e) { }

    setTimeout(() => {
        // 2. Summon Portal - Positioned at specific coordinates (354, 141)
        zootopiaPortal.x = 354;
        zootopiaPortal.y = 141;
        zootopiaPortal.visible = true;
        updateImages();

        // 3. Final Rumble
        shakeElement(gameScreen, true);

        // 4. End Cutscene - Let Player move manually
        setTimeout(() => {
            isCutscene = false;
            showInstruction("Task: Walk into the Portal to enter the Forest");
        }, 800);
    }, 1500);
}

function triggerPortalClosing() {
    zootopiaPortal.visible = true;
    zootopiaPortal.closing = true;
    zootopiaPortal.scale = 1.0;

    // Play rumble sound for the closing effect
    try { audioManager.playSound('rumble'); } catch (e) { }

    // Screen shake for extra impact
    shakeElement(gameScreen, true);

    // Animate scale down
    const closeInterval = setInterval(() => {
        zootopiaPortal.scale -= 0.015; // Slightly slower, more dramatic shrink

        // Intensify shake as it gets smaller? Or just keep it rumbling.
        if (Math.random() > 0.7) {
            shakeElement(zootopiaPortalObj, false);
        }

        if (zootopiaPortal.scale <= 0) {
            zootopiaPortal.scale = 0;
            zootopiaPortal.visible = false;
            zootopiaPortal.closing = false;
            clearInterval(closeInterval);
        }
    }, 40);
}

function closeDialogue() {
    isDialogueOpen = false;
    dialogueBox.style.display = "none";
}

// --- BATTLE SYSTEM LOGIC ---
function startBattle(enemy) {
    isBattleActive = true;
    currentEnemy = enemy;
    enemyStats.hp = enemy.hp;
    enemyStats.maxHp = enemy.hp;
    enemyStats.atk = enemy.atk;
    enemyStats.name = enemy.name;

    // --- FIX BATTLE LOOP ---
    // If we were in the "ready to battle" state, move to a neutral state
    // This prevents advanceDialogue from re-triggering the battle when dialogue ends.
    if (questState === 7) questState = 9;

    document.getElementById("battle-interface").style.display = "flex";
    document.getElementById("attack-btn").disabled = false;
    document.getElementById("powerup-btn").disabled = false;
    document.getElementById("enemy-name").innerText = enemy.name;
    document.getElementById("battle-enemy-sprite").style.backgroundImage = `url('${enemy.src || "assets/guard.png"}')`;
    document.getElementById("battle-enemy-sprite").style.filter = "none"; // Filters removed to favor custom assets

    if (enemy === enemy3) {
        // Special logic for Light: moves first
        document.getElementById("attack-btn").disabled = true;
        setTimeout(() => {
            logBattle("LIGHT is too excited!");
            showBubble("light-bubble", "HI FRIEND!!!", 1500);

            setTimeout(() => {
                logBattle("Light slaps Chippoy of excitement!");
                showBubble("light-bubble", "SLAP!!!", 1000);

                // Light Lunges at Chippoy
                lungeTowardTarget("battle-enemy-sprite", "battle-player-sprite", () => {
                    triggerSlapEffect("player");
                    shakeElement(document.getElementById("battle-player-sprite"));
                });
            }, 1500);

            setTimeout(() => {
                logBattle("CHIPPOY is scared and runs away!");
                showBubble("chippoy-bubble", "AIAIAIIIII!", 1000);

                // Chippoy runs off-screen
                const playerSprite = document.getElementById("battle-player-sprite");
                playerSprite.style.transition = "right 1.5s ease-in, opacity 1s";
                playerSprite.style.right = "-500px";
                playerSprite.style.opacity = "0";

                setTimeout(() => {
                    endLightScene();
                    playerSprite.style.transition = ""; // Reset
                    playerSprite.style.right = "10px";
                    playerSprite.style.opacity = "1";
                }, 1500);
            }, 3000);
        }, 1000);
    }
    else if (enemy === enemy4) {
        // CALL LIGHT button will show up via updateBattleUI when health is low
        document.getElementById("battle-light-sprite").style.display = "none";
        logBattle("SIBLING: I won't let you through easily!");
    }
    document.getElementById("battle-player-sprite").style.backgroundImage = "url('assets/chippoy_idle_left.gif')";

    updateBattleUI();
    logBattle(`A wild ${enemy.name} appeared! Chippoy prepares for battle!`);
}

function updateBattleUI() {
    if (!isBattleActive) return;

    const playerHpFill = document.getElementById("player-hp-fill");
    const playerHpText = document.getElementById("player-hp-text");
    const enemyHpFill = document.getElementById("enemy-hp-fill");
    const enemyHpText = document.getElementById("enemy-hp-text");

    if (playerHpFill) playerHpFill.style.width = Math.max(0, (playerStats.hp / playerStats.maxHp * 100)) + "%";
    if (playerHpText) playerHpText.innerText = `${Math.ceil(Math.max(0, playerStats.hp))}/${playerStats.maxHp}`;
    if (enemyHpFill) enemyHpFill.style.width = Math.max(0, (enemyStats.hp / enemyStats.maxHp * 100)) + "%";
    if (enemyHpText) enemyHpText.innerText = `${Math.ceil(Math.max(0, enemyStats.hp))}/${enemyStats.maxHp}`;

    const healBtn = document.getElementById("heal-btn");
    const pwrBtn = document.getElementById("powerup-btn");
    const callLightBtn = document.getElementById("call-light-btn");

    if (healBtn) healBtn.style.display = (playerStats.hp < playerStats.maxHp * 0.5) ? "block" : "none";

    if (pwrBtn) {
        pwrBtn.style.display = (playerStats.enchanted || playerStats.powerUp > 1) ? "block" : "none";
    }

    if (callLightBtn) {
        const isSiblingBattle = currentEnemy === enemy4;
        const reflectsHealthThreshold = playerStats.hp < playerStats.maxHp * 0.4;

        // RELAXED CONDITION: Ensuring button shows up for the user even if flag check failed
        const canShow = isSiblingBattle && reflectsHealthThreshold;
        callLightBtn.style.display = canShow ? "block" : "none";

        if (canShow) {
            callLightBtn.disabled = false;
            lightBefriended = true; // Auto-fix flag if they triggered the button
        }
    }
}

function logBattle(msg) {
    const log = document.getElementById("battle-log");
    log.innerHTML += `<div>> ${msg}</div>`;
    log.scrollTop = log.scrollHeight;
}

function executeBattleAction(action) {
    if (!isBattleActive) return;
    console.log("Battle Action:", action);

    if (action === 'attack') {
        let damage = (playerStats.atk + (Math.random() * 10)) * playerStats.powerUp;
        if (chippoyArmor.powerup) damage *= 2;

        lungeTowardTarget("battle-player-sprite", "battle-enemy-sprite", () => {
            // --- SIBLING DEFENSE BUFF ---
            if (currentEnemy === enemy4) {
                damage = 10; // Drastically reduced damage
                showBubble("sibling-bubble", "Puny bite!", 1000);
                logBattle("SIBLING: Hmph! Your puny bites won't stop me!");
                logBattle("JASMINE: Chippoy, he's too strong! We need help!");
            } else {
                showBubble("chippoy-bubble", "TAKE THIS!", 1000);
            }

            enemyStats.hp -= damage;
            updateBattleUI(); // Register damage instantly on hit
            logBattle(`Chippoy used BITE for ${Math.floor(damage)} damage!`);
            triggerBiteEffect("enemy", false, "bite");
            shakeElement(document.getElementById("battle-enemy-sprite"));
        });
    }
    else if (action === 'paw') {
        let damage = (playerStats.atk * 0.8 + (Math.random() * 5)) * playerStats.powerUp;
        if (chippoyArmor.powerup) damage *= 1.5;

        lungeTowardTarget("battle-player-sprite", "battle-enemy-sprite", () => {
            // --- SIBLING DEFENSE BUFF ---
            if (currentEnemy === enemy4) {
                damage = 5; // Absolute minimum damage
                showBubble("sibling-bubble", "Hmph!", 600);
            }
            enemyStats.hp -= damage;
            updateBattleUI(); // Register damage instantly on hit
            logBattle(`Chippoy used PAW STRIKE for ${Math.floor(damage)} damage!`);
            showBubble("chippoy-bubble", "HAYAH!", 1000);
            triggerBiteEffect("enemy", false, "claw");
            shakeElement(document.getElementById("battle-enemy-sprite"));
        });
    }
    else if (action === 'tail') {
        enemyStats.atk = Math.max(5, enemyStats.atk - 5);
        logBattle(`Chippoy wagged his tail! ${enemyStats.name}'s ATK fell!`);
        showBubble("chippoy-bubble", "*Wag Wag*", 1000);
        triggerBiteEffect("enemy", false, "sparkle");
        logBattle(`${enemyStats.name} is distracted by the cuteness!`);
    }
    else if (action === 'teamup') {
        // --- DRAMATIC SIBLING SCRIPT ---
        const callLightBtn = document.getElementById("call-light-btn");
        const attackBtn = document.getElementById("attack-btn");
        if (callLightBtn) callLightBtn.style.display = "none";
        if (attackBtn) attackBtn.disabled = true;

        const chippoyAura = document.getElementById("chippoy-aura");
        const lightAura = document.getElementById("light-aura");
        const chippoySprite = document.getElementById("battle-player-sprite");
        const lightSprite = document.getElementById("battle-light-sprite");

        // 1. Sibling Taunt
        setTimeout(() => {
            showBubble("sibling-bubble", "You're a failure, Chippoy!", 2000);
            logBattle("SIBLING: Look at you... weak and pathetic.");
        }, 500);

        // 2. Chippoy Response
        setTimeout(() => {
            showBubble("chippoy-bubble", "You're... wrong!", 2000);
            logBattle("CHIPPOY: I've learned that strength isn't just about size.");
        }, 3000);

        // 3. Sibling Mockery
        setTimeout(() => {
            showBubble("sibling-bubble", "Then show me! ALONE!", 2000);
            logBattle("SIBLING: You have no one!");
        }, 5500);

        // 4. The CALL
        setTimeout(() => {
            showBubble("chippoy-bubble", "I AM NOT ALONE!!!", 2500);
            logBattle("CHIPPOY: LIGHT! LEND ME YOUR STRENGTH!");
        }, 8000);

        // 5. Light Arrival
        setTimeout(() => {
            if (lightSprite) {
                lightSprite.style.display = "block";
                lightSprite.style.animation = "pickup-float 1s ease-out";
            }
            showBubble("light-bubble", "PURRRRR MEOW!!!", 2000);
            logBattle("LIGHT: I'll always have your back, buddy!");
        }, 10000);

        // 6. --- NEW ALTERNATING COMBO PHASE (6 Attacks Each) ---
        // We'll run a loop for the hits
        let delay = 12500;
        const totalHits = 12; // 6 each
        for (let i = 0; i < totalHits; i++) {
            setTimeout(() => {
                const isChippoy = i % 2 === 0;
                const attackerId = isChippoy ? "battle-player-sprite" : "battle-light-sprite";
                const effect = isChippoy ? "bite" : "claw";

                logBattle(`${isChippoy ? "CHIPPOY" : "LIGHT"} strikes!`);
                lungeTowardTarget(attackerId, "battle-enemy-sprite", () => {
                    enemyStats.hp -= 40; // Total 480 damage from combo
                    updateBattleUI();
                    triggerBiteEffect("enemy", false, effect);
                    shakeElement(document.getElementById("battle-enemy-sprite"));
                });
            }, delay + (i * 800));
        }

        // 7. Sibling Reaction
        const postComboDelay = delay + (totalHits * 800) + 1000;
        setTimeout(() => {
            showBubble("sibling-bubble", "Impressive... but not enough!", 2000);
            logBattle("SIBLING: Is that all? You'll need more heart than that!");
        }, postComboDelay);

        // 8. --- CHARGING PHASE ("Sticking Together") ---
        setTimeout(() => {
            // Move Light closer to Chippoy to "stick together"
            if (lightSprite) {
                lightSprite.style.transition = "all 1s ease-in-out";
                lightSprite.style.right = "230px"; // Closer to Chippoy's 180px
            }

            if (chippoyAura) chippoyAura.style.display = "block";
            if (lightAura) lightAura.style.display = "block";

            showBubble("chippoy-bubble", "This is for everyone!", 2000);
            showBubble("light-bubble", "For the snacks!", 2000);

            logBattle("Chippoy and Light are focusing their energy together!");
            shakeElement(document.getElementById("battle-interface"), true);
        }, postComboDelay + 3000);

        setTimeout(() => {
            showBubble("sibling-bubble", "W-What is this light?!", 2500);
            logBattle("SIBLING: This energy... it's blinding!");
        }, postComboDelay + 6000);

        // 9. FINAL SHOUT & STRIKE
        setTimeout(() => {
            showBubble("chippoy-bubble", "FOR JASMINE!!!", 1500);
            showBubble("light-bubble", "FOR SNACKS!!!", 1500);

            setTimeout(() => {
                logBattle("ULTIMATE TEAM-UP STRIKE!!!");
                const flash = document.createElement("div");
                flash.className = "screen-flash";
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 800);

                enemyStats.hp = 0;
                updateBattleUI();
                triggerBiteEffect("enemy", true);
                shakeElement(document.getElementById("battle-enemy-sprite"), true);

                if (chippoyAura) chippoyAura.style.display = "none";
                if (lightAura) lightAura.style.display = "none";

                // --- EMOTIONAL CINEMATIC ---
                setTimeout(() => {
                    showBubble("chippoy-bubble", "Why do you always bully me?", 3500);
                    logBattle("CHIPPOY: Why do you always bully me, brother?");
                }, 2500);

                setTimeout(() => {
                    showBubble("sibling-bubble", "I... I just want to make you strong, and independent Chippoy.", 4000);
                    logBattle("SIBLING: I just want to make you strong, and independent Chippoy. As I've become blind already.");
                }, 7000);

                setTimeout(() => {
                    showBubble("chippoy-bubble", "Brother... you're blind?!", 3500);
                    logBattle("CHIPPOY: Brother... you're blind? Why didn't you just tell me? I would have helped you!");
                }, 11500);

                setTimeout(() => {
                    showBubble("sibling-bubble", "A warrior... stands alone.", 3500);
                    logBattle("SIBLING: A warrior must stand alone... but seeing you with these friends... maybe I was wrong.");

                    setTimeout(() => {
                        showBubble("chippoy-bubble", "We're in this together now.", 3000);
                        setTimeout(winBattle, 3500);
                    }, 4000);
                }, 15500);
            }, 2000);
        }, postComboDelay + 9000);
        return;
    }
    else if (action === 'heal') {
        let amount = playerStats.maxHp * 0.3;
        playerStats.hp = Math.min(playerStats.maxHp, playerStats.hp + amount);
        logBattle(`Jasmine used Healing Medicine! Restored ${Math.floor(amount)} HP.`);
        document.getElementById("heal-btn").disabled = true; // Use once per turn or battle? Let's leave it for now.
    }
    else if (action === 'powerup') {
        playerStats.powerUp += 0.5;
        playerStats.def += 20;
        logBattle(`Chippoy feels the energy! ATK and DEF UP!`);
        const pwrBtn = document.getElementById("powerup-btn");
        if (pwrBtn) pwrBtn.disabled = true;
    }

    updateBattleUI();

    if (enemyStats.hp <= 0) {
        winBattle();
        return;
    }

    // After action, disable buttons for turn transition
    document.getElementById("attack-btn").disabled = true;
    document.getElementById("paw-btn").disabled = true;
    document.getElementById("tail-btn").disabled = true;
    if (document.getElementById("call-light-btn")) document.getElementById("call-light-btn").disabled = true;

    setTimeout(() => {
        enemyTurn();
        // Re-enable buttons after enemy turn is complete + extra buffer
        setTimeout(() => {
            if (isBattleActive) {
                document.getElementById("attack-btn").disabled = false;
                document.getElementById("paw-btn").disabled = false;
                document.getElementById("tail-btn").disabled = false;
                const healBtn = document.getElementById("heal-btn");
                const pwrBtn = document.getElementById("powerup-btn");
                const callBtn = document.getElementById("call-light-btn");
                if (healBtn) healBtn.disabled = false;
                if (pwrBtn) pwrBtn.disabled = false;
                if (callBtn) {
                    callBtn.disabled = false;
                    updateBattleUI(); // Refresh visibility!
                }
            }
        }, 1200);
    }, 1500);
}

function enemyTurn() {
    if (!isBattleActive) return;

    let damage = Math.max(5, (enemyStats.atk - playerStats.def) + Math.random() * 5);

    // Make guardian/sibling VERY CHALLENGING
    if (currentEnemy === enemy4 && chippoyArmor.powerup) {
        // Sibling challenge
        damage = 110 + Math.random() * 30;
    } else if (currentEnemy === enemy2) {
        // Guardian challenge - it should hit VERY hard, forcing powerups/healing
        damage = 60 + Math.random() * 30;
    }

    playerStats.hp -= damage;

    let attackName = "attacks";
    if (currentEnemy === enemy4) {
        const siblingAttacks = ["THUNDER BARK", "SIBLING SLAM", "SHADOW BITE"];
        attackName = siblingAttacks[Math.floor(Math.random() * siblingAttacks.length)];
    } else if (currentEnemy === enemy2) {
        attackName = "ANCIENT STOMP";
    }

    lungeTowardTarget("battle-enemy-sprite", "battle-player-sprite", () => {
        logBattle(`${enemyStats.name} uses ${attackName} for ${Math.floor(damage)} damage!`);
        showBubble("sibling-bubble", attackName + "!!!", 1000);

        // --- VISUAL EFFECTS ---
        triggerBiteEffect("player");
        shakeElement(document.getElementById("battle-player-sprite"));
        shakeElement(document.getElementById("battle-interface"), true); // Screen shake

        updateBattleUI();

        if (playerStats.hp <= 0) {
            if (currentEnemy === enemy3) {
                // Should not happen with new exit logic
                isBattleActive = false;
                document.getElementById("battle-interface").style.display = "none";
            } else {
                loseBattle();
            }
        }
    });
}

function winBattle() {
    logBattle(`VICTORY! ${enemyStats.name} has been defeated!`);
    currentEnemy.defeated = true;
    if (currentEnemy === enemy1) {
        jungleEnemy1Obj.style.display = "none";
        showInstruction("Task: Collect the items at 967, 954");
    }
    if (currentEnemy === enemy2) {
        logBattle("The Ancient Guardian crumbles! The way is open!");
        showInstruction("Task: Defeat the Sibling at the hideout");
    }
    else if (currentEnemy === enemy3) {
        // This won't normally happen due to slap-and-run
        jungleEnemy3Obj.style.display = "none";
    } else if (currentEnemy === enemy4) {
        // jungleEnemy4Obj.style.display = "none"; // KEEP SIBLING VISIBLE
        logBattle(`VICTORY? Wait... the Sibling is crying?`);
    } else {
        jungleEnemy2Obj.style.display = "none";
        showInstruction("Task: Find Light!");
    }

    setTimeout(() => {
        document.getElementById("battle-interface").style.display = "none";
        document.getElementById("battle-light-sprite").style.display = "none";
        const callLightBtn = document.getElementById("call-light-btn");
        if (callLightBtn) callLightBtn.style.display = "none";
        isBattleActive = false;
        if (currentEnemy === enemy2) {
            chippoyExhausted = true; // Chippoy is tired after boss
            isCarryingChippoy = false; // Must be picked up manually now
            jungleFruit.visible = true;
            jungleFruitObj.style.display = "block";
            startDialogue([
                "JASMINE: We did it! The Guardian is gone.",
                "CHIPPOY: *Whimper...*",
                "CHIPPOY: Woof! Woof! (Jasmine, I'm too tired to walk...)",
                "CHIPPOY: Woof! (Can you carry me?)",
                "JASMINE: Oh, you poor thing. Of course I'll carry you.",
                "JASMINE: I need to find that Glowing Fruit to get your strength back.",
                "JASMINE: I saw some to the West near the river."
            ]);
            showInstruction("Task: Press E to carry Chippoy");
        }
        if (currentEnemy === enemy3) {
            // Light befriending logic after "defeat" (running away)
            // For now, let's keep it simple: Jasmine talks to Light after the run away
        }
        if (currentEnemy === enemy4) {
            startDialogue([
                "SIBLING: *Sniff Sniff* ...",
                "SIBLING: I didn't mean to be mean...",
                "SIBLING: I'm just lonely... and I lost my favorite squeaky toy.",
                "JASMINE: Oh... you're not a bad dog at all!",
                "CHIPPOY: Woof? (My brother is sad?)",
                "JASMINE: Don't worry, we'll find your toy for you!",
                "SIBLING: *Whimper* (It's somewhere in the deep thicket to the South...)"
            ]);
            squeakyToy.visible = true;
            squeakyToyObj.style.display = "block";
            showInstruction("Task: Find the Squeaky Toy (South)");
        }
    }, 2000);
}

function endLightScene() {
    isBattleActive = false;
    document.getElementById("battle-interface").style.display = "none";
    lightFood.visible = true;
    lightFoodObj.style.display = "block";
    startDialogue([
        "JASMINE: Wait! Chippoy is too scared to fight!",
        "JASMINE: Light is just trying to play, but he's too strong.",
        "JASMINE: If we find his favorite food, maybe he'll listen to us.",
        "JASMINE: I should look for some 'Golden Salmon' near the Northern ponds."
    ]);
    showInstruction("Task: Find the Golden Salmon (North)");
}

function loseBattle() {
    logBattle("DEFEAT... You have fainted.");
    showBubble("chippoy-bubble", "Ouchie...", 2000);
    setTimeout(() => {
        // Reset player stats but keep in jungle
        playerStats.hp = playerStats.maxHp;
        isBattleActive = false;
        document.getElementById("battle-interface").style.display = "none";
        // Teleport to jungle start or nearby safety
        jasmine.x = 100;
        jasmine.y = 100;
        updateBattleUI();
        logBattle("Jasmine and Chippoy retreated to safety.");
    }, 2000);
}

// --- VISUAL EFFECTS HELPERS ---
function lungeTowardTarget(attackerId, targetId, onHit) {
    const attacker = document.getElementById(attackerId);
    if (!attacker) return;

    // Use transforms for smooth, reliable combat movement
    attacker.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // battle-player-sprite/light-sprite are on the RIGHT, move LEFT (negative X)
    // battle-enemy-sprite is on the LEFT, move RIGHT (positive X)
    const isPlayerSide = attackerId.includes("player") || attackerId.includes("light");
    const lungeDist = isPlayerSide ? -250 : 250;

    attacker.style.transform = `translateX(${lungeDist}px)`;

    // Time for the lunge to reach the target
    setTimeout(() => {
        if (onHit) onHit();

        // Hold at impact for a moment (allows shake to finish and feels 'heavy')
        setTimeout(() => {
            attacker.style.transform = "translateX(0)";
            // Clean up transition after return
            setTimeout(() => { attacker.style.transition = "none"; }, 300);
        }, 450);
    }, 300);
}

function showBubble(id, text, duration) {
    const bubble = document.getElementById(id);
    if (!bubble) return;
    bubble.innerText = text;
    bubble.style.display = "block";
    setTimeout(() => {
        bubble.style.display = "none";
    }, duration);
}

function triggerSlapEffect(target) {
    const effect = document.createElement("div");
    effect.className = "slap-effect";
    const container = document.querySelector(".battle-stage");
    container.appendChild(effect);

    const sprite = target === "enemy" ? document.getElementById("battle-enemy-sprite") : document.getElementById("battle-player-sprite");
    const rect = sprite.getBoundingClientRect();
    const stageRect = container.getBoundingClientRect();

    effect.style.left = (rect.left - stageRect.left + rect.width / 2 - 50) + "px";
    effect.style.top = (rect.top - stageRect.top + rect.height / 2 - 50) + "px";

    setTimeout(() => effect.remove(), 300);
}

function triggerBiteEffect(target, ultimate = false, type = "bite") {
    const effect = document.createElement("div");
    if (type === "bite") effect.className = ultimate ? "enhanced-bite ultimate-bite" : "enhanced-bite";
    else if (type === "claw") effect.className = "claw-effect";
    else if (type === "sparkle") effect.className = "sparkle-effect";

    const container = document.querySelector(".battle-stage");
    container.appendChild(effect);

    const sprite = target === "enemy" ? document.getElementById("battle-enemy-sprite") : document.getElementById("battle-player-sprite");
    const rect = sprite.getBoundingClientRect();
    const stageRect = container.getBoundingClientRect();

    effect.style.left = (rect.left - stageRect.left + rect.width / 2 - 40) + "px";
    effect.style.top = (rect.top - stageRect.top + rect.height / 2 - 40) + "px";

    if (ultimate) {
        effect.style.width = "150px";
        effect.style.height = "150px";
        effect.style.filter = "hue-rotate(180deg) brightness(2)";
    }

    if (playerStats.powerUp > 1 || chippoyArmor.powerup) {
        document.getElementById("battle-player-sprite").classList.add("power-up-active");
    }

    setTimeout(() => effect.remove(), 500);
}

function shakeElement(el, heavy = false) {
    if (!el) return;
    const intensity = heavy ? 10 : 5;
    const duration = 300;
    const start = Date.now();
    const originalTransform = el.style.transform || "";

    const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed > duration) {
            el.style.transform = originalTransform;
            clearInterval(timer);
            return;
        }
        const x = (Math.random() - 0.5) * intensity;
        const y = (Math.random() - 0.5) * intensity;
        el.style.transform = `${originalTransform} translate(${x}px, ${y}px)`;
    }, 16);
}

function closeLoot() {
    document.getElementById("loot-popup").style.display = "none";
}

// --- SCENT MECHANIC FOR ZOOTOPIA ---
const zootopiaScents = [
    { x: 950, y: 3100, radius: 150, found: false, name: "Mysterious Scent 1" },
    { x: 3100, y: 1500, radius: 150, found: false, name: "Mysterious Scent 2" },
    { x: 3700, y: 500, radius: 150, found: false, name: "Mysterious Scent 3" }
];

function checkScent() {
    if (currentScene !== "zootopia" && currentScene !== "meowdom") return;

    // Visual wave effect around Chippoy
    const wave = document.createElement("div");
    wave.className = "bark-wave";
    // Calculate screen position relative to Chippoy
    const rect = chippoyImg.getBoundingClientRect();
    if (rect.width > 0) {
        wave.style.left = (rect.left + window.scrollX + rect.width / 2 - 50) + "px";
        wave.style.top = (rect.top + window.scrollY + rect.height / 2 - 50) + "px";
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 600);
    }

    if (currentScene === "meowdom") {
        if (!meowdomScentActivated) {
            // Sniffing Animation / Cutscene
            isCutscene = true;
            jasmine.isMoving = false;

            // Sniffing effect (shake Chippoy)
            shakeElement(chippoyImg);
            try { audioManager.playTypewriter(); } catch (e) { } // Sniff sound

            setTimeout(() => {
                shakeElement(chippoyImg);
                setTimeout(() => {
                    startDialogue([
                        "CHIPPOY: *Sniff Sniff* (I've caught Bobby's scent!)",
                        "CHIPPOY: *Bark!* (The trail lead to the garden!)"
                    ]);
                    meowdomScentActivated = true;
                    scentTrailActive = true;
                    isCutscene = false;
                }, 800);
            }, 800);
        } else {
            // Already activated, just show the spark/wave
            startDialogue(["CHIPPOY: (I'm following the scent to Bobby!)"]);
        }
        return;
    }

    // Check distance to scents (using world coordinates)
    for (let scent of zootopiaScents) {
        if (!scent.found && getDistance(chippoy, scent) < scent.radius) {
            scent.found = true;
            try { audioManager.playPickup(); } catch (e) { }
            startDialogue([
                "CHIPPOY: *Sniff Sniff!* (I smell something interesting!)",
                `CHIPPOY: *Bark!* (It's right here!)`,
                `You discovered a Hidden Scent!`
            ]);
            // Give a reward or progress a secret counter
            // For now, just a nice interaction
        }
    }
}

function gameLoop() {
    update();
    updateImages();
    drawDebugCollisions();
    updateScentTrail();
    drawScentTrail();
    updateWorldBubbles(); // Position world bubbles
    requestAnimationFrame(gameLoop);
}

function startPicnicDialogue() {
    isCutscene = true;
    jasmine.isMoving = false;

    setTimeout(() => {
        showWorldBubble("seth-world-bubble", "Jasmine! You're finally here! Bobby found you!", 4000);

        setTimeout(() => {
            showWorldBubble("jasmine-world-bubble", "Seth! Oh my gosh, I was so worried about you and Bobby!", 4000);

            setTimeout(() => {
                showWorldBubble("chippoy-world-bubble", "*Woof Woof!* (I knew we could do it!)", 3000);

                setTimeout(() => {
                    showWorldBubble("bobby-world-bubble", "*Meow...* (Purr... just in time for the picnic.)", 3000);

                    // Seth's heartfelt message
                    setTimeout(() => {
                        showWorldBubble("seth-world-bubble", "Since you're here now, the real Seth will relay his message to you.", 4000);

                        setTimeout(() => {
                            showWorldBubble("seth-world-bubble", "Babi, congrats on completing the game, and thank you for playing it!", 4000);

                            setTimeout(() => {
                                showWorldBubble("seth-world-bubble", "It's been a long time since we've been together. Everything that we've been through, we pulled it off.", 5000);

                                setTimeout(() => {
                                    showWorldBubble("seth-world-bubble", "We've went through so so soooo much! And I'm glad it's you that I'm having the privilege of loving.", 5000);

                                    setTimeout(() => {
                                        showWorldBubble("seth-world-bubble", "I love you so much, babi!", 3500);

                                        setTimeout(() => {
                                            showWorldBubble("seth-world-bubble", "I know I'm not perfect, I know that I still have a lots of things to improve on...", 4500);

                                            setTimeout(() => {
                                                showWorldBubble("seth-world-bubble", "But for you, I will do everything that I can so I would be able to give you the best of the best treatment that you deserve.", 5500);

                                                setTimeout(() => {
                                                    showWorldBubble("seth-world-bubble", "I know this is sudden, and we've never really even talked about it, or I guess we had, but we've never talked about things like making it 'official'", 6000);

                                                    setTimeout(() => {
                                                        showWorldBubble("seth-world-bubble", "So, babi...", 2500);

                                                        setTimeout(() => {
                                                            showWorldBubble("seth-world-bubble", "Can I be your boyfriend? ❤️", 5000);
                                                            isCutscene = false;
                                                        }, 3000);
                                                    }, 6500);
                                                }, 6000);
                                            }, 5000);
                                        }, 4000);
                                    }, 5500);
                                }, 5500);
                            }, 4500);
                        }, 4500);
                    }, 3500);
                }, 3500);
            }, 4500);
        }, 4500);
    }, 1200);
}

function showWorldBubble(id, text, duration) {
    const bubble = document.getElementById(id);
    if (!bubble) return;
    const textEl = bubble.querySelector(".bubble-text");
    if (textEl) textEl.innerText = text;
    bubble.style.display = "flex";
    setTimeout(() => {
        bubble.style.display = "none";
    }, duration);
}

function updateWorldBubbles() {
    // Helper to position bubbles above their respective world objects
    const positionBubble = (id, worldObj, offsetH = 80) => {
        const bubble = document.getElementById(id);
        if (!bubble || bubble.style.display === "none") return;

        // Get screen position (taking camera and zoom into account)
        const screenX = (worldObj.x - camera.x) * currentZoom;
        const screenY = (worldObj.y - camera.y) * currentZoom;

        // Offset bubble to be above the head
        bubble.style.left = (screenX) + "px";
        bubble.style.top = (screenY - offsetH * currentZoom) + "px";
        // Use transform to center it horizontally relative to the point
        bubble.style.transform = "translateX(-50%)";
    };

    positionBubble("jasmine-world-bubble", jasmine, 40);
    positionBubble("seth-world-bubble", boyfriend, 40);
    positionBubble("bobby-world-bubble", bobby, 35);
    positionBubble("chippoy-world-bubble", chippoy, 35);
}

// --- SCENT VISUALIZATION ---
let scentTrailActive = false;
let lastTrailSpawn = 0;
let visualScentTrail = []; // Array for canvas particles

function drawScentTrail() {
    if (!scentTrailActive || visualScentTrail.length === 0) return;

    // Draw paw prints on Canvas
    ctx.save();
    for (const pawn of visualScentTrail) {
        // Convert world to screen
        const screenX = (pawn.x - camera.x) * currentZoom;
        const screenY = (pawn.y - camera.y) * currentZoom;

        // Skip if off screen
        if (screenX < -50 || screenX > canvas.width + 50 || screenY < -50 || screenY > canvas.height + 50) continue;

        ctx.translate(screenX, screenY);
        ctx.rotate((pawn.angle + 90) * Math.PI / 180);
        ctx.globalAlpha = pawn.opacity;

        // Draw a simple paw print shape
        ctx.fillStyle = "#fca044";
        // Pad
        ctx.beginPath();
        ctx.ellipse(0, 5, 6 * currentZoom, 5 * currentZoom, 0, 0, Math.PI * 2);
        ctx.fill();
        // Toes
        ctx.beginPath();
        ctx.arc(-6 * currentZoom, -3 * currentZoom, 2.5 * currentZoom, 0, Math.PI * 2);
        ctx.arc(0, -7 * currentZoom, 2.5 * currentZoom, 0, Math.PI * 2);
        ctx.arc(6 * currentZoom, -3 * currentZoom, 2.5 * currentZoom, 0, Math.PI * 2);
        ctx.fill();

        ctx.rotate(-(pawn.angle + 90) * Math.PI / 180);
        ctx.translate(-screenX, -screenY);
    }
    ctx.restore();
}

function triggerScentSharing() {
    // 1. Visual Flow from Guard Dog to Chippoy
    const startX = guardDog.x;
    const startY = guardDog.y;
    const endX = chippoy.x;
    const endY = chippoy.y;

    // Play sniff sound
    try { audioManager.playTypewriter(); } catch (e) { }

    // Spawn transfer particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const p = document.createElement("div");
            p.className = "scent-particle";
            // Randomize start slightly
            const sx = startX - camera.x * currentZoom + (Math.random() * 40 - 20);
            const sy = startY - camera.y * currentZoom + (Math.random() * 40 - 20);
            p.style.left = sx + "px";
            p.style.top = sy + "px";

            // Animation target
            const ex = (chippoy.x - camera.x) * currentZoom;
            const ey = (chippoy.y - camera.y) * currentZoom;

            p.style.left = ex + (Math.random() * 60 - 30) + "px";
            p.style.top = ey + (Math.random() * 60 - 30) + "px";
            p.style.animation = "float-transfer 1s ease-out forwards";

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1000);
        }, i * 100);
    }

    // Popup
    setTimeout(() => {
        const popup = document.createElement("div");
        popup.className = "scent-popup";
        popup.innerText = "Scent Acquired!";
        popup.style.left = "50%";
        popup.style.top = "50%";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);

        try { audioManager.playSound('powerup'); } catch (e) { }
        scentTrailActive = true;
    }, 2000);
}

function updateScentTrail() {
    if (!scentTrailActive) return;
    if (currentScene !== "zootopia" && currentScene !== "meowdom") return;
    if (currentScene === "zootopia" && zootopiaQuestState > 3) { scentTrailActive = false; visualScentTrail = []; return; }

    if (Date.now() - lastTrailSpawn > 600) {
        lastTrailSpawn = Date.now();

        // Target: Wife in Zootopia, Bobby in Meowdom
        const target = (currentScene === "zootopia") ? wife : bobby;
        const dx = target.x - chippoy.x;
        const dy = target.y - chippoy.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        visualScentTrail.push({
            x: chippoy.x,
            y: chippoy.y,
            angle: angle,
            spawnTime: Date.now(),
            opacity: 1,
            moveX: Math.cos(angle * Math.PI / 180) * 1.5, // Move speed
            moveY: Math.sin(angle * Math.PI / 180) * 1.5
        });
    }

    // Update particles
    for (let i = visualScentTrail.length - 1; i >= 0; i--) {
        const p = visualScentTrail[i];
        const age = Date.now() - p.spawnTime;

        // Move towards target
        p.x += p.moveX * 6; // Wind speed
        p.y += p.moveY * 6;

        // Fade out
        if (age > 1000 && age < 2000) {
            p.opacity = 1 - ((age - 1000) / 1000);
        } else if (age >= 2000) {
            visualScentTrail.splice(i, 1);
            continue;
        }
    }
}

// Initialize audio system
try {
    audioManager.init();
    console.log('Audio system initialized');
} catch (e) {
    console.log('Audio system not available:', e);
}

setTimeout(init, 100);
requestAnimationFrame(gameLoop);


