import{r as _,a as h,c as s,b as o,u as a,d as l,y as i,z as d,t as n,F as c,q as p,g as e,e as g}from"./index-ed1e1048.js";import{u as w}from"./index-397ce2ef.js";const y=o("h3",{class:"titlePage"},"Dashboard",-1),f=o("hr",null,null,-1),b={class:"user-card d-flex align-items-center bg-primary p-2 rounded"},k={key:0,style:{width:"80px",height:"80px","background-color":"rgba(255, 255, 255, 0.363)","border-radius":"50%",display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"},class:"me-3"},x=o("div",{class:"spinner-border text-primary",style:{width:"3rem",height:"3rem"},role:"status"},null,-1),v=[x],T=["src"],D={class:"user-info text-white"},S={style:{"font-size":"20px","margin-bottom":"0"},class:"fw-bold"},A={key:0},B={key:1},j={key:2},P={class:"row mt-3"},U={__name:"Dashboard",setup(z){const t=w(),u=_([{warna:"#006c8a",total:t.stast.totalSantri,nama:"Total Santri"},{warna:"#8a5700",total:t.stast.totalPenumpang,nama:"Total Penumpang"},{warna:"#8a5700",total:t.stast.totalTidakRombongan,nama:"Total Santri Tidak Rombongan"},{warna:"#315200",total:t.stast.totalArea,nama:"Total Area"},{warna:"#2d0063",total:t.stast.totalDropspot,nama:"Total Dropspot"},...t.user.role=="sysadmin"?[{warna:"#5e0600",total:t.stast.totalUser,nama:"Total User"}]:[]]);return t.getStats(),t.getImage(t.user.niup,"small"),(C,F)=>{const m=h("widget-dashboard");return e(),s(c,null,[y,f,o("div",b,[a(t).user.role!="p4nj"?l((e(),s("div",k,v,512)),[[i,a(t).loading===!0]]):d("",!0),a(t).user.role!="p4nj"?l((e(),s("img",{key:1,src:a(t).foto,alt:"pohto-profile",width:"80",class:"rounded-circle me-3"},null,8,T)),[[i,a(t).loading===!1]]):d("",!0),o("div",D,[o("p",S,n(a(t).user.nama_lengkap),1),a(t).user.role==="daerah"?(e(),s("i",A,n(`Daerah ${a(t).user.blok}`),1)):a(t).user.role==="wilayah"?(e(),s("i",B,n(a(t).user.wilayah),1)):(e(),s("i",j,n(a(t).user.role),1))])]),o("div",P,[(e(!0),s(c,null,p(u.value,r=>(e(),g(m,{key:r.id,warna:r.warna,total:r.total,nama:r.nama},null,8,["warna","total","nama"]))),128))])],64)}}};export{U as default};
