import{h as g,o as c,c as u,b as a,n as r,F as p,l as d,t as x,K as _}from"./index-93a656cc.js";const k={"aria-label":"Page navigation example"},v={class:"pagination justify-content-start"},f={class:"page-item",style:{cursor:"pointer"}},y={class:"page-item",style:{cursor:"pointer"}},b=["onClick"],C={class:"page-item",style:{cursor:"pointer"}},N={class:"page-item",style:{cursor:"pointer"}},h={__name:"AppPaginate",props:{meta:{type:Object,default:null},limit:{type:Number,default:5},per_page:{type:Number,default:10}},emits:["setPage","next","prev","last","first"],setup(e,{emit:i}){const s=e,m=g(()=>s.limit/2);g(()=>{const n=[];for(let t=1;t<=s.meta.x_total_page;t++)t%s.limit===0&&n.push(t);return n});function o(n){return parseInt(s.meta.x_current_page)>=s.limit-m.value?parseInt(s.meta.x_current_page)+n-Math.ceil(m.value):n}return(n,t)=>(c(),u("nav",k,[a("ul",v,[a("li",f,[a("a",{class:r(["page-link",{disabled:e.meta.x_current_page<=1}]),onClick:t[0]||(t[0]=l=>i("first",1))},"First",2)]),a("li",y,[a("a",{class:r(["page-link",{disabled:e.meta.x_current_page<=1}]),onClick:t[1]||(t[1]=l=>i("prev",e.meta.x_current_page))},"Previous",2)]),(c(!0),u(p,null,d(e.limit,l=>(c(),u(p,{key:l},[o(l)<=e.meta.x_total_page?(c(),u("li",{key:0,style:{cursor:"pointer"},class:r(["page-item",e.meta.x_current_page==o(l)?"active":""])},[a("a",{class:"page-link","aria-current":"page",onClick:P=>i("setPage",o(l))},x(o(l)),9,b)],2)):_("",!0)],64))),128)),a("li",C,[a("a",{class:r([{disabled:e.meta.x_current_page==e.meta.x_total_page},"page-link"]),onClick:t[2]||(t[2]=l=>i("next",e.meta.x_current_page))},"Next",2)]),a("li",N,[a("a",{class:r(["page-link",{disabled:e.meta.x_current_page==e.meta.x_total_page}]),onClick:t[3]||(t[3]=l=>i("last",e.meta.x_total_page))},"Last",2)])])]))}};export{h as default};
