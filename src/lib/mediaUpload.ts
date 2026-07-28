/**
 * mediaUpload.ts
 * Unified media upload utility yang menyimpan ke Supabase Storage
 * sehingga dapat diakses dari perangkat manapun via URL publik
 */

import { getSupabaseClient } from './supabase';

export type MediaBucket = 'logo' | 'hero' | 'qris' | 'gallery' | 'pengurus' | 'booking' | 'program';

export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

/**
 * Upload file ke Supabase Storage bucket 'masjid-media'
 * @param file - File yang akan diupload
 * @param folder - Subfolder dalam bucket (logo, hero, qris, gallery, dll)
 * @param onProgress - Callback untuk progress (0-100)
 * @returns URL publik file yang sudah diupload, atau error message
 */
export async function uploadMediaToSupabase(
  file: File,
  folder: MediaBucket,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi' };
  }

  try {
    onProgress?.(10);
    
    // Buat nama file unik dengan timestamp
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    onProgress?.(30);

    // Upload ke bucket 'tazkia-media'
    const { data, error } = await supabase.storage
      .from('tazkia-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return { success: false, error: error.message };
    }

    onProgress?.(80);

    // Ambil public URL
    const { data: { publicUrl } } = supabase.storage
      .from('tazkia-media')
      .getPublicUrl(fileName);

    onProgress?.(100);
    
    return { success: true, publicUrl };
  } catch (err: any) {
    console.error('Upload failed:', err);
    return { success: false, error: err.message || 'Upload gagal' };
  }
}

/**
 * Konversi file ke base64 data URL sebagai fallback lokal
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload file - prioritaskan Supabase, fallback ke base64 lokal
 * Selalu kembalikan URL yang bisa digunakan langsung sebagai src gambar
 */
export async function uploadMedia(
  file: File,
  folder: MediaBucket,
  onProgress?: (progress: number) => void
): Promise<{ url: string; isLocal: boolean }> {
  // Coba upload ke Supabase
  const result = await uploadMediaToSupabase(file, folder, onProgress);
  
  if (result.success && result.publicUrl) {
    return { url: result.publicUrl, isLocal: false };
  }
  
  // Fallback: simpan sebagai base64 lokal
  console.warn('Supabase upload gagal, menyimpan lokal:', result.error);
  const dataUrl = await fileToDataUrl(file);
  return { url: dataUrl, isLocal: true };
}

/**
 * Hapus file dari Supabase Storage
 */
export async function deleteMediaFromSupabase(publicUrl: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    // Ekstrak path dari URL
    const urlParts = publicUrl.split('/masjid-media/');
    if (urlParts.length < 2) return false;
    
    const filePath = urlParts[1];
    const { error } = await supabase.storage.from('masjid-media').remove([filePath]);
    return !error;
  } catch {
    return false;
  }
}
