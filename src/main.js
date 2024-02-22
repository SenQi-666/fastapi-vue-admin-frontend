import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Layout, Button, Image, Tabs, Form, Input, Checkbox, Space, Menu, Breadcrumb, Dropdown, Table, Tag, Badge, Card, Row, Col, Select, DatePicker, Modal, Tree, Avatar, Statistic, List, Tooltip, Progress, Radio } from 'ant-design-vue'
import { createFromIconfontCN } from "@ant-design/icons-vue"
import VChart from 'vue-echarts';
import 'echarts'


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4420292_rtvry6ee25.js',
  });

const app = createApp(App)
app.use(router)
app.use(Layout)
app.use(Button)
app.use(Image)
app.use(Tabs)
app.use(Form)
app.use(Input)
app.use(Checkbox)
app.use(Space)
app.use(Menu)
app.use(Breadcrumb)
app.use(Dropdown)
app.use(Table)
app.use(Tag)
app.use(Badge)
app.use(Card)
app.use(Row)
app.use(Col)
app.use(Select)
app.use(DatePicker)
app.use(Modal)
app.use(Tree)
app.use(Avatar)
app.use(Statistic)
app.use(List)
app.use(Tooltip)
app.use(Progress)
app.use(Radio)
app.component('IconFont', IconFont)
app.component('VChart', VChart)
app.mount('#app')
