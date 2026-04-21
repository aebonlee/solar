export interface MenuItem {
  label: string;
  labelEn: string;
  path: string;
  icon: string;
  children?: MenuItem[];
  adminOnly?: boolean;
  authOnly?: boolean;
}

export interface MenuSection {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  path: string;
  items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'about',
    label: 'About',
    labelEn: 'About',
    icon: 'fa-sun',
    path: '/about',
    items: [
      { label: 'Solar LLM 소개', labelEn: 'Solar LLM', path: '/about', icon: 'fa-solar-panel' },
      { label: '주요 기능', labelEn: 'Key Features', path: '/about#features', icon: 'fa-rocket' },
      { label: '교육 과정 소개', labelEn: 'Course Overview', path: '/about#course', icon: 'fa-graduation-cap' },
      { label: '강사 소개', labelEn: 'Instructor', path: '/about#instructor', icon: 'fa-chalkboard-user' },
    ],
  },
  {
    id: 'course',
    label: '과정소개',
    labelEn: 'Course',
    icon: 'fa-book-open',
    path: '/course',
    items: [
      { label: '교육 개요', labelEn: 'Overview', path: '/course-intro', icon: 'fa-info-circle' },
      { label: '커리큘럼', labelEn: 'Curriculum', path: '/course-intro#curriculum', icon: 'fa-list-check' },
      {
        label: '교강사용',
        labelEn: 'Instructor',
        path: '/instructor/dashboard',
        icon: 'fa-user-tie',
        adminOnly: true,
        children: [
          { label: '대시보드', labelEn: 'Dashboard', path: '/instructor/dashboard', icon: 'fa-gauge' },
          { label: '강의 운영 가이드', labelEn: 'Teaching Guide', path: '/instructor/teaching-guide', icon: 'fa-book' },
          { label: '차시별 강의안', labelEn: 'Lesson Plans', path: '/instructor/lesson-plans', icon: 'fa-file-lines' },
          { label: '실습자료 관리', labelEn: 'Lab Materials', path: '/instructor/lab-materials', icon: 'fa-flask' },
          { label: '프로젝트 운영', labelEn: 'Project Mgmt', path: '/instructor/projects', icon: 'fa-diagram-project' },
          { label: '평가 관리', labelEn: 'Evaluation', path: '/instructor/evaluation', icon: 'fa-clipboard-check' },
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: '학습하기',
    labelEn: 'Learn',
    icon: 'fa-laptop-code',
    path: '/learner',
    items: [
      { label: '대시보드', labelEn: 'Dashboard', path: '/learner/dashboard', icon: 'fa-gauge', authOnly: true },
      { label: '과정 로드맵', labelEn: 'Roadmap', path: '/learner/roadmap', icon: 'fa-road', authOnly: true },
      { label: '차시별 학습', labelEn: 'Daily Lessons', path: '/learner/lessons', icon: 'fa-calendar-days', authOnly: true },
      { label: '실습실', labelEn: 'Labs', path: '/learner/labs', icon: 'fa-flask-vial', authOnly: true },
      { label: '과제 제출', labelEn: 'Submissions', path: '/learner/submissions', icon: 'fa-upload', authOnly: true },
      { label: '나의 포트폴리오', labelEn: 'Portfolio', path: '/learner/portfolio', icon: 'fa-briefcase', authOnly: true },
    ],
  },
  {
    id: 'projects',
    label: '프로젝트',
    labelEn: 'Projects',
    icon: 'fa-diagram-project',
    path: '/projects',
    items: [
      { label: '프로젝트 개요', labelEn: 'Overview', path: '/projects', icon: 'fa-circle-info' },
      { label: '1. AI 동화책 제작', labelEn: '1. AI Storybook', path: '/projects/1-storybook', icon: 'fa-book-open-reader' },
      { label: '2. 문화재 AI 해설', labelEn: '2. Heritage Guide', path: '/projects/2-heritage', icon: 'fa-landmark' },
      { label: '3. 한국사 학습·시험', labelEn: '3. Korean History', path: '/projects/3-history', icon: 'fa-scroll' },
      { label: '4. 자격증 취약점 분석', labelEn: '4. Cert Analyzer', path: '/projects/4-certification', icon: 'fa-certificate' },
      { label: '5. 청년정책 챗봇', labelEn: '5. Youth Policy Bot', path: '/projects/5-youth-policy', icon: 'fa-building-columns' },
      { label: '6. 자소서·면접 코치', labelEn: '6. Interview Coach', path: '/projects/6-interview', icon: 'fa-user-tie' },
      { label: '7. 루틴 코치', labelEn: '7. Routine Coach', path: '/projects/7-routine', icon: 'fa-heart-pulse' },
    ],
  },
  {
    id: 'community',
    label: '커뮤니티',
    labelEn: 'Community',
    icon: 'fa-users',
    path: '/community',
    items: [
      { label: '프로젝트 갤러리', labelEn: 'Gallery', path: '/gallery', icon: 'fa-images' },
      { label: '자료실', labelEn: 'Resources', path: '/resources', icon: 'fa-folder-open' },
      { label: '공지사항', labelEn: 'Notices', path: '/notices', icon: 'fa-bullhorn' },
      { label: '자유게시판', labelEn: 'Free Board', path: '/freeboard', icon: 'fa-comments' },
    ],
  },
];
