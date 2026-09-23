const LOCALES=["en","ru","de","fr","ja","zh-Hans"];
const LANG_LABELS={en:"English",ru:"Русский",de:"Deutsch",fr:"Français",ja:"日本語","zh-Hans":"简体中文"};
let dict=null;
async function loadDict(){if(!dict)dict=await(await fetch("assets/i18n.json")).json();return dict}
function lang(){const s=localStorage.getItem("dr-lang");return LOCALES.includes(s)?s:"en"}
function tx(id,v){const e=document.getElementById(id);if(e)e.textContent=v}
function html(id,v){const e=document.getElementById(id);if(e)e.innerHTML=v}
function email(s){return s.replaceAll("radar@mornar-labs.com",'<a href="mailto:radar@mornar-labs.com">radar@mornar-labs.com</a>')}
function syncLangPicker(code){tx("langCurrent",LANG_LABELS[code]||LANG_LABELS.en);document.querySelectorAll("#langMenu [data-lang]").forEach(b=>b.setAttribute("aria-selected",b.dataset.lang===code?"true":"false"))}
function closeLangPicker(){const p=document.getElementById("langPicker"),t=document.getElementById("langToggle");if(p)p.classList.remove("open");if(t)t.setAttribute("aria-expanded","false")}
function setupLangPicker(){const p=document.getElementById("langPicker"),t=document.getElementById("langToggle"),m=document.getElementById("langMenu");if(!p||!t||!m)return;t.addEventListener("click",e=>{e.stopPropagation();const open=p.classList.toggle("open");t.setAttribute("aria-expanded",open?"true":"false")});m.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{localStorage.setItem("dr-lang",b.dataset.lang);closeLangPicker();render()}));document.addEventListener("click",e=>{if(!p.contains(e.target))closeLangPicker()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLangPicker()})}
async function render(){const all=await loadDict(),code=lang(),t=all[code]||all.en,u=t.ui;document.documentElement.lang=code;syncLangPicker(code);
 tx("nf",t.nav[0]);tx("nh",t.nav[1]);tx("np",t.nav[2]);tx("nd",t.nav[3]);tx("headerCta",t.home[3]);tx("fc",t.footer);tx("fp",t.nav[2]);tx("fd",t.nav[3]);tx("fTerms",u.legalCommunity);tx("fSupport",u.support);
 const page=document.body.dataset.page;
 if(page==="home"){const h=t.home;tx("eye",h[0]);tx("hero",h[1]);tx("heroText",h[2]);tx("open",h[3]);tx("contact",h[4]);tx("featureEye",u.featureEye);tx("featuresTitle",h[5]);tx("featuresText",u.featureLead);tx("productEye",u.productEye);tx("shotsTitle",t.shotsTitle);tx("shotsText",t.shotsText);tx("trustEye",u.trustEye);tx("trustTitle",h[7]);tx("trustText",h[8]);tx("legalEye",u.legalEye);tx("legalTitle",h[9]);tx("legalText",h[10]);
  html("heroChips",u.heroChips.map(x=>`<span class="hero-chip">${x}</span>`).join(""));
  html("featureGrid",t.features.map((x,i)=>`<article class="feature"><div class="feature-index">0${i+1}</div><div class="feature-mark">${["↗","◎","◇","▶","✦","＋"][i]}</div><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join(""));
  html("trust",t.trust.map(x=>`<div class="trust-item"><span class="check">✓</span><span>${x}</span></div>`).join(""));
  u.screens.forEach((v,i)=>tx(`screen${i+1}`,v));
  tx("pc",t.nav[2]);tx("pct",t.cards[0]);tx("dc",t.nav[3]);tx("dct",t.cards[1]);tx("tc",u.legalCommunity);tx("tct",t.cards[2]);document.title="Dental Radar — "+h[0];
 }else{const data=page==="privacy"?t.privacy:page==="delete"?t.delete:t.terms;tx("lt",data[0]);tx("ls",data[1]);tx("updated",t.updated);html("sections",data[2].map(x=>`<h2>${x[0]}</h2><p>${email(x[1])}</p>`).join(""));if(page==="delete")tx("openDelete",data[3]);document.title="Dental Radar — "+data[0]}}
document.addEventListener("DOMContentLoaded",()=>{setupLangPicker();render()});
