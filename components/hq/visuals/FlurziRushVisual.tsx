/** FlurziRush — game shelf built on the existing brand thumbnail,
    with the no-cash-rewards position stated on the visual itself. */
export default function FlurziRushVisual(){
 return <div className="hq-visual hq-visual-shelf">
  <div className="hq-visual-head"><span>Game shelf</span><span className="hq-visual-tag">In development</span></div>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src="/media/flurzirush-thumb.webp" alt="" width={1000} height={1000} loading="lazy" decoding="async"/>
  <div className="hq-shelf-rows" aria-hidden="true"><i/><i/><i/></div>
  <span className="hq-pill">No cash rewards at launch</span>
 </div>;
}
