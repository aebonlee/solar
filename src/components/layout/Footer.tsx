import { useLanguage } from '../../contexts/LanguageContext';
import type { ReactElement } from 'react';

const FAMILY_SITES = [
  { name: 'DreamIT Biz', url: 'https://www.dreamitbiz.com' },
  { name: 'AI Hub', url: 'https://ai-hub.dreamitbiz.com' },
  { name: 'Edu Hub', url: 'https://edu-hub.dreamitbiz.com' },
  { name: 'CS Hub', url: 'https://cs-hub.dreamitbiz.com' },
  { name: 'Coding', url: 'https://coding.dreamitbiz.com' },
];

export default function Footer(): ReactElement {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <i className="fas fa-solar-panel"></i>
          <span>Solar AI Learning Studio</span>
        </div>

        <div className="footer-links">
          <h4>Family Sites</h4>
          <ul>
            {FAMILY_SITES.map(site => (
              <li key={site.url}>
                <a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p><i className="fas fa-envelope"></i> aebon@dreamitbiz.com</p>
          <p><i className="fas fa-globe"></i> solar.dreamitbiz.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
