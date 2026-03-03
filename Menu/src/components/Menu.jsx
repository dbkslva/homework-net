import { NavLink } from "react-router-dom";

const menuItems = [
  { href: "/", label: "Главная" },
  { href: "/drift", label: "Дрифт-такси" },
  { href: "/timeattack", label: "Time Attack" },
  { href: "/forza", label: "Forza Karting" },
];

export default function Menu() {
  return (
    <nav className="menu">
      {menuItems.map(({ href, label }) => (
        <NavLink
          key={href}
          to={href}
          className="menu__item"
          activeClassName="menu__item-active"
          exact={href === "/"}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
