(() => {
  const KEY = 'osf-options';
  const DISK_COL = 3;
  const defaults = { flash: true, stock: true };
  let opts;
  try { opts = { ...defaults, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { opts = defaults; }

  const isFlash = (row) => /ssd|nvme/i.test(row.cells[DISK_COL]?.textContent || '');
  const inStock = (row) => !!row.querySelector('input[type="submit"][value="Commander"]');
  const keep = (row) => (!opts.flash || isFlash(row)) && (!opts.stock || inStock(row));

  function previousHeading(el) {
    let h = el.previousElementSibling;
    while (h && h.tagName !== 'H2') h = h.previousElementSibling;
    return h;
  }

  function apply() {
    let kept = 0;
    document.querySelectorAll('table.server-availability').forEach((table) => {
      let visible = 0;
      table.querySelectorAll('tbody tr').forEach((row) => {
        const ok = keep(row);
        row.classList.toggle('osf-hide', !ok);
        if (ok) visible++;
      });
      kept += visible;
      table.classList.toggle('osf-hide', !visible);
      previousHeading(table)?.classList.toggle('osf-hide', !visible);
    });
    document.getElementById('osf-count').textContent = `${kept} serveur(s) affiché(s)`;
  }

  function checkbox(name, text) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = opts[name];
    input.addEventListener('change', () => {
      opts[name] = input.checked;
      try { localStorage.setItem(KEY, JSON.stringify(opts)); } catch { /* stockage indisponible */ }
      apply();
    });
    label.append(input, ` ${text}`);
    return label;
  }

  const panel = document.createElement('div');
  panel.id = 'osf-panel';
  const count = document.createElement('div');
  count.id = 'osf-count';
  panel.append(checkbox('flash', 'SSD / NVMe uniquement'), checkbox('stock', 'En stock uniquement'), count);
  document.body.append(panel);

  apply();
})();
