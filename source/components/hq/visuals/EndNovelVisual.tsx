/** EndNovel — operational reader shell. Illustrative preview;
    the live catalogue lives on EndNovel itself. */
export default function EndNovelVisual(){
 return <div className="hq-visual hq-visual-reader">
  <div className="hq-reader-bar"><span aria-hidden="true">← Library</span><span>Chapter Twelve</span></div>
  <p className="hq-reader-title">The Harbour Light</p>
  <div className="hq-reader-lines" aria-hidden="true">
   <i style={{width:"100%"}}/><i style={{width:"97%"}}/><i style={{width:"100%"}}/>
   <i style={{width:"88%"}}/><i style={{width:"100%"}}/><i style={{width:"94%"}}/>
  </div>
  <div className="hq-reader-progress"><span>Chapter progress</span><span className="hq-meter"><i style={{width:"64%"}}/></span></div>
  <div className="hq-reader-audio"><span>Audiobook</span><span className="hq-play" aria-hidden="true">▷ Listen</span></div>
  <span className="hq-visual-tag">Illustrative preview</span>
 </div>;
}
