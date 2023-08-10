import{a as h,c as i,b as s,u as o,d as n,y as r,z as l,t as e,k as a,F as m,g as d}from"./index-1bd63614.js";import{u}from"./index-b3255be7.js";import{u as x}from"./table-30af121d.js";const v=s("h3",{class:"titlePage"},"Dashboard",-1),p=s("hr",null,null,-1),g={class:"user-card d-flex align-items-center bg-primary p-2 rounded"},b={key:0,style:{width:"80px",height:"80px","background-color":"rgba(255, 255, 255, 0.363)","border-radius":"50%",display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"},class:"me-3"},y=s("div",{class:"spinner-border text-primary",style:{width:"3rem",height:"3rem"},role:"status"},null,-1),f=[y],w=["src"],k={class:"user-info text-white"},T={style:{"font-size":"20px","margin-bottom":"0"},class:"fw-bold"},z={key:0},D={key:1},S={key:2},A={class:"row mt-3 g-2"},j={class:"col-sm-3 mb-3 mb-sm-0"},B={class:"card",style:{"background-color":"#006c8a"}},N={class:"card-body"},P={class:"row"},V={class:"col"},C={class:"col"},F={class:"card-title text-end text-light"},R=s("p",{class:"card-text text-end h6 text-light"},"Total Santri",-1),U={class:"col-sm-3 mb-3 mb-sm-0"},E={class:"card text-bg-primary"},I={class:"card-body"},$={class:"row"},q={class:"col"},G={class:"col"},H={class:"card-title text-end"},J=s("p",{class:"card-text text-end h6"},"Total Penumpang",-1),K={class:"col-sm-3 mb-3 mb-sm-0"},L={class:"card",style:{"background-color":"#8a5700"}},M={class:"card-body"},O={class:"row"},Q={class:"col"},W={class:"col"},X={class:"card-title text-end text-light"},Y=s("p",{class:"card-text text-end h6 text-light"}," Total Tidak Rombongan ",-1),Z={class:"col-sm-3 mb-3 mb-sm-0"},ss={class:"card",style:{"background-color":"#cd0052"}},ts={class:"card-body"},os={class:"row"},es={class:"col"},cs={class:"col"},is={class:"card-title text-end text-light"},as=s("p",{class:"card-text text-end h6 text-light"},"Total Armada",-1),ds={class:"col-sm-3 mb-3 mb-sm-0"},ls={class:"card",style:{"background-color":"#315200"}},ns={class:"card-body"},rs={class:"row"},_s={class:"col"},hs={class:"col"},ms={class:"card-title text-end text-light"},us=s("p",{class:"card-text text-end h6 text-light"},"Total Area",-1),xs={class:"col-sm-3 mb-3 mb-sm-0"},vs={class:"card",style:{"background-color":"#2d0063"}},ps={class:"card-body"},gs={class:"row"},bs={class:"col"},ys={class:"col"},fs={class:"card-title text-end text-light"},ws=s("p",{class:"card-text text-end h6 text-light"},"Total Dropspot",-1),ks={key:0,class:"col-sm-3 mb-3 mb-sm-0"},Ts={class:"card",style:{"background-color":"#5e0600"}},zs={class:"card-body"},Ds={class:"row"},Ss={class:"col"},As={class:"col"},js={class:"card-title text-end text-light"},Bs=s("p",{class:"card-text text-end h6 text-light"},"Total User",-1),Us={__name:"Dashboard",setup(Ns){const _=x(),t=u();return _.getData(),t.getStats(),t.getImage(t.user.niup,"small"),(Ps,Vs)=>{const c=h("font-awesome-icon");return d(),i(m,null,[v,p,s("div",g,[o(t).user.role!="p4nj"?n((d(),i("div",b,f,512)),[[r,o(t).loading===!0]]):l("",!0),o(t).user.role!="p4nj"?n((d(),i("img",{key:1,src:o(t).foto,alt:"pohto-profile",width:"80",class:"rounded-circle me-3"},null,8,w)),[[r,o(t).loading===!1]]):l("",!0),s("div",k,[s("p",T,e(o(t).user.nama_lengkap),1),o(t).user.role==="daerah"?(d(),i("i",z,e(`Daerah ${o(t).user.blok}`),1)):o(t).user.role==="wilayah"?(d(),i("i",D,e(o(t).user.wilayah),1)):(d(),i("i",S,e(o(t).user.role),1))])]),s("div",A,[s("div",j,[s("div",B,[s("div",N,[s("div",P,[s("div",V,[a(c,{icon:"user",style:{"font-size":"90px",color:"white"}})]),s("div",C,[s("h2",F,e(o(t).stast.totalSantri),1),R])])])])]),s("div",U,[s("div",E,[s("div",I,[s("div",$,[s("div",q,[a(c,{icon:"briefcase",style:{"font-size":"90px"}})]),s("div",G,[s("h2",H,e(o(t).stast.totalPenumpang),1),J])])])])]),s("div",K,[s("div",L,[s("div",M,[s("div",O,[s("div",Q,[a(c,{icon:"user-xmark",style:{"font-size":"90px",color:"white"}})]),s("div",W,[s("h2",X,e(o(t).stast.totalTidakRombongan),1),Y])])])])]),s("div",Z,[s("div",ss,[s("div",ts,[s("div",os,[s("div",es,[a(c,{icon:"bus",style:{"font-size":"90px",color:"white"}})]),s("div",cs,[s("h2",is,e(o(t).stast.totalArmada),1),as])])])])]),s("div",ds,[s("div",ls,[s("div",ns,[s("div",rs,[s("div",_s,[a(c,{icon:"map",style:{"font-size":"90px",color:"white"}})]),s("div",hs,[s("h2",ms,e(o(t).stast.totalArea),1),us])])])])]),s("div",xs,[s("div",vs,[s("div",ps,[s("div",gs,[s("div",bs,[a(c,{icon:"location-dot",style:{"font-size":"90px",color:"white"}})]),s("div",ys,[s("h2",fs,e(o(t).stast.totalDropspot),1),ws])])])])]),o(t).user.role==="sysadmin"?(d(),i("div",ks,[s("div",Ts,[s("div",zs,[s("div",Ds,[s("div",Ss,[a(c,{icon:"user-cog",style:{"font-size":"90px",color:"white"}})]),s("div",As,[s("h2",js,e(o(t).stast.totalUser),1),Bs])])])])])):l("",!0)])],64)}}};export{Us as default};
