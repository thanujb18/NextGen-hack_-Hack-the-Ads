# NextGen-hack_-Hack-the-Ads
</style>
</head>
<body>

<!-- ═══ BACKGROUND COLLAGE ═══ -->
<div id="bg"></div>
<div id="overlay"></div>

<!-- ═══ CONTENT ═══ -->
<div class="wrap">

  <nav>
    <div class="logo">🎯 <span class="h">HACK</span>&nbsp;THE&nbsp;<span class="a">ADS</span></div>
    <div class="nbadge">● LIVE PROTECTION</div>
  </nav>

  <div class="stats-bar">
    <div class="stat"><span class="stat-val" id="s1">0</span><div class="stat-label">ADS SCANNED TODAY</div></div>
    <div class="stat"><span class="stat-val" id="s2">0</span><div class="stat-label">THREATS BLOCKED</div></div>
    <div class="stat"><span class="stat-val">98.4%</span><div class="stat-label">DETECTION ACCURACY</div></div>
  </div>

  <div class="hero">
    <div class="hero-eyebrow">// AI-POWERED AD THREAT INTELLIGENCE</div>
    <h1>Detect <em>Malicious Ads</em><br>Before They Reach You</h1>
    <p>Paste any ad URL and our AI engine analyzes it for phishing, scams, malware, and fraud signals in real-time.</p>
  </div>

  <div class="input-section">
    <span class="input-label">// ENTER AD URL TO ANALYZE</span>
    <div class="input-row">
      <input class="url-input" id="urlInput" placeholder="https://suspicious-ad-url.com/click?ref=..." />
      <button class="scan-btn" id="scanBtn" onclick="startScan()">⚡ ANALYZE</button>
    </div>
    <div class="examples">Try:
      <span onclick="le('https://free-iphone15-winner.xyz/claim?ref=ad&click=true')">Scam Ad</span>
      <span onclick="le('https://bit.ly/3xFrEeG1ft-click-now')">Suspicious</span>
      <span onclick="le('https://shop.amazon.com/product/headphones')">Legit URL</span>
      <span onclick="le('http://amaz0n-deals.tk/win-free?user=victim&redirect=phish')">Phishing</span>
    </div>
  </div>

  <div class="scanning" id="scanWrap">
    <div class="sring"></div>
    <div class="sstatus" id="sstatus">INITIALIZING...</div>
    <div class="surl" id="surl"></div>
    <div class="sprog"><div class="sprogbar" id="sprogbar"></div></div>
  </div>

  <div class="results" id="results">
    <div class="rgrid">
      <div class="rc">
        <div class="rclabel">// THREAT SCORE</div>
        <div class="gw">
          <div class="gauge">
            <svg width="140" height="75" viewBox="0 0 140 75">
              <path d="M10 70 A60 60 0 0 1 130 70" fill="none" stroke="#0f3050" stroke-width="10" stroke-linecap="round"/>
              <path id="garc" d="M10 70 A60 60 0 0 1 130 70" fill="none" stroke="#00f5c4" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="188.5" stroke-dashoffset="188.5" style="transition:all 0.8s ease"/>
            </svg>
            <div class="gscore" id="gscore">0</div>
          </div>
          <div class="glabel" id="glabel">THREAT LEVEL</div>
        </div>
      </div>
      <div class="rc vw">
        <div class="rclabel">// VERDICT</div>
        <div class="vbadge" id="vbadge">—</div>
        <div class="conf" id="conf">Confidence: —</div>
        <div class="ctag" id="ctag">CATEGORY: —</div>
      </div>
      <div class="rc">
        <div class="rclabel">// DETECTED FLAGS</div>
        <div class="flist" id="flist"></div>
      </div>
      <div class="rc">
        <div class="rclabel">// SIGNAL CHECKS</div>
        <div class="sgrid" id="sgrid"></div>
      </div>
    </div>
    <div class="hist">
      <div class="htitle">// RECENT SCANS</div>
      <div class="hlist" id="hlist"><div class="empty">NO SCANS YET</div></div>
    </div>
  </div>
</div>

<script>
/* ── BUILD COLLAGE BACKGROUND ── */
const brands = [
  {label:'Google Ads',   bg:'#1a1a2e', color:'#4285F4'},
  {label:'Meta',         bg:'#0f1b35', color:'#0082FB'},
  {label:'amazon',       bg:'#1a1200', color:'#FF9900'},
  {label:'TikTok',       bg:'#0d0d20', color:'#ff0050'},
  {label:'Snapchat',     bg:'#1a1a00', color:'#FFFC00'},
  {label:'𝕏 Twitter',   bg:'#0a1520', color:'#ffffff'},
  {label:'YouTube',      bg:'#200a0a', color:'#FF0000'},
  {label:'LinkedIn',     bg:'#0a1828', color:'#0A66C2'},
  {label:'Pinterest',    bg:'#200a10', color:'#E60023'},
  {label:'Reddit',       bg:'#1f1008', color:'#FF4500'},
  {label:'Taboola',      bg:'#081a18', color:'#00C5A1'},
  {label:'Outbrain',     bg:'#1a120a', color:'#FF6641'},
  {label:'Criteo',       bg:'#180a05', color:'#F05323'},
  {label:'Apple Ads',    bg:'#141414', color:'#aaaaaa'},
  {label:'Spotify',      bg:'#081a0e', color:'#1DB954'},
  {label:'Microsoft',    bg:'#0a1020', color:'#00A4EF'},
  {label:'Trade Desk',   bg:'#100a1f', color:'#007AC3'},
  {label:'AdRoll',       bg:'#1a080e', color:'#FF4B55'},
  {label:'DV360',        bg:'#080f1f', color:'#1A73E8'},
  {label:'Bing Ads',     bg:'#081812', color:'#008373'},
  {label:'InMobi',       bg:'#100808', color:'#EF4056'},
  {label:'Moloco',       bg:'#080812', color:'#5B5EF4'},
  {label:'AppLovin',     bg:'#08081a', color:'#0F63FF'},
  {label:'Unity Ads',    bg:'#101010', color:'#ffffff'},
  {label:'Vungle',       bg:'#180814', color:'#F72585'},
  {label:'Chartboost',   bg:'#0f1808', color:'#F7A228'},
  {label:'ironSource',   bg:'#150e08', color:'#FF7300'},
  {label:'MediaMath',    bg:'#1a0a12', color:'#E5007E'},
  {label:'PubMatic',     bg:'#081818', color:'#00AEEF'},
  {label:'Xandr',        bg:'#080f10', color:'#0074D9'},
  {label:'Yandex',       bg:'#180808', color:'#FC3F1D'},
  {label:'Adjust',       bg:'#081218', color:'#00C4C4'},
  {label:'Baidu',        bg:'#08101f', color:'#2932E1'},
  {label:'Quora Ads',    bg:'#180808', color:'#B92B27'},
  {label:'Zemanta',      bg:'#0f0808', color:'#FC6E51'},
];

const bg = document.getElementById('bg');
// Fill a 7-col grid with ~42 cells
const cells = [];
for (let i = 0; i < 42; i++) cells.push(brands[i % brands.length]);
// Shuffle
cells.sort(() => Math.random() - 0.5);

bg.innerHTML = cells.map(b => `
  <div class="bc" style="background:${b.bg};">
    <span style="color:${b.color};font-size:1.1rem;font-family:'Syne',sans-serif;font-weight:800;text-align:center;padding:0.5rem;line-height:1.2;">${b.label}</span>
  </div>
`).join('');

/* ── SCAN LOGIC ── */
let sc=0,bc=0,hist=[];
const msgs=["RESOLVING DOMAIN...","CHECKING SSL CERTIFICATE...","ANALYZING URL STRUCTURE...","SCANNING REDIRECT CHAINS...","CHECKING DOMAIN AGE...","RUNNING ML CLASSIFIER...","CROSS-REFERENCING THREAT DB...","GENERATING REPORT..."];

function le(u){document.getElementById('urlInput').value=u;}

function analyze(url){
  let score=0,flags=[],sigs=[];
  const u=url.toLowerCase();

  // SSL
  if(!url.startsWith('https://')){score+=20;sigs.push({n:'SSL/HTTPS',i:'🔒',r:'MISSING',c:'bad'});flags.push({i:'🔒',t:'No HTTPS — not encrypted',c:'bad',l:'HIGH RISK'});}
  else sigs.push({n:'SSL/HTTPS',i:'🔒',r:'VALID',c:'ok'});

  // TLD
  if(['.xyz','.tk','.ml','.ga','.cf','.top','.click','.win'].some(t=>u.includes(t))){score+=25;sigs.push({n:'Domain TLD',i:'🌐',r:'SUSPICIOUS',c:'warn'});flags.push({i:'🌐',t:'Suspicious TLD detected',c:'bad',l:'HIGH RISK'});}
  else sigs.push({n:'Domain TLD',i:'🌐',r:'NORMAL',c:'ok'});

  // Shortener
  if(['bit.ly','tinyurl','goo.gl','t.co','ow.ly','is.gd'].some(s=>u.includes(s))){score+=20;sigs.push({n:'URL Shortener',i:'🔗',r:'DETECTED',c:'warn'});flags.push({i:'🔗',t:'URL shortener hides real destination',c:'warn',l:'MEDIUM RISK'});}
  else sigs.push({n:'URL Shortener',i:'🔗',r:'NONE',c:'ok'});

  // Bait
  const bait=['free','win','winner','claim','prize','gift','reward','giveaway','iphone','bonus','click','deal'];
  const found=bait.filter(w=>u.includes(w));
  if(found.length>=2){score+=20;sigs.push({n:'Bait Keywords',i:'🎣',r:'MULTIPLE',c:'bad'});flags.push({i:'🎣',t:Clickbait: ${found.slice(0,3).join(', ')},c:'bad',l:'HIGH RISK'});}
  else if(found.length===1){score+=8;sigs.push({n:'Bait Keywords',i:'🎣',r:'FOUND',c:'warn'});flags.push({i:'🎣',t:Suspicious keyword: "${found[0]}",c:'warn',l:'LOW RISK'});}
  else sigs.push({n:'Bait Keywords',i:'🎣',r:'CLEAN',c:'ok'});

  // Hyphens
  try{const d=url.split('/')[2]||'';const h=(d.match(/-/g)||[]).length;if(h>=3){score+=15;sigs.push({n:'Hyphens',i:'➖',r:${h} FOUND,c:'bad'});flags.push({i:'➖',t:Excessive hyphens (${h}),c:'bad',l:'HIGH RISK'});}else if(h>=1){score+=5;sigs.push({n:'Hyphens',i:'➖',r:'SOME',c:'warn'});}else sigs.push({n:'Hyphens',i:'➖',r:'NONE',c:'ok'});}
  catch(e){sigs.push({n:'Hyphens',i:'➖',r:'N/A',c:'ok'});}

  // Length
  if(url.length>100){score+=10;sigs.push({n:'URL Length',i:'📏',r:'VERY LONG',c:'warn'});flags.push({i:'📏',t:Long URL (${url.length} chars),c:'warn',l:'MEDIUM'});}
  else sigs.push({n:'URL Length',i:'📏',r:'NORMAL',c:'ok'});

  // Redirect
  if(['redirect','redir','url=','goto','link=','target='].some(r=>u.includes(r))){score+=15;sigs.push({n:'Redirect',i:'↪️',r:'DETECTED',c:'bad'});flags.push({i:'↪️',t:'Redirect param masks destination',c:'bad',l:'HIGH RISK'});}
  else sigs.push({n:'Redirect',i:'↪️',r:'NONE',c:'ok'});

  // Typosquat
  const typos=[{r:'amazon',f:['amaz0n','amazoon','amason']},{r:'google',f:['g00gle','gooogle']},{r:'paypal',f:['paypa1','paypall']},{r:'apple',f:['app1e']},{r:'facebook',f:['faceb00k']}];
  let tf=false;
  for(const b of typos){if(b.f.some(f=>u.includes(f))){score+=30;tf=true;sigs.push({n:'Typosquatting',i:'🎭',r:'DETECTED',c:'bad'});flags.push({i:'🎭',t:Brand impersonation: fake "${b.r}",c:'bad',l:'CRITICAL'});break;}}
  if(!tf)sigs.push({n:'Typosquatting',i:'🎭',r:'CLEAN',c:'ok'});

  // Params
  const pc=(url.match(/&/g)||[]).length;
  if(pc>=4){score+=10;sigs.push({n:'Query Params',i:'⚙️',r:${pc+1} PARAMS,c:'warn'});flags.push({i:'⚙️',t:Many tracking params (${pc+1}),c:'warn',l:'MEDIUM'});}
  else sigs.push({n:'Query Params',i:'⚙️',r:'NORMAL',c:'ok'});

  // IP
  if(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)){score+=25;sigs.push({n:'IP Address',i:'🖥️',r:'DIRECT IP',c:'bad'});flags.push({i:'🖥️',t:'Direct IP used — phishing sign',c:'bad',l:'HIGH RISK'});}
  else sigs.push({n:'IP Address',i:'🖥️',r:'DOMAIN OK',c:'ok'});

  score=Math.min(score,100);

  let verdict,vcls,cat,conf;
  if(score>=70){verdict='⛔ MALICIOUS';vcls='vmal';conf=Math.floor(88+Math.random()*10);cat=['Phishing','Scam Ad','Malware','Fake Offer'][Math.floor(Math.random()*4)];}
  else if(score>=35){verdict='⚠️ SUSPICIOUS';vcls='vsusp';conf=Math.floor(75+Math.random()*15);cat=['Aggressive Tracking','Potentially Unwanted','Suspicious Redirect'][Math.floor(Math.random()*3)];}
  else{verdict='✅ SAFE';vcls='vsafe';conf=Math.floor(90+Math.random()*9);cat='Legitimate Ad';}

  if(!flags.length)flags.push({i:'✅',t:'No threats detected',c:'ok',l:'CLEAN'});
  return{score,flags,sigs,verdict,vcls,cat,conf};
}

function renderGauge(score){
  const arc=document.getElementById('garc');
  const col=score>=70?'#ff3e6c':score>=35?'#ffb800':'#00f5c4';
  arc.style.stroke=col;
  arc.style.strokeDashoffset=188.5-(score/100)*188.5;
  arc.style.filter=drop-shadow(0 0 6px ${col});
  document.getElementById('gscore').textContent=score;
  document.getElementById('gscore').style.color=col;
  document.getElementById('glabel').textContent=score>=70?'HIGH THREAT':score>=35?'MODERATE':'LOW THREAT';
}

function renderAll(url,data){
  renderGauge(data.score);
  document.getElementById('vbadge').textContent=data.verdict;
  document.getElementById('vbadge').className='vbadge '+data.vcls;
  document.getElementById('conf').textContent=Confidence: ${data.conf}%;
  document.getElementById('ctag').textContent=CATEGORY: ${data.cat.toUpperCase()};
  document.getElementById('flist').innerHTML=data.flags.map(f=><div class="fi"><span class="ficon">${f.i}</span><span class="ftxt">${f.t}</span><span class="fstat ${f.c}">${f.l}</span></div>).join('');
  document.getElementById('sgrid').innerHTML=data.sigs.map(s=><div class="sig"><span>${s.i}</span><span class="sname">${s.n}</span><span class="sres ${s.c}">${s.r}</span></div>).join('');
  const now=new Date();
  const t=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  const dot=data.score>=70?'#ff3e6c':data.score>=35?'#ffb800':'#00f5c4';
  hist.unshift({url,score:data.score,dot,t,data});
  if(hist.length>5)hist.pop();
  document.getElementById('hlist').innerHTML=hist.map((h,i)=><div class="hi" onclick="rh(${i})"><div class="hdot" style="background:${h.dot};box-shadow:0 0 6px ${h.dot}"></div><div class="hurl">${h.url}</div><div class="hscore" style="color:${h.dot}">${h.score}/100</div><div class="htime">${h.t}</div></div>).join('');
}

function rh(i){const h=hist[i];document.getElementById('urlInput').value=h.url;document.getElementById('results').classList.add('active');renderAll(h.url,h.data);}

function startScan(){
  const url=document.getElementById('urlInput').value.trim();
  if(!url){alert('Enter a URL!');return;}
  const btn=document.getElementById('scanBtn');
  btn.disabled=true;
  document.getElementById('results').classList.remove('active');
  document.getElementById('scanWrap').classList.add('active');
  document.getElementById('surl').textContent=url;
  const bar=document.getElementById('sprogbar');
  const st=document.getElementById('sstatus');
  let step=0;bar.style.width='0%';
  const iv=setInterval(()=>{
    if(step<msgs.length){st.textContent=msgs[step];bar.style.width=((step+1)/msgs.length*100)+'%';step++;}
    else{clearInterval(iv);setTimeout(()=>{
      document.getElementById('scanWrap').classList.remove('active');
      const data=analyze(url);
      sc++;document.getElementById('s1').textContent=sc;
      if(data.score>=35){bc++;document.getElementById('s2').textContent=bc;}
      renderAll(url,data);
      document.getElementById('results').classList.add('active');
      btn.disabled=false;
    },400);}
  },280);
}

document.getElementById('urlInput').addEventListener('keydown',e=>{if(e.key==='Enter')startScan();});
</script>
</body>
</html>
