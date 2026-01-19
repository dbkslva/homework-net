/**
 * Рекламный баннер с изображением или видео
 */
function Banner({ img, text }) {
  return (
    <div className="banner">
      <img src={img} alt="banner" />
      <span>{text}</span>
    </div>
  );
}
