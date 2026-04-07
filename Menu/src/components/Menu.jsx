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
          end={href === "/"}
          className={({ isActive }) =>
            isActive ? "menu__item menu__item-active" : "menu__item"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
