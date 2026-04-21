import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { MENU_SECTIONS } from '../../config/menus';
import type { MenuItem } from '../../config/menus';
import type { ReactElement } from 'react';

export default function Sidebar(): ReactElement {
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useAuth();
  const { language } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Determine active section based on current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/course') || path.startsWith('/instructor')) return 'course';
    if (path.startsWith('/learner')) return 'learn';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/gallery') || path.startsWith('/resources') || path.startsWith('/notices') || path.startsWith('/freeboard')) return 'community';
    return 'about';
  };

  const activeSection = getActiveSection();
  const currentSection = MENU_SECTIONS.find(s => s.id === activeSection);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const isItemActive = (path: string) => {
    if (path.includes('#')) return location.pathname + location.hash === path;
    return location.pathname === path;
  };

  const shouldShowItem = (item: MenuItem): boolean => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.authOnly && !isLoggedIn) return false;
    return true;
  };

  const getLabel = (item: MenuItem | { label: string; labelEn: string }) => {
    return language === 'en' ? item.labelEn : item.label;
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    if (!shouldShowItem(item)) return null;

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path) ||
      (hasChildren && item.children!.some(c => isItemActive(c.path)));
    const active = isItemActive(item.path);

    return (
      <li key={item.path} className={`sidebar-item depth-${depth}`}>
        {hasChildren ? (
          <>
            <button
              className={`sidebar-link has-children ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.path)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{getLabel(item)}</span>
              <i className="fas fa-chevron-right sidebar-arrow"></i>
            </button>
            {isExpanded && (
              <ul className="sidebar-submenu">
                {item.children!.map(child => renderMenuItem(child, depth + 1))}
              </ul>
            )}
          </>
        ) : (
          <Link
            to={item.path}
            className={`sidebar-link ${active ? 'active' : ''}`}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{getLabel(item)}</span>
          </Link>
        )}
      </li>
    );
  };

  if (!currentSection) return <aside className="sidebar" />;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <i className={`fas ${currentSection.icon}`}></i>
        <span>{getLabel(currentSection)}</span>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {currentSection.items.map(item => renderMenuItem(item))}
        </ul>
      </nav>
      {!isLoggedIn && activeSection === 'learn' && (
        <div className="sidebar-login-notice">
          <i className="fas fa-lock"></i>
          <p>로그인 후 이용 가능합니다</p>
          <Link to="/login" className="btn btn-primary btn-sm">로그인</Link>
        </div>
      )}
    </aside>
  );
}
