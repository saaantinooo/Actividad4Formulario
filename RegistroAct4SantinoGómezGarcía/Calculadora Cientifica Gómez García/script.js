// Modo oscuro/claro
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Recuperar modo guardado
window.onload = () => {
  if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark-mode');
  }
};

// Sonido de clic
const playSound = () => {
  const sound = document.getElementById('clickSound');
  sound.currentTime = 0;
  sound.play();
};

// Música de fondo
const music = document.getElementById('bgMusic');
document.getElementById('toggleMusic').addEventListener('click', () => {
  if (music.paused) music.play(); else music.pause();
});

document.getElementById('volumeControl').addEventListener('input', (e) => {
  music.volume = e.target.value;
});

// Calculadora
let display = document.getElementById('display');
function appendValue(val) {
  playSound();
  if (display.innerText === '0') display.innerText = val;
  else display.innerText += val;
}
function clearDisplay() {
  playSound();
  display.innerText = '0';
}
function calculate() {
  try {
    let result = eval(display.innerText);
    saveHistory(display.innerText + ' = ' + result);
    display.innerText = result;
  } catch (e) {
    display.innerText = 'Error';
  }
}

// Historial en localStorage
function saveHistory(op) {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.push(op);
  localStorage.setItem('history', JSON.stringify(history));
}
function showHistory() {
  let historyDiv = document.getElementById('history');
  let history = JSON.parse(localStorage.getItem('history')) || [];
  historyDiv.innerHTML = '<strong>Últimas operaciones:</strong><br>' + history.slice(-5).join('<br>');
}
