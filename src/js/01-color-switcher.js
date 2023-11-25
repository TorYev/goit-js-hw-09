function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let colorChangeInterval = null;

  stopButton.disabled = true; // Деактивировация кнопки Stop при загрузке страницы

  startButton.addEventListener('click', function () {
    this.disabled = true; // Деактивировать кнопку Start
    stopButton.disabled = false; // Активировать кнопку Stop
    colorChangeInterval = setInterval(function () {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener('click', function () {
    clearInterval(colorChangeInterval); // Остановить изменение цвета
    this.disabled = true; // Деактивировать кнопку Stop
    startButton.disabled = false; // Активировать кнопку Start
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const buttonsContainer = document.createElement('div'); // Создаем контейнер для кнопок

  // Стили для контейнера кнопок
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center', // Центрирование содержимого по горизонтали
    alignItems: 'center', // Центрирование содержимого по вертикали
    height: '100vh', // Высота вьюпорта, чтобы центрировать по вертикали на всей странице
  };

  // Применение стилей к контейнеру
  Object.assign(buttonsContainer.style, containerStyles);

  // Стили для кнопок
  const buttonStyles = {
    padding: '20px 40px',
    fontSize: '1rem',
    color: '#000',
    border: '1px solid #000',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
    margin: '10px',
    transition: 'transform 0.2s',
  };

  // Функция для применения стилей к кнопке
  function applyStyles(button, styles) {
    Object.assign(button.style, styles);
  }

  // Применение стилей к кнопкам
  applyStyles(startButton, buttonStyles);
  applyStyles(stopButton, buttonStyles);

  // Добавление кнопок в контейнер
  buttonsContainer.appendChild(startButton);
  buttonsContainer.appendChild(stopButton);

  // Добавление контейнера кнопок на страницу
  document.body.appendChild(buttonsContainer);
});
