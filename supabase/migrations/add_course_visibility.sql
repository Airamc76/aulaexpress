-- Add is_visible column to courses table
-- Defaults to TRUE so all existing courses remain visible
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT TRUE;

-- Optional: create an index for faster filtering on public pages
CREATE INDEX IF NOT EXISTS idx_courses_is_visible ON courses (is_visible);
