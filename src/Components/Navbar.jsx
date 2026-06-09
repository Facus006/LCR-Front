import { useState, useRef, useEffect } from "react";
import styles from "../css/Navbar.module.css";
import { tokenDecode, isLoggedIn, logout, isAdminLoggedIn } from "../Service/UserService";

export default function CustomNavbar() {
  const [consulta, setConsulta] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const profileRef = useRef(null);
  const catsRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (catsRef.current && !catsRef.current.contains(e.target))
        setCatsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConsultaChange = (event) => {
    setConsulta(event.target.value);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    window.location.href = `/buscar/${consulta}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const user = isLoggedIn() ? tokenDecode() : null;

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>

          {/* Logo */}
          <a href="/" className={styles.logo}>
            <span className={styles.logoAccent}>LCR</span>
            <span className={styles.logoSub}>MODS</span>
          </a>

          {/* Desktop links */}
          <div className={styles.links}>

            {/* Categorías dropdown */}
            <div className={styles.dropWrap} ref={catsRef}>
              <button
                className={styles.navBtn}
                onClick={() => setCatsOpen((v) => !v)}
              >
                Categorías
                <svg className={`${styles.chevron} ${catsOpen ? styles.chevronOpen : ""}`} viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {catsOpen && (
                <div className={styles.dropdown}>
                  <a href="/categoria/RFACTOR" className={styles.dropItem}>
                    <span className={styles.dropTag}>01</span> rFactor
                  </a>
                  <a href="/categoria/ASSETTOCORSA" className={styles.dropItem}>
                    <span className={styles.dropTag}>02</span> Assetto Corsa
                  </a>
                  <a href="/categoria/PISTAS" className={styles.dropItem}>
                    <span className={styles.dropTag}>03</span> Pistas
                  </a>
                  <a href="/categoria/AUTOS" className={styles.dropItem}>
                    <span className={styles.dropTag}>04</span> Mods Varios
                  </a>
                </div>
              )}
            </div>

            {/* Admin links */}
            {isAdminLoggedIn(token) && (
              <>
                <a href="/subirpublicacion" className={styles.navLink}>Ingresar Mod</a>
                <a href="/listarPublicaciones" className={styles.navLink}>Destacar</a>
              </>
            )}

            {/* Auth links */}
            {!isLoggedIn() && (
              <>
                <a href="/register" className={styles.navLink}>Registrate</a>
                <a href="/login" className={styles.navLinkPrimary}>Login</a>
              </>
            )}
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <input
              type="search"
              placeholder="Buscar mod..."
              value={consulta}
              onChange={handleConsultaChange}
              className={styles.searchInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className={styles.searchBtn} onClick={handleSearch} aria-label="Buscar">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Profile */}
          {isLoggedIn() && (
            <div className={styles.profileWrap} ref={profileRef}>
              <button
                className={styles.profileBtn}
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Perfil"
              >
                <span className={styles.profileAvatar}>
                  {user?.userNombre?.[0]?.toUpperCase() ?? "U"}
                </span>
              </button>
              {profileOpen && (
                <div className={styles.profilePanel}>
                  <div className={styles.profileHeader}>
                    <div className={styles.profileAvatarLg}>
                      {user?.userNombre?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div>
                      <p className={styles.profileName}>{user?.userNombre}</p>
                      <span className={styles.profileRole}>{user?.userRol}</span>
                    </div>
                  </div>
                  <div className={styles.profileDivider}/>
                  <p className={styles.profileEmail}>{user?.sub}</p>
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`}/>
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`}/>
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`}/>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          <div className={styles.mobileSearch}>
            <input
              type="search"
              placeholder="Buscar mod..."
              value={consulta}
              onChange={handleConsultaChange}
              className={styles.searchInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className={styles.searchBtn} onClick={handleSearch} aria-label="Buscar">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <p className={styles.mobileSection}>Categorías</p>
          <a href="/categoria/RFACTOR" className={styles.mobileLink}>rFactor</a>
          <a href="/categoria/ASSETTOCORSA" className={styles.mobileLink}>Assetto Corsa</a>
          <a href="/categoria/PISTAS" className={styles.mobileLink}>Pistas</a>
          <a href="/categoria/AUTOS" className={styles.mobileLink}>Mods Varios</a>

          {isAdminLoggedIn(token) && (
            <>
              <p className={styles.mobileSection}>Admin</p>
              <a href="/subirpublicacion" className={styles.mobileLink}>Ingresar Mod</a>
              <a href="/listarPublicaciones" className={styles.mobileLink}>Destacar</a>
            </>
          )}

          {!isLoggedIn() ? (
            <>
              <p className={styles.mobileSection}>Cuenta</p>
              <a href="/register" className={styles.mobileLink}>Registrate</a>
              <a href="/login" className={styles.mobileLinkPrimary}>Login</a>
            </>
          ) : (
            <>
              <p className={styles.mobileSection}>Perfil</p>
              <span className={styles.mobileLink}>{user?.sub}</span>
              <button className={styles.mobileLogout} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
      {/* Spacer so content doesn't go under la fixed nav */}
      <div className={styles.navSpacer}/>
    </>
  );
}
