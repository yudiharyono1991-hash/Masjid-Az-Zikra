-- 1. Table: app_sync_state
-- Digunakan untuk menyimpan seluruh state dari aplikasi untuk backup global.
CREATE TABLE IF NOT EXISTS public.app_sync_state (
    id BIGINT PRIMARY KEY,
    state_json JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: programs
-- Digunakan untuk menyimpan data program/campaign donasi
CREATE TABLE IF NOT EXISTS public.programs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT,
    target_amount NUMERIC,
    collected_amount NUMERIC DEFAULT 0,
    donors_count INTEGER DEFAULT 0,
    image_url TEXT,
    description TEXT,
    is_urgent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: gallery_items
-- Digunakan untuk menyimpan data galeri dan video kajian
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL, -- 'photo' atau 'video'
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tambahkan RLS (Row Level Security) agar bisa diakses dari aplikasi
-- (Bypass RLS untuk tahap development awal)
ALTER TABLE public.app_sync_state DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items DISABLE ROW LEVEL SECURITY;

-- Berikan izin akses penuh ke anon (public) untuk development
GRANT ALL ON TABLE public.app_sync_state TO anon, authenticated;
GRANT ALL ON TABLE public.programs TO anon, authenticated;
GRANT ALL ON TABLE public.gallery_items TO anon, authenticated;
