/* FLURZIHQ / Creative direction study 01
 * Original micro-interaction implementation. No external services or tracking.
 * Real product images and statuses supplied with the Flurzi site.
 */
(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const projects = {
    endnovel: {index:'01',name:'EndNovel',category:'READING & AUDIO',status:'VERSION 1 AVAILABLE',summary:'A home for digital reading, storytelling and audiobook entertainment.',image:'../media/endnovel.webp',alt:'EndNovel website showing a storytelling experience',bg:'#d6c7a8',fg:'#1c1915',type:'cover'},
    flurzi360: {index:'02',name:'Flurzi360',category:'WORKFORCE TECHNOLOGY',status:'VERSION 1 AVAILABLE',summary:'A global business workforce platform built around HR, compliance and operational oversight.',image:'../media/flurzi360-preview.webp',alt:'Flurzi360 identity and product artwork',bg:'#dce9e9',fg:'#142a36',type:'contain'},
    commit: {index:'03',name:'Flurzi Commit',category:'FINANCIAL COMMITMENTS',status:'PREPARING FOR LAUNCH',summary:'A structured savings and financial commitment platform preparing for launch.',image:'../media/commit-brand.webp',alt:'Flurzi Commit brand identity',bg:'#ceded6',fg:'#1a3227',type:'contain'},
    flurzix: {index:'04',name:'FlurziX',category:'DIGITAL COMMERCE',status:'UNDER DEVELOPMENT',summary:'A commerce platform being developed around trust, verification, inspection and traceability.',image:'',bg:'#dbe7dc',fg:'#153c2d',type:'type'},
    flurzirush: {index:'05',name:'FlurziRush',category:'GAMING & INTERACTION',status:'UNDER DEVELOPMENT',summary:'Gaming and interactive entertainment, with room for future community experiences.',image:'../media/flurzirush-thumb.webp',alt:'FlurziRush brand artwork',bg:'#e2d9cb',fg:'#342917',type:'contain'},
    cortex: {index:'06',name:'Flurzi Cortex',category:'INTELLIGENT SYSTEMS',status:'UNDER DEVELOPMENT',summary:'Intelligent technology systems and supporting infrastructure.',image:'',bg:'#d3dfd4',fg:'#153927',type:'type'},
    cinema: {index:'07',name:'Flurzi Cinema',category:'FILM & ENTERTAINMENT',status:'IN DEVELOPMENT',summary:'A digital film and entertainment platform in development.',image:'../media/cinema.webp',alt:'Flurzi Cinema website preview',bg:'#d9d3c8',fg:'#24221c',type:'cover'}
  };

  const activeWipes = new WeakMap();
  function imageWipe(container, nextEl) {
    const running = activeWipes.get(container);
    if (running) { running.cancel(); activeWipes.delete(container); }
    if (prefersReducedMotion.matches || !nextEl.animate) {
      container.replaceChildren(nextEl);
      return;
    }
    const previous = container.lastElementChild;
    container.replaceChildren(...(previous ? [previous] : []), nextEl);
    nextEl.style.position = 'absolute';
    nextEl.style.inset = '0';
    nextEl.style.width = '100%';
    nextEl.style.height = '100%';
    nextEl.style.zIndex = '2';
    const animation = nextEl.animate([
      {clipPath:'inset(0 100% 0 0)',transform:'translateX(4%) scale(1.055)'},
      {clipPath:'inset(0 0% 0 0)',transform:'translateX(0) scale(1)'}
    ],{duration:800,easing:'cubic-bezier(.19,1,.22,1)',fill:'forwards'});
    activeWipes.set(container, animation);
    animation.finished.then(() => {
      if (activeWipes.get(container) !== animation) return;
      activeWipes.delete(container);
      nextEl.style.position = ''; nextEl.style.inset = ''; nextEl.style.width = '';
      nextEl.style.height = ''; nextEl.style.zIndex = '';
      container.replaceChildren(nextEl);
      animation.cancel();
    }).catch(() => {});
  }

  let currentHero = 'endnovel';
  function showHero(key) {
    if (!projects[key] || currentHero === key) return;
    const project = projects[key];
    currentHero = key;
    const container = $('#hero-art');
    const img = document.createElement('img');
    img.src = project.image; img.alt = project.alt;
    img.width = 1400; img.height = 900;
    img.style.objectFit = project.type === 'contain' ? 'contain' : 'cover';
    if(project.type === 'contain'){ img.style.background = '#e6eae9'; img.style.padding = '5%'; }
    imageWipe(container,img);
    $('#hero-image-count').textContent = `${project.index} / 07`;
    $('#hero-tag').textContent = project.category;
    $('#hero-name').textContent = project.name;
    $('#hero-link').href = `../products/${key}`;
    $('#hero-link').setAttribute('aria-label',`Discover ${project.name}`);
    $$('.hero-tab').forEach(tab => {const selected = tab.dataset.feature === key;tab.classList.toggle('is-active',selected);tab.setAttribute('aria-pressed',String(selected));});
  }
  $$('.hero-tab').forEach(tab => tab.addEventListener('click',()=>showHero(tab.dataset.feature)));

  let currentPortfolio = 'endnovel';
  function createProjectArt(project){
    if (!project.image) {
      const block = document.createElement('div');
      block.className = 'stage-type-art';
      const word = document.createElement('span');
      word.className = 'stage-type-word';
      word.textContent = project.name;
      block.append(word);
      return block;
    }
    const img = document.createElement('img');
    img.src = project.image; img.alt = project.alt;
    img.width = 1400; img.height = 900;
    return img;
  }
  function selectProject(key){
    if (!projects[key] || key === currentPortfolio) return;
    currentPortfolio = key;
    const project = projects[key];
    const stage = $('#portfolio-stage');
    stage.style.setProperty('--stage-bg',project.bg);
    stage.style.setProperty('--stage-fg',project.fg);
    const art = $('#stage-art');
    art.classList.toggle('stage-contain',project.type === 'contain');
    imageWipe(art,createProjectArt(project));
    $('#stage-index').textContent = project.index;
    $('#stage-category').textContent = project.category;
    $('#stage-label').textContent = project.status;
    $('#stage-name').textContent = project.name;
    $('#stage-summary').textContent = project.summary;
    $('#stage-link').href = `../products/${key}`;
    $('#stage-link').setAttribute('aria-label',`Explore ${project.name}`);
    $$('.portfolio-row').forEach(row => {const selected = row.dataset.project === key;row.classList.toggle('is-selected',selected);row.setAttribute('aria-pressed',String(selected));});
  }
  $$('.portfolio-row').forEach(row => {
    row.addEventListener('mouseenter',()=>selectProject(row.dataset.project));
    row.addEventListener('focus',()=>selectProject(row.dataset.project));
    row.addEventListener('click',()=>selectProject(row.dataset.project));
  });

  const menuToggle = $('.menu-toggle');
  const menu = $('#mobile-nav');
  function setMenu(open){menu.hidden = !open;menuToggle.setAttribute('aria-expanded',String(open));}
  menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
  $$('#mobile-nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key === 'Escape' && !menu.hidden){setMenu(false);menuToggle.focus();}});
  document.addEventListener('click',event=>{if(!menu.hidden && !menu.contains(event.target) && !menuToggle.contains(event.target))setMenu(false);});

  const revealEls = $$('[data-reveal]');
  if('IntersectionObserver' in window && !prefersReducedMotion.matches){
    const io = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}}),{threshold:.1,rootMargin:'0px 0px -4% 0px'});
    document.documentElement.classList.add('ready-reveal');
    revealEls.forEach(el=>io.observe(el));
  }
  const progress = $('.scroll-progress span');let ticking = false;
  const updateProgress = ()=>{const distance=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${distance>0?Math.min(100,window.scrollY/distance*100):0}%`;ticking=false;};
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress);}}, {passive:true});
  updateProgress();
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('is-introduced')));
})();
