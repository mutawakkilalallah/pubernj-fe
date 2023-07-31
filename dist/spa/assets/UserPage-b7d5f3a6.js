import{C as w,I as c,S as P,a as U,o as n,c as d,b as t,d as m,P as v,u as e,F as p,l as h,t as r,v as u,n as _,w as k,j as g,T as y}from"./index-31bd0d89.js";const b=w("table_user",{state:()=>({roles:[],items:[],params:{cari:"",role:""}}),actions:{async getData(){const l={params:this.params};try{await c.get("user",l).then(i=>{(i.data.code=200)&&(this.items=i.data.data,this.roles=i.data.filter.role)})}catch{}}}}),D=w("form_user",{state:()=>({isOpenAdd:!1,isOpenEdit:!1,isOpenEditPassword:!1,isOpenPilihUser:!1,isArea:[],santriUser:[],idEdit:"",roleValue:"",namaSantri:"",cariSantri:"",form:{santri_uuid:"",username:"",role:"",password:""},formEdit:{santri_uuid:"",username:"",role:""},formEditPassword:{password:""}}),actions:{resetForm(){this.form.santri_uuid="",this.form.username="",this.form.role="",this.form.password="",this.formEdit.santri_uuid="",this.formEdit.username="",this.formEdit.role="",this.formEditPassword.password=""},setOpenAdd(){this.isOpenAdd=!this.isOpenAdd},setOpenEdit(){this.isOpenEdit=!this.isOpenEdit,this.resetForm()},setOpenEditPassword(){this.isOpenEditPassword=!this.isOpenEditPassword,this.resetForm()},setOpenPilihUser(){this.isOpenPilihUser=!this.isOpenPilihUser},async tambahData(){try{const l=await c.post("user",this.form);this.isOpenAdd=!1,b().getData(),this.resetForm(),this.namaSantri="",this.santriUser=[]}catch{}},async getSantri(){try{const l={cari:this.cariSantri};await c.get("santri",{params:l}).then(i=>{(i.data.code=200)&&(this.santriUser=i.data.data)})}catch{}},handleDoubleClik(l){this.idEdit=l.id,this.roleValue=l.role?l.role:"kosong",this.formEdit.santri_uuid=l.santri_uuid,this.formEdit.role=l.role,this.formEdit.username=l.username,this.isOpenEdit=!0},handleChangePassword(l){this.idEdit=l.id,this.formEdit.password=null,this.isOpenEditPassword=!0},handleOpenPilihUser(){this.isOpenPilihUser=!0},handleUserPilih(l,i){this.form.santri_uuid=l,this.namaSantri=i,this.cariSantri="",this.isOpenPilihUser=!1},async editData(){try{await c.put(`user/${this.idEdit}`,this.formEdit).then(l=>{this.isOpenEdit=!1,this.resetForm(),b().getData()})}catch{}},async editDataPassword(){try{await c.put(`user/password/${this.idEdit}`,this.formEditPassword).then(l=>{this.isOpenEditPassword=!1,this.resetForm(),b().getData()})}catch{}},async deleteData(){P.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin menghapus data ?",icon:"info",showCancelButton:!0,confirmButtonText:"Hapus",confirmButtonColor:"#DC3545"}).then(l=>{l.isConfirmed&&c.delete(`user/${this.idEdit}`).then(i=>{this.isOpenEdit=!1,this.resetForm(),b().getData()})})}}}),C=t("h3",null,"Data User",-1),S=t("hr",null,null,-1),A={class:"filter-box mb-5 row"},x={class:"col-md-2"},V=t("option",{value:"",selected:""},"Semua Hak Akses",-1),T=["value"],F={class:"serach-box row"},L={class:"col-md-10 d-flex align-items-center mb-2"},$={class:"col-md-2 d-flex align-items-center"},N=t("hr",null,null,-1),B={class:"table-responsive"},H={class:"table table-sm table-hover mt-3"},M=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"},"Username"),t("th",{scope:"col"},"Hak Akses"),t("th",{scope:"col"},"Daerah"),t("th",{scope:"col"})])],-1),K=["onDblclick"],I=["onClick"],j={class:"modal-dialog"},z={class:"modal-content"},W={class:"modal-header"},q=t("h1",{class:"modal-title fs-5",id:"modalTambahLabel"},"Tambah User",-1),G={class:"modal-body"},J={class:"form-group mb-3"},Q={class:"input-group mb-3"},R={class:"input-group-append"},X={class:"form-group mb-3"},Y=t("small",null,"Hak Akses",-1),Z=t("option",{value:"",selected:""},"Pilih Hak Akses",-1),tt=["value"],st={class:"form-group mb-3"},et=t("small",null,"Username",-1),ot={class:"form-group mb-3"},at=t("small",null,"Password",-1),it={class:"modal-footer"},lt=t("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),nt={class:"modal-dialog"},dt={class:"modal-content"},rt={class:"modal-header"},mt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit User",-1),ut={class:"modal-body"},pt={class:"form-group mb-3"},ct=t("small",null,"Username",-1),ht={class:"form-group mb-3"},bt=t("small",null,"Hak Akses",-1),ft=["value"],_t={class:"modal-footer"},yt=t("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),vt={class:"modal-dialog"},kt={class:"modal-content"},Et={class:"modal-header"},wt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Update Password",-1),Ot={class:"modal-body"},Pt={class:"form-group mb-3"},Ut=t("small",null,"Password",-1),gt={class:"modal-footer"},Dt=t("button",{type:"submit",class:"btn btn-sm btn-primary"}," Update Password ",-1),Ct={class:"modal-dialog"},St={class:"modal-content"},At={class:"modal-header"},xt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Pilih User",-1),Vt={class:"modal-body"},Tt={class:"form-group mb-3"},Ft=t("p",null,"Pilih Santri",-1),Lt=t("hr",null,null,-1),$t={class:"table-responsive"},Nt={class:"table table-sm table-hover mt-3"},Bt=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"NIUP"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"},"Wilayah"),t("th",{scope:"col"},"Daerah")])],-1),Ht=["onDblclick"],Mt={class:"modal-footer"},jt={__name:"UserPage",setup(l){const i=b(),o=D();return i.getData(),(Kt,a)=>{const O=U("font-awesome-icon");return n(),d(p,null,[C,S,t("div",A,[t("div",x,[m(t("select",{class:"form-select form-select-sm","onUpdate:modelValue":a[0]||(a[0]=s=>e(i).params.role=s),onChange:a[1]||(a[1]=(...s)=>e(i).getData&&e(i).getData(...s))},[V,(n(!0),d(p,null,h(e(i).roles,s=>(n(),d("option",{key:s,value:s.key},r(s.value),9,T))),128))],544),[[v,e(i).params.role]])])]),t("div",F,[t("div",L,[t("small",null,"Total data "+r(e(i).items.length),1)]),t("div",$,[m(t("input",{type:"text","onUpdate:modelValue":a[2]||(a[2]=s=>e(i).params.cari=s),class:"form-control form-control-sm mb-2",placeholder:"Cari User ...",onKeyup:a[3]||(a[3]=(...s)=>e(i).getData&&e(i).getData(...s))},null,544),[[u,e(i).params.cari]])])]),N,t("button",{class:"btn btn-sm btn-primary",onClick:a[4]||(a[4]=(...s)=>e(o).setOpenAdd&&e(o).setOpenAdd(...s))}," Tambah User "),t("div",B,[t("table",H,[M,t("tbody",null,[(n(!0),d(p,null,h(e(i).items,(s,f)=>(n(),d("tr",{key:f,onDblclick:E=>e(o).handleDoubleClik(s)},[t("td",null,r(f+1),1),t("td",null,r(s.santri.nama_lengkap),1),t("td",null,r("@"+s.username),1),t("td",null,r(s.role),1),t("td",null,r(s.santri.blok),1),t("td",null,[t("button",{onClick:E=>e(o).handleChangePassword(s),class:"btn btn-sm btn-primary"}," Ubah Password ",8,I)])],40,K))),128))])])]),e(o).isOpenAdd===!0?(n(),d("div",{key:0,class:_(["modal fade",{show:e(o).isOpenAdd}]),style:{display:"block"},id:"modalTambah",tabindex:"-1","aria-labelledby":"modalTambahLabel","aria-hidden":"true"},[t("div",j,[t("div",z,[t("div",W,[q,t("button",{class:"btn-close",type:"button",onClick:a[5]||(a[5]=(...s)=>e(o).setOpenAdd&&e(o).setOpenAdd(...s))})]),t("form",{onSubmit:a[13]||(a[13]=k((...s)=>e(o).tambahData&&e(o).tambahData(...s),["prevent"]))},[t("div",G,[m(t("input",{type:"hidden","onUpdate:modelValue":a[6]||(a[6]=s=>e(o).form.santri_uuid=s)},null,512),[[u,e(o).form.santri_uuid]]),t("div",J,[t("div",Q,[m(t("input",{type:"text","onUpdate:modelValue":a[7]||(a[7]=s=>e(o).namaSantri=s),class:"form-control",placeholder:"Pilih Santri ..",disabled:"",readonly:"","aria-describedby":"basic-addon2"},null,512),[[u,e(o).namaSantri]]),t("div",R,[t("button",{class:"btn btn-outline-secondary",onClick:a[8]||(a[8]=(...s)=>e(o).setOpenPilihUser&&e(o).setOpenPilihUser(...s)),type:"button"},[g(O,{icon:"pen-alt"})])])])]),t("div",X,[Y,m(t("select",{class:"form-select","onUpdate:modelValue":a[9]||(a[9]=s=>e(o).form.role=s)},[Z,(n(!0),d(p,null,h(e(i).roles,s=>(n(),d("option",{key:s.key,value:s.key},r(s.value),9,tt))),128))],512),[[v,e(o).form.role]])]),t("div",st,[et,m(t("input",{type:"text","onUpdate:modelValue":a[10]||(a[10]=s=>e(o).form.username=s),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[u,e(o).form.username]])]),t("div",ot,[at,m(t("input",{type:"password","onUpdate:modelValue":a[11]||(a[11]=s=>e(o).form.password=s),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[u,e(o).form.password]])])]),t("div",it,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[12]||(a[12]=(...s)=>e(o).setOpenAdd&&e(o).setOpenAdd(...s))}," Tutup "),lt])],32)])])],2)):y("",!0),e(o).isOpenEdit===!0?(n(),d("div",{key:1,class:_(["modal fade",{show:e(o).isOpenEdit}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",nt,[t("div",dt,[t("div",rt,[mt,t("button",{class:"btn-close",type:"button",onClick:a[14]||(a[14]=(...s)=>e(o).setOpenEdit&&e(o).setOpenEdit(...s))})]),t("form",{onSubmit:a[20]||(a[20]=k((...s)=>e(o).editData&&e(o).editData(...s),["prevent"]))},[t("div",ut,[m(t("input",{type:"hidden","onUpdate:modelValue":a[15]||(a[15]=s=>e(o).formEdit.santri_uuid=s)},null,512),[[u,e(o).formEdit.santri_uuid]]),t("div",pt,[ct,m(t("input",{type:"text","onUpdate:modelValue":a[16]||(a[16]=s=>e(o).formEdit.username=s),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[u,e(o).formEdit.username]])]),t("div",ht,[bt,m(t("select",{class:"form-select","onUpdate:modelValue":a[17]||(a[17]=s=>e(o).formEdit.role=s)},[(n(!0),d(p,null,h(e(i).roles,s=>(n(),d("option",{key:s.key,value:s.key},r(s.value),9,ft))),128))],512),[[v,e(o).formEdit.role]])])]),t("div",_t,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[18]||(a[18]=s=>e(o).isOpenEdit=!1)}," Tutup "),t("button",{type:"button",class:"btn btn-sm btn-danger",onClick:a[19]||(a[19]=(...s)=>e(o).deleteData&&e(o).deleteData(...s))}," Hapus "),yt])],32)])])],2)):y("",!0),e(o).isOpenEditPassword===!0?(n(),d("div",{key:2,class:_(["modal fade",{show:e(o).isOpenEditPassword}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",vt,[t("div",kt,[t("div",Et,[wt,t("button",{class:"btn-close",type:"button",onClick:a[21]||(a[21]=(...s)=>e(o).setOpenEditPassword&&e(o).setOpenEditPassword(...s))})]),t("form",{onSubmit:a[24]||(a[24]=k((...s)=>e(o).editDataPassword&&e(o).editDataPassword(...s),["prevent"]))},[t("div",Ot,[t("div",Pt,[Ut,m(t("input",{type:"password","onUpdate:modelValue":a[22]||(a[22]=s=>e(o).formEditPassword.password=s),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[u,e(o).formEditPassword.password]])])]),t("div",gt,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[23]||(a[23]=(...s)=>e(o).setOpenEditPassword&&e(o).setOpenEditPassword(...s))}," Tutup "),Dt])],32)])])],2)):y("",!0),e(o).isOpenPilihUser===!0?(n(),d("div",{key:3,class:_(["modal fade modal-xl",{show:e(o).isOpenPilihUser}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",Ct,[t("div",St,[t("div",At,[xt,t("button",{class:"btn-close",type:"button",onClick:a[25]||(a[25]=s=>e(o).isOpenPilihUser=!1)})]),t("div",Vt,[t("div",Tt,[Ft,m(t("input",{type:"text","onUpdate:modelValue":a[26]||(a[26]=s=>e(o).cariSantri=s),placeholder:"Pilih Nama Santri ..",onKeyup:a[27]||(a[27]=(...s)=>e(o).getSantri&&e(o).getSantri(...s)),class:"form-control mt-2"},null,544),[[u,e(o).cariSantri]])]),Lt,t("div",$t,[t("table",Nt,[Bt,t("tbody",null,[(n(!0),d(p,null,h(e(o).santriUser,(s,f)=>(n(),d("tr",{key:f,onDblclick:E=>e(o).handleUserPilih(s.uuid,s.nama_lengkap)},[t("td",null,r(s.niup),1),t("td",null,r(s.nama_lengkap),1),t("td",null,r(s.wilayah),1),t("td",null,r(s.blok),1)],40,Ht))),128))])])])]),t("div",Mt,[t("button",{class:"btn btn-sm btn-secondary",onClick:a[28]||(a[28]=s=>e(o).isOpenPilihUser=!1)}," Batal ")])])])],2)):y("",!0)],64)}}};export{jt as default};
