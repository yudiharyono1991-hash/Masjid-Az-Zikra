export const getTodayWIB = (): string => {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getFirstDayOfMonthWIB = (): string => {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
};

export const getWIBDate = (): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
};
