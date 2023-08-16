import{x as g,C as h,S as U,a as P,g as l,c as d,b as t,d as r,E as _,u as s,F as c,q as b,t as m,v as p,n as y,w as k,z as u,k as O,y as D}from"./index-2c5b04cb.js";const f=g("table_user",{state:()=>({roles:[],items:[],params:{cari:"",role:""}}),actions:{async getData(){const n={params:this.params};try{await h.get("user",n).then(i=>{(i.data.code=200)&&(this.items=i.data.data,this.roles=i.data.filter.role)})}catch{}}}}),I=g("form_user",{state:()=>({isOpenAdd:!1,isOpenEdit:!1,isOpenEditPassword:!1,isOpenPilihUser:!1,fotoDiri:"",mode:"internal",editMode:"",isArea:[],personUser:{},idEdit:"",roleValue:"",namaPerson:"",niup:"",formInt:{nama_lengkap:"",niup:"",username:"",no_hp:"",role:"",password:"",area_id:""},formEdit:{santri_uuid:"",no_hp:"",role:"",area_id:""},formEditPassword:{password:""}}),actions:{resetForm(){this.formInt.niup="",this.formInt.username="",this.formInt.role="",this.formInt.password="",this.formInt.no_hp="",this.formEdit.santri_uuid="",this.formEdit.username="",this.formEdit.role="",this.formEdit.area_id="",this.formEdit.no_hp="",this.formEditPassword.password="",this.mode="internal"},setOpenAdd(){this.isOpenAdd=!this.isOpenAdd},setOpenEdit(){this.isOpenEdit=!this.isOpenEdit,this.resetForm()},setOpenEditPassword(){this.isOpenEditPassword=!this.isOpenEditPassword,this.resetForm()},setInternalMode(){this.mode="internal",this.formInt.role=""},setExternalMode(){this.mode="external",this.formInt.role="p4nj"},setOpenPilihUser(){this.isOpenPilihUser=!this.isOpenPilihUser},async tambahData(){try{const n=await h.post(`user/${this.mode}`,this.formInt);this.isOpenAdd=!1,f().getData(),this.resetForm(),this.namaSantri="",this.santriUser={}}catch{}},async getByNiup(){try{await h.get(`user/pilih/${this.niup}`).then(n=>{(n.data.code=200)&&(this.personUser=n.data.data,this.getImage(this.niup))})}catch{}},async getArea(){try{await h.get("area").then(n=>{this.isArea=n.data.data})}catch{}},async getImage(n){try{const i={responseType:"blob"};await h.get("santri/image/"+n,i).then(e=>{this.fotoDiri=URL.createObjectURL(e.data)})}catch(i){console.log("error",i)}},handleDoubleClik(n){this.idEdit=n.uuid,this.roleValue=n.role?n.role:"kosong",this.formEdit.santri_uuid=n.santri_uuid,this.formEdit.role=n.role,this.formEdit.no_hp=n.no_hp,this.formEdit.username=n.username,this.isOpenEdit=!0,this.editMode=n.type,n.role==="p4nj"&&(this.formEdit.area_id=n.area_id)},handleChangePassword(n){this.idEdit=n.uuid,this.formEdit.password=null,this.isOpenEditPassword=!0},handleOpenPilihUser(){this.isOpenPilihUser=!0},handleUserPilih(n,i){this.formInt.niup=i,this.namaPerson=n,this.niup="",this.personUser={},this.isOpenPilihUser=!1},async editData(){try{await h.put(`user/${this.idEdit}`,this.formEdit).then(n=>{this.isOpenEdit=!1,this.resetForm(),f().getData()})}catch{}},async editDataPassword(){try{await h.put(`user/password/${this.idEdit}`,this.formEditPassword).then(n=>{this.isOpenEditPassword=!1,this.resetForm(),f().getData()})}catch{}},async deleteData(){U.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin menghapus data ?",icon:"info",showCancelButton:!0,confirmButtonText:"Hapus",confirmButtonColor:"#DC3545"}).then(n=>{n.isConfirmed&&h.delete(`user/${this.idEdit}`).then(i=>{this.isOpenEdit=!1,this.resetForm(),f().getData()})})}}}),x=t("h3",{class:"titlePage"},"Data User",-1),C=t("hr",null,null,-1),A={class:"filter-box mb-5 row"},V={class:"col-md-2"},M=t("option",{value:"",selected:""},"Semua Hak Akses",-1),N=["value"],S={class:"serach-box row"},T={class:"col-md-10 d-flex align-items-center mb-2"},L={class:"col-md-2 d-flex align-items-center"},B=t("hr",null,null,-1),$={class:"table-responsive"},F={class:"table table-sm table-hover mt-3"},H=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"},"Username"),t("th",{scope:"col"},"Hak Akses"),t("th",{scope:"col"})])],-1),j=["onDblclick"],z=["onClick"],K={class:"modal-dialog"},R={class:"modal-content"},q={class:"modal-header"},G=t("h1",{class:"modal-title fs-5",id:"modalTambahLabel"},"Tambah User",-1),J={class:"modal-body"},Q={key:2,class:"form-group mb-3"},W={class:"input-group mb-3"},X={class:"input-group-append"},Y={key:3,class:"form-group mb-3"},Z=t("small",null,"Nama Lengkap",-1),tt={class:"form-group mb-3"},st=t("small",null,"Hak Akses",-1),et=["disabled"],ot=t("option",{value:"",selected:""},"Pilih Hak Akses",-1),at=["value"],nt={key:4,class:"form-group mb-3"},it=t("small",null,"Area",-1),lt=t("option",{value:"",selected:""},"Pilih Area",-1),dt=["value"],rt={class:"form-group mb-3"},mt=t("small",null,"Username",-1),pt={class:"form-group mb-3"},ut=t("small",null,"No HP (Optional)",-1),ht={class:"form-group mb-3"},ct=t("small",null,"Password",-1),bt={class:"modal-footer"},_t=t("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),ft={class:"modal-dialog"},yt={class:"modal-content"},kt={class:"modal-header"},vt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit User",-1),gt={class:"modal-body"},Et={class:"form-group mb-3"},wt=t("small",null,"Username",-1),Ut={class:"form-group mb-3"},Pt=t("small",null,"No HP (Optional)",-1),Ot={class:"form-group mb-3"},Dt=t("small",null,"Hak Akses",-1),It=["disabled"],xt=["value"],Ct={key:0,class:"form-group mb-3"},At=t("small",null,"Area",-1),Vt=t("option",{value:"",selected:""},"Pilih Area",-1),Mt=["value"],Nt={class:"modal-footer"},St=t("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),Tt={class:"modal-dialog"},Lt={class:"modal-content"},Bt={class:"modal-header"},$t=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Update Password",-1),Ft={class:"modal-body"},Ht={class:"form-group mb-3"},jt=t("small",null,"Password",-1),zt={class:"modal-footer"},Kt=t("button",{type:"submit",class:"btn btn-sm btn-primary"}," Update Password ",-1),Rt={class:"modal-dialog"},qt={class:"modal-content"},Gt={class:"modal-header"},Jt=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"}," Cari Santri/Pengurus By NIUP ",-1),Qt={class:"modal-body"},Wt={class:"form-group mb-3"},Xt=t("p",null,"Pilih Santri",-1),Yt=t("hr",null,null,-1),Zt={key:0,class:"text-center"},ts=["src"],ss=t("p",{class:"fw-bold mb-0"},"NIUP :",-1),es={class:"mb-0"},os=t("p",{class:"fw-bold mb-0"},"Nama :",-1),as={class:"mb-0"},ns=t("p",{class:"fw-bold mb-0"},"Tetala :",-1),is={class:"mb-0"},ls={class:"modal-footer"},ms={__name:"UserPage",setup(n){const i=f(),e=I();return i.getData(),e.getArea(),(ds,a)=>{const E=P("font-awesome-icon");return l(),d(c,null,[x,C,t("div",A,[t("div",V,[r(t("select",{class:"form-select form-select-sm","onUpdate:modelValue":a[0]||(a[0]=o=>s(i).params.role=o),onChange:a[1]||(a[1]=(...o)=>s(i).getData&&s(i).getData(...o))},[M,(l(!0),d(c,null,b(s(i).roles,o=>(l(),d("option",{key:o,value:o.key},m(o.value),9,N))),128))],544),[[_,s(i).params.role]])])]),t("div",S,[t("div",T,[t("small",null,"Total data "+m(s(i).items.length),1)]),t("div",L,[r(t("input",{type:"text","onUpdate:modelValue":a[2]||(a[2]=o=>s(i).params.cari=o),class:"form-control form-control-sm mb-2",placeholder:"Cari User ...",onKeyup:a[3]||(a[3]=(...o)=>s(i).getData&&s(i).getData(...o))},null,544),[[p,s(i).params.cari]])])]),B,t("button",{class:"btn btn-sm btn-primary",onClick:a[4]||(a[4]=(...o)=>s(e).setOpenAdd&&s(e).setOpenAdd(...o))}," Tambah User "),t("div",$,[t("table",F,[H,t("tbody",null,[(l(!0),d(c,null,b(s(i).items,(o,v)=>(l(),d("tr",{key:v,onDblclick:w=>s(e).handleDoubleClik(o)},[t("td",null,m(v+1),1),t("td",null,m(o.nama_lengkap),1),t("td",null,m("@"+o.username),1),t("td",null,m(o.role),1),t("td",null,[t("button",{onClick:w=>s(e).handleChangePassword(o),class:"btn btn-sm btn-primary"}," Ubah Password ",8,z)])],40,j))),128))])])]),s(e).isOpenAdd===!0?(l(),d("div",{key:0,class:y(["modal fade",{show:s(e).isOpenAdd}]),style:{display:"block"},id:"modalTambah",tabindex:"-1","aria-labelledby":"modalTambahLabel","aria-hidden":"true"},[t("div",K,[t("div",R,[t("div",q,[G,t("button",{class:"btn-close",type:"button",onClick:a[5]||(a[5]=(...o)=>s(e).setOpenAdd&&s(e).setOpenAdd(...o))})]),t("form",{onSubmit:a[18]||(a[18]=k((...o)=>s(e).tambahData&&s(e).tambahData(...o),["prevent"]))},[t("div",J,[s(e).mode==="external"?(l(),d("button",{key:0,class:"btn btn-outline-primary btn-sm me-2 mb-3",onClick:a[6]||(a[6]=(...o)=>s(e).setInternalMode&&s(e).setInternalMode(...o)),type:"button"}," Internal ")):u("",!0),s(e).mode==="internal"?(l(),d("button",{key:1,class:"btn btn-outline-primary btn-sm me-2 mb-3",onClick:a[7]||(a[7]=(...o)=>s(e).setExternalMode&&s(e).setExternalMode(...o)),type:"button"}," External ")):u("",!0),r(t("input",{type:"hidden","onUpdate:modelValue":a[8]||(a[8]=o=>s(e).formInt.niup=o)},null,512),[[p,s(e).formInt.niup]]),s(e).mode==="internal"?(l(),d("div",Q,[t("div",W,[r(t("input",{type:"text","onUpdate:modelValue":a[9]||(a[9]=o=>s(e).namaPerson=o),class:"form-control",placeholder:"Pilih Person ..",disabled:"",readonly:"","aria-describedby":"basic-addon2"},null,512),[[p,s(e).namaPerson]]),t("div",X,[t("button",{class:"btn btn-outline-secondary",onClick:a[10]||(a[10]=(...o)=>s(e).setOpenPilihUser&&s(e).setOpenPilihUser(...o)),type:"button"},[O(E,{icon:"pen-alt"})])])])])):u("",!0),s(e).mode==="external"?(l(),d("div",Y,[Z,r(t("input",{type:"text","onUpdate:modelValue":a[11]||(a[11]=o=>s(e).formInt.nama_lengkap=o),placeholder:"Masukkan nama ..",class:"form-control mt-2"},null,512),[[p,s(e).formInt.nama_lengkap]])])):u("",!0),t("div",tt,[st,r(t("select",{class:"form-select","onUpdate:modelValue":a[12]||(a[12]=o=>s(e).formInt.role=o),disabled:s(e).mode==="external"},[ot,(l(!0),d(c,null,b(s(i).roles,o=>(l(),d("option",{key:o.key,value:o.key},m(o.value),9,at))),128))],8,et),[[_,s(e).formInt.role]])]),s(e).formInt.role==="p4nj"?(l(),d("div",nt,[it,r(t("select",{class:"form-select","onUpdate:modelValue":a[13]||(a[13]=o=>s(e).formInt.area_id=o)},[lt,(l(!0),d(c,null,b(s(e).isArea,o=>(l(),d("option",{key:o,value:o.id},m(o.nama),9,dt))),128))],512),[[_,s(e).formInt.area_id]])])):u("",!0),t("div",rt,[mt,r(t("input",{type:"text","onUpdate:modelValue":a[14]||(a[14]=o=>s(e).formInt.username=o),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[p,s(e).formInt.username]])]),t("div",pt,[ut,r(t("input",{type:"text","onUpdate:modelValue":a[15]||(a[15]=o=>s(e).formInt.no_hp=o),placeholder:"Masukkan nomer hp ..",class:"form-control mt-2"},null,512),[[p,s(e).formInt.no_hp]])]),t("div",ht,[ct,r(t("input",{type:"password","onUpdate:modelValue":a[16]||(a[16]=o=>s(e).formInt.password=o),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[p,s(e).formInt.password]])])]),t("div",bt,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[17]||(a[17]=(...o)=>s(e).setOpenAdd&&s(e).setOpenAdd(...o))}," Tutup "),_t])],32)])])],2)):u("",!0),s(e).isOpenEdit===!0?(l(),d("div",{key:1,class:y(["modal fade",{show:s(e).isOpenEdit}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",ft,[t("div",yt,[t("div",kt,[vt,t("button",{class:"btn-close",type:"button",onClick:a[19]||(a[19]=(...o)=>s(e).setOpenEdit&&s(e).setOpenEdit(...o))})]),t("form",{onSubmit:a[27]||(a[27]=k((...o)=>s(e).editData&&s(e).editData(...o),["prevent"]))},[t("div",gt,[r(t("input",{type:"hidden","onUpdate:modelValue":a[20]||(a[20]=o=>s(e).formEdit.santri_uuid=o)},null,512),[[p,s(e).formEdit.santri_uuid]]),t("div",Et,[wt,r(t("input",{type:"text","onUpdate:modelValue":a[21]||(a[21]=o=>s(e).formEdit.username=o),placeholder:"Masukkan username ..",class:"form-control mt-2"},null,512),[[p,s(e).formEdit.username]])]),t("div",Ut,[Pt,r(t("input",{type:"text","onUpdate:modelValue":a[22]||(a[22]=o=>s(e).formEdit.no_hp=o),placeholder:"Masukkan nomer hp ..",class:"form-control mt-2"},null,512),[[p,s(e).formEdit.no_hp]])]),t("div",Ot,[Dt,r(t("select",{class:"form-select","onUpdate:modelValue":a[23]||(a[23]=o=>s(e).formEdit.role=o),disabled:s(e).editMode==="external"},[(l(!0),d(c,null,b(s(i).roles,o=>(l(),d("option",{key:o.key,value:o.key},m(o.value),9,xt))),128))],8,It),[[_,s(e).formEdit.role]])]),s(e).formEdit.role==="p4nj"?(l(),d("div",Ct,[At,r(t("select",{class:"form-select","onUpdate:modelValue":a[24]||(a[24]=o=>s(e).formEdit.area_id=o)},[Vt,(l(!0),d(c,null,b(s(e).isArea,o=>(l(),d("option",{key:o,value:o.id},m(o.nama),9,Mt))),128))],512),[[_,s(e).formEdit.area_id]])])):u("",!0)]),t("div",Nt,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[25]||(a[25]=o=>s(e).isOpenEdit=!1)}," Tutup "),t("button",{type:"button",class:"btn btn-sm btn-danger",onClick:a[26]||(a[26]=(...o)=>s(e).deleteData&&s(e).deleteData(...o))}," Hapus "),St])],32)])])],2)):u("",!0),s(e).isOpenEditPassword===!0?(l(),d("div",{key:2,class:y(["modal fade",{show:s(e).isOpenEditPassword}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",Tt,[t("div",Lt,[t("div",Bt,[$t,t("button",{class:"btn-close",type:"button",onClick:a[28]||(a[28]=(...o)=>s(e).setOpenEditPassword&&s(e).setOpenEditPassword(...o))})]),t("form",{onSubmit:a[31]||(a[31]=k((...o)=>s(e).editDataPassword&&s(e).editDataPassword(...o),["prevent"]))},[t("div",Ft,[t("div",Ht,[jt,r(t("input",{type:"password","onUpdate:modelValue":a[29]||(a[29]=o=>s(e).formEditPassword.password=o),placeholder:"Masukkan password ..",class:"form-control mt-2"},null,512),[[p,s(e).formEditPassword.password]])])]),t("div",zt,[t("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:a[30]||(a[30]=(...o)=>s(e).setOpenEditPassword&&s(e).setOpenEditPassword(...o))}," Tutup "),Kt])],32)])])],2)):u("",!0),s(e).isOpenPilihUser===!0?(l(),d("div",{key:3,class:y(["modal fade modal-lg",{show:s(e).isOpenPilihUser}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",Rt,[t("div",qt,[t("div",Gt,[Jt,t("button",{class:"btn-close",type:"button",onClick:a[32]||(a[32]=o=>s(e).isOpenPilihUser=!1)})]),t("div",Qt,[t("div",Wt,[Xt,r(t("input",{type:"text","onUpdate:modelValue":a[33]||(a[33]=o=>s(e).niup=o),placeholder:"Masukkan NIUP",class:"form-control mt-2"},null,512),[[p,s(e).niup]])]),t("button",{class:"btn btn-sm btn-warning",onClick:a[34]||(a[34]=(...o)=>s(e).getByNiup&&s(e).getByNiup(...o))}," Preview "),Yt,s(e).personUser.warga_pesantren?(l(),d("div",Zt,[r(t("img",{src:s(e).fotoDiri,alt:"pohto-profile",width:"200",class:"img-thumbnail"},null,8,ts),[[D,s(e).fotoDiri!=""]]),ss,t("p",es,m(s(e).personUser?s(e).personUser.warga_pesantren.niup:"-"),1),os,t("p",as,m(s(e).personUser?s(e).personUser.nama_lengkap:"-"),1),ns,t("p",is,m(s(e).personUser?s(e).personUser.tempat_lahir+", "+s(e).personUser.tanggal_lahir:"-"),1)])):u("",!0)]),t("div",ls,[t("button",{class:"btn btn-sm btn-success",onClick:a[35]||(a[35]=o=>s(e).handleUserPilih(s(e).personUser.nama_lengkap,s(e).personUser.warga_pesantren.niup))}," Pilih "),t("button",{class:"btn btn-sm btn-secondary",onClick:a[36]||(a[36]=o=>s(e).isOpenPilihUser=!1)}," Batal ")])])])],2)):u("",!0)],64)}}};export{ms as default};