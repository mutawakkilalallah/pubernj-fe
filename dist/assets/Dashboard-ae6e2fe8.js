import{o as i,c,b as t,t as n,k as f,a as g,d as r,l,u as e,h as u,F as _,j as w}from"./index-ab58a4f2.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";import{u as x}from"./index-78054503.js";const y={props:["warna","total","nama"]},v={class:"col-md-3"},k=t("hr",null,null,-1);function D(m,a,o,h,p,d){return i(),c("div",v,[t("div",{class:"box-widget rounded text-white text-center p-4 mb-4",style:f({backgroundColor:o.warna})},[t("h1",null,n(o.total),1),k,t("p",null,n(o.nama),1)],4)])}const B=b(y,[["render",D]]),S=t("h3",null,"Dashboard",-1),T=t("hr",null,null,-1),$={class:"user-card d-flex align-items-center bg-primary p-2 rounded"},A={style:{width:"80px",height:"80px","background-color":"rgba(255, 255, 255, 0.363)","border-radius":"50%",display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"},class:"me-3"},j=t("div",{class:"spinner-border text-primary",style:{width:"3rem",height:"3rem"},role:"status"},null,-1),z=[j],C=["src"],F={class:"user-info text-white"},N={style:{"font-size":"20px","margin-bottom":"0"},class:"fw-bold"},V={class:"row mt-3"},U={__name:"Dashboard",setup(m){const a=x();a.getImage(a.user.santri_uuid,"small"),setTimeout(()=>a.alert=!1,2e3);const o=[{warna:"#315200",total:0,nama:"Total Area"},{warna:"#2d0063",total:0,nama:"Total Dropspot"},{warna:"#5e0600",total:0,nama:"Total User"}];return(h,p)=>{const d=g("app-alert");return i(),c(_,null,[S,r(u(d,{label:"Berhasil login"},null,512),[[l,e(a).alert===!0]]),T,t("div",$,[r(t("div",A,z,512),[[l,e(a).loading===!0]]),r(t("img",{src:e(a).foto,alt:"pohto-profile",width:"80",class:"rounded-circle me-3"},null,8,C),[[l,e(a).loading===!1]]),t("div",F,[t("p",N,n(e(a).nama),1),t("i",null,n(e(a).user.role),1)])]),t("div",V,[(i(),c(_,null,w(o,s=>u(B,{key:s.nama,warna:s.warna,total:s.total,nama:s.nama},null,8,["warna","total","nama"])),64))])],64)}}};export{U as default};
