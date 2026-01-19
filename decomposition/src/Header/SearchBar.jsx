/**
 * Шапка сайта с логотипом, навигацией и поиском
 */
function Header() {
  return (
    <header>
      <h1>Яндекс</h1>
      <nav>
        <a href="#">Видео</a>
        <a href="#">Картинки</a>
        <a href="#">Новости</a>
        <a href="#">Карты</a>
        {/* остальные ссылки */}
      </nav>
      <SearchBar placeholder="Найдётся всё" />
    </header>
  );
}
/**
 * Поле поиска с кнопкой
 */
function SearchBar({ placeholder }) {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} />
      <button>Найти</button>
    </div>
  );
}
