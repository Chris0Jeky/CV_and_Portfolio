/* global React, Sparkline */
const { useState, useMemo, useEffect } = React;

window.WealthLensFeature = function WealthLensFeature() {
  return (
    <article>
      <FeatureHeader num="043" name="WealthLens" cat="Civic Data · Open Source · MIT + CC-BY"
        years="2025 — building" team="sole architect · 180 PRs · 540+ commits · 874 tests"
        tone="teal"/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            <em style={{color:'var(--teal)'}}>WealthLens UK</em> is the one I can't stop
            working on. An open-source platform that pulls UK wealth and inequality data
            from official sources — ONS, HMRC, the World Inequality Database, the Bank
            of England, DWP, Resolution Foundation — and turns it into cited,
            embeddable, mobile-responsive chart pages that anyone can share. Built because
            UK household wealth is roughly <strong>£17 trillion</strong> — about seven
            times GDP — and most people have no idea what that distribution looks like.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            Ten datasets. Ten chart articles. Ten automated Python pipelines. Every
            number cites its source URL and access date. Every transformation is
            reproducible from a script you can read. Nothing is fabricated, nothing is
            paraphrased, nothing is paywalled. Mobile-responsive, WCAG AA, dark mode,
            PWA-ready, no tracking, no opinion-as-data — just the receipts.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            The architecture is the boring half of civic tech, done right.{' '}
            <strong>FastAPI</strong> serves paginated JSON and streaming CSV with HTTP
            caching, freshness tracking, and eight documented endpoints under{' '}
            <code style={{fontFamily:'var(--mono)', fontSize: 14, background: 'var(--paper-3)', padding: '0 4px'}}>/api/data/*</code>.{' '}
            <strong>Vue 3 + TypeScript</strong> with Pinia state, Tailwind, Vite, and{' '}
            <strong>D3.js</strong> for charts that don't feel like a vendor template.
            Data pipelines in Python 3.11 with Pandas, validated and run weekly by
            GitHub Actions. Deployed to Pages. Backstopped by{' '}
            <strong>874 passing tests</strong> (156 root · 135 backend · 583 frontend) and
            a CI matrix of ruff, mypy, bandit, vue-tsc and vitest. <em>The boring half
            of "open civic data" is exactly why most attempts at it stop after one chart.</em>
          </p>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Python 3.11','FastAPI','Pydantic','Pandas','Vue 3','TypeScript','Pinia','D3.js','Tailwind','Vite','GitHub Actions','SQLite → Postgres'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
                border: '1px solid var(--rule)', color: 'var(--ink-2)',
              }}>{s}</span>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn" href="https://chris0jeky.github.io/wealthlens-hq/" target="_blank" rel="noopener"
              style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}>▷ Live site</a>
            <a className="btn" href="https://github.com/Chris0Jeky/wealthlens-hq" target="_blank" rel="noopener"
              style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}>↗ Repo</a>
          </div>
          <div style={{ marginTop: 16, fontFamily: 'var(--sans)', fontSize: 11,
            color: 'var(--ink-dim)', letterSpacing: '0.05em' }}>
            Conversations in progress with <em>Tax Justice UK</em>, <em>Equality Trust</em>,
            and <em>Patriotic Millionaires UK</em>. Code MIT, charts CC-BY 4.0.
          </div>
        </div>

        <ChartArticleMock/>
      </div>

      {/* Chart catalogue strip */}
      <div style={{ marginTop: 32 }}>
        <div className="label" style={{ marginBottom: 10 }}>
          Fig. 6 — current catalogue · 10 cited datasets
        </div>
        <ChartCatalogue/>
      </div>

      {/* Wealth percentile calculator */}
      <div style={{ marginTop: 32 }}>
        <WealthCalc/>
      </div>

      {/* Field note */}
      <div className="term" style={{ marginTop: 24 }}>
        <span className="term-label">$ tail -f architecture.notes</span>
        <div><span className="prompt">▸</span> every chart cites its source. <span className="cyan">no exceptions.</span> if a number can't link back to ons/hmrc/wid/boe/dwp, it doesn't ship.</div>
        <div><span className="prompt">▸</span> pipelines re-fetch weekly. freshness tracked: <span className="ok">fresh ≤7d</span> <span className="dim">·</span> <span className="warn">stale ≤30d</span> <span className="dim">·</span> <span className="err">expired &gt;30d</span></div>
        <div><span className="prompt">▸</span> the backend is an api, not a monolith. paginated JSON, streaming CSV, per-column metadata, descriptive stats, health checks.</div>
        <div><span className="prompt">▸</span> values: <span className="cyan">data first, opinion second</span> · open source always · accessible by default · non-partisan.</div>
        <div><span className="prompt">▸</span> next: embed codes for journalists · social-share renderer · then internationalisation.</div>
      </div>
    </article>
  );
};

/* ============ Wealth percentile calculator ============ */
function WealthCalc() {
  // Approximate UK net household wealth percentile lookup (ONS WAS Round 7 inspired)
  // £ thousands → percentile (rough piecewise — illustrative, not authoritative)
  const ANCHORS = [
    [0, 5], [20, 15], [50, 25], [100, 35], [200, 50],
    [350, 60], [550, 70], [850, 80], [1300, 90], [2500, 95],
    [5000, 98], [10000, 99], [25000, 99.7], [100000, 99.95],
  ];

  function pctFor(k) {
    if (k <= 0) return 1;
    for (let i = 0; i < ANCHORS.length - 1; i++) {
      const [k0, p0] = ANCHORS[i];
      const [k1, p1] = ANCHORS[i + 1];
      if (k >= k0 && k <= k1) {
        const t = (k - k0) / (k1 - k0 || 1);
        return p0 + t * (p1 - p0);
      }
    }
    return 99.99;
  }

  const [wealth, setWealth] = useState(150);  // £k
  const pct = pctFor(wealth);

  // Generate a rough Lorenz-style curve for visual context
  const curve = useMemo(() => {
    const N = 50;
    return Array.from({ length: N }, (_, i) => {
      const p = i / (N - 1);
      // Skewed lognormal-ish wealth curve
      return Math.pow(p, 3.8) * 100;
    });
  }, []);

  const yourX = pct / 100;

  return (
    <div data-tilt style={{
      border: '1.5px solid var(--rule)', background: 'var(--paper-2)',
      boxShadow: '4px 4px 0 var(--teal)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)',
      }}>
        <span><span style={{color: 'var(--teal)'}}>●</span> WEALTHLENS · personal percentile · UK</span>
        <span style={{ color: 'var(--ink-mute)' }}>FIG. 7 — illustrative · ONS WAS shape</span>
      </div>

      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'center' }}>
        {/* Left: input + result */}
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Where do you actually sit?</div>
          <h4 style={{
            fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400,
            letterSpacing: '-0.02em', margin: '0 0 16px', lineHeight: 1.1,
          }}>
            UK net household wealth, <em style={{color:'var(--teal)'}}>percentile lookup</em>.
          </h4>

          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', marginBottom: 6 }}>
            Your household net wealth (incl. property, pensions, savings, minus debt)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, color: 'var(--ink)' }}>£</span>
            <input type="number" value={wealth}
              onChange={e => setWealth(Math.max(0, Math.min(1000000, +e.target.value || 0)))}
              style={{
                width: 140, border: 'none', borderBottom: '2px solid var(--rule)',
                background: 'transparent', fontFamily: 'var(--serif)', fontSize: 32,
                color: 'var(--rouge)', outline: 'none', padding: '2px 4px',
              }}/>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>k</span>
          </div>
          <input type="range" min={0} max={5000} step={5} value={wealth}
            onChange={e => setWealth(+e.target.value)}/>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-mute)',
            letterSpacing: '0.05em', marginTop: 4 }}>
            <span>£0</span><span>£500k</span><span>£1M</span><span>£2.5M</span><span>£5M+</span>
          </div>

          <div style={{
            marginTop: 18, padding: '14px 16px',
            background: 'var(--paper)', border: '1px solid var(--rule)',
            borderLeft: '4px solid var(--teal)',
          }}>
            <div className="label" style={{ marginBottom: 4, color: 'var(--teal)' }}>Your percentile</div>
            <div style={{ display: 'baseline', alignItems: 'baseline' }}>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 400,
                color: 'var(--rouge)', letterSpacing: '-0.02em', lineHeight: 1,
              }}>{pct.toFixed(1)}</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink-dim)' }}>th</span>
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontStyle: 'italic',
              color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>
              {pct < 50 ? `You sit below the UK median household. ${(100 - pct).toFixed(0)}% of households have more.` :
               pct < 90 ? `You sit above the UK median. ${(100 - pct).toFixed(0)}% of households have more wealth than you.` :
               pct < 99 ? `Top ${(100 - pct).toFixed(1)}% of UK households. Statistically: rare.` :
               `Top ${Math.max(0.01, (100 - pct)).toFixed(2)}%. The chart you're sitting on, at this scale, is mostly drawing you.`}
            </div>
          </div>
        </div>

        {/* Right: lorenz-ish curve */}
        <div>
          <div className="label" style={{ marginBottom: 6 }}>UK wealth distribution · your position</div>
          <PercentileChart curve={curve} yourX={yourX} pct={pct}/>
          <div style={{ marginTop: 6, fontFamily: 'var(--mono)', fontSize: 9,
            color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            x = percentile · y = relative net wealth (illustrative shape, ONS WAS form)
          </div>
        </div>
      </div>

      <div style={{
        padding: '8px 16px', borderTop: '1px solid var(--rule)', background: 'var(--paper-3)',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)',
        letterSpacing: '0.05em',
      }}>
        // not financial advice. not a tax form. just a rough mirror, the way an open civic dataset should be.
      </div>
    </div>
  );
}

function PercentileChart({ curve, yourX, pct }) {
  const w = 420, h = 200;
  const max = Math.max(...curve);
  const path = curve.map((v, i) => {
    const x = (i / (curve.length - 1)) * w;
    const y = h - (v / max) * (h - 8) - 4;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  const area = path + ` L${w},${h} L0,${h} Z`;
  const yourPx = yourX * w;
  // Find y at yourX by interpolating
  const idx = yourX * (curve.length - 1);
  const i0 = Math.floor(idx), i1 = Math.min(curve.length - 1, i0 + 1);
  const t = idx - i0;
  const yVal = curve[i0] * (1 - t) + curve[i1] * t;
  const yourYPx = h - (yVal / max) * (h - 8) - 4;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="wc-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="var(--teal)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map(g => (
        <line key={g} x1={g * w} x2={g * w} y1={0} y2={h} stroke="var(--rule)" strokeOpacity="0.15" strokeDasharray="2 3"/>
      ))}
      <path d={area} fill="url(#wc-g)"/>
      <path d={path} fill="none" stroke="var(--teal)" strokeWidth="1.5"/>
      {/* Your position marker */}
      <line x1={yourPx} x2={yourPx} y1={0} y2={h} stroke="var(--rouge)" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx={yourPx} cy={yourYPx} r="6" fill="var(--rouge)" stroke="var(--paper)" strokeWidth="2"/>
      <text x={yourPx + 8} y={Math.max(14, yourYPx - 8)}
        style={{ fontFamily: 'var(--mono)', fontSize: 10, fill: 'var(--rouge)' }}>
        you · {pct.toFixed(1)}%
      </text>
    </svg>
  );
}

/* ============ Chart article mock — broadsheet data layout ============ */
function ChartArticleMock() {
  // Generate two-series area chart: bottom 50% share & top 1% share, 1820–2023
  const N = 60;
  const top1 = Array.from({ length: N }, (_, i) => {
    // S-curve dip mid-20th century then rise
    const t = i / (N - 1);
    return 28 + 8 * Math.sin(t * Math.PI * 1.4 - 1.4) + (t > 0.6 ? (t - 0.6) * 20 : 0) - (t > 0.3 && t < 0.6 ? 6 : 0);
  });
  const bot50 = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    return 5 + 7 * Math.sin(t * Math.PI * 1.1) * (t < 0.6 ? 1 : 0.4) - (t > 0.6 ? (t - 0.6) * 8 : 0);
  });

  return (
    <div data-tilt style={{
      border: '1.5px solid var(--rule)', boxShadow: '6px 6px 0 var(--teal)',
      background: 'var(--paper)', padding: 0, fontFamily: 'var(--serif)',
    }}>
      {/* Browser-ish chrome */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 14px', borderBottom: '1px solid var(--rule)',
        background: 'var(--paper-3)',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)',
      }}>
        <span><span style={{color: 'var(--teal)'}} className="pulse">●</span> wealthlens.uk/charts/wealth-shares</span>
        <span style={{ color: 'var(--ink-mute)' }}>WCAG AA · PWA</span>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: '10px 18px 0', fontFamily: 'var(--sans)', fontSize: 10,
        color: 'var(--ink-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Home <span style={{ color: 'var(--ink-mute)' }}>/</span> Charts <span style={{ color: 'var(--ink-mute)' }}>/</span> <span style={{ color: 'var(--teal)' }}>Wealth Shares</span>
      </div>

      {/* Headline */}
      <h3 style={{
        fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, lineHeight: 1.05,
        margin: '6px 18px 4px', letterSpacing: '-0.02em',
      }}>
        Who owns the wealth?
      </h3>
      <div style={{ padding: '0 18px 12px', fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 14, color: 'var(--ink-dim)' }}>
        UK wealth shares by group, 1820–2023.
      </div>

      {/* Stat strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
        margin: '0 18px', background: 'var(--rule)',
      }}>
        {[
          ['TOP 1%', '21%', 'of total'],
          ['TOP 10%', '57%', 'of total'],
          ['BOTTOM 50%', '5%', 'of total'],
        ].map(([lbl, val, sub], i) => (
          <div key={i} style={{ background: 'var(--paper-2)', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-dim)', letterSpacing: '0.1em' }}>{lbl}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500, color: 'var(--teal)', letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 9, color: 'var(--ink-mute)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: '14px 18px 0', position: 'relative' }}>
        <TwoSeriesChart series={[
          { data: top1, color: 'var(--rouge)', label: 'Top 1%' },
          { data: bot50, color: 'var(--teal)', label: 'Bottom 50%' },
        ]}/>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-mute)',
          marginTop: 4 }}>
          <span>1820</span>
          <span>1900</span>
          <span>1950</span>
          <span>2000</span>
          <span>2023</span>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 8,
          fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-2)' }}>
          <span><span style={{ color: 'var(--rouge)' }}>■</span> Top 1% share</span>
          <span><span style={{ color: 'var(--teal)' }}>■</span> Bottom 50% share</span>
        </div>
      </div>

      {/* Source bar */}
      <div style={{
        margin: '14px 18px 0', padding: '8px 10px',
        background: 'var(--paper-3)', borderLeft: '3px solid var(--teal)',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)',
      }}>
        <strong style={{ color: 'var(--ink-2)', letterSpacing: '0.1em' }}>SOURCE:</strong>{' '}
        World Inequality Database · wid.world · Accessed 2026-05-12
      </div>

      {/* Methodology accordion */}
      <div style={{ margin: '8px 18px 14px', borderTop: '1px solid var(--rule)', paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-2)',
          letterSpacing: '0.08em' }}>
          <span>▸ Methodology · how the numbers are computed</span>
          <span style={{ color: 'var(--ink-mute)' }}>collapsed</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 18px', borderTop: '1px solid var(--rule)',
        background: 'var(--paper-3)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-mute)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <span>↓ CSV · ↗ Embed · ⎘ Share</span>
        <span style={{ color: 'var(--teal)' }}>● FRESH · 2d</span>
      </div>
    </div>
  );
}

function TwoSeriesChart({ series, height = 130 }) {
  const w = 360, h = height;
  const all = series.flatMap(s => s.data);
  const max = Math.max(...all) * 1.1;
  const min = 0;
  const span = max - min || 1;

  function pathFor(data) {
    return data.map((p, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((p - min) / span) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
  }
  function areaFor(data) {
    return pathFor(data) + ` L${w},${h} L0,${h} Z`;
  }

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`wl-g-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.28"/>
            <stop offset="100%" stopColor={s.color} stopOpacity="0"/>
          </linearGradient>
        ))}
      </defs>
      {/* horizontal gridlines */}
      {[0.25, 0.5, 0.75].map(t => (
        <line key={t} x1="0" x2={w} y1={h*t} y2={h*t} stroke="var(--rule)" strokeOpacity="0.15" strokeDasharray="2 3"/>
      ))}
      {series.map((s, i) => (
        <g key={i}>
          <path d={areaFor(s.data)} fill={`url(#wl-g-${i})`}/>
          <path d={pathFor(s.data)} fill="none" stroke={s.color} strokeWidth="1.5" strokeLinejoin="round"/>
        </g>
      ))}
    </svg>
  );
}

/* ============ Chart catalogue ============ */
function ChartCatalogue() {
  const charts = [
    ['01', 'UK Wealth Shares', 'WID.world', '1820–2024'],
    ['02', 'Wealth by Decile', 'ONS WAS', 'ongoing'],
    ['03', 'Housing Affordability by Region', 'ONS', '2010–'],
    ['04', 'Capital Gains Concentration', 'HMRC', 'annual'],
    ['05', 'Productivity vs. Pay', 'ONS', '1970–'],
    ['06', 'Regional Income (GDHI)', 'ONS', 'annual'],
    ['07', 'Tax Composition', 'HMRC', 'rolling'],
    ['08', 'Bank Rate vs. CPI', 'Bank of England', 'monthly'],
    ['09', 'Child Poverty by Region', 'DWP / HMRC', 'annual'],
    ['10', 'Generational Wealth Gap', 'Resolution Foundation', 'cohort'],
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0,
      border: '1px solid var(--rule)',
    }}>
      {charts.map((c, i) => (
        <div key={c[0]} style={{
          display: 'grid', gridTemplateColumns: '36px 1fr 140px 80px', gap: 12,
          padding: '8px 14px', alignItems: 'baseline',
          borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none',
          borderBottom: i < 8 ? '1px solid var(--rule)' : 'none',
          background: i % 2 === 0 ? 'var(--paper-2)' : 'var(--paper)',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--teal)' }}>№ {c[0]}</span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink)' }}>{c[1]}</span>
          <span className="label" style={{ fontSize: 9 }}>{c[2]}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)', textAlign: 'right' }}>{c[3]}</span>
        </div>
      ))}
    </div>
  );
}
