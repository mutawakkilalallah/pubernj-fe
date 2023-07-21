import{m as y,z as h,H as D,c as i,b as t,d,I as _,u as s,F as c,j as f,t as m,v as p,n as v,G as k,o as r}from"./index-e15d894c.js";import{S as u}from"./sweetalert2.all-a44ffd23.js";const b=y("table_dropspot",{state:()=>({items:[],params:{cari:"",area:""}}),actions:{async getData(){const l={params:this.params};try{await h.get("dropspot",l).then(n=>{console.log("resp drop",n),(n.data.code=200)&&(this.items=n.data.data)})}catch{}}}}),A=y("form_dropspot",{state:()=>({isOpenAdd:!1,isOpenEdit:!1,isArea:[],idEdit:"",namaArea:"",form:{nama:"",area_id:"",cakupan:"",harga:""}}),actions:{setOpenAdd(){this.isOpenAdd=!this.isOpenAdd},setOpenEdit(){this.isOpenEdit=!this.isOpenEdit},getArea(){try{h.get("area").then(l=>{this.isArea=l.data.data})}catch{}},async tambahData(){try{const l=await h.post("dropspot",this.form);this.isOpenAdd=!1,u.fire("Berhasil",l.data.message,"success"),b().getData(),this.form={}}catch(l){u.fire(l.response.data.message,l.response.data.error,"error")}},handleDoubleClik(l){console.log("double",l),this.idEdit=l.id,this.namaArea=l.area?l.area.nama:"kosong",this.form.nama=l.nama,this.form.area_id=l.area_id,this.form.cakupan=l.cakupan,this.form.harga=l.harga,this.isOpenEdit=!0},async editData(){console.log("form edit",this.form);try{await h.put(`dropspot/${this.idEdit}`,this.form).then(l=>{this.isOpenEdit=!1,this.form={},u.fire("Berhasil",l.data.message,"success"),b().getData()})}catch(l){u.fire(l.response.data.message,l.response.data.error,"error")}},async deleteData(){u.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin menghapus data ?",icon:"info",showCancelButton:!0,confirmButtonText:"Hapus",confirmButtonColor:"#DC3545"}).then(l=>{l.isConfirmed&&h.delete(`dropspot/${this.idEdit}`).then(n=>{this.isOpenEdit=!1,u.fire("Berhasil",n.data.message,"success"),this.form={},b().getData()})})}}}),O=t("h3",null,"Data Dropspot",-1),C=t("hr",null,null,-1),E={class:"filter-box mb-5 row"},x={class:"col-md-2"},V=t("option",{value:"",selected:""},"Semua Area",-1),T=["value"],w={class:"serach-box row"},U={class:"col-md-10 d-flex align-items-center mb-2"},B={class:"col-md-2 d-flex align-items-center"},S=t("hr",null,null,-1),$={class:"table-responsive"},H={class:"table table-sm table-hover mt-3"},M=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama Dropspot"),t("th",{scope:"col"},"Area"),t("th",{scope:"col"},"Cakupan"),t("th",{scope:"col"},"Harga")])],-1),N=["onDblclick"],L={class:"modal-dialog"},F={class:"modal-content"},z={class:"modal-header"},I=t("h1",{class:"modal-title fs-5",id:"modalTambahLabel"},"Tambah Dropsot",-1),K={class:"modal-body"},j={class:"form-group mb-3"},G=t("small",null,"Nama Dropspot",-1),P={class:"form-group mb-3"},q=t("small",null,"Area",-1),J=t("option",{value:"",selected:""},"Pilih Area",-1),Q=["value"],R={class:"form-group mb-3"},W=t("small",null,"Cakupan Daerah",-1),X={class:"form-group mb-3"},Y=t("small",null,"Harga",-1),Z={class:"modal-footer"},tt={class:"modal-dialog"},at={class:"modal-content"},st={class:"modal-header"},et=t("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Dropspot",-1),ot={class:"modal-body"},lt={class:"form-group mb-3"},nt=t("small",null,"Nama Dropspot",-1),it={class:"form-group mb-3"},rt=t("small",null,"Area",-1),dt={value:"",selected:""},mt=["value"],pt={class:"form-group mb-3"},ut=t("small",null,"Cakupan Daerah",-1),ct={class:"form-group mb-3"},ht=t("small",null,"Harga",-1),ft={class:"modal-footer"},kt={__name:"Index",setup(l){const n=b(),e=A();return n.getData(),e.getArea(),D(()=>{e.getArea()}),(bt,o)=>(r(),i(c,null,[O,C,t("div",E,[t("div",x,[d(t("select",{class:"form-select form-select-sm","onUpdate:modelValue":o[0]||(o[0]=a=>s(n).params.area=a),onChange:o[1]||(o[1]=(...a)=>s(n).getData&&s(n).getData(...a))},[V,(r(!0),i(c,null,f(s(e).isArea,a=>(r(),i("option",{key:a,value:a.id},m(a.nama),9,T))),128))],544),[[_,s(n).params.area]])])]),t("div",w,[t("div",U,[t("small",null,"Total data "+m(s(n).items.length),1)]),t("div",B,[d(t("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=a=>s(n).params.cari=a),class:"form-control form-control-sm mb-2",placeholder:"Cari Dropspot ...",onKeyup:o[3]||(o[3]=(...a)=>s(n).getData&&s(n).getData(...a))},null,544),[[p,s(n).params.cari]])])]),S,t("button",{class:"btn btn-sm btn-primary",onClick:o[4]||(o[4]=(...a)=>s(e).setOpenAdd&&s(e).setOpenAdd(...a))}," Tambah Dropspot "),t("div",$,[t("table",H,[M,t("tbody",null,[(r(!0),i(c,null,f(s(n).items,(a,g)=>(r(),i("tr",{key:g,onDblclick:_t=>s(e).handleDoubleClik(a)},[t("td",null,m(g+1),1),t("td",null,m(a.nama),1),t("td",null,m(a.area.nama),1),t("td",null,m(a.cakupan),1),t("td",null,m(a.harga),1)],40,N))),128))])])]),s(e).isOpenAdd===!0?(r(),i("div",{key:0,class:v(["modal fade",{show:s(e).isOpenAdd}]),style:{display:"block"},id:"modalTambah",tabindex:"-1","aria-labelledby":"modalTambahLabel","aria-hidden":"true"},[t("div",L,[t("div",F,[t("div",z,[I,t("button",{class:"btn-close",type:"button",onClick:o[5]||(o[5]=a=>s(e).isOpenAdd=!1)})]),t("div",K,[t("div",j,[G,d(t("input",{type:"text","onUpdate:modelValue":o[6]||(o[6]=a=>s(e).form.nama=a),placeholder:"Masukkan nama dropspot ..",class:"form-control mt-2"},null,512),[[p,s(e).form.nama]])]),t("div",P,[q,d(t("select",{class:"form-select","onUpdate:modelValue":o[7]||(o[7]=a=>s(e).form.area_id=a)},[J,(r(!0),i(c,null,f(s(e).isArea,a=>(r(),i("option",{key:a,value:a.id},m(a.nama),9,Q))),128))],512),[[_,s(e).form.area_id]])]),t("div",R,[W,d(t("input",{type:"text","onUpdate:modelValue":o[8]||(o[8]=a=>s(e).form.cakupan=a),placeholder:"Masukkan cakupan daerah ..",class:"form-control mt-2"},null,512),[[p,s(e).form.cakupan]])]),t("div",X,[Y,d(t("input",{type:"text","onUpdate:modelValue":o[9]||(o[9]=a=>s(e).form.harga=a),placeholder:"Masukkan cakupan harga ..",class:"form-control mt-2"},null,512),[[p,s(e).form.harga]])])]),t("div",Z,[t("button",{class:"btn btn-sm btn-secondary",onClick:o[10]||(o[10]=a=>s(e).isOpenAdd=!1)}," Tutup "),t("button",{class:"btn btn-sm btn-primary",onClick:o[11]||(o[11]=(...a)=>s(e).tambahData&&s(e).tambahData(...a))}," Simpan ")])])])],2)):k("",!0),s(e).isOpenEdit===!0?(r(),i("div",{key:1,class:v(["modal fade",{show:s(e).isOpenEdit}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[t("div",tt,[t("div",at,[t("div",st,[et,t("button",{class:"btn-close",type:"button",onClick:o[12]||(o[12]=a=>s(e).isOpenEdit=!1)})]),t("div",ot,[t("div",lt,[nt,d(t("input",{type:"text",class:"form-control mt-2","onUpdate:modelValue":o[13]||(o[13]=a=>s(e).form.nama=a)},null,512),[[p,s(e).form.nama]])]),t("div",it,[rt,d(t("select",{class:"form-select","onUpdate:modelValue":o[14]||(o[14]=a=>s(e).form.area_id=a)},[t("option",dt,m(s(e).namaArea),1),(r(!0),i(c,null,f(s(e).isArea,a=>(r(),i("option",{key:a,value:a.id},m(a.nama),9,mt))),128))],512),[[_,s(e).form.area_id]])]),t("div",pt,[ut,d(t("input",{type:"text",class:"form-control mt-2","onUpdate:modelValue":o[15]||(o[15]=a=>s(e).form.cakupan=a)},null,512),[[p,s(e).form.cakupan]])]),t("div",ct,[ht,d(t("input",{type:"text",class:"form-control mt-2","onUpdate:modelValue":o[16]||(o[16]=a=>s(e).form.harga=a)},null,512),[[p,s(e).form.harga]])])]),t("div",ft,[t("button",{class:"btn btn-sm btn-secondary",onClick:o[17]||(o[17]=a=>s(e).isOpenEdit=!1)}," Tutup "),t("button",{class:"btn btn-sm btn-danger",onClick:o[18]||(o[18]=(...a)=>s(e).deleteData&&s(e).deleteData(...a))}," Hapus "),t("button",{class:"btn btn-sm btn-primary",onClick:o[19]||(o[19]=(...a)=>s(e).editData&&s(e).editData(...a))}," Simpan ")])])])],2)):k("",!0)],64))}};export{kt as default};
