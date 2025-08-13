export type DataProvider = 'mock' | 'supabase';

let current: DataProvider = 'mock';

export const setProvider = (p: DataProvider) => {
  current = p;
  console.log(`Dashboard data provider switched to: ${p}`);
};

export const getProvider = () => current;

// Environment-based default
if (import.meta.env.VITE_USE_SUPABASE === 'true') {
  setProvider('supabase');
}
