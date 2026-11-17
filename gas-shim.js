/* Pengganti google.script.run & google.script.history saat web dibuka dari Vercel (bukan dari Apps Script).
   Kode Portal/Vendor tidak perlu diubah: setiap panggilan diteruskan sebagai POST {fn, args} ke Apps Script. */
(function () {
  'use strict';
  if (window.google && window.google.script && window.google.script.run) return; // di dalam Apps Script: pakai aslinya

  const API = window.ANTREAN_API;

  async function call(fn, args) {
    // text/plain → tanpa preflight CORS; Apps Script membalas lewat redirect yang mengizinkan semua origin
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ fn, args }),
      redirect: 'follow',
      credentials: 'omit',
    });
    if (!res.ok) throw new Error('Server tidak bisa dihubungi (' + res.status + ').');
    const out = await res.json();
    if (!out.ok) throw new Error(out.error || 'Terjadi kesalahan di server.');
    let data = out.data;
    // QR pendaftaran vendor menunjuk ke alamat web ini
    if (fn === 'getBootConfig' && data && typeof data === 'object') data = Object.assign({}, data, { vendorUrl: location.origin + '/' });
    return data;
  }

  function runner(onOk, onFail) {
    return new Proxy({}, {
      get(_, name) {
        if (name === 'withSuccessHandler') return (f) => runner(f, onFail);
        if (name === 'withFailureHandler') return (f) => runner(onOk, f);
        if (name === 'withUserObject') return () => runner(onOk, onFail);
        return (...args) => {
          call(String(name), args).then(
            (d) => { if (onOk) onOk(d); },
            (e) => { if (onFail) onFail(e instanceof Error ? e : new Error(String(e))); },
          );
        };
      },
    });
  }

  // ?p=gdfg dst. ikut tercatat di alamat browser → bisa di-bookmark & tombol Back jalan
  const history = {
    push(state, params) {
      const q = new URLSearchParams(params || {});
      window.history.pushState(state || {}, '', location.pathname + (q.toString() ? '?' + q : ''));
    },
    replace(state, params) {
      const q = new URLSearchParams(params || {});
      window.history.replaceState(state || {}, '', location.pathname + (q.toString() ? '?' + q : ''));
    },
    setChangeHandler(fn) {
      window.addEventListener('popstate', () => {
        const parameter = Object.fromEntries(new URLSearchParams(location.search));
        fn({ state: window.history.state, location: { parameter } });
      });
    },
  };

  window.google = window.google || {};
  window.google.script = { run: runner(null, null), history };
})();
