import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./marketplace-header.module.css";

const MarketplaceHeader = () => {
  const [activePath, setActivePath] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/game/marketplace":
        setActivePath(1);
        break;
      case "/game/marketplace/history":
        setActivePath(2);
        break;
      case "/game/marketplace/listed":
        setActivePath(3);
        break;
      case "/game/marketplace/new":
        setActivePath(4);
        break;
      default:
        setActivePath(0);
    }
  }, [location]);

  return (
    <div className={styles.marketplaceHeader}>
      <div className={`${styles.marketplaceLinkWrapper} ${activePath === 1 ? styles.active : ""}`}>
        <Link to={"/game/marketplace"}>Marketplace</Link>
      </div>
      <div className={`${styles.marketplaceLinkWrapper} ${activePath === 2 ? styles.active : ""}`}>
        <Link to={"/game/marketplace/history"}>Purchase History</Link>
      </div>
      <div className={`${styles.marketplaceLinkWrapper} ${activePath === 3 ? styles.active : ""}`}>
        <Link to={"/game/marketplace/listed"}>Your Listed Items</Link>
      </div>
      <div className={`${styles.marketplaceLinkWrapper} ${activePath === 4 ? styles.active : ""}`}>
        <Link to={"/game/marketplace/new"}>Create New Sale</Link>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
