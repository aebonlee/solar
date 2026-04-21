import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { MENU_SECTIONS } from '../../config/menus';
import type { ReactElement } from 'react';

export default function Navbar(): ReactElement {
  const { isLoggedIn, isAdmin, signOut } = useAuth();
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setColorOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getActiveSection = () => {
    const path = location.pathname;
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/course') || path.startsWith('/instructor')) return 'course';
    if (path.startsWith('/learner')) return 'learn';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/gallery') || path.startsWith('/resources') || path.startsWith('/notices') || path.startsWith('/freeboard')) return 'community';
    return '';
  };

  const activeSection = getActiveSection();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-solar-panel"></i>
          <span>Solar AI Studio</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`navbar-menu ${mobileOpen ? 'is-open' : ''}`}>
          {MENU_SECTIONS.map(section => (
            <Link
              key={section.id}
              to={section.path}
              className={`navbar-link ${activeSection === section.id ? 'active' : ''}`}
            >
              <i className={`fas ${section.icon} navbar-link-icon`}></i>
              {language === 'en' ? section.labelEn : section.label}
            </Link>
          ))}

          <div className="navbar-actions">
            {isAdmin && (
              <Link to="/admin" className="navbar-link navbar-admin" title={t('nav.admin')}>
                <i className="fas fa-shield-halved"></i>
              </Link>
            )}

            <button className="navbar-icon-btn" onClick={toggleTheme} title="Toggle theme">
              <i className={`fas ${mode === 'auto' ? 'fa-circle-half-stroke' : mode === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            <div className="color-picker-wrapper" ref={colorRef}>
              <button className="navbar-icon-btn" onClick={() => setColorOpen(!colorOpen)} title="Color theme">
                <i className="fas fa-palette"></i>
              </button>
              {colorOpen && (
                <div className="color-picker-dropdown">
                  {COLOR_OPTIONS.map(opt => (
                    <button
                      key={opt.name}
                      className={`color-dot ${colorTheme === opt.name ? 'active' : ''}`}
                      style={{ background: opt.color }}
                      onClick={() => { setColorTheme(opt.name); setColorOpen(false); }}
                      title={opt.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <button className="navbar-icon-btn" onClick={toggleLanguage} title="Language">
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {isLoggedIn ? (
              <>
                <Link to="/mypage" className="navbar-link">{t('nav.mypage')}</Link>
                <button className="navbar-btn-logout" onClick={handleSignOut}>{t('nav.logout')}</button>
              </>
            ) : (
              <Link to="/login" className="navbar-btn-login">{t('nav.login')}</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
