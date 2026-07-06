// NVISION — Pure JS
'use strict';

// ============ DATA ============
var SERVICES=[
{slug:'web',icon:'💻',title:'Premium Website Development',tag:'Code that performs like silk.',gradient:'linear-gradient(135deg,#22D3EE,#3B82F6)',deliverables:['Next.js architecture','WebGL & shaders','Headless CMS','Edge performance','WCAG AAA']},
{slug:'video',icon:'🎬',title:'Cinematic Video Editing',tag:'Frames that move the soul.',gradient:'linear-gradient(135deg,#38BDF8,#06B6D4)',deliverables:['Brand films','Color grading (DaVinci)','Sound design','Motion typography','Multi-aspect delivery']},
{slug:'brand',icon:'✦',title:'Brand Identity',tag:'Marks that age like memory.',gradient:'linear-gradient(135deg,#2DD4BF,#0891B2)',deliverables:['Logo systems','Typography & color','Voice & messaging','Motion brand','Brand book']},
{slug:'uiux',icon:'□',title:'UI/UX Design',tag:'Interfaces that disappear.',gradient:'linear-gradient(135deg,#3B82F6,#2DD4BF)',deliverables:['User research','Information architecture','Design systems','Prototypes','Usability testing']},
{slug:'direction',icon:'🧭',title:'Creative Direction',tag:'Vision, made inevitable.',gradient:'linear-gradient(135deg,#0EA5E9,#2563EB)',deliverables:['Creative strategy','Art direction','Cross-team alignment','Talent curation','Quality guardianship']},
{slug:'motion',icon:'⚡',title:'Motion Graphics',tag:'Movement as language.',gradient:'linear-gradient(135deg,#14B8A6,#0EA5E9)',deliverables:['Logo motion','UI motion','Explainers','Lottie delivery','Motion guide']}
];
var WEB_PROJECTS=[
{title:'Lumen Bank',cat:'Fintech',year:'2025',gradient:'linear-gradient(135deg,#3B82F6,#06B6D4)',summary:'Reinventing digital banking.',medium:'web',tags:['Web','Brand']},
{title:'Atlas Studio',cat:'Architecture',year:'2025',gradient:'linear-gradient(135deg,#F59E0B,#06B6D4)',summary:'A portfolio for impossible buildings.',medium:'web',tags:['Web','Motion']},
{title:'Halo AI',cat:'AI / SaaS',year:'2025',gradient:'linear-gradient(135deg,#3B82F6,#06B6D4)',summary:'Explains itself in 12 seconds.',medium:'web',tags:['Web','UI/UX']},
{title:'Verde Skincare',cat:'E-commerce',year:'2024',gradient:'linear-gradient(135deg,#2DD4BF,#06B6D4)',summary:'Ingredients as characters.',medium:'web',tags:['Web','Brand']},
{title:'Kinetic Festival',cat:'Event',year:'2024',gradient:'linear-gradient(135deg,#38BDF8,#3B82F6)',summary:'A site that reshuffles daily.',medium:'web',tags:['Web','Motion']}
];
var FILM_PROJECTS=[
{title:'Aurora — Launch Film',cat:'Brand Film',year:'2025',duration:'2:14',gradient:'linear-gradient(135deg,#3B82F6,#06B6D4)',summary:'5 countries in 9 days.',medium:'film',tags:['Video','Direction']},
{title:'Echoes — Docuseries',cat:'Documentary',year:'2024',duration:'6 × 8min',gradient:'linear-gradient(135deg,#0EA5E9,#3B82F6)',summary:'Artists rebuilding their practice.',medium:'film',tags:['Video','Direction']},
{title:'Nebula — Visualizer',cat:'Music Video',year:'2024',duration:'3:48',gradient:'linear-gradient(135deg,#2DD4BF,#3B82F6)',summary:'WebGL-driven music visualizer.',medium:'film',tags:['Video','Motion']},
{title:'Atlas — Process Film',cat:'Process Film',year:'2024',duration:'5:30',gradient:'linear-gradient(135deg,#38BDF8,#2DD4BF)',summary:'How a model becomes a building.',medium:'film',tags:['Video','Direction']}
];
var VALUES=[
{icon:'🎯',title:'Outcomes over outputs',desc:'We measure success in your business metrics, not our deliverables.'},
{icon:'💎',title:'Craft as advantage',desc:'We sweat the details other agencies don\'t because craft is the last sustainable moat.'},
{icon:'🧭',title:'Curiosity required',desc:'We only hire people who can\'t stop asking why.'},
{icon:'🛡️',title:'Honesty, even when expensive',desc:'We\'ll tell you when your idea won\'t work — even if it costs us the project.'}
];
var TEAM=[
{name:'Mira Vance',role:'Founder · Creative Director',bio:'Former art director at Pentagram. Believes the best design is the kind you don\'t notice.',accent:'#22D3EE'},
{name:'Kenji Ohara',role:'Partner · Engineering',bio:'Ex-Vercel. Wrote his first shader at 14. Believes performance is a feature.',accent:'#60A5FA'},
{name:'Lina Reyes',role:'Partner · Motion',bio:'Studied film before code. Treats every transition like a cut.',accent:'#7DD3FC'},
{name:'Adaeze Okwu',role:'Partner · Strategy',bio:'Ex-strategist at Wieden+Kennedy. The brief is the most important deliverable.',accent:'#2DD4BF'}
];
var STATS=[{val:120,suffix:'+',label:'Websites shipped',sub:'from fintech to fashion'},{val:85,suffix:'+',label:'Films delivered',sub:'brand, doc, music, process'},{val:30,suffix:'+',label:'Awards',sub:'Awwwards + film festivals'},{val:98,suffix:'%',label:'Client retention',sub:'they keep coming back'}];
var PRICING=[
{title:'Full project',dur:'8–14 weeks',price:'From $80k',desc:'End-to-end: discovery, direction, design, build, launch.',features:['Dedicated team of 3','Weekly previews','Launch + 30-day support']},
{title:'Sprint',dur:'2–4 weeks',price:'From $20k',desc:'A focused intervention — homepage redesign, brand refresh.',features:['Single deliverable','Daily check-ins','Working prototype']},
{title:'Partnership',dur:'Ongoing',price:'From $15k/mo',desc:'Quarterly retainer for living products.',features:['Quarterly iterations','Analytics review','Priority booking']}
];
var PHASES=[
{n:'01',t:'Discovery',d:'8:Week 1–2',desc:'We start by listening. Workshops, interviews, audits.',deliverables:['Strategy doc','Audit report','Creative brief']},
{n:'02',t:'Direction',d:'8:Week 2–4',desc:'We define the creative north star.',deliverables:['Creative direction','Mood boards','Proof of concept']},
{n:'03',t:'Design',d:'8:Week 4–8',desc:'Design system, page-level UX, hi-fi interfaces.',deliverables:['Design system','Hi-fi interfaces','Interactive prototype']},
{n:'04',t:'Build',d:'8:Week 6–12',desc:'Engineering and design in parallel.',deliverables:['Production code','CMS integration','Weekly previews']},
{n:'05',t:'Launch',d:'8:Week 12–14',desc:'We don\'t launch until it passes our bar.',deliverables:['Production launch','Performance audit','72h on-call']},
{n:'06',t:'Evolve',d:'Ongoing',desc:'Sites are living products.',deliverables:['Quarterly iterations','Analytics review','New chapters']}
];
var CODE={
html:'<section class="hero">\n  <div class="hero-inner">\n    <span class="eyebrow">Code & camera</span>\n    <h1 class="title">We build\n      <span class="accent">websites & films.</span>\n    </h1>\n    <p class="subtitle">\n      A creative studio shipping\n      premium sites and films.\n    </p>\n    <div class="cta-group">\n      <button class="cta primary">See work</button>\n      <button class="cta ghost">Start a project</button>\n    </div>\n  </div>\n</section>',
css:'.hero {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: linear-gradient(135deg, #0891b2, #1d4ed8);\n  color: white;\n}\n.title {\n  font-size: clamp(3rem, 10vw, 8rem);\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\n.accent {\n  background: linear-gradient(120deg, #67e8f9, #2dd4bf);\n  -webkit-background-clip: text;\n  color: transparent;\n  font-style: italic;\n}\n.cta.primary {\n  padding: 1rem 2rem;\n  border-radius: 999px;\n  background: white;\n  color: #0891b2;\n  cursor: pointer;\n}',
js:"const hero = document.querySelector('.hero');\nconst ctas = document.querySelectorAll('.cta');\nlet clicks = 0;\n\n// Magnetic button effect\nctas.forEach((cta) => {\n  cta.addEventListener('mousemove', (e) => {\n    const r = cta.getBoundingClientRect();\n    const x = e.clientX - r.left - r.width / 2;\n    const y = e.clientY - r.top - r.height / 2;\n    cta.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;\n  });\n  cta.addEventListener('click', () => {\n    clicks++;\n    console.log(`Clicked ${clicks}x`);\n  });\n});\n\n// Parallax on scroll\nwindow.addEventListener('scroll', () => {\n  hero.style.setProperty('--offset', window.scrollY * 0.3 + 'px');\n});"
};

// ============ LOADER ============
var loaded=false;
(function(){
var p=0;
var el=document.getElementById('loader-count');
var bar=document.getElementById('loader-bar');
var loader=document.getElementById('loader');
var iv=setInterval(function(){
p+=5;el.textContent=String(p).padStart(3,'0');bar.style.width=p+'%';
if(p>=100){clearInterval(iv);setTimeout(function(){loader.classList.add('hide');loaded=true;initAfterLoad();},400);}
},110);
})();

// ============ THEME ============
function toggleTheme(){
var h=document.documentElement;
if(h.classList.contains('light')){h.classList.remove('light');h.classList.add('dark');localStorage.setItem('nvision-theme','dark');}
else{h.classList.remove('dark');h.classList.add('light');localStorage.setItem('nvision-theme','light');}
updateThemeIcon();
}
function updateThemeIcon(){
var h=document.documentElement;var i=document.getElementById('theme-icon');
if(h.classList.contains('light')){i.innerHTML='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';}
else{i.innerHTML='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';}}
(function(){var t=localStorage.getItem('nvision-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}updateThemeIcon();})();

// ============ CURSOR ============
(function(){
if(!window.matchMedia('(hover:hover)').matches)return;
var dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
var mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';});
function tick(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';requestAnimationFrame(tick);}tick();
document.addEventListener('mouseover',function(e){var t=e.target;if(t.tagName==='BUTTON'||t.tagName==='A'||t.closest('button,a')){ring.style.width='48px';ring.style.height='48px';}else{ring.style.width='32px';ring.style.height='32px';}});
})();

// ============ FLYING CODE BG ============
(function(){
var canvas=document.getElementById('bg-canvas');var ctx=canvas.getContext('2d');
var tokens=[],links=[],linkId=0;
var CODE=['{}','()','[]','=>','fn','&&','||','</>','if','for','let','new','try','await','async','const','class','useState()','gsap.to()','<Hero />','framer-motion','clip-path','backdrop-filter','document.querySelector','requestAnimationFrame','transform:','@keyframes'];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();addEventListener('resize',resize);
for(var i=0;i<26;i++)tokens.push({id:i,x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-0.5)*0.22,vy:(Math.random()-0.5)*0.22,text:CODE[i%CODE.length],size:0.7+Math.random()*0.5,pulse:Math.random()*6.28});
for(var i=0;i<tokens.length;i++)for(var j=i+1;j<tokens.length;j++){var dx=tokens[i].x-tokens[j].x,dy=tokens[i].y-tokens[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<170&&Math.random()<0.3)links.push({a:i,b:j,born:0,ttl:0});}
addEventListener('click',function(e){var t=e.target;if(t.closest('button,a,input,textarea,.glass'))return;var x=e.clientX,y=e.clientY,near=[];tokens.forEach(function(t){var dx=t.x-x,dy=t.y-y,d=Math.sqrt(dx*dx+dy*dy);if(d<280)near.push({t:t,d:d});});if(near.length<2)return;near.sort(function(a,b){return a.d-b.d;});near=near.slice(0,3);var now=performance.now();for(var i=0;i<near.length;i++)for(var j=i+1;j<near.length;j++)links.push({a:near[i].t.id,b:near[j].t.id,born:now,ttl:3500,via:{x:x,y:y}});});
function render(){
ctx.clearRect(0,0,canvas.width,canvas.height);var now=performance.now();var isLight=document.documentElement.classList.contains('light');var tc=isLight?'59,130,246':'186,230,253';var lc=isLight?'14,165,233':'103,232,249';
links=links.filter(function(l){return l.ttl===0||now-l.born<l.ttl;});
for(var i=0;i<tokens.length;i++)for(var j=i+1;j<tokens.length;j++){var dx=tokens[i].x-tokens[j].x,dy=tokens[i].y-tokens[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<140){ctx.beginPath();ctx.moveTo(tokens[i].x,tokens[i].y);ctx.lineTo(tokens[j].x,tokens[j].y);ctx.strokeStyle='rgba('+(isLight?'59,130,246':'148,197,253')+','+(1-d/140)*(isLight?0.18:0.12)+')';ctx.lineWidth=0.5;ctx.stroke();}}
links.forEach(function(l){var a=tokens[l.a],b=tokens[l.b];var age=l.ttl===0?1:Math.max(0,1-(now-l.born)/l.ttl);var alpha=l.ttl===0?(isLight?0.25:0.18):0.6*age;ctx.beginPath();if(l.via){ctx.moveTo(a.x,a.y);ctx.lineTo(l.via.x,l.via.y);ctx.lineTo(b.x,b.y);}else{ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);}ctx.strokeStyle='rgba('+lc+','+alpha+')';ctx.lineWidth=l.via?1:0.7;ctx.stroke();if(l.via&&l.ttl!==0){ctx.beginPath();ctx.arc(l.via.x,l.via.y,3,0,6.28);ctx.fillStyle='rgba('+lc+','+alpha+')';ctx.fill();}});
ctx.textAlign='center';ctx.textBaseline='middle';
tokens.forEach(function(t){t.x+=t.vx;t.y+=t.vy;t.pulse+=0.012;var m=24;if(t.x<m){t.x=m;t.vx=Math.abs(t.vx);}if(t.x>canvas.width-m){t.x=canvas.width-m;t.vx=-Math.abs(t.vx);}if(t.y<70){t.y=70;t.vy=Math.abs(t.vy);}if(t.y>canvas.height-m){t.y=canvas.height-m;t.vy=-Math.abs(t.vy);}var s=Math.sqrt(t.vx*t.vx+t.vy*t.vy);if(s<0.06){t.vx+=(Math.random()-0.5)*0.02;t.vy+=(Math.random()-0.5)*0.02;}if(s>0.35){t.vx*=0.98;t.vy*=0.98;}var br=0.65+Math.sin(t.pulse)*0.12;ctx.font=(10*t.size)+"px 'JetBrains Mono',monospace";ctx.fillStyle='rgba('+tc+','+((isLight?0.4:0.32)*br)+')';ctx.fillText(t.text,t.x,t.y);});
requestAnimationFrame(render);}
render();
})();

// ============ SOUND ============
var soundOn=false,audioCtx=null,masterGain=null,ambientNodes=null;
function toggleSound(){
soundOn=!soundOn;document.getElementById('sound-icon-off').style.display=soundOn?'none':'block';document.getElementById('sound-icon-on').style.display=soundOn?'flex':'none';localStorage.setItem('nvision-sound',soundOn?'on':'off');
if(soundOn){if(!audioCtx){audioCtx=new(AudioContext||window.webkitAudioContext)();masterGain=audioCtx.createGain();masterGain.gain.value=0.5;masterGain.connect(audioCtx.destination);}if(audioCtx.state==='suspended')audioCtx.resume();startAmbient();}else{stopAmbient();}}
function startAmbient(){var pg=audioCtx.createGain();pg.gain.value=0.04;pg.connect(masterGain);var f=audioCtx.createBiquadFilter();f.type='lowpass';f.frequency.value=2200;f.Q.value=0.6;f.connect(pg);var lfo=audioCtx.createOscillator();var lg=audioCtx.createGain();lfo.frequency.value=0.06;lg.gain.value=400;lfo.connect(lg);lg.connect(f.frequency);lfo.start();var freqs=[130.81,164.81,196.0];var oscs=freqs.map(function(fr,i){var o=audioCtx.createOscillator();o.type='sine';o.frequency.value=fr;o.detune.value=(i-1)*4;o.connect(f);o.start();return o;});ambientNodes={stop:function(){clearTimeout(sw);var now=audioCtx.currentTime;pg.gain.cancelScheduledValues(now);pg.gain.setValueAtTime(pg.gain.value,now);pg.gain.linearRampToValueAtTime(0,now+0.6);setTimeout(function(){oscs.forEach(function(o){try{o.stop();}catch(e){}});try{lfo.stop();}catch(e){}},700);}};var sw=setTimeout(function(){var now=audioCtx.currentTime;pg.gain.linearRampToValueAtTime(0.055,now+5);pg.gain.linearRampToValueAtTime(0.04,now+10);sw=setTimeout(arguments.callee,16000);},8000);}
function stopAmbient(){if(ambientNodes){ambientNodes.stop();ambientNodes=null;}}
function playClick(){if(!soundOn||!audioCtx)return;var now=audioCtx.currentTime;var o=audioCtx.createOscillator();var g=audioCtx.createGain();o.type='sine';o.frequency.setValueAtTime(880,now);o.frequency.exponentialRampToValueAtTime(440,now+0.04);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(0.1,now+0.002);g.gain.exponentialRampToValueAtTime(0.001,now+0.04);o.connect(g);g.connect(masterGain);o.start(now);o.stop(now+0.1);}
document.addEventListener('click',function(e){if(e.target.closest('button,a,.glass,.work-card,.service-card'))playClick();});
(function(){if(localStorage.getItem('nvision-sound')==='on'){soundOn=true;document.getElementById('sound-icon-off').style.display='none';document.getElementById('sound-icon-on').style.display='flex';}})();

// ============ ROUTING ============
var currentPage='home';
function go(page){
if(page===currentPage)return;
var trans=document.getElementById('transition');
trans.classList.add('wipe-in');
setTimeout(function(){
document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
var np=document.getElementById('page-'+page);if(np)np.classList.add('active');
document.querySelectorAll('.nav-link').forEach(function(l){l.classList.toggle('active',l.dataset.page===page);});
currentPage=page;window.scrollTo(0,0);
setTimeout(function(){trans.classList.remove('wipe-in');trans.classList.add('wipe-out');setTimeout(function(){trans.classList.remove('wipe-out');},350);initPageAnimations(page);},50);
},350);
}
function toggleMenu(){document.getElementById('mobile-menu').classList.toggle('open');}

// ============ SPLIT TEXT ============
function initSplitText(){
document.querySelectorAll('.split-text').forEach(function(el){
if(el.dataset.init)return;el.dataset.init='1';
var text=el.dataset.text||el.textContent;el.textContent='';el.setAttribute('aria-label',text);
var words=text.split(' ');
words.forEach(function(w,i){
var span=document.createElement('span');var inner=document.createElement('span');inner.textContent=w+(i<words.length-1?'\u00a0':'');span.appendChild(inner);el.appendChild(span);
});
});
}
function revealSplitText(){
document.querySelectorAll('.split-text').forEach(function(el,i){
setTimeout(function(){el.classList.add('visible');},2500+i*100);
});
}

// ============ REVEAL ON SCROLL ============
var observer=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});
},{threshold:0.1,rootMargin:'-8% 0px -8% 0px'});
function observeReveals(){document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){observer.observe(el);});}

// ============ COUNTERS ============
function animateCounters(){
document.querySelectorAll('[data-count]').forEach(function(el){
if(el.dataset.done)return;el.dataset.done='1';
var target=parseInt(el.dataset.count),suffix=el.dataset.suffix||'';var start=0,dur=2500,t0=performance.now();
function tick(now){var t=Math.min((now-t0)/dur,1);var e=1-Math.pow(1-t,3);el.textContent=Math.floor(e*target)+suffix;if(t<1)requestAnimationFrame(tick);else el.textContent=target+suffix;}
requestAnimationFrame(tick);
});
}

// ============ MARQUEE ============
function initMarquee(id,items){
var track=document.getElementById(id);if(!track||track.dataset.init)return;track.dataset.init='1';
var html='';for(var r=0;r<4;r++)items.forEach(function(it){html+='<div class="marquee-item"><span>'+it+'</span><span class="star">✦</span></div>';});
track.innerHTML=html;
}

// ============ BUILD CONTENT ============
function buildServices(){
var grids=[document.getElementById('services-grid'),document.getElementById('services-full-grid')];
var html=SERVICES.map(function(s,i){
return '<div class="service-card glass" onclick="selectService(\''+s.slug+'\')" data-cursor="Explore"><div class="service-card-head"><div class="service-card-icon" style="background:'+s.gradient+'">'+s.icon+'</div><span class="service-card-num">'+String(i+1).padStart(2,'0')+'</span></div><h3 class="service-card-title">'+s.title+'</h3><p class="service-card-tag">'+s.tag+'</p><div class="service-card-foot"><span>Learn more</span><span>→</span></div></div>';
}).join('');
grids.forEach(function(g){if(g)g.innerHTML=html;});
}
function selectService(slug){
var s=SERVICES.find(function(x){return x.slug===slug;});if(!s)return;
var panel=document.getElementById('service-detail');if(!panel)return;
panel.innerHTML='<div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;border-radius:50%;opacity:0.2;filter:blur(60px);background:'+s.gradient+'"></div><div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:'+s.gradient+';font-size:16px">'+s.icon+'</div><span class="section-label">'+s.slug.toUpperCase()+' — Service detail</span></div><h2>'+s.title+'</h2><p>'+s.desc||s.tag+'</p><p class="detail-tagline">"'+s.tag+'"</p><div class="deliverables-title">What you get</div><ul class="deliverables">'+s.deliverables.map(function(d){return '<li>'+d+'</li>';}).join('')+'</ul>';
panel.classList.add('visible');
}
function buildValues(){var g=document.getElementById('values-grid');if(!g)return;g.innerHTML=VALUES.map(function(v,i){return '<div class="service-card glass"><div style="display:flex;gap:16px;align-items:flex-start"><div style="font-size:24px">'+v.icon+'</div><div><span class="service-card-num">'+String(i+1).padStart(2,'0')+'</span><h3 class="service-card-title" style="margin-top:4px">'+v.title+'</h3><p class="service-card-tag" style="margin-top:8px">'+v.desc+'</p></div></div></div>';}).join('');}
function buildTeam(){var g=document.getElementById('team-grid');if(!g)return;g.innerHTML=TEAM.map(function(m){return '<div class="service-card glass" style="position:relative;overflow:hidden"><div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;border-radius:50%;opacity:0.2;filter:blur(60px);background:'+m.accent+'"></div><div style="display:flex;align-items:center;gap:16px;margin-bottom:16px"><div style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Space Grotesk;font-size:20px;font-weight:600;color:#04060d;background:'+m.accent+'">'+m.name[0]+'</div><div><h3 style="font-family:Space Grotesk;font-size:20px;font-weight:600">'+m.name+'</h3><p style="font-size:13px;color:var(--muted)">'+m.role+'</p></div></div><p style="font-size:14px;color:var(--muted);line-height:1.7">'+m.bio+'</p></div>';}).join('');}
function buildStats(){var g=document.getElementById('stats-grid');if(!g)return;g.innerHTML=STATS.map(function(s,i){return '<div class="reveal"><span class="stat-item-tag">'+String(i+1).padStart(2,'0')+'</span><div class="stat-item-num" data-count="'+s.val+'" data-suffix="'+s.suffix+'">0</div><div class="stat-item-label">'+s.label+'</div><div class="stat-item-sub">'+s.sub+'</div></div>';}).join('');}
function buildPricing(){var g=document.getElementById('pricing-grid');if(!g)return;g.innerHTML=PRICING.map(function(p){return '<div class="pricing-card"><div style="flex:1"><div style="display:flex;align-items:baseline;gap:8px;margin-bottom:8px"><h3 class="pricing-title">'+p.title+'</h3><span class="pricing-duration">'+p.dur+'</span></div><p class="pricing-desc">'+p.desc+'</p><div class="pricing-features">'+p.features.map(function(f){return '<span class="pricing-feature">'+f+'</span>';}).join('')+'</div></div><div style="display:flex;align-items:center;gap:16px"><span class="pricing-price">'+p.price+'</span><button class="pricing-btn" onclick="go(\'contact\')">→</button></div></div>';}).join('');}
function buildPhases(){var g=document.getElementById('phases-list');if(!g)return;g.innerHTML=PHASES.map(function(p){return '<div class="phase-item"><div class="phase-dot"></div><div class="phase-left"><div class="phase-meta"><span>'+p.n+'</span><span>·</span><span>'+p.d+'</span></div><h3 class="phase-title">'+p.t+'</h3><p class="phase-desc">'+p.desc+'</p></div><div class="phase-right"><div class="phase-deliverables"><div class="phase-deliverables-label">Deliverables</div><ul>'+p.deliverables.map(function(d){return '<li>'+d+'</li>';}).join('')+'</ul></div></div></div>';}).join('');}

// ============ WORK ============
var currentWorkTab='web';
function setWorkTab(tab,btn){
currentWorkTab=tab;
document.querySelectorAll('#page-home .tab-btn').forEach(function(b){b.classList.remove('active');});
if(btn)btn.classList.add('active');
renderWorkGrid(tab);
}
function renderWorkGrid(type){
var grid=document.getElementById('work-grid');if(!grid)return;
var items=type==='film'?FILM_PROJECTS:WEB_PROJECTS;
grid.innerHTML=items.slice(0,3).map(function(p,i){
return '<div class="work-card '+(i===0?'large':'')+'" onclick="go(\'work\')" data-cursor="Open"><div class="work-card-img" style="background:'+p.gradient+'"></div><div class="work-card-overlay"></div><div class="work-card-badge">'+(p.medium==='web'?'💻':'🎬')+' '+(p.medium==='web'?'WEB':'FILM')+'</div><div class="work-card-arrow">→</div><div class="work-card-info"><div class="work-card-cat">'+p.cat+' — '+p.year+(p.duration?' · '+p.duration:'')+'</div><div class="work-card-title">'+p.title+'</div><div class="work-card-summary">'+p.summary+'</div></div></div>';
}).join('');
}
function buildFullWork(){
var grid=document.getElementById('work-full-grid');if(!grid)return;
var all=WEB_PROJECTS.concat(FILM_PROJECTS);
window._allWork=all;
renderFullWork('all','');
}
function renderFullWork(filter,query){
var grid=document.getElementById('work-full-grid');if(!grid)return;
var all=window._allWork||[];
var filtered=all.filter(function(p){
var matchF=filter==='all'||p.medium===filter;
var matchQ=!query||p.title.toLowerCase().indexOf(query)>=0||p.cat.toLowerCase().indexOf(query)>=0;
return matchF&&matchQ;
});
grid.innerHTML=filtered.map(function(p,i){
return '<div class="work-card '+(i===0||i===1?'large':'')+'" data-cursor="Open"><div class="work-card-img" style="background:'+p.gradient+'"></div><div class="work-card-overlay"></div><div class="work-card-badge">'+(p.medium==='web'?'💻':'🎬')+' '+(p.medium==='web'?'WEB':'FILM')+'</div><div class="work-card-arrow">→</div><div class="work-card-info"><div class="work-card-cat">'+p.cat+' — '+p.year+(p.duration?' · '+p.duration:'')+'</div><div class="work-card-title">'+p.title+'</div><div class="work-card-summary">'+p.summary+'</div></div></div>';
}).join('');
if(filtered.length===0)grid.innerHTML='<div style="text-align:center;padding:64px;color:var(--muted)">No projects found.</div>';
}
function filterWork(filter,btn){
document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active');});if(btn)btn.classList.add('active');
renderFullWork(filter,document.getElementById('search-input').value);
}
function searchWork(){var active=document.querySelector('.filter-btn.active');renderFullWork(active?active.textContent.includes('Film')?'film':active.textContent.includes('Website')?'web':'all':'all',document.getElementById('search-input').value);}

// ============ CODE TYPEWRITER ============
var currentLang='html',currentCodeEl='code-display',currentLabelEl='code-lang-label',typeTimer=null;
function switchCode(lang){
currentLang=lang;
document.querySelectorAll('.code-tab').forEach(function(t){t.classList.toggle('active',t.dataset.lang===lang);});
var el1=document.getElementById('code-display');var el2=document.getElementById('code-display-2');
var lab1=document.getElementById('code-lang-label');var lab2=document.getElementById('code-lang-label-2');
if(el1)el1.textContent='';if(el2)el2.textContent='';
if(lab1)lab1.textContent=lang.toUpperCase();if(lab2)lab2.textContent=lang.toUpperCase();
startTyping();
}
function startTyping(){
clearTimeout(typeTimer);
var code=CODE[currentLang];var i=0;
var els=[document.getElementById('code-display'),document.getElementById('code-display-2')].filter(Boolean);
function type(){
i++;els.forEach(function(el){el.textContent=code.slice(0,i);});
if(i<code.length){typeTimer=setTimeout(type,25);}
else{typeTimer=setTimeout(function(){var order=['html','css','js'];var idx=order.indexOf(currentLang);switchCode(order[(idx+1)%3]);},2000);}
}
type();
}

// ============ MINI SITE ============
var miniPages=['home','work','about','contact'];var miniPageIdx=0;var miniScrollDir=1;
function buildMiniSite(elId){
var el=document.getElementById(elId);if(!el||el.dataset.init)return;el.dataset.init='1';
el.innerHTML='<div class="mini-nav"><div class="mini-logo">◆ NVISION</div><div class="mini-nav-links">'+miniPages.map(function(p,i){return '<button class="mini-nav-link'+(i===0?' active':'')+'" onclick="switchMiniPage('+i+',\''+elId+'\')">'+p+'</button>';}).join('')+'</div></div><div class="mini-page" id="'+elId+'-page"></div>';
renderMiniPage(elId,0);
}
function renderMiniPage(elId,idx){
var p=document.getElementById(elId+'-page');if(!p)return;
var pages={home:'<div class="mini-label">[ 01 / Home ]</div><div class="mini-title">We build<br><span class="aurora">websites & films.</span></div><div class="mini-desc">A creative studio shipping premium sites and films.</div><div class="mini-cta">See work →</div><div class="mini-stats"><div class="mini-stat"><div class="mini-stat-num">120+</div><div class="mini-stat-label">sites</div></div><div class="mini-stat"><div class="mini-stat-num">85+</div><div class="mini-stat-label">films</div></div><div class="mini-stat"><div class="mini-stat-num">30+</div><div class="mini-stat-label">awards</div></div></div><div class="mini-cards"><div class="mini-card" style="background:linear-gradient(135deg,#3B82F6,#06B6D4)"><span>Lumen</span></div><div class="mini-card" style="background:linear-gradient(135deg,#0EA5E9,#3B82F6)"><span>Aurora</span></div></div>',
work:'<div class="mini-label">[ 02 / Work ]</div><div class="mini-title">Recent obsessions.</div><div style="display:flex;gap:4px;margin:8px 0"><span class="mini-stat" style="padding:2px 6px">all</span><span class="mini-stat" style="padding:2px 6px">web</span><span class="mini-stat" style="padding:2px 6px">film</span></div><div style="display:flex;flex-direction:column;gap:4px">+'+WEB_PROJECTS.slice(0,4).map(function(p){return '<div style="display:flex;align-items:center;gap:6px;padding:4px;border-radius:5px;background:rgba(255,255,255,0.04)"><div style="width:20px;height:20px;border-radius:4px;background:'+p.gradient+'"></div><div><div style="font-family:JetBrains Mono;font-size:5px;color:rgba(255,255,255,0.4);text-transform:uppercase">'+p.cat+'</div><div style="font-family:Space Grotesk;font-size:8px;font-weight:600;color:#fff">'+p.title+'</div></div></div>';}).join('')+'</div>',
about:'<div class="mini-label">[ 03 / About ]</div><div class="mini-title">Seven<br><span class="aurora">obsessives.</span></div><div class="mini-desc">A studio building the unforgettable.</div>'+TEAM.slice(0,4).map(function(m){return '<div style="display:flex;gap:4px;margin:4px 0;padding:4px;border-radius:5px;background:rgba(255,255,255,0.04)"><div style="width:14px;height:14px;border-radius:50%;background:'+m.accent+';display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;color:#04060d">'+m.name[0]+'</div><div><div style="font-family:Space Grotesk;font-size:7px;font-weight:600;color:#fff">'+m.name+'</div><div style="font-family:JetBrains Mono;font-size:5px;color:rgba(255,255,255,0.4);text-transform:uppercase">'+m.role+'</div></div></div>';}).join(''),
contact:'<div class="mini-label">[ 04 / Contact ]</div><div class="mini-title">Let\'s make<br><span class="aurora">something real.</span></div><div style="height:12px;border-radius:4px;background:rgba(255,255,255,0.06);margin:4px 0"></div><div style="height:12px;border-radius:4px;background:rgba(255,255,255,0.06);margin:4px 0"></div><div style="height:24px;border-radius:4px;background:rgba(255,255,255,0.06);margin:4px 0"></div><div style="height:14px;border-radius:99px;background:#fff;display:flex;align-items:center;justify-content:center;font-family:JetBrains Mono;font-size:7px;font-weight:600;color:#04060d;margin:4px 0">Send →</div>'};
p.innerHTML=pages[miniPages[idx]]||pages.home;
}
function switchMiniPage(idx,elId){
miniPageIdx=idx;
var el=document.getElementById(elId);
if(el)el.querySelectorAll('.mini-nav-link').forEach(function(l,i){l.classList.toggle('active',i===idx);});
renderMiniPage(elId,idx);
}
var miniAutoTimer=setInterval(function(){
var els=['mini-site','mini-site-2'];
els.forEach(function(id){var el=document.getElementById(id);if(el&&el.offsetParent!==null){miniPageIdx=(miniPageIdx+1)%miniPages.length;switchMiniPage(miniPageIdx,id);}});
},4000);

// ============ DEVICE TOGGLE ============
function setDevice(device){
document.querySelectorAll('.device-btn').forEach(function(b){b.classList.toggle('active',b.dataset.device===device);});
var screen=document.getElementById('preview-screen');if(!screen)return;
var sizes={desktop:['100%','100%'],tablet:['280px','100%'],mobile:['160px','100%']};
var s=sizes[device]||sizes.desktop;
screen.style.width=s[0];screen.style.height='440px';
var sizeLabel=document.getElementById('device-size');
if(sizeLabel)sizeLabel.textContent=(device==='mobile'?'375 × 667':device==='tablet'?'768 × 1024':'1440 × 900')+' · 60fps';
}
function reloadPreview(){
var els=['mini-site','mini-site-2'];
els.forEach(function(id){var el=document.getElementById(id);if(el){el.dataset.init='';buildMiniSite(id);}});
}

// ============ VIDEO TIMELINE ============
var timelineTool='cut';
function buildVideoTimeline(){
var el=document.getElementById('video-timeline');if(!el||el.dataset.init)return;el.dataset.init='1';
var clips={
cut:[{track:0,start:0,w:18,label:'INT. ROOM — DAWN',g:'linear-gradient(90deg,#3B82F6,#06B6D4)'},{track:0,start:19,w:14,label:'EXT. STREET',g:'linear-gradient(90deg,#06B6D4,#2DD4BF)'},{track:0,start:34,w:22,label:'CU. HANDS',g:'linear-gradient(90deg,#2DD4BF,#38BDF8)'},{track:0,start:57,w:16,label:'WIDE. CITY',g:'linear-gradient(90deg,#38BDF8,#3B82F6)'},{track:0,start:74,w:25,label:'OUTRO — DUSK',g:'linear-gradient(90deg,#3B82F6,#06B6D4)'},{track:1,start:0,w:40,label:'AMBIENCE',g:'linear-gradient(90deg,#1e3a5f,#0e2a4a)'},{track:1,start:41,w:35,label:'SCORE — CELLO',g:'linear-gradient(90deg,#0e2a4a,#1e3a5f)'},{track:1,start:77,w:22,label:'VO',g:'linear-gradient(90deg,#1e3a5f,#0e2a4a)'}],
color:[{track:0,start:0,w:18,label:'BEFORE',g:'linear-gradient(90deg,#6b7280,#4b5563)'},{track:0,start:19,w:14,label:'BEFORE',g:'linear-gradient(90deg,#4b5563,#6b7280)'},{track:0,start:34,w:22,label:'AFTER',g:'linear-gradient(90deg,#3B82F6,#06B6D4)'},{track:0,start:57,w:16,label:'AFTER',g:'linear-gradient(90deg,#06B6D4,#2DD4BF)'},{track:0,start:74,w:25,label:'GRADE',g:'linear-gradient(90deg,#2DD4BF,#38BDF8)'}],
sound:[{track:0,start:0,w:100,label:'MASTER',g:'linear-gradient(90deg,#1e3a5f,#06B6D4,#1e3a5f)'},{track:1,start:0,w:30,label:'ROOM TONE',g:'linear-gradient(90deg,#1e3a5f,#0e2a4a)'},{track:1,start:31,w:28,label:'FOLEY',g:'linear-gradient(90deg,#0e2a4a,#1e3a5f)'},{track:1,start:60,w:18,label:'SCORE',g:'linear-gradient(90deg,#1e3a5f,#0e2a4a)'},{track:1,start:79,w:20,label:'VO + FX',g:'linear-gradient(90deg,#0e2a4a,#1e3a5f)'}]
};
var tools=[{id:'cut',icon:'✂',label:'Edit'},{id:'color',icon:'🎨',label:'Color'},{id:'sound',icon:'🎵',label:'Sound'}];
var html='<div class="timeline-header"><div class="timeline-title">aurora-launch-film.prproj</div><div class="timeline-tabs">'+tools.map(function(t){return '<button class="timeline-tab'+(t.id==='cut'?' active':'')+'" onclick="switchTimeline(\''+t.id+'\')">'+t.icon+' '+t.label+'</button>';}).join('')+'</div></div>';
html+='<div class="timeline-preview"><div class="timeline-preview-bg" id="timeline-bg"></div><div class="timeline-play">▶</div><div class="timeline-timecode" id="timeline-tc">00:00:00:00 / 00:00:08:00</div><div class="timeline-badge" id="timeline-badge">EDITING</div></div>';
html+='<div class="timeline-tracks"><div class="timeline-ruler"><div class="timeline-ruler-line"></div>';
[0,25,50,75,100].forEach(function(t){html+='<div class="timeline-mark" style="left:'+t+'%"><div class="timeline-mark-tick"></div><span class="timeline-mark-label">'+formatTC(t)+'</span></div>';});
html+='<div class="timeline-playhead" id="timeline-playhead" style="left:0%"></div></div>';
html+='<div class="timeline-track"><span class="timeline-track-label">V1</span><div class="timeline-track-area" id="track-v1"></div></div>';
html+='<div class="timeline-track"><span class="timeline-track-label">A1</span><div class="timeline-track-area" id="track-a1"></div></div></div>';
html+='<div class="timeline-controls"><span id="timeline-info">8 clips · 4K · ProRes 422 · DaVinci Resolve</span><span>● Playing</span></div>';
el.innerHTML=html;
window._timelineClips=clips;window._timelineTool='cut';
renderTimelineClips('cut');
startTimelinePlayback();
}
function switchTimeline(tool){
window._timelineTool=tool;
document.querySelectorAll('.timeline-tab').forEach(function(t){t.classList.remove('active');});
event.target.classList.add('active');
document.getElementById('timeline-badge').textContent=tool==='cut'?'EDITING':tool==='color'?'COLOR GRADE':'SOUND MIX';
var bg=document.getElementById('timeline-bg');
if(bg){
if(tool==='color')bg.style.background='linear-gradient(135deg,#4b5563,#06B6D4)';
else if(tool==='sound')bg.style.background='radial-gradient(circle,#1e3a5f,#000)';
else bg.style.background='linear-gradient(135deg,#1e3a5f,#06B6D4)';
}
renderTimelineClips(tool);
}
function renderTimelineClips(tool){
var clips=window._timelineClips[tool]||[];
var v1=document.getElementById('track-v1');var a1=document.getElementById('track-a1');
if(v1)v1.innerHTML='';if(a1)a1.innerHTML='';
clips.forEach(function(c){
var div=document.createElement('div');div.className='timeline-clip';div.style.left=c.start+'%';div.style.width=c.w+'%';div.style.background=c.g;
if(c.track===0){div.textContent=c.label;if(v1)v1.appendChild(div);}
else{var wf='<div class="timeline-waveform">';for(var i=0;i<Math.floor(c.w/1.5);i++)wf+='<div class="timeline-wave" style="height:'+(30+Math.sin(i*0.7)*25+Math.random()*20)+'%"></div>';wf+='</div>';div.innerHTML=wf+'<span style="position:absolute;left:6px">'+c.label+'</span>';if(a1)a1.appendChild(div);}
});
}
var timelinePlayhead=0;
function startTimelinePlayback(){
if(window._timelineRaf)cancelAnimationFrame(window._timelineRaf);
var last=performance.now();
function tick(now){
var dt=now-last;last=now;
timelinePlayhead+=dt/80;
if(timelinePlayhead>100)timelinePlayhead=0;
var ph=document.getElementById('timeline-playhead');if(ph)ph.style.left=timelinePlayhead+'%';
var tc=document.getElementById('timeline-tc');if(tc)tc.textContent=formatTC(timelinePlayhead)+' / 00:00:08:00';
window._timelineRaf=requestAnimationFrame(tick);
}
window._timelineRaf=requestAnimationFrame(tick);
}
function formatTC(pct){var s=(pct/100)*8;var f=Math.floor((s%1)*24);var sec=Math.floor(s);return '00:00:'+String(sec).padStart(2,'0')+':'+String(f).padStart(2,'0');}

// ============ CONTACT FORM ============
var formStep=1,formServices=[],formBudget='';
function buildFormChips(){
var sc=document.getElementById('service-chips');if(sc)sc.innerHTML=SERVICES.map(function(s){return '<button class="chip" onclick="toggleChip(this,\''+s.title+'\')">'+s.title+'</button>';}).join('')+'<button class="chip" onclick="toggleChip(this,\'Not sure yet\')">Not sure yet</button>';
var bc=document.getElementById('budget-chips');if(bc)bc.innerHTML=['$20k–50k','$50k–100k','$100k–250k','$250k+'].map(function(b){return '<button class="chip" onclick="toggleBudget(this,\''+b+'\')">'+b+'</button>';}).join('');
}
function toggleChip(el,val){el.classList.toggle('active');}
function toggleBudget(el,val){document.querySelectorAll('#budget-chips .chip').forEach(function(c){c.classList.remove('active');});el.classList.add('active');formBudget=val;checkStep2();}
function checkStep1(){var n=document.getElementById('f-name').value;var e=document.getElementById('f-email').value;var btn=document.getElementById('step1-btn');if(btn)btn.disabled=!(n&&e);}
function checkStep2(){var services=document.querySelectorAll('#service-chips .chip.active').length;var btn=document.getElementById('step2-btn');if(btn)btn.disabled=!(services>0&&formBudget);}
function goStep(step){
document.querySelectorAll('.form-step-content').forEach(function(s){s.classList.remove('active');s.style.display='none';});
document.querySelectorAll('.form-step').forEach(function(s,i){s.classList.toggle('active',i<step);});
var el=document.getElementById('form-step-'+step);if(el){el.classList.add('active');el.style.display='block';}
formStep=step;
}
function submitForm(){
var name=document.getElementById('f-name').value||'friend';
document.querySelectorAll('.form-step-content').forEach(function(s){s.classList.remove('active');s.style.display='none';});
var s=document.getElementById('form-success');s.style.display='block';s.classList.add('active');
document.getElementById('success-msg').textContent='Thanks, '+name+'. We\'ll get back to you within 24 hours.';
}

// ============ SCROLL ============
function scrollNext(){
var sections=document.querySelectorAll('#page-home .section');
for(var i=0;i<sections.length;i++){var r=sections[i].getBoundingClientRect();if(r.top>10){sections[i].scrollIntoView({behavior:'smooth'});return;}}
window.scrollBy({top:window.innerHeight,behavior:'smooth'});
}

// ============ INIT ============
function initAfterLoad(){
initSplitText();
revealSplitText();
buildServices();buildValues();buildTeam();buildStats();buildPricing();buildPhases();
buildFormChips();
renderWorkGrid('web');
buildFullWork();
buildMiniSite('mini-site');buildMiniSite('mini-site-2');
buildVideoTimeline();
switchCode('html');
initMarquee('marquee-track1',['Premium Websites','Cinematic Films','Brand Identity','UI/UX Design','Creative Direction','Motion Graphics','Color Grading','Sound Design']);
initMarquee('marquee-track2',['LUMEN','ATLAS','NEBULA','VERDE','KINETIC','HALO','ORBIT','PRISM','VESPER','NORTH','ECHO','ZENITH']);
observeReveals();
setTimeout(animateCounters,1000);
// Auto-scroll mini site
setInterval(function(){
var els=['mini-site','mini-site-2'];
els.forEach(function(id){var el=document.getElementById(id);if(el&&el.offsetParent!==null){var p=el.querySelector('.mini-page');if(p){p.scrollTop+=miniScrollDir*0.35;if(p.scrollTop>p.scrollHeight-p.clientHeight-4)miniScrollDir=-1;if(p.scrollTop<4)miniScrollDir=1;}}});
},33);
}
function initPageAnimations(page){
observeReveals();
setTimeout(animateCounters,500);
}
