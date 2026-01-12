import React from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

export default function ColorModeToggle() {
  const isBrowser = useIsBrowser();
  const { colorMode, setColorMode } = useColorMode();

  const handleToggle = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  if (!isBrowser) {
    return null;
  }

  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id="theme-toggle"
        className={styles.toggleCheckbox}
        checked={colorMode === "dark"}
        onChange={handleToggle}
        aria-label="Toggle between light and dark mode"
      />
      <label htmlFor="theme-toggle" className={styles.toggleLabel}>
        <span className={styles.toggleButton} />
      </label>
    </div>
  );
}
