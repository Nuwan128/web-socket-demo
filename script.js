
const gameStateStrings = {
    0: 'Accepting Bets',
    1: 'Game In Progress',
    2: 'Round Ended',
};
const submarineStatusElement = document.getElementById('submarineStatus');
const submarineMultiplierElement = document.getElementById('submarineMultiplier');
const startSubmarineGameButton = document.getElementById('startSubmarineGame');

const balloonStatusElement = document.getElementById('balloonStatus');
const balloonMultiplierElement = document.getElementById('balloonMultiplier');
const startBalloonGameButton = document.getElementById('startBalloonGame');

const wsSubmarine = new WebSocket('wss://localhost:7122/ws/submarine');
const wsBalloon = new WebSocket('wss://localhost:7122/ws/balloon');

wsSubmarine.onmessage = (event) => {
    const message = JSON.parse(event.data);
    submarineStatusElement.textContent = `Status: ${gameStateStrings[message.state]}`;
    submarineMultiplierElement.textContent = `Multiplier: ${message.multiplier}`;
};

wsBalloon.onmessage = (event) => {
    const message = JSON.parse(event.data);
    balloonStatusElement.textContent = `Status: ${gameStateStrings[message.state]}`;
    balloonMultiplierElement.textContent = `Multiplier: ${message.multiplier}`;
};

startSubmarineGameButton.addEventListener('click', () => {
    fetch('https://localhost:7122/CrashGame/Start?gameType=submarine')
        .then(response => response.ok ? console.log('Submarine Game started') : console.error('Failed to start Submarine Game'))
        .catch(error => console.error('Error:', error));
});

startBalloonGameButton.addEventListener('click', () => {
    fetch('https://localhost:7122/CrashGame/Start?gameType=balloon')
        .then(response => response.ok ? console.log('Balloon Game started') : console.error('Failed to start Balloon Game'))
        .catch(error => console.error('Error:', error));
});
