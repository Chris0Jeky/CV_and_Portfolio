/* global React, FeatureHeader */
const { useState, useMemo } = React;

window.NavSentinelFeature = function NavSentinelFeature() {
  return (
    <article style={{ borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
      <FeatureHeader num="037" name="NavSentinel" cat="Browser Security · MV3 · Local-only"
        years="2025 — shipping" team="solo · 112 Gym fixtures · 48 test suites" tone="rouge"/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            <em style={{color:'var(--rouge)'}}>NavSentinel</em> is a navigation-intent
            firewall as a browser extension. It scores every click before it gets to
            turn into a navigation — catching deceptive overlays, retargeted clicks,
            popunders, DoubleClickjacking, and ClickFix fake-CAPTCHA attacks — and it
            never sends anything about your browsing anywhere. The known-bad domain
            list is a <strong>build-time bloom filter</strong>, baked into the extension.
            Zero network calls. Zero remote telemetry. Zero "helpful" cloud reputation
            lookups.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            The brain is a two-stage scoring model: a{' '}
            <strong>Click Deception Score (CDS)</strong> computed at click time, then a{' '}
            <strong>Navigation Risk Score (NRS)</strong> at navigation time, both with
            explicit reason codes you can inspect. Thresholds are tunable per mode
            (smart blocks at 70, strict at 50), and same-organisation domain groups
            (Unity, Google, Microsoft, &c.) get an explicit, auditable exemption —
            because <em>unity.com</em> and <em>unity3d.com</em> are the same company,
            and pretending otherwise is just noise.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Backed by <strong>112 deterministic Gym fixtures</strong> across overlay,
            retargeting, popunder, OAuth, DoubleClickjacking, ClickFix, redirect-chain,
            phishing-kit, DOM-mutation, CSP, SRI, and 25 real-world adversarial scenarios.
            38 Vitest unit specs, 10 Playwright E2E suites. Built in TypeScript on the
            MV3 platform.
          </p>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['TypeScript','Chrome MV3','Vitest','Playwright','Bloom filter','Reason codes','Local-only'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px', border: '1px solid var(--rule)', color: 'var(--ink-2)' }}>{s}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <a className="btn" href="https://github.com/Chris0Jeky/NavSentinel" target="_blank" rel="noopener"
              style={{ borderColor: 'var(--rouge)', color: 'var(--rouge)' }}>↗ Repo</a>
          </div>
        </div>

        <CDSDemo/>
      </div>

      <div className="term" style={{ marginTop: 24 }}>
        <span className="term-label">$ navsentinel --explain blocked-click</span>
        <div><span className="prompt">▸</span> every decision is <span className="cyan">explainable</span>. CDS, NRS, and reason codes surface in the debug overlay + blocked-event log.</div>
        <div><span className="prompt">▸</span> diminishing returns: NRS &gt; 100 gets 50% weight on the excess. <span className="dim">// no runaway scores.</span></div>
        <div><span className="prompt">▸</span> bloom filter is compiled at build time from public threat feeds. <span className="cyan">no remote lookups, ever.</span></div>
        <div><span className="prompt">▸</span> clipboard contents are <span className="ok">never stored</span>. only metadata (length, command-likeness) crosses the bridge.</div>
        <div><span className="prompt">▸</span> trusted-domain list is for credential submits only. it is <em>not</em> a generic "good site" allowlist.</div>
        <div><span className="prompt">▸</span> same-org exemption (unity · google · microsoft · &c.) is explicit and auditable. attackers can't \"unity-phishing.com\" their way in.</div>
      </div>
    </article>
  );
};

/* ============ Live CDS Demo ============ */
function CDSDemo() {
  const SCENARIOS = [
    {
      id: 'safe',
      label: 'A normal "Read more" link',
      sublabel: 'inline anchor · accessible name · same-origin',
      tone: 'forest',
      features: [
        ['Keyboard activation possible', -10, 'cds_keyboard_intent'],
        ['Accessible name present', 0, 'cds_baseline'],
      ],
      nrsExtra: [],
      clicks: 1,
    },
    {
      id: 'mild',
      label: 'A "Subscribe" button on a paywall',
      sublabel: 'overlay covers ~40% of viewport · new tab',
      tone: 'gold',
      features: [
        ['Interactive overlay covers >35% viewport', 30, 'cds_large_overlay'],
        ['Underlying element is more intentful', 35, 'cds_intent_mismatch'],
        ['Legit modal backdrop detected', -20, 'cds_legit_modal'],
      ],
      nrsExtra: [
        ['New tab / window', 20, 'nrs_new_tab_window'],
      ],
      clicks: 1,
    },
    {
      id: 'hijack',
      label: 'Two clicks · the page opens a child window mid-gesture',
      sublabel: 'DoubleClickjacking pattern · cross-site redirect',
      tone: 'rouge',
      features: [
        ['Pointerdown target ≠ click target (retargeting)', 20, 'cds_retargeting'],
        ['z-index ≥ 9999 absolute overlay', 15, 'cds_extreme_z'],
        ['Cursor: pointer but no visible affordance', 10, 'cds_invisible_affordance'],
      ],
      nrsExtra: [
        ['DoubleClickjacking pattern active', 40, 'nrs_double_click_hijack'],
        ['Cross-site destination', 20, 'nrs_cross_site'],
        ['Multiple navigation attempts in one gesture', 25, 'nrs_multiple_attempts'],
      ],
      clicks: 2,
    },
  ];

  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [verdict, setVerdict] = useState(null);

  const result = useMemo(() => {
    const cds = scenario.features.reduce((s, f) => s + f[1], 0);
    const nrs = cds + scenario.nrsExtra.reduce((s, f) => s + f[1], 0);
    // Smart mode: prompt 40–69, block ≥ 70
    let decision = 'allow';
    if (nrs >= 70) decision = 'block';
    else if (nrs >= 40) decision = 'prompt';
    return { cds, nrs, decision };
  }, [scenario]);

  function runScenario(s) {
    setScenario(s);
    setVerdict(null);
    // tiny delay for theatre
    setTimeout(() => setVerdict('shown'), 220);
  }

  const decisionColor =
    result.decision === 'block' ? 'var(--rouge)' :
    result.decision === 'prompt' ? 'var(--gold)' : 'var(--forest)';

  const decisionLabel =
    result.decision === 'block' ? 'BLOCK' :
    result.decision === 'prompt' ? 'PROMPT' : 'ALLOW';

  return (
    <div data-tilt style={{
      border: '1.5px solid var(--rule)', background: 'var(--paper-2)',
      boxShadow: '6px 6px 0 var(--rouge)', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)',
      }}>
        <span><span style={{ color: 'var(--rouge)' }}>●</span> NAVSENTINEL · CDS+NRS LIVE SIMULATION</span>
        <span style={{ color: 'var(--ink-mute)' }}>FIG. 8 — click a scenario</span>
      </div>

      {/* Scenarios */}
      <div style={{ padding: 16 }}>
        <div className="label" style={{ marginBottom: 8 }}>Choose a click scenario</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {SCENARIOS.map(s => {
            const active = s.id === scenario.id;
            const c = s.tone === 'forest' ? 'var(--forest)' : s.tone === 'gold' ? 'var(--gold)' : 'var(--rouge)';
            return (
              <button key={s.id} onClick={() => runScenario(s)} style={{
                textAlign: 'left', padding: '8px 12px',
                background: active ? 'var(--paper)' : 'transparent',
                border: `1px solid ${active ? c : 'var(--rule)'}`,
                borderLeft: `3px solid ${c}`,
                fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)',
                cursor: 'pointer', lineHeight: 1.3,
              }}>
                <div style={{ fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)', marginTop: 2, letterSpacing: '0.03em' }}>
                  {s.sublabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Score breakdown */}
        <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span className="label">CDS / NRS breakdown</span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)',
              letterSpacing: '0.1em',
            }}>{scenario.clicks} click{scenario.clicks > 1 ? 's' : ''}</span>
          </div>

          {/* Feature rows */}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {scenario.features.map(([label, w, code], i) => (
              <Row key={i} label={label} weight={w} code={code} delay={i * 70}/>
            ))}
            {scenario.nrsExtra.length > 0 && (
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed var(--rule)' }}>
                <div style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em', marginBottom: 4 }}>+ NRS FACTORS</div>
                {scenario.nrsExtra.map(([label, w, code], i) => (
                  <Row key={i} label={label} weight={w} code={code} delay={(scenario.features.length + i) * 70}/>
                ))}
              </div>
            )}
          </div>

          {/* Final */}
          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--rule)',
            display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'baseline',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em' }}>CDS</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', lineHeight: 1 }}>{result.cds}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em' }}>NRS</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: decisionColor, lineHeight: 1 }}>{result.nrs}</div>
            </div>
            <div className="stamp" style={{
              color: decisionColor, transform: 'rotate(-2deg)', whiteSpace: 'nowrap',
            }}>
              → {decisionLabel}
            </div>
          </div>

          <div style={{
            marginTop: 10, fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--ink-mute)', lineHeight: 1.6,
          }}>
            // smart mode: allow &lt; 40 · prompt 40–69 · block ≥ 70
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, weight, code, delay = 0 }) {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const sign = weight > 0 ? '+' : weight < 0 ? '−' : ' ';
  const color = weight > 0 ? 'var(--rouge)' : weight < 0 ? 'var(--forest)' : 'var(--ink-dim)';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 40px 130px', gap: 8,
      padding: '2px 0', opacity: show ? 1 : 0,
      transform: show ? 'translateX(0)' : 'translateX(-6px)',
      transition: 'all 0.25s',
    }}>
      <span style={{ color: 'var(--ink-2)' }}>{label}</span>
      <span style={{ color, fontWeight: 700, textAlign: 'right' }}>{sign}{Math.abs(weight)}</span>
      <span style={{ color: 'var(--ink-mute)', fontSize: 10, textAlign: 'right' }}>{code}</span>
    </div>
  );
}
