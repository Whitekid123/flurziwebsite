/** Flurzi Cortex — concept architecture diagram. Labelled as a diagram,
    not a live system map. */
export default function CortexVisual(){
 return <div className="hq-visual hq-visual-diagram">
  <div className="hq-visual-head"><span>Systems overview</span><span className="hq-visual-tag">Concept diagram</span></div>
  <svg viewBox="0 0 560 220" role="img" aria-label="Concept diagram: inputs flow into Flurzi Cortex, which feeds applications and infrastructure">
   <line x1="140" y1="60" x2="240" y2="110"/><line x1="140" y1="160" x2="240" y2="110"/>
   <line x1="330" y1="110" x2="430" y2="60"/><line x1="330" y1="110" x2="430" y2="160"/>
   <rect x="30" y="38" width="110" height="44" rx="2"/><rect x="30" y="138" width="110" height="44" rx="2"/>
   <rect x="240" y="78" width="90" height="64" rx="2" className="core"/>
   <rect x="430" y="38" width="110" height="44" rx="2"/><rect x="430" y="138" width="110" height="44" rx="2"/>
   <text x="85" y="57">Data</text><text x="85" y="72">sources</text>
   <text x="85" y="157">Workflows</text><text x="85" y="172">events</text>
   <text x="285" y="104">Flurzi</text><text x="285" y="121">Cortex</text>
   <text x="485" y="57">Platform</text><text x="485" y="72">features</text>
   <text x="485" y="157">Supporting</text><text x="485" y="172">infrastructure</text>
  </svg>
  <p className="hq-visual-note">Specific models, APIs and access arrangements have not been announced.</p>
 </div>;
}
