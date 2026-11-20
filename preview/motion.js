/* FLURZIHQ — scroll-directed typography and product storytelling.
   All choreography is drawn from real supplied product visuals; no stock assets.
   Native scroll controls camera progression. Reduced motion receives complete static content. */
(()=>{'use strict';
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
 const clamp=(v)=>Math.max(0,Math.min(1,v));
 const ease=(v)=>{const t=clamp(v);return t*t*(3-2*t)};
 const lerp=(a,b,t)=>a+(b-a)*t;
 const by=(p,a,b)=>ease((p-a)/(b-a));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=$('.film-track'),heroStage=$('.film-stage'),heroMedia=$('#film-hero-media'),heroArt=$('.film-hero-media-image');
 const heroCopy=$('.film-hero-copy'),heroTop=$('.film-hero-top'),heroBottom=$('.film-hero-bottom'),heroOutline=$('.film-outline');
 const frames=[$('#frame-novel'),$('#frame-work'),$('#frame-cinema')];
 const captions=frames.map(f=>$('.cinema-caption',f));const images=frames.map(f=>$('.cinema-scene-bg',f));
 const final=$('#cinema-end'),endLines=$$('.end-copy-line'),progressFilm=$('.film-progress'),progressFilmBar=$('#film-progress-indicator');
 const featuresTrack=$('.features-track'),featuresStage=$('.features-stage'),features=$$('.feature-panel'),featureLabels=$$('#feature-page-label'),featureSteps=$$('.features-pagination i');
 const progressLine=$('#progress-line'),desktop=()=>innerWidth>740,pinnedPortfolio=()=>innerWidth>740&&innerHeight>690;
 const chapterIndex=$('#film-chapter-index'),chapterName=$('#film-progress-chapter');let lastChapter=-1;
 let target=0,current=0,featureTarget=0,featureCurrent=0,raf=0,lastWidth=innerWidth;
 const coords=(element)=>{const r=element.getBoundingClientRect();return {top:r.top+scrollY,length:element.offsetHeight-innerHeight}};
 let filmCoords=coords(hero),featureCoords=coords(featuresTrack);
 function recalc(){filmCoords=coords(hero);featureCoords=coords(featuresTrack);lastWidth=innerWidth;render();}
 function updateTargets(){target=clamp((scrollY-filmCoords.top)/Math.max(1,filmCoords.length));featureTarget=clamp((scrollY-featureCoords.top)/Math.max(1,featureCoords.length));if(!raf)raf=requestAnimationFrame(tick)}
 function tick(){raf=0;current=lerp(current,target,.18);featureCurrent=lerp(featureCurrent,featureTarget,.18);if(Math.abs(current-target)<.0002)current=target;if(Math.abs(featureCurrent-featureTarget)<.0002)featureCurrent=featureTarget;render();if(Math.abs(current-target)>.0002||Math.abs(featureCurrent-featureTarget)>.0002)raf=requestAnimationFrame(tick)}
 function render(){const p=current,f=featureCurrent;
  progressLine.style.transform=`scaleX(${clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))})`;
  if(reduced.matches){return;}
  const vw=innerWidth,vh=innerHeight,gutter=desktop()?Math.max(24,Math.min(85,vw*.048)):24;
  const small=!desktop();
  // Opening: the actual EndNovel art moves from a gallery photograph into a full-screen cinematic field.
  const open=by(p,.10,.30),vanish=by(p,.12,.29);
  const short=vh<=540,splitSmall=small&&vw>=500&&!short;
  const frac=short?(small?{width:.39,height:.56,top:.30}:{width:.39,height:.56,top:.29}):splitSmall?{width:.42,height:.54,top:.29}:small?{width:.63,height:.36,top:.55}:{width:.38,height:.59,top:.24};
  const from={left:vw-gutter-vw*frac.width,top:vh*frac.top,width:vw*frac.width,height:vh*frac.height};
  heroMedia.style.right='auto';
  heroMedia.style.left=lerp(from.left,0,open)+'px';heroMedia.style.top=lerp(from.top,0,open)+'px';
  heroMedia.style.width=lerp(from.width,vw,open)+'px';heroMedia.style.height=lerp(from.height,vh,open)+'px';
  heroMedia.style.boxShadow=`0 45px 130px rgba(6,24,15,${.33*(1-open)})`;
  heroMedia.style.borderWidth=lerp(1,0,open)+'px';
  heroArt.style.transform=`scale(${lerp(1.07,1.22,open)}) translate3d(${lerp(0,-3,open)}%,0,0)`;
  heroCopy.style.opacity=(1-vanish).toFixed(3);heroCopy.style.transform=`translate3d(${lerp(0,-7,vanish)}vw,${lerp(0,-11,vanish)}vh,0)`;
  heroTop.style.opacity=String(.74*(1-by(p,.08,.24)));heroBottom.style.opacity=String(.72*(1-by(p,.07,.20)));
  heroOutline.style.opacity=String(.09+by(p,.04,.18)*.30);heroOutline.style.transform=`translate3d(${lerp(0,-2,open)}vw,${lerp(35,-20,open)}%,0)`;
  // Distinct scenes are shot-matched wipes. The captions live inside each frame.
  const reveals=[by(p,.265,.375),by(p,.455,.575),by(p,.652,.762)];
  frames.forEach((frame,i)=>{
   const t=reveals[i];const clip=i===1?`inset(0 0 0 ${(1-t)*100}%)`:`inset(${(1-t)*100}% 0 0 0)`;
   frame.style.clipPath=clip;
   const captionIn=by(p,[.335,.525,.705][i],[.407,.59,.775][i]);
   const captionOut=by(p,[.545,.735,.875][i],[.62,.80,.925][i]);
   const opacity=captionIn*(1-captionOut);
   captions[i].style.opacity=opacity.toFixed(3);
   captions[i].style.transform=`translate3d(0,${lerp(60,-18,captionIn)}px,0)`;
   images[i].style.transform=`scale(${lerp(1.14,1.025,by(p,[.24,.45,.65][i],[.48,.67,.83][i]))}) translate3d(${lerp(1,-2,by(p,[.24,.45,.65][i],[.48,.67,.83][i]))}%,0,0)`;
  });
  const end=by(p,.807,.913);final.style.clipPath=`inset(${(1-end)*100}% 0 0 0)`;
  endLines.forEach((line,i)=>{const t=by(p,.858+i*.013,.933+i*.015);line.style.transform=`translate3d(0,${(1-t)*95}px,0)`;line.style.opacity=String(t)});
  const chapter=p<.265?0:p<.455?1:p<.652?2:p<.807?3:4;
  if(chapter!==lastChapter){lastChapter=chapter;chapterIndex.textContent=String(chapter+1).padStart(2,'0');chapterName.textContent=['THE OPENING','STORIES & CULTURE','WORKFORCE TECHNOLOGY','DIGITAL ENTERTAINMENT','THE HEADQUARTERS'][chapter];chapterName.classList.remove('is-changing');void chapterName.offsetWidth;chapterName.classList.add('is-changing');}
  progressFilmBar.style.transform=`scaleX(${p})`;
  progressFilm.style.opacity=String(.72*(1-by(p,.80,.9)));
  // Product chapters: the following panel rises across the whole viewport while media glides independently.
  if(pinnedPortfolio()&&!reduced.matches){
   features.slice(1).forEach((panel,i)=>{const k=by(f,i===0?.235:.555,i===0?.41:.74);panel.style.clipPath=`inset(${(1-k)*100}% 0 0 0)`});
   const starts=[0,.26,.59],ends=[.42,.76,1];
   features.forEach((panel,i)=>{const vis=by(f,starts[i],Math.min(starts[i]+.18,ends[i]));const out=by(f,ends[i]-.16,ends[i]);const visual=$('.feature-visual',panel);const img=$('.feature-visual img',panel);visual.style.transform=`translate3d(0,${lerp(15,-7,vis)}px,0) rotate(${lerp(-.8,0,vis)}deg) scale(${lerp(.955,1.025,vis)})`;if(img)img.style.transform=`scale(${lerp(1.18,1,vis)}) translate3d(0,${-4*out}%,0)`;});
   const active=f<.33?0:f<.68?1:2;
   featureSteps.forEach((el,i)=>el.classList.toggle('is-active',i<=active));$('#feature-page-label').textContent=String(active+1).padStart(2,'0')+' / 03';
   features.forEach((panel,i)=>{const link=$('.feature-link',panel);if(link)link.tabIndex=i===active?0:-1;});
  }
  if(!pinnedPortfolio())features.forEach(panel=>{const link=$('.feature-link',panel);if(link)link.removeAttribute('tabindex');});
  window.__flurziMotion={filmProgress:+p.toFixed(3),featureProgress:+f.toFixed(3),stage: p>.91?'end':p>.65?'cinema':p>.45?'work':p>.26?'novel':'opening'};
 }
 function scroll(){updateTargets()}
 const onResize=()=>{recalc();scroll()};const onReduced=()=>{recalc();scroll()};
 window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',onResize,{passive:true});
 reduced.addEventListener('change',onReduced);
 // A mobile navigation overlay with touch/keyboard support; this is the second signature refinement.
 const menuTrigger=$('#shell-menu-trigger'),menuPanel=$('#shell-mobile-menu'),menuClose=$('#shell-mobile-menu-close');
 let menuOpen=false,menuOriginalOverflow='';
 function setMenu(open,restoreFocus=true){
  if(open===menuOpen)return;
  menuOpen=open;menuPanel.classList.toggle('is-open',open);menuPanel.inert=!open;
  menuPanel.setAttribute('aria-hidden',String(!open));menuTrigger.setAttribute('aria-expanded',String(open));menuTrigger.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
  document.body.classList.toggle('flurzi-menu-open',open);
  if(open){menuOriginalOverflow=document.body.style.overflow;document.body.style.overflow='hidden';window.__lenis?.stop();setTimeout(()=>{if(menuOpen)menuClose.focus({preventScroll:true})},40)}
  else{document.body.style.overflow=menuOriginalOverflow;window.__lenis?.start();if(restoreFocus)menuTrigger.focus({preventScroll:true});}
 }
 const toggleMenu=()=>setMenu(!menuOpen);
 const closeMenu=()=>setMenu(false);
 const onMenuKey=(e)=>{if(!menuOpen)return;
  if(e.key==='Escape'){e.preventDefault();closeMenu();return}
  if(e.key==='Tab'){const focusable=Array.from(menuPanel.querySelectorAll('button,a[href]')).filter(el=>!el.hasAttribute('disabled'));if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 };
 const onMenuResize=()=>{if(innerWidth>740&&menuOpen)setMenu(false,false)};
 menuTrigger.addEventListener('click',toggleMenu);menuClose.addEventListener('click',closeMenu);
 menuPanel.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',()=>setMenu(false,false)));
 window.addEventListener('keydown',onMenuKey);window.addEventListener('resize',onMenuResize);
 // Welcome with generous, precisely staggered line reveals. No artificial loading screen.
 const intro=()=>{if(!reduced.matches){document.body.classList.add('intro-ready')}else document.body.classList.add('intro-reduced')};
 if(document.fonts&&document.fonts.ready){document.fonts.ready.then(intro)}else intro();
 // The platform index reveals artwork around the pointer, but never replaces real navigation.
 const preview=$('#directory-hover'),previewImg=$('img',preview);let previewActive=false,tx=0,ty=0,cx=0,cy=0,pointerRaf=0;
 function follow(){pointerRaf=0;if(!previewActive)return;cx+=(tx-cx)*.23;cy+=(ty-cy)*.23;preview.style.left=cx+'px';preview.style.top=cy+'px';pointerRaf=requestAnimationFrame(follow)}
 $$('.directory-row').forEach(row=>{const src=row.dataset.preview;if(!src)return;
  row.addEventListener('pointerenter',e=>{if(e.pointerType==='touch'||reduced.matches||!desktop())return;previewImg.src=src;tx=e.clientX+75;ty=e.clientY-35;cx=tx;cy=ty;previewActive=true;preview.classList.add('is-visible');if(!pointerRaf)pointerRaf=requestAnimationFrame(follow)});
  row.addEventListener('pointermove',e=>{tx=Math.min(innerWidth-190,Math.max(150,e.clientX+75));ty=Math.min(innerHeight-110,Math.max(140,e.clientY-25))});
  row.addEventListener('pointerleave',()=>{previewActive=false;preview.classList.remove('is-visible');if(pointerRaf)cancelAnimationFrame(pointerRaf);pointerRaf=0});
 });
 // Small, deliberate typography movement in the editorial sections.
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('has-entered');observer.unobserve(e.target)}})},{rootMargin:'0px 0px -15% 0px',threshold:0.05});
 $$('.manifesto-main h2,.work-opening-typography h2,.directory-intro h2,.close h2').forEach(el=>observer.observe(el));
 recalc();scroll();
 window.__flurziExperienceCleanup=()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',onResize);reduced.removeEventListener('change',onReduced);observer.disconnect();if(menuOpen)setMenu(false,false);menuTrigger.removeEventListener('click',toggleMenu);menuClose.removeEventListener('click',closeMenu);window.removeEventListener('keydown',onMenuKey);window.removeEventListener('resize',onMenuResize);if(raf)cancelAnimationFrame(raf);if(pointerRaf)cancelAnimationFrame(pointerRaf);delete window.__flurziExperienceCleanup;};
})();
