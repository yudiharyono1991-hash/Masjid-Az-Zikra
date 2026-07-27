import { chromium } from 'playwright';

const BASE_URL = process.env.SMOKE_TEST_URL || 'http://localhost:3000';
const results = [];

function logResult(feature, status, detail = '') {
  results.push({ feature, status, detail });
  const icon = status === 'OK' ? '✓' : status === 'WARN' ? '!' : '✗';
  console.log(`${icon} [${status}] ${feature}${detail ? ` — ${detail}` : ''}`);
}

function startErrorCapture(page) {
  const errors = [];
  const handler = (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  };
  const pageErrorHandler = (err) => errors.push(err.message);
  page.on('console', handler);
  page.on('pageerror', pageErrorHandler);
  return () => {
    page.off('console', handler);
    page.off('pageerror', pageErrorHandler);
    return errors;
  };
}

async function testFeature(page, name, action) {
  const finishCapture = startErrorCapture(page);
  try {
    await action();
    await page.waitForTimeout(600);
    const errors = finishCapture();
    const critical = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('404') &&
        !e.includes('Failed to load resource') &&
        !e.includes('GEMINI_API_KEY')
    );
    if (critical.length) {
      logResult(name, 'FAIL', critical.slice(0, 2).join(' | '));
    } else if (errors.length) {
      logResult(name, 'WARN', errors.slice(0, 2).join(' | '));
    } else {
      logResult(name, 'OK');
    }
  } catch (err) {
    finishCapture();
    logResult(name, 'FAIL', err.message);
  }
}

async function openMobileMenu(page) {
  const menuBtn = page.getByRole('button', { name: /^menu$/i }).first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click({ force: true });
    await page.waitForTimeout(400);
  }
}

async function clickNavTab(page, label) {
  await openMobileMenu(page);
  const btn = page.getByRole('button', { name: new RegExp(label, 'i') }).first();
  await btn.click({ force: true });
}

async function main() {
  console.log(`\n=== Browser Smoke Test — ${BASE_URL} ===\n`);

  let browser;
  try {
    const health = await fetch(`${BASE_URL}/api/health`);
    if (!health.ok) throw new Error(`Health check failed: ${health.status}`);
    logResult('Server Health', 'OK', await health.text());
  } catch (err) {
    logResult('Server Health', 'FAIL', err.message);
    console.log('\nServer tidak berjalan. Jalankan: npm run dev\n');
    process.exit(1);
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await testFeature(page, 'Beranda (load awal)', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('header', { timeout: 15000 });
  });

  const tabs = [
    ['Tab Program', 'Program ZISWAF'],
    ['Tab Transparansi', 'Laporan Transparansi'],
    ['Tab Jadwal Khatib', 'Agenda Shalat Jumat'],
    ['Tab Qurban', 'Patungan Qurban'],
    ['Tab Sejarah', 'Sejarah Tazkia'],
    ['Tab Edukasi', 'Edukasi ZISWAF'],
    ['Tab Galeri', 'Galeri & Kajian'],
  ];

  for (const [name, label] of tabs) {
    await testFeature(page, name, async () => {
      await clickNavTab(page, label);
      await page.waitForTimeout(400);
    });
  }

  await testFeature(page, 'Modal Donasi ZISWAF', async () => {
    const donate = page.getByRole('button', { name: /donasi|ziswaf|infaq/i }).first();
    await donate.click({ force: true });
    await page.waitForSelector('text=Donasi', { timeout: 5000 }).catch(() => {});
    await page.keyboard.press('Escape');
  });

  await testFeature(page, 'Modal Kalkulator Zakat', async () => {
    const calc = page.getByRole('button', { name: /kalkulator|hitung zakat/i }).first();
    if (await calc.count()) {
      await calc.click({ force: true });
      await page.waitForTimeout(800);
      await page.keyboard.press('Escape');
    }
  });

  await testFeature(page, 'Modal Digital Ibadah', async () => {
    const ibadah = page.getByRole('button', { name: /digital ibadah|ibadah digital|quran|al-qur/i }).first();
    if (await ibadah.count()) {
      await ibadah.click({ force: true });
      await page.waitForTimeout(1000);
      await page.keyboard.press('Escape');
    }
  });

  await testFeature(page, 'Modal AI Syariah', async () => {
    const ai = page.getByRole('button', { name: /ai syariah|tazkia ai/i }).first();
    if (await ai.count()) {
      await ai.click({ force: true });
      await page.waitForTimeout(800);
      await page.keyboard.press('Escape');
    }
  });

  await testFeature(page, 'Modal Login', async () => {
    const loginBtn = page.getByRole('button', { name: /akses jamaah|login|masuk|akun/i }).first();
    await loginBtn.click({ force: true });
    await page.waitForTimeout(600);
    await page.keyboard.press('Escape');
  });

  await testFeature(page, 'Login Pengurus + Portal DKM', async () => {
    const loginBtn = page.getByRole('button', { name: /akses jamaah|login|masuk|akun/i }).first();
    await loginBtn.click({ force: true });
    await page.waitForTimeout(500);

    const ketuaBtn = page.getByRole('button', { name: /ketua dkm/i });
    if (await ketuaBtn.count()) await ketuaBtn.click();

    const submit = page.getByRole('button', { name: /masuk portal keanggotaan/i });
    await submit.click({ force: true });
    await page.waitForTimeout(1200);

    const dkmTab = page.getByRole('button', { name: /portal dkm|dkm portal|pengurus/i }).first();
    if (await dkmTab.count()) {
      await dkmTab.click({ force: true });
      await page.waitForTimeout(1500);
    }
  });

  await testFeature(page, 'Mode TV Masjid', async () => {
    const tv = page.getByRole('button', { name: /mode tv|tv masjid|display tv/i }).first();
    if (await tv.count()) {
      await tv.click({ force: true });
      await page.waitForTimeout(1200);
      const exit = page.getByRole('button', { name: /keluar|exit|tutup/i }).first();
      if (await exit.count()) await exit.click({ force: true });
      else await page.keyboard.press('Escape');
    }
  });

  await testFeature(page, 'Katalog PDF Modal', async () => {
    const catalog = page.getByRole('button', { name: /katalog|pdf/i }).first();
    if (await catalog.count()) {
      await catalog.click({ force: true });
      await page.waitForTimeout(800);
      await page.keyboard.press('Escape');
    }
  });

  await browser.close();

  const failed = results.filter((r) => r.status === 'FAIL');
  const warned = results.filter((r) => r.status === 'WARN');
  const passed = results.filter((r) => r.status === 'OK');

  console.log('\n=== RINGKASAN ===');
  console.log(`Lulus   : ${passed.length}`);
  console.log(`Peringatan: ${warned.length}`);
  console.log(`Gagal   : ${failed.length}`);

  if (failed.length) {
    console.log('\nFitur bermasalah:');
    failed.forEach((f) => console.log(`  - ${f.feature}: ${f.detail}`));
    process.exit(1);
  }

  console.log('\nSemua fitur utama lulus smoke test.\n');
}

main().catch((err) => {
  console.error('Smoke test error:', err);
  process.exit(1);
});
