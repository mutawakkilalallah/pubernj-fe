import{x as g,C as h,S as u,a as P,o as n,c as d,b as s,d as m,L as w,u as e,F as c,l as b,t as r,v as p,n as y,w as k,j as U,K as v}from"./index-93a656cc.js";const f=g("table_user",{state:()=>({roles:[],items:[],params:{cari:"",role:""}}),actions:{async getData(){const i={params:this.params};try{await h.get("user",i).then(l=>{(l.data.code=200)&&(this.items=l.data.data,this.roles=l.data.filter.role)})}catch{}}}}),D=g("form_user",{state:()=>({isOpenAdd:!1,isOpenEdit:!1,isOpenEditPassword:!1,isOpenPilihUser:!1,isArea:[],santriUser:[],idEdit:"",roleValue:"",namaSantri:"",cariSantri:"",form:{santri_uuid:"",username:"",role:"",password:""},formEdit:{santri_uuid:"",username:"",role:""},formEditPassword:{password:""}}),actions:{resetForm(){this.form.santri_uuid="",this.form.username="",this.form.role="",this.form.password="",this.formEdit.santri_uuid="",this.formEdit.username="",this.formEdit.role="",this.formEditPassword.password=""},setOpenAdd(){this.isOpenAdd=!this.isOpenAdd},setOpenEdit(){this.isOpenEdit=!this.isOpenEdit,this.resetForm()},setOpenEditPassword(){this.isOpenEditPassword=!this.isOpenEditPassword,this.resetForm()},setOpenPilihUser(){this.isOpenPilihUser=!this.isOpenPilihUser},async tambahData(){try{const i=await h.post("user",this.form);this.isOpenAdd=!1,u.fire("Berhasil",i.data.message,"success"),f().getData(),this.resetForm(),this.namaSantri=""}catch(i){u.fire(i.response.data.message,i.response.data.error,"error")}},async getSantri(){try{const i={cari:this.cariSantri};await h.get("santri",{params:i}).then(l=>{(l.data.code=200)&&(this.santriUser=l.data.data)})}catch{u.fire(err.response.data.message,err.response.data.error,"error")}},handleDoubleClik(i){this.idEdit=i.id,this.roleValue=i.role?i.role:"kosong",this.formEdit.santri_uuid=i.santri_uuid,this.formEdit.role=i.role,this.formEdit.username=i.username,this.isOpenEdit=!0},handleChangePassword(i){this.idEdit=i.id,this.formEdit.password=null,this.isOpenEditPassword=!0},handleOpenPilihUser(){this.isOpenPilihUser=!0},handleUserPilih(i,l){this.form.santri_uuid=i,this.namaSantri=l,this.cariSantri="",this.isOpenPilihUser=!1},async editData(){try{await h.put(`user/${this.idEdit}`,this.formEdit).then(i=>{this.isOpenEdit=!1,this.resetForm(),u.fire("Berhasil",i.data.message,"success"),f().getData()})}catch(i){u.fire(i.response.data.message,i.response.data.error,"error")}},async editDataPassword(){try{await h.put(`user/password/${this.idEdit}`,this.formEditPassword).then(i=>{this.isOpenEditPassword=!1,this.resetForm(),u.fire("Berhasil",i.data.message,"success"),f().getData()})}catch(i){u.fire(i.response.data.message,i.response.data.error,"error")}},async deleteData(){u.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin menghapus data ?",icon:"info",showCancelButton:!0,confirmButtonText:"Hapus",confirmButtonColor:"#DC3545"}).then(i=>{i.isConfirmed&&h.delete(`user/${this.idEdit}`).then(l=>{this.isOpenEdit=!1,u.fire("Berhasil",l.data.message,"success"),this.resetForm(),f().getData()})})}}}),C=s("h3",null,"Data User",-1),S=s("hr",null,null,-1),x={class:"filter-box mb-5 row"},A={class:"col-md-2"},V=s("option",{value:"",selected:""},"Semua Hak Akses",-1),T=["value"],B={class:"serach-box row"},F={class:"col-md-10 d-flex align-items-center mb-2"},L={class:"col-md-2 d-flex align-items-center"},$=s("hr",null,null,-1),N={class:"table-responsive"},H={class:"table table-sm table-hover mt-3"},M=s("thead",null,[s("tr",null,[s("th",{scope:"col"},"No"),s("th",{scope:"col"},"Nama"),s("th",{scope:"col"},"Username"),s("th",{scope:"col"},"Hak Akses"),s("th",{scope:"col"},"Daerah"),s("th",{scope:"col"})])],-1),K=["onDblclick"],j=["onClick"],z={class:"modal-dialog"},I={class:"modal-content"},W={class:"modal-header"},q=s("h1",{class:"modal-title fs-5",id:"modalTambahLabel"},"Tambah User",-1),G={class:"modal-body"},J={class:"form-group mb-3"},Q={class:"input-group mb-3"},R={class:"input-group-append"},X={class:"form-group mb-3"},Y=s("small",null,"Hak Akses",-1),Z=s("option",{value:"",selected:""},"Pilih Hak Akses",-1),ss=["value"],ts={class:"form-group mb-3"},es=s("small",null,"Username",-1),as={class:"form-group mb-3"},os=s("small",null,"Password",-1),is={class:"modal-footer"},ls=s("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),ns={class:"modal-dialog"},ds={class:"modal-content"},rs={class:"modal-header"},ms=s("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit User",-1),us={class:"modal-body"},ps={class:"form-group mb-3"},cs=s("small",null,"Username",-1),hs={class:"form-group mb-3"},bs=s("small",null,"Hak Akses",-1),fs=["value"],_s={class:"modal-footer"},ys=s("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),vs={class:"modal-dialog"},ws={class:"modal-content"},ks={class:"modal-header"},Es=s("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Update Password",-1),gs={class:"modal-body"},Os={class:"form-group mb-3"},Ps=s("small",null,"Password",-1),Us={class:"modal-footer"},Ds=s("button",{type:"submit",class:"btn btn-sm btn-primary"}," Update Password ",-1),Cs={class:"modal-dialog"},Ss={class:"modal-content"},xs={class:"modal-header"},As=s("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Pilih User",-1),Vs={class:"modal-body"},Ts={class:"form-group mb-3"},Bs=s("p",null,"Pilih Santri",-1),Fs=s("hr",null,null,-1),Ls={class:"table-responsive"},$s={class:"table table-sm table-hover mt-3"},Ns=s("thead",null,[s("tr",null,[s("th",{scope:"col"},"NIUP"),s("th",{scope:"col"},"Nama"),s("th",{scope:"col"},"Wilayah"),s("th",{scope:"col"},"Daerah")])],-1),Hs=["onDblclick"],Ms={class:"modal-footer"},zs={__name:"UserPage",setup(i){const l=f(),a=D();return l.getData(),(Ks,o)=>{const O=P("font-awesome-icon");return n(),d(c,null,[C,S,s("div",x,[s("div",A,[m(s("select",{class:"form-select form-select-sm","onUpdate:modelValue":o[0]||(o[0]=t=>e(l).params.role=t),onChange:o[1]||(o[1]=(...t)=>e(l).getData&&e(l).getData(...t))},[V,(n(!0),d(c,null,b(e(l).roles,t=>(n(),d("option",{key:t,value:t.key},r(t.value),9,T))),128))],544),[[w,e(l).params.role]])])]),s("div",B,[s("div",F,[s("small",null,"Total data "+r(e(l).items.length),1)]),s("div",L,[m(s("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=t=>e(l).params.cari=t),class:"form-control form-control-sm mb-2",placeholder:"Cari User ...",onKeyup:o[3]||(o[3]=(...t)=>e(l).getData&&e(l).getData(...t))},null,544),[[p,e(l).params.cari]])])]),$,s("button",{class:"btn btn-sm btn-primary",onClick:o[4]||(o[4]=(...t)=>e(a).setOpenAdd&&e(a).setOpenAdd(...t))}," Tambah User "),s("div",N,[s("table",H,[M,s("tbody",null,[(n(!0),d(c,null,b(e(l).items,(t,_)=>(n(),d("tr",{key:_,onDblclick:E=>e(a).handleDoubleClik(t)},[s("td",null,r(_+1),1),s("td",null,r(t.santri_nama),1),s("td",null,r("@"+t.username),1),s("td",null,r(t.role),1),s("td",null,r(t.raw.domisili_santri[t.raw.domisili_santri.length-1].blok),1),s("td",null,[s("button",{onClick:E=>e(a).handleChangePassword(t),class:"btn btn-sm btn-primary"}," Ubah Password ",8,j)])],40,K))),128))])])]),e(a).isOpenAdd===!0?(n(),d("div",{key:0,class:y(["modal fade",{show:e(a).isOpenAdd}]),style:{display:"block"},id:"modalTambah",tabindex:"-1","aria-labelledby":"modalTambahLabel","aria-hidden":"true"},[s("div",z,[s("div",I,[s("div",W,[q,s("button",{class:"btn-close",type:"button",onClick:o[5]||(o[5]=(...t)=>e(a).setOpenAdd&&e(a).setOpenAdd(...t))})]),s("form",{onSubmit:o[13]||(o[13]=k((...t)=>e(a).tambahData&&e(a).tambahData(...t),["prevent"]))},[s("div",G,[m(s("input",{type:"hidden","onUpdate:modelValue":o[6]||(o[6]=t=>e(a).form.santri_uuid=t)},null,512),[[p,e(a).form.santri_uuid]]),s("div",J,[s("div",Q,[m(s("input",{type:"text","onUpdate:modelValue":o[7]||(o[7]=t=>e(a).namaSantri=t),class:"form-control",placeholder:"Pilih Santri ..",disabled:"",readonly:"","aria-describedby":"basic-addon2"},null,512),[[p,e(a).namaSantri]]),s("div",R,[s("button",{class:"btn btn-outline-secondary",onClick:o[8]||(o[8]=(...t)=>e(a).setOpenPilihUser&&e(a).setOpenPilihUser(...t)),type:"button"},[U(O,{icon:"pen-alt"})])])])]),s("div",X,[Y,m(s("select",{class:"form-select","onUpdate:modelValue":o[9]||(o[9]=t=>e(a).form.role=t)},[Z,(n(!0),d(c,null,b(e(l).roles,t=>(n(),d("option",{key:t.key,value:t.key},r(t.value),9,ss))),128))],512),[[w,e(a).form.role]])]),s("div",ts,[es,m(s("input",{type:"text","onUpdate:modelValue":o[10]||(o[10]=t=>e(a).form.username=t),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[p,e(a).form.username]])]),s("div",as,[os,m(s("input",{type:"password","onUpdate:modelValue":o[11]||(o[11]=t=>e(a).form.password=t),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[p,e(a).form.password]])])]),s("div",is,[s("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:o[12]||(o[12]=(...t)=>e(a).setOpenAdd&&e(a).setOpenAdd(...t))}," Tutup "),ls])],32)])])],2)):v("",!0),e(a).isOpenEdit===!0?(n(),d("div",{key:1,class:y(["modal fade",{show:e(a).isOpenEdit}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[s("div",ns,[s("div",ds,[s("div",rs,[ms,s("button",{class:"btn-close",type:"button",onClick:o[14]||(o[14]=(...t)=>e(a).setOpenEdit&&e(a).setOpenEdit(...t))})]),s("form",{onSubmit:o[20]||(o[20]=k((...t)=>e(a).editData&&e(a).editData(...t),["prevent"]))},[s("div",us,[m(s("input",{type:"hidden","onUpdate:modelValue":o[15]||(o[15]=t=>e(a).formEdit.santri_uuid=t)},null,512),[[p,e(a).formEdit.santri_uuid]]),s("div",ps,[cs,m(s("input",{type:"text","onUpdate:modelValue":o[16]||(o[16]=t=>e(a).formEdit.username=t),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[p,e(a).formEdit.username]])]),s("div",hs,[bs,m(s("select",{class:"form-select","onUpdate:modelValue":o[17]||(o[17]=t=>e(a).formEdit.role=t)},[(n(!0),d(c,null,b(e(l).roles,t=>(n(),d("option",{key:t.key,value:t.key},r(t.value),9,fs))),128))],512),[[w,e(a).formEdit.role]])])]),s("div",_s,[s("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:o[18]||(o[18]=t=>e(a).isOpenEdit=!1)}," Tutup "),s("button",{type:"button",class:"btn btn-sm btn-danger",onClick:o[19]||(o[19]=(...t)=>e(a).deleteData&&e(a).deleteData(...t))}," Hapus "),ys])],32)])])],2)):v("",!0),e(a).isOpenEditPassword===!0?(n(),d("div",{key:2,class:y(["modal fade",{show:e(a).isOpenEditPassword}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[s("div",vs,[s("div",ws,[s("div",ks,[Es,s("button",{class:"btn-close",type:"button",onClick:o[21]||(o[21]=(...t)=>e(a).setOpenEditPassword&&e(a).setOpenEditPassword(...t))})]),s("form",{onSubmit:o[24]||(o[24]=k((...t)=>e(a).editDataPassword&&e(a).editDataPassword(...t),["prevent"]))},[s("div",gs,[s("div",Os,[Ps,m(s("input",{type:"password","onUpdate:modelValue":o[22]||(o[22]=t=>e(a).formEditPassword.password=t),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[p,e(a).formEditPassword.password]])])]),s("div",Us,[s("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:o[23]||(o[23]=(...t)=>e(a).setOpenEditPassword&&e(a).setOpenEditPassword(...t))}," Tutup "),Ds])],32)])])],2)):v("",!0),e(a).isOpenPilihUser===!0?(n(),d("div",{key:3,class:y(["modal fade modal-xl",{show:e(a).isOpenPilihUser}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[s("div",Cs,[s("div",Ss,[s("div",xs,[As,s("button",{class:"btn-close",type:"button",onClick:o[25]||(o[25]=t=>e(a).isOpenPilihUser=!1)})]),s("div",Vs,[s("div",Ts,[Bs,m(s("input",{type:"text","onUpdate:modelValue":o[26]||(o[26]=t=>e(a).cariSantri=t),placeholder:"Pilih Nama Santri ..",onKeyup:o[27]||(o[27]=(...t)=>e(a).getSantri&&e(a).getSantri(...t)),class:"form-control mt-2"},null,544),[[p,e(a).cariSantri]])]),Fs,s("div",Ls,[s("table",$s,[Ns,s("tbody",null,[(n(!0),d(c,null,b(e(a).santriUser,(t,_)=>(n(),d("tr",{key:_,onDblclick:E=>e(a).handleUserPilih(t.uuid,t.nama_lengkap)},[s("td",null,r(t.raw.warga_pesantren.niup),1),s("td",null,r(t.raw.nama_lengkap),1),s("td",null,r(t.raw.domisili_santri[t.raw.domisili_santri.length-1].wilayah),1),s("td",null,r(t.raw.domisili_santri[t.raw.domisili_santri.length-1].blok),1)],40,Hs))),128))])])])]),s("div",Ms,[s("button",{class:"btn btn-sm btn-secondary",onClick:o[28]||(o[28]=t=>e(a).isOpenPilihUser=!1)}," Batal ")])])])],2)):v("",!0)],64)}}};export{zs as default};
