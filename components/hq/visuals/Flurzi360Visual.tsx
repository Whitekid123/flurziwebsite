/** Flurzi360 — workforce compliance table. Rows are illustrative
    examples of record types, not real employee data. */
const ROWS=[
 {record:"Right-to-work check",detail:"Evidence on file",state:"On file",tone:"ok"},
 {record:"Contract",detail:"Renewal approaching",state:"Expiring soon",tone:"warn"},
 {record:"Training record",detail:"Exported for audit",state:"On file",tone:"ok"},
] as const;
export default function Flurzi360Visual(){
 return <div className="hq-visual hq-visual-table">
  <div className="hq-visual-head"><span>Compliance overview</span><span className="hq-visual-tag">Illustrative preview</span></div>
  <table>
   <thead><tr><th scope="col">Record</th><th scope="col">Detail</th><th scope="col">Status</th></tr></thead>
   <tbody>{ROWS.map(r=><tr key={r.record}><td>{r.record}</td><td>{r.detail}</td><td><span className={"hq-pill tone-"+r.tone}>{r.state}</span></td></tr>)}</tbody>
  </table>
  <p className="hq-visual-note">Example record types. Availability depends on the selected plan and jurisdiction.</p>
 </div>;
}
