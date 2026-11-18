const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Подгоняем размер холста под экран телефона
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Вызываем сразу при запуске

// 2. Переменные для будущих анимаций
let currentState = 'idle'; // 'idle', 'pet', 'hit'
let pointer = { x: 0, y: 0, isDown: false };

// 3. Обработка касаний (Pointer Events работают и на телефоне, и на ПК)
canvas.addEventListener('pointerdown', (e) => {
  pointer.isDown = true;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  console.log('Касание:', pointer.x, pointer.y); // Пока просто выводим в консоль
});

canvas.addEventListener('pointermove', (e) => {
  if (pointer.isDown) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }
});

canvas.addEventListener('pointerup', () => {
  pointer.isDown = false;
});

// 4. Игровой цикл (пока только очищает экран)
function gameLoop() {
  // Очищаем холст (фон будет из CSS, но холст прозрачный)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // ЗДЕСЬ БУДЕТ КОД ОТРИСОВКИ ПЕРСОНАЖА И АНИМАЦИЙ
  
  requestAnimationFrame(gameLoop); // Бесконечный цикл
}
gameLoop();