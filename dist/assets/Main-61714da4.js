import{r as y,j as I,k as C,o as w,a as _,g as r,c as d,l as p,m as A,n as h,u as i,b as n,t as S,q as T,f as M,F as x,s as N,e as E,S as P,i as j,R as D}from"./index-e66b72c4.js";import{u as B}from"./theme-7fb19523.js";import{_ as L}from"./_plugin-vue_export-helper-c27b6911.js";import{u as R}from"./index-095a8fe3.js";const z={__name:"MenuItem",props:{icon:{type:String,default:"chart-simple"},title:{type:String,default:"title"},path:{type:String,default:"path"}},setup(l){const e=l,o=y(""),a=B(),u=I(),t=C(()=>u.name);return w(()=>{const v=window.matchMedia("(max-width: 767px)");o.value=v.matches,v.addListener(f=>{o.value=f.matches})}),(v,f)=>{const b=_("font-awesome-icon"),g=_("router-link");return r(),d("div",null,[p(g,{to:{name:l.path},style:{"text-decoration":"none"}},{default:A(()=>[o.value?(r(),d("div",{key:0,class:h(["text-center p-2 mx-2 menu-atas-item",t.value===e.path&&i(a).themes==="light"?"menu-active":t.value===e.path&&i(a).themes==="dark"?"menu-dark":t.value===e.path?"menu-active":"menu-atas-item "])},[p(b,{icon:l.icon,class:h([t.value===e.path&&i(a).themes==="light"?"text-white":t.value===e.path&&i(a).themes==="dark"?"text-dark":t.value===e.path?"text-white":"text-secondary","iconMobile text-secondary"])},null,8,["icon","class"]),n("p",{class:h(["text-secondary namaMobile",t.value===e.path?"text-white":"text-secondary"])},S(l.title),3)],2)):(r(),d("div",{key:1,class:h(["text-center p-3 mx-3 menu-atas-item",t.value===e.path&&i(a).themes==="light"?"menu-active":t.value===e.path&&i(a).themes==="dark"?"menu-dark":t.value===e.path?"menu-active":"menu-atas-item "])},[p(b,{icon:l.icon,class:h([t.value===e.path&&i(a).themes==="light"?"text-white":t.value===e.path&&i(a).themes==="dark"?"text-dark":t.value===e.path?"text-white":"text-secondary","icon text-secondary"])},null,8,["icon","class"]),n("p",{class:h(["text-secondary nama",t.value===e.path?"text-white":"text-secondary"])},S(l.title),3)],2))]),_:1},8,["to"])])}}},J=L(z,[["__scopeId","data-v-be7f817f"]]),V={class:"container-fluid"},K={key:0,class:"navbar-brand fs-6",href:"#"},Q={key:1,class:"navbar-brand fs-6",href:"#"},U={class:"collapse navbar-collapse",id:"navbarSupportedContent"},q=n("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},null,-1),F={class:"form-check form-switch"},O=["checked"],$={class:"btn-kecil btn btn-outline-info me-2",type:"submit"},G={__name:"NavbarMenu",setup(l){const e=B(),o=R(),a=y(""),u=y(!1),t=y([{icon:"chart-simple",title:"Dashboard",path:"dashboard",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"armada"},{id:7,name:"pendamping"},{id:8,name:"p4nj"},{id:9,name:"keuangan"}]},{icon:"square-poll-horizontal",title:"Statistik",path:"statistik",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"armada"}]},{icon:"user",title:"Santri",path:"santri",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"}]},{icon:"briefcase",title:"Penumpang",path:"penumpang",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"armada"},{id:7,name:"pendamping"},{id:8,name:"p4nj"},{id:9,name:"keuangan"}]},{icon:"bus",title:"Armada",path:"armada",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"armada"},{id:5,name:"pendamping"},{id:6,name:"p4nj"}]},{icon:"map",title:"Area",path:"area",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"keuangan"}]},{icon:"location-dot",title:"Dropspot",path:"dropspot",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"keuangan"}]},{icon:"credit-card",title:"Keuangan",path:"keuangan",rules:[{id:1,name:"sysadmin"}]},{icon:"user-cog",title:"User Account",path:"user",rules:[{id:1,name:"sysadmin"},{id:2,name:"admin"}]},{icon:"user-lock",title:"User Activity",path:"user-activity",rules:[{id:1,name:"sysadmin"}]},{icon:"circle-exclamation",title:"Error Report",path:"error-report",rules:[{id:1,name:"sysadmin"}]},{icon:"rotate",title:"Syncronize",path:"sync",rules:[{id:1,name:"sysadmin"}]}]),v=C(()=>o.user?o.user.role:"wilayah");function f(){return t.value.filter(function(c){return c.rules?c.rules.some(function(m){return m.name===v.value}):null})}w(()=>{const s=window.matchMedia("(max-width: 767px)");a.value=s.matches,s.addListener(m=>{a.value=m.matches});const k=JSON.parse(localStorage.getItem("pageTheme")),c=document.body;k==="dark"?(u.value=!0,c.dataset.bsTheme="dark"):(u.value=!1,c.dataset.bsTheme="light")});function b(){const s=document.body;s.dataset.bsTheme==="light"?(s.dataset.bsTheme="dark",e.themes="dark",u.value=!0):(s.dataset.bsTheme="light",e.themes="light",u.value=!1),localStorage.setItem("pageTheme",JSON.stringify(s.dataset.bsTheme))}function g(){P.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin mengakhiri sesi ?",icon:"info",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Iya",cancelButtonColor:"#28A745",confirmButtonColor:"#DC3545"}).then(s=>{s.isConfirmed&&(localStorage.removeItem("token"),localStorage.removeItem("user"),j.replace("/login"))})}return(s,k)=>{const c=_("font-awesome-icon");return r(),d(x,null,[n("nav",{class:"navbar navbar-dark navbar-expand p-2 fixed-top",style:M(i(e).themes==="light"?"background-color: #003E1E":i(e).themes==="dark"?"background-color: var(--bs-body-bg)":"background-color: #003E1E")},[n("div",V,[a.value?(r(),d("a",K,"PUBER NJ")):(r(),d("a",Q,"Pulang Bersama - PP. Nurul Jadid")),n("div",U,[q,n("div",F,[n("input",{type:"checkbox",id:"flexSwitchCheckCheked",role:"switch",checked:u.value,style:{cursor:"pointer","background-color":"var(--bs-body-bg)"},class:"form-check-input",onClick:b},null,8,O)]),n("button",$,[p(c,{icon:"brush"}),T(" Clear Cache ")]),n("button",{class:"btn-kecil btn btn-outline-danger",type:"button",onClick:g},[p(c,{icon:"sign-out-alt"}),T(" Keluar ")])])])],4),n("div",{class:h(["menu-atas shadow d-flex justify-content-start bg-white",a.value?"fixed-bottom":"fixed-top mt-5"]),style:{"overflow-x":"auto"}},[(r(!0),d(x,null,N(f(),m=>(r(),E(J,{key:m.title,title:m.title,icon:m.icon,path:m.path},null,8,["title","icon","path"]))),128))],2)],64)}}},Z={__name:"Main",setup(l){const e=y("");return w(()=>{const o=window.matchMedia("(max-width: 767px)");e.value=o.matches,o.addListener(a=>{e.value=a.matches})}),(o,a)=>(r(),d(x,null,[p(G),n("main",{class:"px-3",style:M(e.value?"margin-top:58px":"margin-top: 150px;")},[p(i(D))],4)],64))}};export{Z as default};