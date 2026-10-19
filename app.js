const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const smallScreen = window.matchMedia('(max-width: 600px)');
function syncMenu(){menuButton.hidden=!smallScreen.matches;navigation.hidden=smallScreen.matches;menuButton.setAttribute('aria-expanded','false')}
syncMenu();smallScreen.addEventListener('change',syncMenu);
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.hidden=!open});
navigation.addEventListener('click',e=>{if(e.target.closest('a')&&smallScreen.matches){navigation.hidden=true;menuButton.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&smallScreen.matches&&!navigation.hidden){navigation.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.focus()}});
const picker=document.querySelector('.format-picker');picker.hidden=false;
const desktop=matchMedia('(min-width:1001px)');
const status=document.querySelector('.format-status');
const formatNames={inperson:'Очный приём: DOCMED и DOCDETI.',online:'Онлайн-консультация: Express Doctor.'};
function selectFormat(value){picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.format===value)));document.querySelectorAll('[data-booking]').forEach(el=>el.classList.toggle('is-selected',el.dataset.booking===value));status.textContent=formatNames[value]}
picker.addEventListener('click',e=>{const b=e.target.closest('button');if(b)selectFormat(b.dataset.format)});
function applyDefaultFormat(){if(desktop.matches){selectFormat('inperson')}else{document.querySelectorAll('[data-booking]').forEach(el=>el.classList.remove('is-selected'));status.textContent=''}}
desktop.addEventListener('change',applyDefaultFormat);applyDefaultFormat();
// Animate from the readable layout, so a failed script never leaves hidden content.
if (!reduceMotion.matches && typeof IntersectionObserver !== 'undefined') {
  const nodes = [...document.querySelectorAll('[data-reveal]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblingIndex = [...el.parentElement.children].indexOf(el);
      const listRow = el.matches('li,.video-link,.community-link');
      const picture = el.matches('img,.project-image');
      const from = picture ? {opacity:.4,transform:'scale(1.035)'} : listRow ? {opacity:.35,transform:'translateX(18px)'} : {opacity:.35,transform:'translateY(22px)'};
      el.animate([from,{opacity:1,transform:'none'}], {duration:picture?1000:700,delay:Math.min(siblingIndex,3)*70,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
      observer.unobserve(el);
    });
  }, {threshold:.08});
  nodes.forEach(el=>observer.observe(el));
  const portrait=document.querySelector('.hero-portrait');
  portrait.animate([{opacity:.45,transform:'translateX(24px) scale(1.10)'},{opacity:1,transform:'none'}],{duration:1200,easing:'cubic-bezier(.22,1,.36,1)'});
  let framePending=false;
  function movePortrait(){if(framePending||document.hidden)return;framePending=true;requestAnimationFrame(()=>{const progress=Math.min(1,Math.max(0,window.scrollY/700));portrait.style.transform=`scale(${1+progress*.035})`;framePending=false})}
  window.addEventListener('scroll',movePortrait,{passive:true});
}
