const languageButtons=document.querySelectorAll('[data-language]');
function setLanguage(language){
 const lang=language==='en'?'en':'de';
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-de]').forEach(el=>{el.textContent=el.dataset[lang];});
 ['aria-label','alt','content'].forEach(attr=>document.querySelectorAll('[data-de-'+attr+']').forEach(el=>el.setAttribute(attr,el.getAttribute('data-'+lang+'-'+attr))));
 languageButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===lang)));
 try{localStorage.setItem('mico-language',lang);}catch{}
}
let savedLanguage='de';try{savedLanguage=localStorage.getItem('mico-language')||'de';}catch{}
setLanguage(savedLanguage);
languageButtons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
const y=document.querySelector('#year');if(y)y.textContent=String(new Date().getFullYear());
const reveal=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver'in window){const obs=new IntersectionObserver((entries)=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('is-visible');obs.unobserve(target)}})},{threshold:.12});reveal.forEach(el=>obs.observe(el));}else{reveal.forEach(el=>el.classList.add('is-visible'))}
const source=document.getElementById('gallery-data');
if(source){
 const items=JSON.parse(source.textContent),modal=document.getElementById('lightbox'),image=document.getElementById('lightbox-image'),counter=document.getElementById('lightbox-counter');
 let current=0,tx=null;
 function showPhoto(index){current=(index+items.length)%items.length;const item=items[current];image.src=item.src;image.alt=document.querySelector(`[data-photo="${current}"] img`).alt;counter.textContent=String(current+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');}
 document.querySelectorAll('[data-photo]').forEach(btn=>btn.addEventListener('click',()=>{showPhoto(Number(btn.dataset.photo));modal.showModal();}));
 document.getElementById('lightbox-close').addEventListener('click',()=>modal.close());
 document.getElementById('lightbox-prev').addEventListener('click',()=>showPhoto(current-1));
 document.getElementById('lightbox-next').addEventListener('click',()=>showPhoto(current+1));
 modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
 modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}else if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1)}});
 const stage=document.getElementById('lightbox-stage');stage.addEventListener('touchstart',e=>{tx=e.changedTouches[0].screenX},{passive:true});stage.addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].screenX-tx;if(Math.abs(dx)>60)showPhoto(current+(dx>0?-1:1));tx=null},{passive:true});
}
