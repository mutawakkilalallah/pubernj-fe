import{g as x,h as g,a as r,o,e as f,i as y,b as e,n as v,j as i,t as k,S as w,c as s,k as h,F as d,l as B,u as C,R as M}from"./index-85cf10b6.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";const S={class:"text-secondary nama"},N={__name:"MenuItem",props:{icon:{type:String,default:"chart-simple"},title:{type:String,default:"title"},path:{type:String,default:"path"}},setup(t){const n=t,l=x(),_=g(()=>l.name);return(u,p)=>{const c=r("font-awesome-icon"),m=r("router-link");return o(),f(m,{to:{name:t.path},style:{"text-decoration":"none"}},{default:y(()=>[e("div",{class:v(["menu-atas-item text-center p-3 mx-3",_.value==n.path?"menu-active":""])},[i(c,{icon:t.icon,class:"icon text-secondary"},null,8,["icon"]),e("p",S,k(t.title),1)],2)]),_:1},8,["to"])}}},P=b(N,[["__scopeId","data-v-0e768bfa"]]),I={components:{MenuItem:P},data(){return{isMobile:!1,menu:[{icon:"chart-simple",title:"Dashboard",path:"dashboard"},{icon:"user",title:"Santri",path:"santri"},{icon:"briefcase",title:"Penumpang",path:"penumpang"},{icon:"map",title:"Area",path:"area"},{icon:"location-dot",title:"Dropspot",path:"dropspot"},{icon:"user-cog",title:"User Account",path:"user"},{icon:"rotate",title:"Syncronize",path:"sync"}]}},mounted(){const t=window.matchMedia("(max-width: 767px)");this.isMobile=t.matches,t.addListener(n=>{this.isMobile=n.matches})},methods:{prosesLogout(){w.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin mengakhiri sesi ?",icon:"info",showCancelButton:!0,cancelButtonText:"Batal",confirmButtonText:"Iya",cancelButtonColor:"#28A745",confirmButtonColor:"#DC3545"}).then(t=>{t.isConfirmed&&(localStorage.clear(),this.$router.replace("/login"))})}}},L={class:"navbar navbar-dark navbar-expand bg-primary p-2 fixed-top"},$={class:"container-fluid"},A={key:0,class:"navbar-brand fs-6",href:"#"},D={key:1,class:"navbar-brand fs-6",href:"#"},R={class:"collapse navbar-collapse",id:"navbarSupportedContent"},V=e("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},null,-1),T={class:"btn-kecil btn btn-outline-info me-2",type:"submit"},j={class:"menu-atas shadow d-flex justify-content-start mt-5 fixed-top bg-white",style:{"overflow-x":"auto"}};function z(t,n,l,_,u,p){const c=r("font-awesome-icon"),m=r("menu-item");return o(),s(d,null,[e("nav",L,[e("div",$,[u.isMobile?(o(),s("a",A,"PUBER NJ")):(o(),s("a",D,"Pulang Bersama - PP. Nurul Jadid")),e("div",R,[V,e("button",T,[i(c,{icon:"brush"}),h(" Clear Cache ")]),e("button",{class:"btn-kecil btn btn-outline-danger",type:"button",onClick:n[0]||(n[0]=(...a)=>p.prosesLogout&&p.prosesLogout(...a))},[i(c,{icon:"sign-out-alt"}),h(" Keluar ")])])])]),e("div",j,[(o(!0),s(d,null,B(u.menu,a=>(o(),f(m,{key:a.title,title:a.title,icon:a.icon,path:a.path},null,8,["title","icon","path"]))),128))])],64)}const E=b(I,[["render",z]]),F={class:"px-3",style:{"margin-top":"150px"}},U={__name:"Main",setup(t){return(n,l)=>(o(),s(d,null,[i(E),e("main",F,[i(C(M))])],64))}};export{U as default};
