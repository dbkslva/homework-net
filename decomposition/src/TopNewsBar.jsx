/**
 * Отображает список горячих новостей, дату и финансовую информацию
 */
function TopNewsBar({ news, date, finance }) {
  return (
    <div className="top-news-bar">
      <div>
        {news.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div>{date}</div>
      <div>{finance}</div>
    </div>
  );
}
