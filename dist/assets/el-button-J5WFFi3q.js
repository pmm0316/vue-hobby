import{u as C,X as L,O as M,Y as R,Z as X,$ as q,b as Q,l as w,J as W,d as ee,E as T,_ as K,w as oe,j as te}from"./base-YvyzNUQh.js";import{B as ne,G as ae,H as se,I as G,A as le,f as re,u as ie,j,e as ce}from"./use-form-item-f70GIvXW.js";import{r as D,g as O,j as Z,c as u,u as s,p as A,x as ue,ac as de,d as S,o as b,D as y,y as z,F as ve,h as _,n as N,z as x,f as $,E as P,J as fe,e as be,I as F}from"./index-xpSIaDMf.js";import{T as ge}from"./index-ZggoHSuR.js";const J=Symbol(),B=D();function E(o,r=void 0){const t=O()?Z(J,B):B;return o?u(()=>{var a,l;return(l=(a=t.value)==null?void 0:a[o])!=null?l:r}):t}function Te(o,r){const t=E(),a=C(o,u(()=>{var n;return((n=t.value)==null?void 0:n.namespace)||L})),l=ne(u(()=>{var n;return(n=t.value)==null?void 0:n.locale})),e=M(u(()=>{var n;return((n=t.value)==null?void 0:n.zIndex)||R})),i=u(()=>{var n;return s(r)||((n=t.value)==null?void 0:n.size)||""});return pe(u(()=>s(t)||{})),{ns:a,locale:l,zIndex:e,size:i}}const pe=(o,r,t=!1)=>{var a;const l=!!O(),e=l?E():void 0,i=(a=r==null?void 0:r.provide)!=null?a:l?A:void 0;if(!i)return;const n=u(()=>{const d=s(o);return e!=null&&e.value?me(e.value,d):d});return i(J,n),i(ae,u(()=>n.value.locale)),i(X,u(()=>n.value.namespace)),i(q,u(()=>n.value.zIndex)),i(se,{size:u(()=>n.value.size||"")}),(t||!B.value)&&(B.value=n.value),n},me=(o,r)=>{var t;const a=[...new Set([...G(o),...G(r)])],l={};for(const e of a)l[e]=(t=r[e])!=null?t:o[e];return l},U=Symbol("buttonGroupContextKey"),ye=(o,r)=>{le({from:"type.text",replacement:"link",version:"3.0.0",scope:"props",ref:"https://element-plus.org/en-US/component/button.html#button-attributes"},u(()=>o.type==="text"));const t=Z(U,void 0),a=E("button"),{form:l}=re(),e=ie(u(()=>t==null?void 0:t.size)),i=j(),n=D(),d=ue(),g=u(()=>o.type||(t==null?void 0:t.type)||""),h=u(()=>{var v,p,m;return(m=(p=o.autoInsertSpace)!=null?p:(v=a.value)==null?void 0:v.autoInsertSpace)!=null?m:!1}),k=u(()=>o.tag==="button"?{ariaDisabled:i.value||o.loading,disabled:i.value||o.loading,autofocus:o.autofocus,type:o.nativeType}:{}),I=u(()=>{var v;const p=(v=d.default)==null?void 0:v.call(d);if(h.value&&(p==null?void 0:p.length)===1){const m=p[0];if((m==null?void 0:m.type)===de){const H=m.children;return new RegExp("^\\p{Unified_Ideograph}{2}$","u").test(H.trim())}}return!1});return{_disabled:i,_size:e,_type:g,_ref:n,_props:k,shouldAddSpace:I,handleClick:v=>{o.nativeType==="reset"&&(l==null||l.resetFields()),r("click",v)}}},ke=["default","primary","success","warning","info","danger","text",""],_e=["button","submit","reset"],V=Q({size:ce,disabled:Boolean,type:{type:String,values:ke,default:""},icon:{type:w},nativeType:{type:String,values:_e,default:"button"},loading:Boolean,loadingIcon:{type:w,default:()=>W},plain:Boolean,text:Boolean,link:Boolean,bg:Boolean,autofocus:Boolean,round:Boolean,circle:Boolean,color:String,dark:Boolean,autoInsertSpace:{type:Boolean,default:void 0},tag:{type:ee([String,Object]),default:"button"}}),Be={click:o=>o instanceof MouseEvent};function f(o,r=20){return o.mix("#141414",r).toString()}function Ce(o){const r=j(),t=C("button");return u(()=>{let a={};const l=o.color;if(l){const e=new ge(l),i=o.dark?e.tint(20).toString():f(e,20);if(o.plain)a=t.cssVarBlock({"bg-color":o.dark?f(e,90):e.tint(90).toString(),"text-color":l,"border-color":o.dark?f(e,50):e.tint(50).toString(),"hover-text-color":`var(${t.cssVarName("color-white")})`,"hover-bg-color":l,"hover-border-color":l,"active-bg-color":i,"active-text-color":`var(${t.cssVarName("color-white")})`,"active-border-color":i}),r.value&&(a[t.cssVarBlockName("disabled-bg-color")]=o.dark?f(e,90):e.tint(90).toString(),a[t.cssVarBlockName("disabled-text-color")]=o.dark?f(e,50):e.tint(50).toString(),a[t.cssVarBlockName("disabled-border-color")]=o.dark?f(e,80):e.tint(80).toString());else{const n=o.dark?f(e,30):e.tint(30).toString(),d=e.isDark()?`var(${t.cssVarName("color-white")})`:`var(${t.cssVarName("color-black")})`;if(a=t.cssVarBlock({"bg-color":l,"text-color":d,"border-color":l,"hover-bg-color":n,"hover-text-color":d,"hover-border-color":n,"active-bg-color":i,"active-border-color":i}),r.value){const g=o.dark?f(e,50):e.tint(50).toString();a[t.cssVarBlockName("disabled-bg-color")]=g,a[t.cssVarBlockName("disabled-text-color")]=o.dark?"rgba(255, 255, 255, 0.5)":`var(${t.cssVarName("color-white")})`,a[t.cssVarBlockName("disabled-border-color")]=g}}}return a})}const Se=S({name:"ElButton"}),he=S({...Se,props:V,emits:Be,setup(o,{expose:r,emit:t}){const a=o,l=Ce(a),e=C("button"),{_ref:i,_size:n,_type:d,_disabled:g,_props:h,shouldAddSpace:k,handleClick:I}=ye(a,t);return r({ref:i,size:n,type:d,disabled:g,shouldAddSpace:k}),(c,v)=>(b(),y(x(c.tag),fe({ref_key:"_ref",ref:i},s(h),{class:[s(e).b(),s(e).m(s(d)),s(e).m(s(n)),s(e).is("disabled",s(g)),s(e).is("loading",c.loading),s(e).is("plain",c.plain),s(e).is("round",c.round),s(e).is("circle",c.circle),s(e).is("text",c.text),s(e).is("link",c.link),s(e).is("has-bg",c.bg)],style:s(l),onClick:s(I)}),{default:z(()=>[c.loading?(b(),$(ve,{key:0},[c.$slots.loading?_(c.$slots,"loading",{key:0}):(b(),y(s(T),{key:1,class:N(s(e).is("loading"))},{default:z(()=>[(b(),y(x(c.loadingIcon)))]),_:1},8,["class"]))],64)):c.icon||c.$slots.icon?(b(),y(s(T),{key:1},{default:z(()=>[c.icon?(b(),y(x(c.icon),{key:0})):_(c.$slots,"icon",{key:1})]),_:3})):P("v-if",!0),c.$slots.default?(b(),$("span",{key:2,class:N({[s(e).em("text","expand")]:s(k)})},[_(c.$slots,"default")],2)):P("v-if",!0)]),_:3},16,["class","style","onClick"]))}});var Ie=K(he,[["__file","button.vue"]]);const ze={size:V.size,type:V.type},xe=S({name:"ElButtonGroup"}),Ne=S({...xe,props:ze,setup(o){const r=o;A(U,be({size:F(r,"size"),type:F(r,"type")}));const t=C("button");return(a,l)=>(b(),$("div",{class:N(`${s(t).b("group")}`)},[_(a.$slots,"default")],2))}});var Y=K(Ne,[["__file","button-group.vue"]]);const Ge=oe(Ie,{ButtonGroup:Y});te(Y);export{Ge as E,Te as u};
