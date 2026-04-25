-- ═══════════════════════════════════════════════════════════════
-- Solar AI Learning Studio — Supabase 테이블 생성 (solar_ prefix)
-- 실행: Supabase SQL Editor에서 실행
-- 멱등성 보장: 여러 번 실행해도 에러 없음
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. solar_progress (학습 진도) ───
CREATE TABLE IF NOT EXISTS solar_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 7),
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day)
);

-- ─── 2. solar_submissions (과제 제출) ───
CREATE TABLE IF NOT EXISTS solar_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 7),
  type TEXT NOT NULL CHECK (type IN ('lab', 'project', 'assignment')),
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  file_url TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  feedback TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
  graded_by UUID REFERENCES auth.users(id),
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 3. solar_notices (공지사항) ───
CREATE TABLE IF NOT EXISTS solar_notices (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'announcement' CHECK (category IN ('announcement', 'update', 'event')),
  pinned BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 4. solar_projects (팀 프로젝트) ───
CREATE TABLE IF NOT EXISTS solar_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  track_id TEXT NOT NULL CHECK (track_id IN ('smart-qa', 'ai-chatbot', 'content-agent', 'data-analyzer')),
  description TEXT DEFAULT '',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'presented')),
  repo_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 5. solar_project_members (프로젝트 팀원) ───
CREATE TABLE IF NOT EXISTS solar_project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES solar_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- ─── 6. solar_evaluations (평가) ───
CREATE TABLE IF NOT EXISTS solar_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES solar_projects(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('instructor', 'peer')),
  tech_score INTEGER CHECK (tech_score >= 0 AND tech_score <= 5),
  completion_score INTEGER CHECK (completion_score >= 0 AND completion_score <= 5),
  presentation_score INTEGER CHECK (presentation_score >= 0 AND presentation_score <= 5),
  teamwork_score INTEGER CHECK (teamwork_score >= 0 AND teamwork_score <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, evaluator_id, type)
);

-- ═══════════════════════════════════════════════════════════════
-- RLS (Row Level Security) 정책
-- DROP IF EXISTS 후 재생성으로 멱등성 보장
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE solar_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_evaluations ENABLE ROW LEVEL SECURITY;

-- ── solar_progress 정책 ──
DROP POLICY IF EXISTS "solar_progress_select_own" ON solar_progress;
CREATE POLICY "solar_progress_select_own" ON solar_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_progress_insert_own" ON solar_progress;
CREATE POLICY "solar_progress_insert_own" ON solar_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_progress_update_own" ON solar_progress;
CREATE POLICY "solar_progress_update_own" ON solar_progress
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_progress_admin_all" ON solar_progress;
CREATE POLICY "solar_progress_admin_all" ON solar_progress
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ── solar_submissions 정책 ──
DROP POLICY IF EXISTS "solar_submissions_select_own" ON solar_submissions;
CREATE POLICY "solar_submissions_select_own" ON solar_submissions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_submissions_insert_own" ON solar_submissions;
CREATE POLICY "solar_submissions_insert_own" ON solar_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_submissions_update_own" ON solar_submissions;
CREATE POLICY "solar_submissions_update_own" ON solar_submissions
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "solar_submissions_admin_all" ON solar_submissions;
CREATE POLICY "solar_submissions_admin_all" ON solar_submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ── solar_notices 정책 ──
DROP POLICY IF EXISTS "solar_notices_select_all" ON solar_notices;
CREATE POLICY "solar_notices_select_all" ON solar_notices
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "solar_notices_admin_write" ON solar_notices;
CREATE POLICY "solar_notices_admin_write" ON solar_notices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ── solar_projects 정책 ──
DROP POLICY IF EXISTS "solar_projects_select_all" ON solar_projects;
CREATE POLICY "solar_projects_select_all" ON solar_projects
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "solar_projects_admin_write" ON solar_projects;
CREATE POLICY "solar_projects_admin_write" ON solar_projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ── solar_project_members 정책 ──
DROP POLICY IF EXISTS "solar_project_members_select_all" ON solar_project_members;
CREATE POLICY "solar_project_members_select_all" ON solar_project_members
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "solar_project_members_admin_write" ON solar_project_members;
CREATE POLICY "solar_project_members_admin_write" ON solar_project_members
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ── solar_evaluations 정책 ──
DROP POLICY IF EXISTS "solar_evaluations_select_own" ON solar_evaluations;
CREATE POLICY "solar_evaluations_select_own" ON solar_evaluations
  FOR SELECT USING (auth.uid() = evaluator_id);

DROP POLICY IF EXISTS "solar_evaluations_admin_all" ON solar_evaluations;
CREATE POLICY "solar_evaluations_admin_all" ON solar_evaluations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

DROP POLICY IF EXISTS "solar_evaluations_insert_peer" ON solar_evaluations;
CREATE POLICY "solar_evaluations_insert_peer" ON solar_evaluations
  FOR INSERT WITH CHECK (auth.uid() = evaluator_id AND type = 'peer');

-- ═══════════════════════════════════════════════════════════════
-- 인덱스
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_solar_progress_user ON solar_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_solar_submissions_user ON solar_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_solar_submissions_day ON solar_submissions(day);
CREATE INDEX IF NOT EXISTS idx_solar_project_members_project ON solar_project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_solar_project_members_user ON solar_project_members(user_id);
CREATE INDEX IF NOT EXISTS idx_solar_evaluations_project ON solar_evaluations(project_id);

-- ═══════════════════════════════════════════════════════════════
-- updated_at 자동 갱신 트리거
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION solar_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS solar_progress_updated ON solar_progress;
CREATE TRIGGER solar_progress_updated
  BEFORE UPDATE ON solar_progress
  FOR EACH ROW EXECUTE FUNCTION solar_update_timestamp();

DROP TRIGGER IF EXISTS solar_submissions_updated ON solar_submissions;
CREATE TRIGGER solar_submissions_updated
  BEFORE UPDATE ON solar_submissions
  FOR EACH ROW EXECUTE FUNCTION solar_update_timestamp();

DROP TRIGGER IF EXISTS solar_notices_updated ON solar_notices;
CREATE TRIGGER solar_notices_updated
  BEFORE UPDATE ON solar_notices
  FOR EACH ROW EXECUTE FUNCTION solar_update_timestamp();

DROP TRIGGER IF EXISTS solar_projects_updated ON solar_projects;
CREATE TRIGGER solar_projects_updated
  BEFORE UPDATE ON solar_projects
  FOR EACH ROW EXECUTE FUNCTION solar_update_timestamp();
