/**
 * imageStorage.ts
 * Menggunakan Supabase Storage untuk upload media
 */

import { getSupabaseClient } from './supabase';

const BUCKET_NAME = 'tazkia-media';

export async function uploadImageToLocal(
  file: File,
  keyPrefix: string
): Promise<{ key: string; dataUrl: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase client belum terkonfigurasi. Tidak dapat mengupload gambar.');
  }

  // Sanitasi nama file
  const fileExt = file.name.split('.').pop();
  const fileName = `${keyPrefix}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Error uploading to Supabase:', uploadError);
    throw new Error('Gagal mengupload gambar ke server: ' + uploadError.message);
  }

  // Ambil Public URL
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  if (!publicUrlData.publicUrl) {
    throw new Error('Gagal mendapatkan URL publik dari gambar.');
  }

  return { key: filePath, dataUrl: publicUrlData.publicUrl };
}

// Fallback logic untuk IndexedDB (jika ada file lama yang ingin dibaca)
// Tidak lagi dipakai untuk menyimpan file baru.
export async function saveImageToStorage(key: string, dataUrl: string): Promise<void> {
  console.warn('saveImageToStorage is deprecated, use uploadImageToLocal directly to Supabase.');
}

export async function getImageFromStorage(key: string): Promise<string | null> {
  // Hanya return url langsung jika key berbentuk URL (http)
  if (key.startsWith('http')) return key;
  return null;
}

export async function deleteImageFromStorage(key: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (supabase && !key.startsWith('http')) {
    await supabase.storage.from(BUCKET_NAME).remove([key]);
  }
}

