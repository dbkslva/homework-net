import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="movie-app">
      <header className="movie-app__header">
        <h1 className="movie-app__title">Поиск фильмов IMDb</h1>
        <nav className="movie-app__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `movie-app__link ${isActive ? "movie-app__link--active" : ""}`
            }
            end
          >
            Поиск
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `movie-app__link ${isActive ? "movie-app__link--active" : ""}`
            }
          >
            Избранное
          </NavLink>
        </nav>
      </header>
      <main className="movie-app__main">
        <Outlet />
      </main>
    </div>
  );
}
