-- =======================================================
-- SCRIPT PEMBERSIHAN DATA (GO-LIVE)
-- Gunakan script ini HANYA JIKA Anda ingin mereset seluruh 
-- data transaksi, donasi, program, dll menjadi kosong
-- untuk persiapan naik produksi (operasional asli).
-- =======================================================

-- Menonaktifkan cek Foreign Key sementara jika diperlukan
-- SET session_replication_role = 'replica';

-- Hapus data dari tabel-tabel utama (berdasarkan fitur Ziswaf, Keuangan, dll)
TRUNCATE TABLE donations CASCADE;
TRUNCATE TABLE erp_journal_entries CASCADE;
TRUNCATE TABLE petty_cash_entries CASCADE;
TRUNCATE TABLE journal_entries CASCADE;
TRUNCATE TABLE financials CASCADE;
TRUNCATE TABLE inventories CASCADE;
TRUNCATE TABLE qurban_participants CASCADE;
TRUNCATE TABLE qurban_groups CASCADE;
TRUNCATE TABLE programs CASCADE;
TRUNCATE TABLE announcements CASCADE;
TRUNCATE TABLE gallery_items CASCADE;
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE jamaah_profiles CASCADE;

-- Catatan: Tabel 'app_roles', 'users' dan 'app_sync_state' 
-- dibiarkan JANGAN di TRUNCATE agar user admin dan pengaturan tetap ada.

-- Mengaktifkan kembali cek Foreign Key
-- SET session_replication_role = 'origin';

-- Jika ingin mereset sequence ID (jika menggunakan SERIAL / BIGSERIAL):
-- (UUID tidak perlu di-reset)
