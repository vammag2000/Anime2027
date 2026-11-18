const video = document.getElementById('character');

// Ваши видеофайлы (все в одной папке с index.html)
const STATES = {
  idle: 'idle.webm',   // бездействие — зациклено
  pet:  'pet.webm',    // глажка — один раз, потом обратно в idle
  hit:  'hit.webm'     // удар — один раз, потом обратно в idle
};

let currentState = 'idle';

// Предзагрузка всех видео, чтобы переключение было мгновенным
const cache = {};
for (const [key, src] of Object.entries(STATES)) {
  const v = document.createElement('video');
  v.src = src;
  v.preload = 'auto';
  v.muted = true;
  v.playsInline = true;
  cache[key] = v;
}

function setState(name) {
  if (currentState === name) return;
  currentState = name;
  video.src = STATES[name];
  video.loop = (name === 'idle'); // только idle зацикливаем
  video.play().catch(err => {
    // На Android иногда нужен явный жест — ждём следующего тапа
    console.log('autoplay blocked:', err);
  });
}

// Когда разовая анимация (глажка/удар) доиграла — возвращаемся в idle
video.addEventListener('ended', () => {
  if (currentState !== 'idle') setState('idle');
});

// Стартуем
setState('idle');

// ====== Обработка касаний ======
let start = null;

video.addEventListener('pointerdown', (e) => {
  start = { x: e.clientX, y: e.clientY, t: Date.now() };
});

video.addEventListener('pointerup', (e) => {
  if (!start) return;
  const dx = e.clientX - start.x;
  const dy = e.clientY - start.y;
  const dist = Math.hypot(dx, dy);
  const dt = Date.now() - start.t;
  start = null;

  if (dist < 25 && dt < 350) {
    setState('pet');   // лёгкий тап = гладим
  } else if (dist > 60) {
    setState('hit');   // свайп = бьём
  }
});
