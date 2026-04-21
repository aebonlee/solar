import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import AdminGuard from '../components/AdminGuard';
import AuthGuard from '../components/AuthGuard';
import type { ReactElement } from 'react';

// Public pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const CourseIntro = lazy(() => import('../pages/CourseIntro'));
const ProjectShowcase = lazy(() => import('../pages/ProjectShowcase'));
const ProjectPage = lazy(() => import('../pages/projects/index'));
const ProjectGallery = lazy(() => import('../pages/ProjectGallery'));
const Resources = lazy(() => import('../pages/Resources'));
const Notices = lazy(() => import('../pages/Notices'));
const FreeBoard = lazy(() => import('../pages/FreeBoard'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const MyPage = lazy(() => import('../pages/MyPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Instructor pages
const InstructorDashboard = lazy(() => import('../pages/instructor/InstructorDashboard'));
const TeachingGuide = lazy(() => import('../pages/instructor/TeachingGuide'));
const LessonPlans = lazy(() => import('../pages/instructor/LessonPlans'));
const LabMaterials = lazy(() => import('../pages/instructor/LabMaterials'));
const ProjectManagement = lazy(() => import('../pages/instructor/ProjectManagement'));
const Evaluation = lazy(() => import('../pages/instructor/Evaluation'));

// Learner pages
const LearnerDashboard = lazy(() => import('../pages/learner/LearnerDashboard'));
const Roadmap = lazy(() => import('../pages/learner/Roadmap'));
const DailyLessons = lazy(() => import('../pages/learner/DailyLessons'));
const LessonDay = lazy(() => import('../pages/learner/LessonDay'));
const Labs = lazy(() => import('../pages/learner/Labs'));
const Projects = lazy(() => import('../pages/learner/Projects'));
const LearnerResources = lazy(() => import('../pages/learner/LearnerResources'));
const Submissions = lazy(() => import('../pages/learner/Submissions'));
const Portfolio = lazy(() => import('../pages/learner/Portfolio'));

// Admin
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

function LoadingFallback(): ReactElement {
  return (
    <div className="loading-page">
      <div className="loading-spinner" />
    </div>
  );
}

// Pages that show sidebar
const SIDEBAR_PREFIXES = ['/about', '/course', '/instructor', '/learner', '/projects', '/gallery', '/resources', '/notices', '/freeboard'];

export default function PublicLayout(): ReactElement {
  const location = useLocation();
  const showSidebar = SIDEBAR_PREFIXES.some(prefix => location.pathname.startsWith(prefix));

  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        {showSidebar ? (
          <div className="layout-with-sidebar">
            <Sidebar />
            <div className="content-with-sidebar">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* About */}
                  <Route path="/about" element={<About />} />

                  {/* Course */}
                  <Route path="/course-intro" element={<CourseIntro />} />

                  {/* Instructor (AdminGuard) */}
                  <Route path="/instructor/dashboard" element={<AdminGuard><InstructorDashboard /></AdminGuard>} />
                  <Route path="/instructor/teaching-guide" element={<AdminGuard><TeachingGuide /></AdminGuard>} />
                  <Route path="/instructor/lesson-plans" element={<AdminGuard><LessonPlans /></AdminGuard>} />
                  <Route path="/instructor/lab-materials" element={<AdminGuard><LabMaterials /></AdminGuard>} />
                  <Route path="/instructor/projects" element={<AdminGuard><ProjectManagement /></AdminGuard>} />
                  <Route path="/instructor/evaluation" element={<AdminGuard><Evaluation /></AdminGuard>} />

                  {/* Learner (AuthGuard) */}
                  <Route path="/learner/dashboard" element={<AuthGuard><LearnerDashboard /></AuthGuard>} />
                  <Route path="/learner/roadmap" element={<AuthGuard><Roadmap /></AuthGuard>} />
                  <Route path="/learner/lessons" element={<AuthGuard><DailyLessons /></AuthGuard>} />
                  <Route path="/learner/lessons/:day" element={<AuthGuard><LessonDay /></AuthGuard>} />
                  <Route path="/learner/labs" element={<AuthGuard><Labs /></AuthGuard>} />
                  <Route path="/learner/projects" element={<AuthGuard><Projects /></AuthGuard>} />
                  <Route path="/learner/resources" element={<AuthGuard><LearnerResources /></AuthGuard>} />
                  <Route path="/learner/submissions" element={<AuthGuard><Submissions /></AuthGuard>} />
                  <Route path="/learner/portfolio" element={<AuthGuard><Portfolio /></AuthGuard>} />

                  {/* Projects */}
                  <Route path="/projects" element={<ProjectShowcase />} />
                  <Route path="/projects/:slug" element={<ProjectPage />} />

                  {/* Community */}
                  <Route path="/gallery" element={<ProjectGallery />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/freeboard" element={<FreeBoard />} />

                  {/* Admin */}
                  <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
}
