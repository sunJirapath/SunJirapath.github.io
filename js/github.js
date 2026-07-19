// Live GitHub repos + language bars, adapted from the Claude Design component.
(async function () {
  const grid = document.getElementById('repo-grid');
  const bars = document.getElementById('lang-bars');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const repoCard = r => `
    <div>
      <a href="${esc(r.html_url)}" class="uk-link-reset">
        <div class="uk-card uk-card-secondary uk-card-body uk-card-hover" style="height: 100%;">
          <div class="uk-flex uk-flex-between" style="align-items: baseline; gap: 12px;">
            <h4 class="uk-margin-remove" style="font-size: 16px;">${esc(r.name)}</h4>
            <span class="uk-text-meta">${esc(r.stars)}</span>
          </div>
          <p class="uk-margin-small-top uk-margin-remove-bottom" style="font-size: 14px;">${esc(r.description)}</p>
          <p class="uk-text-meta uk-margin-small-top uk-margin-remove-bottom">● ${esc(r.language)}</p>
        </div>
      </a>
    </div>`;

  const langBar = l => `
    <div>
      <div class="uk-flex uk-flex-between" style="font-size: 12px; color: #bbb; margin-bottom: 5px;"><span>${esc(l.name)}</span><span class="uk-text-meta">${esc(l.pctLabel)}</span></div>
      <div style="height: 5px; background: rgba(255,255,255,.08);"><div style="height: 100%; background: #cfcfcf; width: ${esc(l.pctW)};"></div></div>
    </div>`;

  try {
    const resp = await fetch('https://api.github.com/users/sunJirapath/repos?per_page=100&sort=pushed');
    if (!resp.ok) throw new Error('GitHub API ' + resp.status);
    const own = (await resp.json()).filter(r => !r.fork);

    const repos = own.slice()
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
      .slice(0, 4)
      .map(r => ({ name: r.name, html_url: r.html_url, stars: '★ ' + r.stargazers_count, description: r.description || 'No description yet.', language: r.language || 'n/a' }));
    if (repos.length < 4) repos.push({ name: 'more on GitHub →', html_url: 'https://github.com/sunJirapath?tab=repositories', stars: '', description: 'Browse all repositories, forks and activity on my profile.', language: 'all languages' });

    const counts = {};
    own.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const langs = total
      ? Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
          .map(([name, n]) => { const pct = Math.round(n / total * 100); return { name, pctLabel: pct + '%', pctW: pct + '%' }; })
      : [{ name: 'no language data yet', pctLabel: '', pctW: '0%' }];

    grid.innerHTML = repos.map(repoCard).join('');
    bars.innerHTML = langs.map(langBar).join('');
  } catch (e) {
    console.error('GitHub data load failed:', e);
    grid.innerHTML = repoCard({ name: 'github.com/sunJirapath →', html_url: 'https://github.com/sunJirapath', stars: '', description: 'Live data unavailable right now — view repositories directly on GitHub.', language: '' });
    bars.innerHTML = langBar({ name: 'unavailable', pctLabel: '', pctW: '0%' });
  }
})();
