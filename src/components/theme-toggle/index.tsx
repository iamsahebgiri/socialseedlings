import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import weatherSunny24Regular from "@iconify/icons-fluent/weather-sunny-24-regular";
import weatherMoon24Regular from "@iconify/icons-fluent/weather-moon-24-regular";
import style from "./theme-toggle.module.css";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="nav-item">
      <div className="tooltip">
        <button
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
          className={style.toggle__button}
        >
          <Icon
            icon={
              theme === "dark" ? weatherSunny24Regular : weatherMoon24Regular
            }
            color="var(--icon-color)"
            height={28}
            width={28}
          />
          {theme === "dark" ? <span>Light mode</span> : <span>Dark mode</span>}
        </button>
      </div>
    </div>
  );
}
