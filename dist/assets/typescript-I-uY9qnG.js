import{Q as w,W as $,X as Q,Y as j,Z as C,$ as R,c as T,a0 as W}from"./base-MNsHS7k1.js";import{i as _,g as L}from"./index-2j7IQfhn.js";function m(e){var r;const n=$(e);return(r=n==null?void 0:n.$el)!=null?r:n}const v=T?window:void 0;function b(...e){let r,n,t,u;if(Q(e[0])||Array.isArray(e[0])?([n,t,u]=e,r=v):[r,n,t,u]=e,!r)return j;Array.isArray(n)||(n=[n]),Array.isArray(t)||(t=[t]);const f=[],a=()=>{f.forEach(i=>i()),f.length=0},l=(i,c,o,s)=>(i.addEventListener(c,o,s),()=>i.removeEventListener(c,o,s)),p=_(()=>[m(r),$(u)],([i,c])=>{a(),i&&f.push(...n.flatMap(o=>t.map(s=>l(i,o,s,c))))},{immediate:!0,flush:"post"}),O=()=>{p(),a()};return w(O),O}let y=!1;function Y(e,r,n={}){const{window:t=v,ignore:u=[],capture:f=!0,detectIframe:a=!1}=n;if(!t)return;W&&!y&&(y=!0,Array.from(t.document.body.children).forEach(o=>o.addEventListener("click",j)));let l=!0;const p=o=>u.some(s=>{if(typeof s=="string")return Array.from(t.document.querySelectorAll(s)).some(d=>d===o.target||o.composedPath().includes(d));{const d=m(s);return d&&(o.target===d||o.composedPath().includes(d))}}),i=[b(t,"click",o=>{const s=m(e);if(!(!s||s===o.target||o.composedPath().includes(s))){if(o.detail===0&&(l=!p(o)),!l){l=!0;return}r(o)}},{passive:!0,capture:f}),b(t,"pointerdown",o=>{const s=m(e);s&&(l=!o.composedPath().includes(s)&&!p(o))},{passive:!0}),a&&b(t,"blur",o=>{var s;const d=m(e);((s=t.document.activeElement)==null?void 0:s.tagName)==="IFRAME"&&!(d!=null&&d.contains(t.document.activeElement))&&r(o)})].filter(Boolean);return()=>i.forEach(o=>o())}function N(e,r=!1){const n=L(),t=()=>n.value=!!e();return t(),C(t,r),n}const E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},h="__vueuse_ssr_handlers__";E[h]=E[h]||{};var g=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,B=(e,r)=>{var n={};for(var t in e)k.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&g)for(var t of g(e))r.indexOf(t)<0&&x.call(e,t)&&(n[t]=e[t]);return n};function Z(e,r,n={}){const t=n,{window:u=v}=t,f=B(t,["window"]);let a;const l=N(()=>u&&"ResizeObserver"in u),p=()=>{a&&(a.disconnect(),a=void 0)},O=_(()=>m(e),c=>{p(),l.value&&u&&c&&(a=new ResizeObserver(r),a.observe(c,f))},{immediate:!0,flush:"post"}),i=()=>{p(),O()};return w(i),{isSupported:l,stop:i}}var I=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,D=(e,r)=>{var n={};for(var t in e)M.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&I)for(var t of I(e))r.indexOf(t)<0&&U.call(e,t)&&(n[t]=e[t]);return n};function J(e,r,n={}){const t=n,{window:u=v}=t,f=D(t,["window"]);let a;const l=N(()=>u&&"MutationObserver"in u),p=()=>{a&&(a.disconnect(),a=void 0)},O=_(()=>m(e),c=>{p(),l.value&&u&&c&&(a=new MutationObserver(r),a.observe(c,f))},{immediate:!0}),i=()=>{p(),O()};return w(i),{isSupported:l,stop:i}}var P;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(P||(P={}));var z=Object.defineProperty,S=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,A=(e,r,n)=>r in e?z(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,G=(e,r)=>{for(var n in r||(r={}))F.call(r,n)&&A(e,n,r[n]);if(S)for(var n of S(r))H.call(r,n)&&A(e,n,r[n]);return e};const V={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};G({linear:R},V);class q extends Error{constructor(r){super(r),this.name="ElementPlusError"}}function ee(e,r){throw new q(`[${e}] ${r}`)}function te(e,r){}const re={tab:"Tab",enter:"Enter",space:"Space",left:"ArrowLeft",up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",esc:"Escape",delete:"Delete",backspace:"Backspace",numpadEnter:"NumpadEnter",pageUp:"PageUp",pageDown:"PageDown",home:"Home",end:"End"},ne=e=>e;export{re as E,Z as a,J as b,m as c,te as d,ne as m,Y as o,ee as t,b as u};