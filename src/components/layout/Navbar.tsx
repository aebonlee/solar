import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import type { ReactElement } from 'react';

export default function Navbar(): ReactElement {
  const { isLoggedIn, isAdmin, signOut } = useAuth();
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [instructorOpen, setInstructorOpen] = useState(false);
  const [learnerOpen, setLearnerOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setInstructorOpen(false);
    setLearnerOpen(false);
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

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

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
          <Link to="/" className={`navbar-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
            {t('nav.home')}
          </Link>
          <Link to="/course-intro" className={`navbar-link ${isActive('/course-intro') ? 'active' : ''}`}>
            {t('nav.course')}
          </Link>

          {/* 교강사용 Dropdown */}
          {isAdmin && (
            <div className={`navbar-dropdown ${instructorOpen ? 'is-open' : ''}`}>
              <button
                className={`navbar-link dropdown-trigger ${location.pathname.startsWith('/instructor') ? 'active' : ''}`}
                onClick={() => setInstructorOpen(!instructorOpen)}
              >
                {t('nav.instructor')} <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-menu">
                <Link to="/instructor/dashboard" className="dropdown-item">{t('instructor.dashboard')}</Link>
                <Link to="/instructor/teaching-guide" className="dropdown-item">{t('instructor.guide')}</Link>
                <Link to="/instructor/lesson-plans" className="dropdown-item">{t('instructor.lessons')}</Link>
                <Link to="/instructor/lab-materials" className="dropdown-item">{t('instructor.labs')}</Link>
                <Link to="/instructor/projects" className="dropdown-item">{t('instructor.projects')}</Link>
                <Link to="/instructor/evaluation" className="dropdown-item">{t('instructor.evaluation')}</Link>
              </div>
            </div>
          )}

          {/* 학습자용 Dropdown */}
          {isLoggedIn && (
            <div className={`navbar-dropdown ${learnerOpen ? 'is-open' : ''}`}>
              <button
                className={`navbar-link dropdown-trigger ${location.pathname.startsWith('/learner') ? 'active' : ''}`}
                onClick={() => setLearnerOpen(!learnerOpen)}
              >
                {t('nav.learner')} <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-menu">
                <Link to="/learner/dashboard" className="dropdown-item">{t('learner.dashboard')}</Link>
                <Link to="/learner/roadmap" className="dropdown-item">{t('learner.roadmap')}</Link>
                <Link to="/learner/lessons" className="dropdown-item">{t('learner.lessons')}</Link>
                <Link to="/learner/labs" className="dropdown-item">{t('learner.labs')}</Link>
                <Link to="/learner/projects" className="dropdown-item">{t('learner.projects')}</Link>
                <Link to="/learner/resources" className="dropdown-item">{t('learner.resources')}</Link>
                <Link to="/learner/submissions" className="dropdown-item">{t('learner.submissions')}</Link>
                <Link to="/learner/portfolio" className="dropdown-item">{t('learner.portfolio')}</Link>
              </div>
            </div>
          )}

          <Link to="/gallery" className={`navbar-link ${isActive('/gallery') ? 'active' : ''}`}>
            {t('nav.gallery')}
          </Link>
          <Link to="/resources" className={`navbar-link ${isActive('/resources') ? 'active' : ''}`}>
            {t('nav.resources')}
          </Link>
          <Link to="/notices" className={`navbar-link ${isActive('/notices') ? 'active' : ''}`}>
            {t('nav.notices')}
          </Link>

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
