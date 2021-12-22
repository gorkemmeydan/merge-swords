import React from "react";
import Typed from "react-typed";

import styles from "./welcome-text.module.css";

const WelcomeText = () => {
  return (
    <div className={styles.welcomeTextContainer}>
      <p className={`${styles.welcomeText} ${styles.gradientText}`}>⚔️ Merge Swords ⚔️</p>

      <div className={styles.subText}>
        Each
        <span> </span> 
        <Typed 
          strings={["unique.", "beautiful.", "yours."]}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
      </div>
      <div className={styles.subText}>
        Discover your NFT today.
      </div>
    </div>
  );
}

export default WelcomeText;