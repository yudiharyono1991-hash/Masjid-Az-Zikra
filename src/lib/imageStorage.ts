/**
 * imageStorage.ts
 * Menyimpan gambar/file besar menggunakan IndexedDB
 * Kapasitas jauh lebih besar dari localStorage (ratusan MB vs 5MB)
 */

const DB_NAME = 'tazkia_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImageToStorage(key: string, dataUrl: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ key, dataUrl });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getImageFromStorage(key: string): Promise<string | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result?.dataUrl || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteImageFromStorage(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Mengkonversi file gambar ke data URL dan menyimpannya ke IndexedDB
 * Mengembalikan key referensi yang disimpan di store (bukan data URL langsung)
 */
export async function uploadImageToLocal(
  file: File,
  keyPrefix: string
): Promise<{ key: string; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Gagal membaca file'));
        return;
      }
      const key = `${keyPrefix}_${Date.now()}`;
      await saveImageToStorage(key, dataUrl);
      resolve({ key, dataUrl });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
