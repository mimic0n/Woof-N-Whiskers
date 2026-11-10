// Recheck at mount: the pre-paint class may have expired during a cold Vite load,
// and React Router can mount Home without fetching index.html again.
export function getIntroEligibility({ replay = new URLSearchParams(location.search).get('intro') === '1' } = {}) {
 if (location.pathname !== '/' || (location.hash && !replay)) return { allowed: false };
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) return { allowed: false, reason: 'introReduced' };
 const connection = navigator.connection;
 if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''))) return { allowed: false, reason: 'introDataSaver' };
 try {
  return { allowed: replay || !sessionStorage.getItem('wnw_intro_seen') };
 } catch {
  return { allowed: false, reason: 'introStorage' };
 }
}
