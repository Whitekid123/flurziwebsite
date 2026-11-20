/* Offline QA companion, not the Next.js animation implementation.
   Native Web Animations approximate the actual GSAP secondary-page direction. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hero=document.querySelector('.hq-page-intro,.hq-product-intro');
 const header=document.querySelector('.editorial-header');
 let raf=false;
 const updateHeader=()=>{raf=false;if(header && hero){header.classList.toggle('on-dark',scrollY<hero.offsetHeight-115)}};
 window.addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(updateHeader)}},{passive:true});updateHeader();
 if(!reduce){
  const intro=hero?.querySelectorAll('.hq-eyebrow,h1,:scope > p,.hq-product-intro-bottom,.hq-detail-actions,.hq-back-link');
  intro?.forEach((el,i)=>el.animate([{transform:'translateY(36px)',opacity:.1,filter:'blur(3px)'},{transform:'translateY(0px)',opacity:1,filter:'blur(0px)'}],{duration:920,delay:80+i*100,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
  document.querySelectorAll('[data-cinema-image]').forEach((el,i)=>{
   el.animate([{clipPath:'inset(0 0 100% 0)',transform:'translateY(48px)'},{clipPath:'inset(0 0 0 0)',transform:'translateY(0)'}],{duration:1450,delay:220+i*130,easing:'cubic-bezier(.76,0,.24,1)',fill:'both'});
   const image=el.querySelector('img');if(image)image.animate([{transform:'scale(1.18)'},{transform:'scale(1)'}],{duration:1680,delay:220+i*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
  });
  const observer=new IntersectionObserver(entries=>{
   for(const x of entries){if(!x.isIntersecting)continue;
    if(x.target.matches('[data-cinema-chapter]'))x.target.querySelectorAll('.cinema-interlude-lines>span').forEach((line,i)=>line.animate([{transform:'translateY(65%)',opacity:.15},{transform:'translateY(0)',opacity:1}],{duration:1250,delay:i*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
    else x.target.animate([{transform:'translateY(30px)',opacity:.45},{transform:'translateY(0px)',opacity:1}],{duration:750,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
    observer.unobserve(x.target);
   }
  },{rootMargin:'0px 0px -12% 0px'});
  document.querySelectorAll('[data-cinema-chapter],.hq-scope-grid article,.hq-company-person,.hq-platform-row,.hq-opportunity-grid article,.hq-innovation-direction,.hq-faq-group,.hq-policy-content section').forEach(el=>observer.observe(el));
 }
 const menuBtn=document.querySelector('.editorial-menu-button');
 if(menuBtn){
  const hrefs=[['Home','index.html'],['Company','about.html'],['Ecosystem','products.html'],['Technology & Innovation','innovation.html'],['Partnerships','partnerships.html'],['Contact','contact.html'],['FAQs','faq.html']];
  let shell=null;let backdrop=null;
  function close(){shell?.remove();backdrop?.remove();shell=null;backdrop=null;menuBtn.setAttribute('aria-expanded','false');header?.classList.remove('menu-open');document.body.style.overflow='';updateHeader();menuBtn.focus({preventScroll:true});}
  menuBtn.addEventListener('click',()=>{
   if(shell){close();return;}
   backdrop=document.createElement('div');backdrop.className='menu-backdrop';backdrop.onclick=close;
   shell=document.createElement('div');shell.className='editorial-menu';shell.id='site-menu';shell.innerHTML='<nav aria-label="Expanded navigation">'+hrefs.map(([n,u])=>'<a href="./'+u+'"><span class="menu-link-label">'+n+'</span><span class="menu-link-arrow">↗</span></a>').join('')+'</nav><div class="menu-secondary"><div><p>Explore the company</p><a href="./testing-opportunity.html">Testing opportunities ↗</a></div><div><p>Need assistance?</p><a href="./faq.html">Frequently asked questions ↗</a></div></div>';
   header.appendChild(backdrop);header.appendChild(shell);header.classList.add('menu-open');menuBtn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';
   shell.querySelector('a')?.focus({preventScroll:true});
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&shell)close()});
 }
 const buttons=[...document.querySelectorAll('.hq-directory-filters button')];
 if(buttons.length){const rows=[...document.querySelectorAll('.hq-platform-row')],count=document.querySelector('.hq-directory-count');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
   const sector=btn.textContent.trim();buttons.forEach(el=>el.setAttribute('aria-pressed',String(el===btn)));
   let visible=0;rows.forEach(row=>{const show=sector==='All platforms'||row.dataset.sector===sector;row.hidden=!show;if(show)visible++});
   if(count)count.textContent=visible+' '+(visible===1?'platform':'platforms')+(sector==='All platforms'?' across the FLURZIHQ ecosystem':' in '+sector.toLowerCase());
  }));
 }
})();
