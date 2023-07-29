import React from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import weatherSunny24Regular from "@iconify/icons-fluent/weather-sunny-24-regular";
import weatherMoon24Regular from "@iconify/icons-fluent/weather-moon-24-regular";
import style from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="nav-item">
      <div className="tooltip">
        <button
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          className={style.toggle__button}
        >
          <Icon
            icon={
              theme === "light" ? weatherMoon24Regular : weatherSunny24Regular
            }
            color="var(--icon-color)"
            height={28}
            width={28}
          />
          {theme === "light" ? <span>Dark mode</span> : <span>Light mode</span>}
        </button>
      </div>
    </div>
  );
}
