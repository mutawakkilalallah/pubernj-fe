import{i as B,j as w,o as S,a as g,g as r,c as d,k as m,l as I,b as e,n as f,u as c,t as M,r as b,m as x,f as N,F as y,q as A,e as E,S as P,s as j,R as D}from"./index-1bd63614.js";import{u as T}from"./theme-1bc49197.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";import{u as J}from"./index-b3255be7.js";const R={__name:"MenuItem",props:{icon:{type:String,default:"chart-simple"},title:{type:String,default:"title"},path:{type:String,default:"path"}},setup(l){const a=l,s=T(),u=B(),t=w(()=>u.name);return S(()=>{}),(v,k)=>{const p=g("font-awesome-icon"),_=g("router-link");return r(),d("div",null,[m(_,{to:{name:l.path},style:{"text-decoration":"none"}},{default:I(()=>[e("div",{class:f(["text-center p-3 mx-3",t.value===a.path&&c(s).themes==="light"?"menu-active":t.value===a.path&&c(s).themes==="dark"?"menu-dark":"menu-atas-item "])},[m(p,{icon:l.icon,class:f([t.value===a.path&&c(s).themes==="light"?"text-white":t.value===a.path&&c(s).themes==="dark"?"text-dark":"text-secondary","icon"])},null,8,["icon","class"]),e("p",{class:f(["text-secondary nama",t.value===a.path?"text-white":""])},M(l.title),3)],2)]),_:1},8,["to"])])}}},V=z(R,[["__scopeId","data-v-7d57fbb3"]]),K={class:"container-fluid"},L={key:0,class:"navbar-brand fs-6",href:"#"},$={key:1,class:"navbar-brand fs-6",href:"#"},q={class:"collapse navbar-collapse",id:"navbarSupportedContent"},F=e("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},null,-1),O={class:"form-check form-switch"},U=["checked"],Q={class:"btn-kecil btn btn-outline-info me-2",type:"submit"},G={class:"menu-atas shadow d-flex justify-content-start mt-5 fixed-top bg-white",style:{"overflow-x":"auto"}},H={__name:"NavbarMenu",setup(l){const a=T(),s=J(),u=b(""),t=b(!1),v=b([{icon:"chart-simple",title:"Dashboard",path:"dashboard",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"armada"},{id:7,name:"pendamping"},{id:8,name:"p4nj"},{id:9,name:"keuangan"}]},{icon:"square-poll-horizontal",title:"Statistik",path:"statistik",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"}]},{icon:"user",title:"Santri",path:"santri",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"}]},{icon:"briefcase",title:"Penumpang",path:"penumpang",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"armada"},{id:7,name:"pendamping"},{id:8,name:"p4nj"},{id:9,name:"keuangan"}]},{icon:"bus",title:"Armada",path:"armada",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"armada"},{id:5,name:"pendamping"},{id:6,name:"p4nj"}]},{icon:"map",title:"Area",path:"area",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"keuangan"}]},{icon:"location-dot",title:"Dropspot",path:"dropspot",rules:[{id:1,name:"sysadmin"},{id:2,name:"supervisor"},{id:3,name:"admin"},{id:4,name:"wilayah"},{id:5,name:"daerah"},{id:6,name:"keuangan"}]},{icon:"credit-card",title:"Keuangan",path:"keuangan",rules:[{id:1,name:"sysadmin"}]},{icon:"user-cog",title:"User Account",path:"user",rules:[{id:1,name:"sysadmin"},{id:2,name:"admin"}]},{icon:"rotate",title:"Syncronize",path:"sync",rules:[{id:1,name:"sysadmin"}]}]),k=w(()=>s.user?s.user.role:"wilayah");function p(){return v.value.filter(function(i){return i.rules?i.rules.some(function(o){return o.name===k.value}):null})}S(()=>{const n=window.matchMedia("(max-width: 767px)");u.value=n.matches,n.addListener(o=>{u.value=o.matches});const h=JSON.parse(localStorage.getItem("pageTheme")),i=document.body;h==="dark"?(t.value=!0,i.dataset.bsTheme="dark"):(t.value=!1,i.dataset.bsTheme="light")});function _(){const n=document.body;n.dataset.bsTheme==="light"?(n.dataset.bsTheme="dark",a.themes="dark",t.value=!0):(n.dataset.bsTheme="light",a.themes="light",t.value=!1),localStorage.setItem("pageTheme",JSON.stringify(n.dataset.bsTheme))}function C(){P.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin mengakhiri sesi ?",icon:"info",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Iya",cancelButtonColor:"#28A745",confirmButtonColor:"#DC3545"}).then(n=>{n.isConfirmed&&(localStorage.removeItem("token"),localStorage.removeItem("user"),j.replace("/login"))})}return(n,h)=>{const i=g("font-awesome-icon");return r(),d(y,null,[e("nav",{class:"navbar navbar-dark navbar-expand p-2 fixed-top",style:N(c(a).themes==="light"?"background-color: #003E1E":c(a).themes==="dark"?"background-color: var(--bs-body-bg)":"background-color: #003E1E")},[e("div",K,[u.value?(r(),d("a",L,"PUBER NJ")):(r(),d("a",$,"Pulang Bersama - PP. Nurul Jadid")),e("div",q,[F,e("div",O,[e("input",{type:"checkbox",id:"flexSwitchCheckCheked",role:"switch",checked:t.value,style:{cursor:"pointer","background-color":"var(--bs-body-bg)"},class:"form-check-input",onClick:_},null,8,U)]),e("button",Q,[m(i,{icon:"brush"}),x(" Clear Cache ")]),e("button",{class:"btn-kecil btn btn-outline-danger",type:"button",onClick:C},[m(i,{icon:"sign-out-alt"}),x(" Keluar ")])])])],4),e("div",G,[(r(!0),d(y,null,A(p(),o=>(r(),E(V,{key:o.title,title:o.title,icon:o.icon,path:o.path},null,8,["title","icon","path"]))),128))])],64)}}},W={class:"px-3",style:{"margin-top":"150px"}},ae={__name:"Main",setup(l){return(a,s)=>(r(),d(y,null,[m(H),e("main",W,[m(c(D))])],64))}};export{ae as default};
