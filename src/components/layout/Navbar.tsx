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
  const [courseOpen, setCourseOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setCourseOpen(false);
    setCommunityOpen(false);
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
          {/* About */}
          <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`}>
            {t('nav.about')}
          </Link>

          {/* 과정소개 Dropdown (교강사용 + 학습자용) */}
          <div className={`navbar-dropdown ${courseOpen ? 'is-open' : ''}`}>
            <button
              className={`navbar-link dropdown-trigger ${location.pathname.startsWith('/instructor') || location.pathname.startsWith('/learner') || isActive('/course-intro') ? 'active' : ''}`}
              onClick={() => setCourseOpen(!courseOpen)}
            >
              {t('nav.course')} <i className="fas fa-chevron-down"></i>
            </button>
            <div className="dropdown-menu">
              {isAdmin && (
                <>
                  <div className="dropdown-divider-label">{t('course.instructor')}</div>
                  <Link to="/instructor/dashboard" className="dropdown-item">{t('instructor.dashboard')}</Link>
                  <Link to="/instructor/teaching-guide" className="dropdown-item">{t('instructor.guide')}</Link>
                  <Link to="/instructor/lesson-plans" className="dropdown-item">{t('instructor.lessons')}</Link>
                  <Link to="/instructor/lab-materials" className="dropdown-item">{t('instructor.labs')}</Link>
                  <Link to="/instructor/projects" className="dropdown-item">{t('instructor.projects')}</Link>
                  <Link to="/instructor/evaluation" className="dropdown-item">{t('instructor.evaluation')}</Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div className="dropdown-divider-label">{t('course.learner')}</div>
                  <Link to="/learner/dashboard" className="dropdown-item">{t('learner.dashboard')}</Link>
                  <Link to="/learner/roadmap" className="dropdown-item">{t('learner.roadmap')}</Link>
                  <Link to="/learner/lessons" className="dropdown-item">{t('learner.lessons')}</Link>
                  <Link to="/learner/labs" className="dropdown-item">{t('learner.labs')}</Link>
                  <Link to="/learner/projects" className="dropdown-item">{t('learner.projects')}</Link>
                  <Link to="/learner/resources" className="dropdown-item">{t('learner.resources')}</Link>
                  <Link to="/learner/submissions" className="dropdown-item">{t('learner.submissions')}</Link>
                  <Link to="/learner/portfolio" className="dropdown-item">{t('learner.portfolio')}</Link>
                </>
              )}
              {!isLoggedIn && (
                <Link to="/login" className="dropdown-item" style={{ color: 'var(--text-muted)' }}>
                  <i className="fas fa-lock"></i> 로그인 후 이용 가능
                </Link>
              )}
            </div>
          </div>

          {/* 프로젝트 */}
          <Link to="/projects" className={`navbar-link ${isActive('/projects') ? 'active' : ''}`}>
            {t('nav.projects')}
          </Link>

          {/* 커뮤니티 Dropdown */}
          <div className={`navbar-dropdown ${communityOpen ? 'is-open' : ''}`}>
            <button
              className={`navbar-link dropdown-trigger ${isActive('/gallery') || isActive('/resources') || isActive('/notices') || isActive('/freeboard') ? 'active' : ''}`}
              onClick={() => setCommunityOpen(!communityOpen)}
            >
              {t('nav.community')} <i className="fas fa-chevron-down"></i>
            </button>
            <div className="dropdown-menu">
              <Link to="/gallery" className="dropdown-item">{t('community.gallery')}</Link>
              <Link to="/resources" className="dropdown-item">{t('community.resources')}</Link>
              <Link to="/notices" className="dropdown-item">{t('community.notices')}</Link>
              <Link to="/freeboard" className="dropdown-item">{t('community.freeboard')}</Link>
            </div>
          </div>

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
