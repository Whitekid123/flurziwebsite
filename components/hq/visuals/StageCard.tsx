/** Typographic stage card for platforms without artwork.
    Never a grey box: category, name and honest status. */
export default function StageCard({category,name,status}:{category:string;name:string;status:string}){
 return <div className="hq-visual-stage" aria-hidden="true">
  <span>{category}</span>
  <strong>{name}</strong>
  <span>{status} · A FLURZIHQ platform</span>
 </div>;
}
