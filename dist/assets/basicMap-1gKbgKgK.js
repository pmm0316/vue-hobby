import"./base-YvyzNUQh.js";import{E as k}from"./el-button-J5WFFi3q.js";import{ag as x,ah as P,d as C,k as E,ai as j,f as S,G as U,q as I,y as h,aj as B,o as J,C as b,a8 as $,a9 as N,$ as O}from"./index-xpSIaDMf.js";import"./use-form-item-f70GIvXW.js";import"./index-ZggoHSuR.js";var L={exports:{}};(function(M,m){(function(c,A){M.exports=A()})(x,function(){function c(o){var p=[];return o.AMapUI&&p.push(A(o.AMapUI)),o.Loca&&p.push(w(o.Loca)),Promise.all(p)}function A(o){return new Promise(function(p,i){var u=[];if(o.plugins)for(var t=0;t<o.plugins.length;t+=1)e.AMapUI.plugins.indexOf(o.plugins[t])==-1&&u.push(o.plugins[t]);if(a.AMapUI===n.failed)i("前次请求 AMapUI 失败");else if(a.AMapUI===n.notload){a.AMapUI=n.loading,e.AMapUI.version=o.version||e.AMapUI.version,t=e.AMapUI.version;var l=document.body||document.head,d=document.createElement("script");d.type="text/javascript",d.src="https://webapi.amap.com/ui/"+t+"/main.js",d.onerror=function(s){a.AMapUI=n.failed,i("请求 AMapUI 失败")},d.onload=function(){if(a.AMapUI=n.loaded,u.length)window.AMapUI.loadUI(u,function(){for(var s=0,f=u.length;s<f;s++){var g=u[s].split("/").slice(-1)[0];window.AMapUI[g]=arguments[s]}for(p();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()});else for(p();r.AMapUI.length;)r.AMapUI.splice(0,1)[0]()},l.appendChild(d)}else a.AMapUI===n.loaded?o.version&&o.version!==e.AMapUI.version?i("不允许多个版本 AMapUI 混用"):u.length?window.AMapUI.loadUI(u,function(){for(var s=0,f=u.length;s<f;s++){var g=u[s].split("/").slice(-1)[0];window.AMapUI[g]=arguments[s]}p()}):p():o.version&&o.version!==e.AMapUI.version?i("不允许多个版本 AMapUI 混用"):r.AMapUI.push(function(s){s?i(s):u.length?window.AMapUI.loadUI(u,function(){for(var f=0,g=u.length;f<g;f++){var _=u[f].split("/").slice(-1)[0];window.AMapUI[_]=arguments[f]}p()}):p()})})}function w(o){return new Promise(function(p,i){if(a.Loca===n.failed)i("前次请求 Loca 失败");else if(a.Loca===n.notload){a.Loca=n.loading,e.Loca.version=o.version||e.Loca.version;var u=e.Loca.version,t=e.AMap.version.startsWith("2"),l=u.startsWith("2");if(t&&!l||!t&&l)i("JSAPI 与 Loca 版本不对应！！");else{t=e.key,l=document.body||document.head;var d=document.createElement("script");d.type="text/javascript",d.src="https://webapi.amap.com/loca?v="+u+"&key="+t,d.onerror=function(s){a.Loca=n.failed,i("请求 AMapUI 失败")},d.onload=function(){for(a.Loca=n.loaded,p();r.Loca.length;)r.Loca.splice(0,1)[0]()},l.appendChild(d)}}else a.Loca===n.loaded?o.version&&o.version!==e.Loca.version?i("不允许多个版本 Loca 混用"):p():o.version&&o.version!==e.Loca.version?i("不允许多个版本 Loca 混用"):r.Loca.push(function(s){s?i(s):i()})})}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var n;(function(o){o.notload="notload",o.loading="loading",o.loaded="loaded",o.failed="failed"})(n||(n={}));var e={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},a={AMap:n.notload,AMapUI:n.notload,Loca:n.notload},r={AMap:[],AMapUI:[],Loca:[]},v=[],y=function(o){typeof o=="function"&&(a.AMap===n.loaded?o(window.AMap):v.push(o))};return{load:function(o){return new Promise(function(p,i){if(a.AMap==n.failed)i("");else if(a.AMap==n.notload){var u=o.key,t=o.version,l=o.plugins;u?(window.AMap&&location.host!=="lbs.amap.com"&&i("禁止多种API加载方式混用"),e.key=u,e.AMap.version=t||e.AMap.version,e.AMap.plugins=l||e.AMap.plugins,a.AMap=n.loading,t=document.body||document.head,window.___onAPILoaded=function(s){if(delete window.___onAPILoaded,s)a.AMap=n.failed,i(s);else for(a.AMap=n.loaded,c(o).then(function(){p(window.AMap)}).catch(i);v.length;)v.splice(0,1)[0]()},l=document.createElement("script"),l.type="text/javascript",l.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+e.AMap.version+"&key="+u+"&plugin="+e.AMap.plugins.join(","),l.onerror=function(s){a.AMap=n.failed,i(s)},t.appendChild(l)):i("请填写key")}else if(a.AMap==n.loaded)if(o.key&&o.key!==e.key)i("多个不一致的 key");else if(o.version&&o.version!==e.AMap.version)i("不允许多个版本 JSAPI 混用");else{if(u=[],o.plugins)for(t=0;t<o.plugins.length;t+=1)e.AMap.plugins.indexOf(o.plugins[t])==-1&&u.push(o.plugins[t]);u.length?window.AMap.plugin(u,function(){c(o).then(function(){p(window.AMap)}).catch(i)}):c(o).then(function(){p(window.AMap)}).catch(i)}else if(o.key&&o.key!==e.key)i("多个不一致的 key");else if(o.version&&o.version!==e.AMap.version)i("不允许多个版本 JSAPI 混用");else{var d=[];if(o.plugins)for(t=0;t<o.plugins.length;t+=1)e.AMap.plugins.indexOf(o.plugins[t])==-1&&d.push(o.plugins[t]);y(function(){d.length?window.AMap.plugin(d,function(){c(o).then(function(){p(window.AMap)}).catch(i)}):c(o).then(function(){p(window.AMap)}).catch(i)})}})},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,e={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},a={AMap:n.notload,AMapUI:n.notload,Loca:n.notload},r={AMap:[],AMapUI:[],Loca:[]}}}})})(L);var V=L.exports;const W=P(V),q=M=>($("data-v-9fbd2f71"),M=M(),N(),M),G={class:"amap-wrapper"},K=q(()=>U("div",{id:"amap"},null,-1)),D={class:"btn-wrapper"},F=C({__name:"basicMap",setup(M){const m=`https://restapi.amap.com/v3/geocode/geo?key=${B}&address=浙江省宁波市海曙区南门街道甬水桥科创中心`;fetch(m).then(e=>{e.text().then(a=>{})});let c=null;const A=[121.529959,29.888224],w=[121.533604,29.856635];E(()=>{W.load({key:j,version:"2.0",plugins:[],Loca:{version:"2.0.0"}}).then(e=>{c=new e.Map("amap",{center:A}),c.setZoom(16);const a=new e.Marker({position:A}),r=new e.Marker({position:w});c.add(a),c.add(r)}).catch(e=>{console.log(e)})});function n(e){c.setCenter(e)}return(e,a)=>{const r=k;return J(),S("div",G,[K,U("div",D,[I(r,{onClick:a[0]||(a[0]=v=>n(A))},{default:h(()=>[b("我家")]),_:1}),I(r,{onClick:a[1]||(a[1]=v=>n(w))},{default:h(()=>[b("前公司")]),_:1})])])}}}),R=O(F,[["__scopeId","data-v-9fbd2f71"]]);export{R as default};
