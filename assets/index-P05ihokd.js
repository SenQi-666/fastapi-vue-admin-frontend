import{P as L}from"./PageHeader-2LC38_J2.js";import{a as g,r as E,m as O,u as R,T as b,_ as V,o as _,c as x,b as a,e as I,w as t,F as K,f as n,g as i,t as k,j as h,l as P}from"./index-eT2Bus_L.js";const H={name:"Position",components:{PageHeader:L},setup(){const v=[{title:"序号",dataIndex:"index",align:"center",width:80},{title:"名称",dataIndex:"name",align:"center"},{title:"排序",dataIndex:"order",align:"center"},{title:"状态",dataIndex:"available",align:"center"},{title:"备注",dataIndex:"description",align:"center"},{title:"操作",dataIndex:"operation",align:"center",fixed:"right",width:100}],d=g([{created_at:"2024-01-12 09:43:04",updated_at:"2024-01-12 09:43:06",id:1,description:null,creator:{id:1,name:"森七"},name:"董事长",order:1,available:!0},{created_at:"2024-01-12 09:43:22",updated_at:"2024-01-12 09:43:24",id:2,description:null,creator:{id:1,name:"森七"},name:"运营岗",order:2,available:!0},{created_at:"2024-01-18 10:54:46",updated_at:"2024-01-18 10:54:49",id:3,description:null,creator:{id:1,name:"森七"},name:"销售岗",order:3,available:!0},{created_at:"2024-01-18 10:55:10",updated_at:"2024-01-18 10:55:12",id:4,description:null,creator:{id:1,name:"森七"},name:"人事行政岗",order:4,available:!0},{created_at:"2024-01-18 10:55:46",updated_at:"2024-01-18 10:55:48",id:5,description:null,creator:{id:1,name:"森七"},name:"开发岗",order:5,available:!0}]),y=E(!1),e=g({name:"",available:"true"}),w=o=>{console.log("Received values of form: ",o),console.log("formState: ",e)},S=()=>{Object.keys(e).forEach(o=>{delete e[o]}),e.available="true",console.log(e)},m=g({defaultPageSize:10,total:d.length,showTotal:(o,r)=>`第 ${r[0]}-${r[1]} 条 / 总共 ${o} 条`}),p=o=>{console.log(o)},c=E([]),s=(o,r)=>{console.log(`selectingRowKeys: ${o}`,"selectingRows: ",r),c.value=o},u=O(()=>({selectedRowKeys:R(c),onChange:s,hideDefaultSelections:!0,selections:[b.SELECTION_ALL,b.SELECTION_INVERT,b.SELECTION_NONE]}));return{columns:v,dataSource:d,formState:e,onFinish:w,expand:y,resetFields:S,pagination:m,handleTableChange:p,rowSelection:u}}},j={class:"table-search-wrapper"},U={class:"table-wrapper"},z={key:0},A={key:1};function q(v,d,y,e,w,S){const m=n("page-header"),p=n("a-input"),c=n("a-form-item"),s=n("a-col"),u=n("a-select-option"),o=n("a-select"),r=n("a-row"),f=n("a-button"),N=n("a-form"),C=n("a-card"),T=n("a-badge"),B=n("a-table");return _(),x(K,null,[a(m),I("div",j,[a(C,{bordered:!1},{default:t(()=>[a(N,{model:e.formState,onFinish:e.onFinish},{default:t(()=>[a(r,null,{default:t(()=>[a(s,{flex:"0 1 400px"},{default:t(()=>[a(c,{name:"name",label:"名称",style:{"max-width":"300px"}},{default:t(()=>[a(p,{value:e.formState.name,"onUpdate:value":d[0]||(d[0]=l=>e.formState.name=l),placeholder:"请输入名称",allowClear:""},null,8,["value"])]),_:1})]),_:1}),a(s,{flex:"0 1 400px"},{default:t(()=>[a(c,{name:"available",label:"状态",style:{"max-width":"300px"}},{default:t(()=>[a(o,{value:e.formState.available,"onUpdate:value":d[1]||(d[1]=l=>e.formState.available=l),placeholder:"全部",allowClear:""},{default:t(()=>[a(u,{value:"true"},{default:t(()=>[i("启用")]),_:1}),a(u,{value:"false"},{default:t(()=>[i("停用")]),_:1})]),_:1},8,["value"])]),_:1})]),_:1})]),_:1}),a(r,null,{default:t(()=>[a(s,null,{default:t(()=>[a(f,{type:"primary","html-type":"submit"},{default:t(()=>[i("查询")]),_:1}),a(f,{style:{margin:"0 8px"},onClick:e.resetFields},{default:t(()=>[i("重置")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["model","onFinish"])]),_:1})]),I("div",U,[a(C,{title:"岗位列表",bordered:!1,headStyle:{borderBottom:"none",padding:"20px 24px"},bodyStyle:{padding:"0 24px",minHeight:"calc(100vh - 400px)"}},{default:t(()=>[a(B,{rowKey:l=>l.id,columns:e.columns,"data-source":e.dataSource,"row-selection":e.rowSelection,onChange:e.handleTableChange,scroll:{x:500,y:"calc(100vh - 500px)"},pagination:e.pagination,style:{minHeight:"500px"}},{bodyCell:t(({column:l,record:F,index:D})=>[l.dataIndex==="index"?(_(),x("span",z,k(D+1),1)):h("",!0),l.dataIndex==="available"?(_(),x("span",A,[a(T,{color:F.available?"green":"red"},null,8,["color"]),i(" "+k(F.available?"启用":"禁用"),1)])):h("",!0),l.dataIndex==="operation"?(_(),P(f,{key:2,type:"link"},{default:t(()=>[i("修改")]),_:1})):h("",!0)]),_:1},8,["rowKey","columns","data-source","row-selection","onChange","scroll","pagination"])]),_:1},8,["bodyStyle"])])],64)}const M=V(H,[["render",q],["__scopeId","data-v-81da77c3"]]);export{M as default};
