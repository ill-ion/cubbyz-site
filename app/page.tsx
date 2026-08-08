"use client";

import { useEffect } from "react";
import { siteHtml } from "../lib/site-html";

const legacyScript = "const scrs=[...document.querySelectorAll('.scr')];const rail=[...document.querySelectorAll('.step')];let cur=0;\nfunction go(i){cur=i;scrs.forEach(s=>s.classList.toggle('on',+s.dataset.s===i));rail.forEach(r=>{const ri=+r.dataset.i;r.classList.toggle('active',ri===i);r.classList.toggle('done',ri<i);})}\nrail.forEach(r=>r.onclick=()=>{const i=+r.dataset.i;if(i<=Math.max(cur,1))go(i);});\nfunction type(el,txt,then){el.textContent='';let i=0;const t=setInterval(()=>{el.textContent=txt.slice(0,++i);if(i>=txt.length){clearInterval(t);then&&then();}},22)}\ndocument.querySelector('[data-act=\"create\"]').onclick=()=>{type(document.getElementById('st0'),'\u25e2 building deal CBZ-00120\u2026',()=>setTimeout(()=>go(1),420));};\nfunction fund(){type(document.getElementById('st1'),'\u25e2 signing\u2026 \u25e2 tx sent\u2026 \u25e2 confirmed in 1.9s',()=>setTimeout(()=>go(2),500));}\nfunction release(){type(document.getElementById('st3'),'\u25e2 release signed \u00b7 paying seller\u2026',()=>setTimeout(()=>settle('release'),600));}\nfunction dispute(){go(3);document.getElementById('st3').innerHTML='\u25e2 routing to 7 jurors\u2026';setTimeout(()=>settle('dispute'),700);}\nfunction settle(kind){go(4);const b=document.getElementById('settleBox');if(kind==='release'){b.innerHTML='<div style=\"font-size:46px;margin-bottom:8px\">\ud83c\udf89</div><h3>Released to seller</h3><p class=\"desc\" style=\"margin:8px auto 16px\">$120.00 landed in ~2 seconds. Deal closed, both sides covered.</p><button class=\"replay mono\" onclick=\"reset()\">\u21bb run it again</button>';document.getElementById('vcore')?.classList.add('open');}else{b.innerHTML='<h3 style=\"text-align:center\">Jury is voting\u2026</h3><p class=\"desc\" style=\"margin:8px auto 14px;text-align:center\">Blind votes \u00b7 5 of 7 needed</p><div class=\"jury-mini\" id=\"jm\"></div><div class=\"statusbar mono\" id=\"jres\"></div>';const row=document.getElementById('jm');const votes=['\u2713','\u2713','\u2717','\u2713','\u2713','\u2713','\u2717'];votes.forEach((v,i)=>{const d=document.createElement('div');d.className='jm';d.textContent='?';row.appendChild(d);setTimeout(()=>{d.textContent=v;if(v==='\u2713')d.classList.add('y');},500+i*340);});setTimeout(()=>{document.getElementById('jres').innerHTML='\u25e2 verdict 5/7 \u2192 funds release to seller, on-chain';const extra=document.createElement('button');extra.className='replay mono';extra.textContent='\u21bb run it again';extra.onclick=reset;document.getElementById('settleBox').appendChild(extra);},500+votes.length*340+400);}}\nfunction reset(){document.getElementById('vcore')?.classList.remove('open');['st0','st1','st3'].forEach(id=>document.getElementById(id).textContent='');go(0)}\n\n\n(function(){\n  var steps=[].slice.call(document.querySelectorAll('.howstep'));\n  if(!steps.length)return;\n  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){steps.forEach(function(s){s.classList.add('on');});return;}\n  var io=new IntersectionObserver(function(es){\n    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target);} });\n  },{threshold:.3});\n  steps.forEach(function(s){io.observe(s);});\n})();";

export default function Home() {
  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = null;
    if (legacyScript.trim()) {
      scriptEl = document.createElement("script");
      scriptEl.text = legacyScript;
      document.body.appendChild(scriptEl);
    }

    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );

    const onClick = (event: Event) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", onClick));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", onClick));
      scriptEl?.remove();
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: siteHtml }} />;
}
