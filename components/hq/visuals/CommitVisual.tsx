/** Flurzi Commit — structured savings concept. Integrations pending,
    so the connection CTA ships disabled with the reason beside it. */
const GOALS=[
 {name:"Emergency fund",progress:68},
 {name:"New laptop",progress:34},
 {name:"Holiday",progress:12},
];
export default function CommitVisual(){
 return <div className="hq-visual hq-visual-plan">
  <div className="hq-visual-head"><span>Savings plan</span><span className="hq-visual-tag">Concept preview</span></div>
  <ul>{GOALS.map(g=><li key={g.name}><span>{g.name}</span><span className="hq-meter" aria-hidden="true"><i style={{width:g.progress+"%"}}/></span></li>)}</ul>
  <button type="button" disabled aria-describedby="commit-visual-note">Connect an account</button>
  <p className="hq-visual-note" id="commit-visual-note">Integrations pending — no deposits, transfers or fund-custody services are available here.</p>
 </div>;
}
