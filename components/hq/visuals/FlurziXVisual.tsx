/** FlurziX — trust checklist. Every capability carries a Planned chip;
    nothing is presented as operational. */
const ITEMS=[
 {title:"Seller verification",body:"Planned checks on who buyers are dealing with."},
 {title:"Inspection information",body:"Planned coverage from confirmed providers."},
 {title:"Traceability",body:"Planned records to support transparency in commerce."},
];
export default function FlurziXVisual(){
 return <div className="hq-visual hq-visual-check">
  <div className="hq-visual-head"><span>Trust centre</span><span className="hq-visual-tag">In development</span></div>
  <ul>{ITEMS.map(i=><li key={i.title}><div><strong>{i.title}</strong><p>{i.body}</p></div><span className="hq-pill">Planned</span></li>)}</ul>
 </div>;
}
