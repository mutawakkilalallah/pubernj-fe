import{o as r,c as n,b as a,t as i,k as h,d as l,l as d,u as e,F as c,j as p,h as w}from"./index-dca10e1d.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import{u as g}from"./index-e5c4742d.js";const b={props:["warna","total","nama"]},x={class:"col-md-3"},y=a("hr",null,null,-1);function k(_,t,s,u,m,o){return r(),n("div",x,[a("div",{class:"box-widget rounded text-white text-center p-4 mb-4",style:h({backgroundColor:s.warna})},[a("h1",null,i(s.total),1),y,a("p",null,i(s.nama),1)],4)])}const v=f(b,[["render",k]]),D=a("h3",null,"Dashboard",-1),S=a("hr",null,null,-1),T={class:"user-card d-flex align-items-center bg-primary p-2 rounded"},$={style:{width:"80px",height:"80px","background-color":"rgba(255, 255, 255, 0.363)","border-radius":"50%",display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"},class:"me-3"},A=a("div",{class:"spinner-border text-primary",style:{width:"3rem",height:"3rem"},role:"status"},null,-1),B=[A],j=["src"],z={class:"user-info text-white"},F={style:{"font-size":"20px","margin-bottom":"0"},class:"fw-bold"},N={key:0},V={key:1},C={class:"row mt-3"},U={__name:"Dashboard",setup(_){const t=g();t.getImage(t.user.santri_uuid,"small"),setTimeout(()=>t.alert=!1,2e3);const s=[{warna:"#315200",total:0,nama:"Total Area"},{warna:"#2d0063",total:0,nama:"Total Dropspot"},{warna:"#5e0600",total:0,nama:"Total User"}];return(u,m)=>(r(),n(c,null,[D,S,a("div",T,[l(a("div",$,B,512),[[d,e(t).loading===!0]]),l(a("img",{src:e(t).foto,alt:"pohto-profile",width:"80",class:"rounded-circle me-3"},null,8,j),[[d,e(t).loading===!1]]),a("div",z,[a("p",F,i(e(t).user.santri_nama),1),e(t).user.role==="wilayah"?(r(),n("i",N,i(e(t).user.raw.domisili_santri[e(t).user.raw.domisili_santri.length-1].wilayah+" - "+e(t).user.raw.domisili_santri[e(t).user.raw.domisili_santri.length-1].blok),1)):(r(),n("i",V,i(e(t).user.role),1))])]),a("div",C,[(r(),n(c,null,p(s,o=>w(v,{key:o.nama,warna:o.warna,total:o.total,nama:o.nama},null,8,["warna","total","nama"])),64))])],64))}};export{U as default};