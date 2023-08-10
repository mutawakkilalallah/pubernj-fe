import{x as E,D as V,C as u,S as w,o as x,a as O,g as l,c as d,b as t,d as p,E as m,u as s,F as c,q as h,t as r,v as f,z as _,k as y,l as T,m as v,n as P,w as C,G as D}from"./index-d4c3e7ab.js";const b=E("table_armada",{state:()=>({user:localStorage.getItem("user")?V():null,items:[],itemsPendamping:[],filter:{area:[],dropspot:[]},meta:{},paramsPendamping:{cari:"",role:"pendamping"},params:{cari:"",area:"",dropspot:"",type:"",jenis:""}}),actions:{async getData(){const i={params:this.params};try{await u.get("armada",i).then(n=>{(n.data.code=200)&&(this.items=n.data.data,this.filter.area=n.data.filter.area,this.meta=n.headers)})}catch{}},async getPendamping(){const i={params:this.paramsPendamping};try{await u.get("user",i).then(n=>{(n.data.code=200)&&(this.itemsPendamping=n.data.data)})}catch{}},async getDropspot(){this.params.dropspot="",this.getData();const i={params:{area:this.params.area}};try{await u.get("dropspot",i).then(n=>{(n.data.code=200)&&(this.filter.dropspot=n.data.data)})}catch{}}}}),S=E("form_armada",{state:()=>({isOpenAdd:!1,isOpenEdit:!1,isOpenPendamping:!1,isArea:[],isDropspot:[],idEdit:"",idArea:"",namaArea:"",namaDropsot:"",data_pendamping:{},formPendamping:{user_uuid:""},form:{nama:"",type:"",jenis:"",dropspot_id:""}}),actions:{resetForm(){this.idArea="",this.form.nama="",this.form.type="",this.form.jenis="",this.form.dropspot_id=""},setOpenAdd(){this.isOpenAdd=!this.isOpenAdd},setOpenEdit(){this.isOpenEdit=!this.isOpenEdit,this.resetForm()},setOpenPendamping(i){this.idEdit=i.id,this.data_pendamping=i.user?i.user:{},this.isOpenPendamping=!this.isOpenPendamping,this.formPendamping.user_uuid=""},async setPendamping(i){this.formPendamping.user_uuid=i;try{await u.put(`armada/pendamping/${this.idEdit}`,this.formPendamping).then(n=>{this.isOpenPendamping=!1,this.resetForm(),this.formPendamping.user_uuid="";const o=b();o.paramsPendamping.cari="",o.itemsPendamping=[],o.getData()})}catch{}},async deletePendamping(){try{await u.put(`armada/pendamping/delete/${this.idEdit}`).then(i=>{this.isOpenPendamping=!1,this.resetForm(),this.formPendamping.user_uuid="";const n=b();n.paramsPendamping.cari="",n.itemsPendamping=[],n.getData()})}catch{}},getArea(){try{u.get("area").then(i=>{this.isArea=i.data.data})}catch{}},async getDropspot(){this.form.dropspot_id="";const i={params:{area:this.idArea}};try{await u.get("dropspot",i).then(n=>{this.isDropspot=n.data.data})}catch{}},async tambahData(){try{await u.post("armada",this.form),this.isOpenAdd=!1,b().getData(),this.resetForm()}catch{}},handleDoubleClik(i){this.idEdit=i.id,this.idArea=i.dropspot.area_id,this.namaDropsot=i.dropspot.nama,this.form.nama=i.nama,this.form.type=i.type,this.form.jenis=i.jenis,this.getDropspot(),this.form.dropspot_id=i.dropspot_id,this.isOpenEdit=!0},async editData(){try{await u.put(`armada/${this.idEdit}`,this.form).then(i=>{this.isOpenEdit=!1,this.resetForm(),b().getData()})}catch{}},async deleteData(){w.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin menghapus data ?",icon:"info",showCancelButton:!0,confirmButtonText:"Hapus",confirmButtonColor:"#DC3545"}).then(i=>{i.isConfirmed&&u.delete(`armada/${this.idEdit}`).then(n=>{this.isOpenEdit=!1,this.resetForm(),b().getData()})})}}}),N=t("h3",{class:"titlePage"},"Data Armada",-1),j=t("hr",null,null,-1),F={class:"filter-box mb-5 row"},B={class:"col-md-2"},L=t("option",{value:"",selected:""},"Semua Area",-1),M=["value"],$=["disabled"],I=t("option",{value:"",selected:""},"Semua Dropsot",-1),H=["value"],J={class:"col-md-2"},K=D('<option value="" selected>Semua Type</option><option value="bus" selected>BUS</option><option value="mini_bus" selected>MINI BUS</option><option value="elf" selected>ELF</option><option value="hiace" selected>HIACE</option><option value="mpv" selected>MPV</option>',6),z=[K],G=t("option",{value:"",selected:""},"Semua Jenis",-1),R=t("option",{value:"putra",selected:""},"PUTRA",-1),q=t("option",{value:"putri",selected:""},"PUTRI",-1),Q=[G,R,q],W={class:"serach-box row"},X={class:"col-md-10 d-flex align-items-center mb-2"},Y={class:"col-md-2 d-flex align-items-center"},Z=t("hr",null,null,-1),tt={class:"table-responsive"},et={class:"table table-sm table-hover mt-3"},st=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama Armada"),t("th",{scope:"col"},"Type"),t("th",{scope:"col"},"Jenis"),t("th",{scope:"col"},"Penumpang"),t("th",{scope:"col"},"Pendamping"),t("th",{scope:"col"},"Dropspot")])],-1),ot=["onDblclick"],at={class:"btn btn-primary btn-sm"},nt=["onClick"],it={class:"modal-dialog"},lt={class:"modal-content"},dt={class:"modal-header"},rt=t("h1",{class:"modal-title fs-5",id:"modalTambahLabel"},"Tambah Armada",-1),pt={class:"modal-body"},mt={class:"form-group mb-3"},ut=t("small",null,"Nama Armada",-1),ct={class:"form-group mb-3"},ht=t("small",null,"Type",-1),_t=D('<option value="" selected>Pilih Type</option><option value="bus" selected>bus</option><option value="mini_bus" selected>mini_bus</option><option value="elf" selected>elf</option><option value="hiace" selected>hiace</option><option value="mpv" selected>mpv</option>',6),bt=[_t],gt={class:"form-group mb-3"},ft=t("small",null,"Jenis",-1),vt=t("option",{value:"",selected:""},"Pilih Jenis",-1),yt=t("option",{value:"putra",selected:""},"putra",-1),Pt=t("option",{value:"putri",selected:""},"putri",-1),Dt=[vt,yt,Pt],At={class:"form-group mb-3"},kt=t("small",null,"Area",-1),Ot=t("option",{value:"",selected:""},"Pilih Area",-1),Ct=["value"],Et={class:"form-group mb-3"},Ut=t("small",null,"Dropspot",-1),Vt=["disabled"],wt=t("option",{value:"",selected:""},"Pilih Dropsot",-1),xt=["value"],Tt={class:"modal-footer"},St=t("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),Nt={class:"modal-dialog"},jt={class:"modal-content"},Ft={class:"modal-header"},Bt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Armada",-1),Lt={class:"modal-body"},Mt={class:"form-group mb-3"},$t=t("small",null,"Nama Armada",-1),It={class:"form-group mb-3"},Ht=t("small",null,"Type",-1),Jt=D('<option value="bus" selected>bus</option><option value="mini_bus" selected>mini_bus</option><option value="elf" selected>elf</option><option value="hiace" selected>hiace</option><option value="mpv" selected>mpv</option>',5),Kt=[Jt],zt={class:"form-group mb-3"},Gt=t("small",null,"Jenis",-1),Rt=t("option",{value:"putra",selected:""},"putra",-1),qt=t("option",{value:"putri",selected:""},"putri",-1),Qt=[Rt,qt],Wt={class:"form-group mb-3"},Xt=t("small",null,"Area",-1),Yt=t("option",{value:"",selected:""},"Pilih Area",-1),Zt=["value"],te={class:"form-group mb-3"},ee=t("small",null,"Dropspot",-1),se=["disabled"],oe={key:0,value:"",selected:""},ae={value:"",selected:""},ne=["value"],ie={class:"modal-footer"},le={key:1,type:"submit",class:"btn btn-sm btn-primary"},de={class:"modal-dialog"},re={class:"modal-content"},pe={class:"modal-header"},me=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"}," Kelola Pendamping ",-1),ue={class:"modal-body"},ce=t("b",null,"Nama Pendamping : ",-1),he=t("b",null,"NO. HP : ",-1),_e={class:"modal-body"},be={class:"table-responsive"},ge={class:"table table-sm table-hover mt-3"},fe=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"})])],-1),ve=["onClick"],ye={class:"modal-footer"},Ae={__name:"ArmadaPage",setup(i){const n=b(),o=S();return x(()=>{n.getData(),o.getArea()}),(Pe,a)=>{const A=O("font-awesome-icon"),U=O("router-link");return l(),d(c,null,[N,j,t("div",F,[t("div",B,[p(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":a[0]||(a[0]=e=>s(n).params.area=e),onChange:a[1]||(a[1]=(...e)=>s(n).getDropspot&&s(n).getDropspot(...e))},[L,(l(!0),d(c,null,h(s(n).filter.area,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,M))),128))],544),[[m,s(n).params.area]]),p(t("select",{class:"form-select form-select-sm mb-2",disabled:s(n).params.area==="","onUpdate:modelValue":a[2]||(a[2]=e=>s(n).params.dropspot=e),onChange:a[3]||(a[3]=(...e)=>s(n).getData&&s(n).getData(...e))},[I,(l(!0),d(c,null,h(s(n).filter.dropspot,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,H))),128))],40,$),[[m,s(n).params.dropspot]])]),t("div",J,[p(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":a[4]||(a[4]=e=>s(n).params.type=e),onChange:a[5]||(a[5]=(...e)=>s(n).getData&&s(n).getData(...e))},z,544),[[m,s(n).params.type]]),p(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":a[6]||(a[6]=e=>s(n).params.jenis=e),onChange:a[7]||(a[7]=(...e)=>s(n).getData&&s(n).getData(...e))},Q,544),[[m,s(n).params.jenis]])])]),t("div",W,[t("div",X,[t("small",null,"Total data "+r(s(n).meta.x_total_data),1)]),t("div",Y,[p(t("input",{type:"text","onUpdate:modelValue":a[8]||(a[8]=e=>s(n).params.cari=e),class:"form-control form-control-sm mb-2",placeholder:"Cari Armada ...",onKeyup:a[9]||(a[9]=(...e)=>s(n).getData&&s(n).getData(...e))},null,544),[[f,s(n).params.cari]])])]),Z,s(n).user.role=="sysadmin"?(l(),d("button",{key:0,class:"btn btn-sm btn-primary",onClick:a[10]||(a[10]=(...e)=>s(o).setOpenAdd&&s(o).setOpenAdd(...e))}," Tambah Armada ")):_("",!0),t("div",tt,[t("table",et,[st,t("tbody",null,[(l(!0),d(c,null,h(s(n).items,(e,g)=>(l(),d("tr",{key:g,onDblclick:k=>s(n).user.role==="sysadmin"&&s(o).handleDoubleClik(e)},[t("td",null,r(g+1),1),t("td",null,r(e.nama),1),t("td",null,r(e.type.toUpperCase()),1),t("td",null,r(e.jenis.toUpperCase()),1),t("td",null,[y(U,{to:{name:"armada-detail",params:{id:e.id}}},{default:T(()=>[t("button",at,[y(A,{icon:"clipboard",class:"icon"}),v(" Daftar Penumpang ")])]),_:2},1032,["to"])]),t("td",null,[t("button",{class:"btn btn-primary btn-sm",onClick:k=>s(o).setOpenPendamping(e)},[y(A,{icon:"user-md",class:"icon"}),v(" Pendamping ")],8,nt)]),t("td",null,r(e.dropspot.nama),1)],40,ot))),128))])])]),s(o).isOpenAdd===!0?(l(),d("div",{key:1,class:P(["modal fade",{show:s(o).isOpenAdd}]),style:{display:"block"},id:"modalTambah",tabindex:"-1","aria-labelledby":"modalTambahLabel","aria-hidden":"true"},[t("div",it,[t("div",lt,[t("div",dt,[rt,t("button",{class:"btn-close",type:"button",onClick:a[11]||(a[11]=(...e)=>s(o).setOpenAdd&&s(o).setOpenAdd(...e))})]),t("form",{onSubmit:a[19]||(a[19]=C((...e)=>s(o).tambahData&&s(o).tambahData(...e),["prevent"]))},[t("div",pt,[t("div",mt,[ut,p(t("input",{type:"text","onUpdate:modelValue":a[12]||(a[12]=e=>s(o).form.nama=e),placeholder:"Masukkan nama armada ..",class:"form-control mt-2"},null,512),[[f,s(o).form.nama]])]),t("div",ct,[ht,p(t("select",{class:"form-select","onUpdate:modelValue":a[13]||(a[13]=e=>s(o).form.type=e)},bt,512),[[m,s(o).form.type]])]),t("div",gt,[ft,p(t("select",{class:"form-select","onUpdate:modelValue":a[14]||(a[14]=e=>s(o).form.jenis=e)},Dt,512),[[m,s(o).form.jenis]])]),t("div",At,[kt,p(t("select",{class:"form-select","onUpdate:modelValue":a[15]||(a[15]=e=>s(o).idArea=e),onChange:a[16]||(a[16]=(...e)=>s(o).getDropspot&&s(o).getDropspot(...e))},[Ot,(l(!0),d(c,null,h(s(o).isArea,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,Ct))),128))],544),[[m,s(o).idArea]])]),t("div",Et,[Ut,p(t("select",{class:"form-select","onUpdate:modelValue":a[17]||(a[17]=e=>s(o).form.dropspot_id=e),disabled:s(o).idArea===""},[wt,(l(!0),d(c,null,h(s(o).isDropspot,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,xt))),128))],8,Vt),[[m,s(o).form.dropspot_id]])])]),t("div",Tt,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[18]||(a[18]=(...e)=>s(o).setOpenAdd&&s(o).setOpenAdd(...e))}," Tutup "),St])],32)])])],2)):_("",!0),s(o).isOpenEdit===!0?(l(),d("div",{key:2,class:P(["modal fade",{show:s(o).isOpenEdit}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",Nt,[t("div",jt,[t("div",Ft,[Bt,t("button",{class:"btn-close",type:"button",onClick:a[20]||(a[20]=(...e)=>s(o).setOpenEdit&&s(o).setOpenEdit(...e))})]),t("form",{onSubmit:a[29]||(a[29]=C((...e)=>s(o).editData&&s(o).editData(...e),["prevent"]))},[t("div",Lt,[t("div",Mt,[$t,p(t("input",{type:"text",class:"form-control mt-2","onUpdate:modelValue":a[21]||(a[21]=e=>s(o).form.nama=e)},null,512),[[f,s(o).form.nama]])]),t("div",It,[Ht,p(t("select",{class:"form-select","onUpdate:modelValue":a[22]||(a[22]=e=>s(o).form.type=e)},Kt,512),[[m,s(o).form.type]])]),t("div",zt,[Gt,p(t("select",{class:"form-select","onUpdate:modelValue":a[23]||(a[23]=e=>s(o).form.jenis=e)},Qt,512),[[m,s(o).form.jenis]])]),t("div",Wt,[Xt,p(t("select",{class:"form-select","onUpdate:modelValue":a[24]||(a[24]=e=>s(o).idArea=e),onChange:a[25]||(a[25]=(...e)=>s(o).getDropspot&&s(o).getDropspot(...e))},[Yt,(l(!0),d(c,null,h(s(o).isArea,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,Zt))),128))],544),[[m,s(o).idArea]])]),t("div",te,[ee,p(t("select",{class:"form-select","onUpdate:modelValue":a[26]||(a[26]=e=>s(o).form.dropspot_id=e),disabled:s(o).idArea===""},[s(o).form.dropspot_id===""?(l(),d("option",oe," Pilih Dropspot ")):_("",!0),t("option",ae,r(s(o).namaDropsot),1),(l(!0),d(c,null,h(s(o).isDropspot,e=>(l(),d("option",{key:e,value:e.id},r(e.nama),9,ne))),128))],8,se),[[m,s(o).form.dropspot_id]])])]),t("div",ie,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[27]||(a[27]=(...e)=>s(o).setOpenEdit&&s(o).setOpenEdit(...e))}," Tutup "),s(n).user.role=="sysadmin"?(l(),d("button",{key:0,type:"button",class:"btn btn-sm btn-danger",onClick:a[28]||(a[28]=(...e)=>s(o).deleteData&&s(o).deleteData(...e))}," Hapus ")):_("",!0),s(n).user.role=="sysadmin"?(l(),d("button",le," Simpan ")):_("",!0)])],32)])])],2)):_("",!0),s(o).isOpenPendamping===!0?(l(),d("div",{key:3,class:P(["modal fade modal-lg",{show:s(o).isOpenPendamping}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",de,[t("div",re,[t("div",pe,[me,t("button",{class:"btn-close",type:"button",onClick:a[30]||(a[30]=(...e)=>s(o).setOpenPendamping&&s(o).setOpenPendamping(...e))})]),t("form",null,[t("div",ue,[t("p",null,[ce,v(r(s(o).data_pendamping?s(o).data_pendamping.nama_lengkap:"-"),1)]),t("p",null,[he,v(r(s(o).data_pendamping?s(o).data_pendamping.no_hp:"-"),1)]),s(o).data_pendamping.nama_lengkap?(l(),d("button",{key:0,type:"button",class:"btn btn-sm btn-danger",onClick:a[31]||(a[31]=e=>s(o).deletePendamping())}," HAPUS PENDAMPING ")):_("",!0)]),t("div",_e,[p(t("input",{type:"text","onUpdate:modelValue":a[32]||(a[32]=e=>s(n).paramsPendamping.cari=e),class:"form-control mb-2",placeholder:"Cari Pendamping ...",onKeyup:a[33]||(a[33]=(...e)=>s(n).getPendamping&&s(n).getPendamping(...e))},null,544),[[f,s(n).paramsPendamping.cari]]),t("div",be,[t("table",ge,[fe,t("tbody",null,[(l(!0),d(c,null,h(s(n).itemsPendamping,(e,g)=>(l(),d("tr",{key:g},[t("td",null,r(g+1),1),t("td",null,r(e.nama_lengkap),1),t("td",null,[t("button",{type:"button",class:"btn btn-primary btn-sm",onClick:k=>s(o).setPendamping(e.uuid)}," Pilih ",8,ve)])]))),128))])])])]),t("div",ye,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[34]||(a[34]=(...e)=>s(o).setOpenPendamping&&s(o).setOpenPendamping(...e))}," Tutup ")])])])])],2)):_("",!0)],64)}}};export{Ae as default};
