document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('siteSearch');
  const results = document.getElementById('siteSearchResults');
  if (!input || !results || !window.SITE_SEARCH_INDEX) return;

  const renderResults = (items) => {
    if (!items.length) {
      results.classList.remove('active');
      results.innerHTML = '';
      return;
    }
    results.innerHTML = items.map(item => (
      `<a href="${item.url}" class="site-search-results-item" role="option">${item.title}</a>`
    )).join('');
    results.classList.add('active');
  };

  input.addEventListener('input', () => {
    const term = input.value.trim();
    if (!term) {
      renderResults([]);
      return;
    }
    const lower = term.toLowerCase();
    const matches = SITE_SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      (item.tags && item.tags.toLowerCase().includes(lower))
    );
    renderResults(matches);
  });

  document.addEventListener('click', (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.classList.remove('active');
    }
  });
});
