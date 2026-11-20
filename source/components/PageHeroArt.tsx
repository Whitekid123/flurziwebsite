/** Purpose-built editorial hero artwork using existing Flurzi images and typography.
 * Decorative only: company claims, product stages and navigation live in the page text. */
export type PageArtKind = "about" | "products" | "innovation" | "partnerships" | "contact" | "faq" | "testing" | "policy";

const artwork: Record<string, {src:string; label:string}> = {
  story: {src:"/flagship/assets/endnovel-art.webp", label:"EndNovel"},
  workforce: {src:"/flagship/assets/sponsorsafe.webp", label:"Flurzi360"},
  cinema: {src:"/flagship/assets/cinema-art.webp", label:"Flurzi Cinema"},
  games: {src:"/flagship/assets/flurzirush-art.webp", label:"FlurziRush"},
};

function ImageFrame({kind,number,className=""}:{kind:keyof typeof artwork;number:string;className?:string}){
  const image=artwork[kind];
  return <figure className={"cinema-art-frame "+className} data-cinema-image>
    <img src={image.src} alt="" loading="eager" decoding="async"/>
    <figcaption><span>{number}</span><span>{image.label}</span></figcaption>
  </figure>;
}

export default function PageHeroArt({kind}:{kind:PageArtKind}) {
  return <div className={"cinema-art cinema-art--"+kind} aria-hidden="true">
    {kind==="about"&&<>
      <ImageFrame kind="story" number="01" className="cinema-art-main"/>
      <ImageFrame kind="workforce" number="02" className="cinema-art-secondary"/>
      <span className="cinema-art-oversize" data-cinema-type>07</span>
      <span className="cinema-art-bottom-note">ONE COMPANY / SEVEN DISTINCT PLATFORMS</span>
    </>}
    {kind==="products"&&<>
      <ImageFrame kind="story" number="01" className="cinema-art-main"/>
      <ImageFrame kind="games" number="05" className="cinema-art-secondary"/>
      <ImageFrame kind="workforce" number="02" className="cinema-art-tertiary"/>
      <span className="cinema-art-bottom-note">OUR WORK IS NOT ONE THING.</span>
    </>}
    {kind==="innovation"&&<>
      <div className="cinema-innovation-frame" data-cinema-image>
        <img src={artwork.workforce.src} alt="" loading="eager"/>
        <div className="cinema-innovation-coordinate"><span>01 / HUMAN NEEDS</span><span>02 / PRODUCT DESIGN</span><span>03 / DEVELOPMENT</span></div>
      </div>
      <span className="cinema-art-oversize cinema-art-technical" data-cinema-type>FORM</span>
      <span className="cinema-art-bottom-note">INSPIRED BY REAL USE. BUILT TO EVOLVE.</span>
    </>}
    {kind==="partnerships"&&<>
      <div className="cinema-letter-stage" data-cinema-image><span className="cinema-letter-kicker">AN OPEN CONVERSATION</span><strong>GOOD<br/><i>IDEAS</i><br/>MEET.</strong><span className="cinema-letter-arrow">↗</span></div>
      <span className="cinema-art-bottom-note">A CONVERSATION IS WHERE IT STARTS.</span>
    </>}
    {kind==="contact"&&<>
      <div className="cinema-letter-stage cinema-contact-type" data-cinema-image><span className="cinema-letter-kicker">FLURZIHQ / CONTACT</span><strong>LET’S<br/><i>TALK.</i></strong><span className="cinema-letter-arrow">↗</span></div>
      <span className="cinema-art-bottom-note">A DIRECT LINE TO THE COMPANY.</span>
    </>}
    {kind==="faq"&&<>
      <div className="cinema-letter-stage cinema-qa-type" data-cinema-image><span className="cinema-letter-kicker">ANSWERS / INFORMATION</span><strong>Q<span>/</span>A</strong><span className="cinema-letter-foot">CLARITY, NOT ASSUMPTIONS.</span></div>
      <span className="cinema-art-bottom-note">FIND THE INFORMATION THAT MATTERS.</span>
    </>}
    {kind==="testing"&&<>
      <div className="cinema-qa-frame" data-cinema-image><img src={artwork.workforce.src} alt="" loading="eager"/><span className="cinema-qa-corner top">01 / OBSERVE</span><span className="cinema-qa-corner bottom">02 / REPORT</span><span className="cinema-qa-reticle a"/><span className="cinema-qa-reticle b"/></div>
      <span className="cinema-art-bottom-note">SEE THE DETAIL. SHARE THE FEEDBACK.</span>
    </>}
    {kind==="policy"&&<>
      <div className="cinema-letter-stage cinema-policy-type" data-cinema-image><span className="cinema-letter-kicker">FLURZIHQ / INFORMATION</span><strong>IN<br/><i>WRITING.</i></strong><span className="cinema-letter-foot">FLURZI LIMITED</span></div>
      <span className="cinema-art-bottom-note">CLEAR INFORMATION. IN ONE PLACE.</span>
    </>}
  </div>;
}
