/** Flurzi Cinema — editorial strands. Strands only, no catalogue titles:
    a public website does not indicate an operational viewing service. */
const STRANDS=[
 {strand:"Originals",note:"Licensing TBC"},
 {strand:"Documentary",note:"Licensing TBC"},
 {strand:"Premieres",note:"Licensing TBC"},
];
export default function CinemaVisual(){
 return <div className="hq-visual hq-visual-cinema">
  <div className="hq-visual-head"><span>Programming strands</span><span className="hq-visual-tag">In development</span></div>
  <ul>{STRANDS.map(s=><li key={s.strand}><span className="hq-poster" aria-hidden="true"><i/></span><div><strong>{s.strand}</strong><p>{s.note}</p></div></li>)}</ul>
  <p className="hq-visual-note">Catalogue, features and launch availability will be confirmed by the platform.</p>
 </div>;
}
