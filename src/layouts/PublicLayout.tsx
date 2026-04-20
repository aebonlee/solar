import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminGuard from '../components/AdminGuard';
import AuthGuard from '../components/AuthGuard';
import type { ReactElement } from 'react';

// Public pages
const Home = lazy(() => import('../pages/Home'));
const CourseIntro = lazy(() => import('../pages/CourseIntro'));
const ProjectGallery = lazy(() => import('../pages/ProjectGallery'));
const Resources = lazy(() => import('../pages/Resources'));
const Notices = lazy(() => import('../pages/Notices'));
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

export default function PublicLayout(): ReactElement {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/course-intro" element={<CourseIntro />} />
            <Route path="/gallery" element={<ProjectGallery />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />

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

            {/* Admin */}
            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
