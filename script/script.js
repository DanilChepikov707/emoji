import { data } from "./emoji.js";

const cards = document.querySelector(".cards");
const findEmoji = document.querySelector(".header_input");

// Функция для удаления дублирующихся ключевых слов в строке
function removeDublicateKeywords(keywords) {
  // Разбиваем строку на массив слов по пробелу
  let arrKeywords = keywords.split(" ");
  
  // Используем Set для удаления дубликатов, затем собираем обратно в строку
  let removeDublicateArrKeywords = [...new Set(arrKeywords)].join(" ");
  
  // Возвращаем результат
  return removeDublicateArrKeywords;
}

// Функция для отображения карточек на странице
function renderCard(arr) {
  // Очищаем контейнер с карточками перед отрисовкой новых
  cards.innerHTML = "";

  // Перебираем массив объектов и создаём карточки
  arr.forEach((el) => {
    // Удаляем дубликаты в ключевых словах текущего элемента
    const formatKeywords = removeDublicateKeywords(el.keywords);

    // Создаём div-элемент карточки
    const card = document.createElement("div");

    // Добавляем класс карточке для стилизации
    card.classList.add("card");

    // Добавляем HTML-разметку в карточку с содержимым элемента
    card.innerHTML = `<p class="card__emoji">${el.symbol}</p>
      <p class="card__title">${el.title}</p>
      <p class="card__keywords">${formatKeywords}</p>`;

    // Добавляем карточку в контейнер
    cards.append(card);
  });
}

// Первый вызов — отрисовываем все карточки при загрузке страницы
renderCard(data);

// Назначаем обработчик события на поле ввода
findEmoji.addEventListener("input", () => searchEmoji(data));


function searchEmoji(arr) {
  // Получаем значение из поля ввода, приводим к нижнему регистру и убираем пробелы
  let wordTitle = findEmoji.value.toLowerCase().trim();

  // Если поле пустое — показываем все карточки и прекращаем выполнение функции
  if (wordTitle === "") {
    renderCard(arr);
    return;
  }

  // Фильтруем массив: оставляем только те элементы, в которых
  // заголовок или ключевые слова содержат введённый текст
  let filtered = arr.filter(
    (el) =>
      el.title.toLowerCase().includes(wordTitle) || // проверка заголовка
      el.keywords.toLowerCase().includes(wordTitle) // проверка ключевых слов
  );

  // Отображаем только отфильтрованные карточки
  renderCard(filtered);
}



//1. Должны вызывать функцию-обработчик, при любом изменении значения в инпуте.
//2. В соответствии с этим значеним, должна происходить фильтрация массива с эмодзи
//3. Отфильтрованный массив должен выводиться в вёрстке. */
