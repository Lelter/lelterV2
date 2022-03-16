<template>

  <div class="page-view">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>说明</span>
      </div>
      <div class="text item">
         一次性加载版本，将全部数据加载进表格中，耗时较长
      </div>
  </el-card>
    <br>
  <!--    <vxe-radio-group v-model="selectTab">-->
  <vxe-button label="tab1" content="所有" @click="showSearchEvent1('tab1')"></vxe-button>
  <vxe-button label="tab2" content="新能源" @click="showSearchEvent1('tab2')"></vxe-button>
  <vxe-button label="tab3" content="医疗" @click="showSearchEvent1('tab3')"></vxe-button>
  <vxe-button label="tab4" content="科技" @click="showSearchEvent1('tab4')"></vxe-button>

  <!--    <vxe-radio-button label="tab3" content="军工"></vxe-radio-button>-->
  <!--    <vxe-radio-button label="tab4" content="医疗"></vxe-radio-button>-->
  <!--    </vxe-radio-group>-->
  <vxe-toolbar>
    <template #buttons>
      <vxe-input v-model="filterName1" type="search" placeholder="试试搜索" @search-click="searchEvent1"></vxe-input>
      <span style="color:#2984f1">共有{{ total }}条记录</span>
    </template>
  </vxe-toolbar>
  <vxe-table
    :column-config="{resizable: true}"
    stripe
    border
    height="450"
    :row-config="{height: 120}"
    :cell-style="cellStyle"
    :show-overflow="true"
    :data="list1"
    :loading="loading1">
    <vxe-column type="seq" width="150" fixed="left">
      <!--        <template #default="{ row }">-->
      <!--          <vxe-button @click="showDetailEvent(row)">弹框{{ row.code }}</vxe-button>-->
      <!--        </template>-->
    </vxe-column>
    <vxe-column title="查看详情" type="html" width="150">
      <template #default="{ row }">
        <vxe-button @click="showDetailEvent(row)">查看详情</vxe-button>
      </template>
    </vxe-column>
    <vxe-column field="公司名称" title="公司名称" type="html" fixed="left" width="150"></vxe-column>
    <vxe-column field="代码" title="代码" type="html" width="150" sortable></vxe-column>
    <vxe-column field="最新价" title="最新价" type="html" width="150" sortable></vxe-column>
    <vxe-column field="估值大小" title="估值大小" type="html" width="150" sortable></vxe-column>
    <vxe-column field="目标价" title="目标价" type="html" width="150" sortable></vxe-column>
    <vxe-column field="上升空间" title="上升空间" type="html" width="150" sortable></vxe-column>

    <vxe-column field="所在地区" title="所在地区" type="html" width="150"></vxe-column>
    <vxe-column field="tradeday" title="交易日期" type="html" width="150"></vxe-column>
    <vxe-column field="行业" title="行业" type="html" width="150"></vxe-column>
    <vxe-column field="市净率" title="市净率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="总股本" title="总股本" type="html" width="150" sortable></vxe-column>
    <vxe-column field="流通股" title="流通股" type="html" width="200" sortable></vxe-column>
    <vxe-column field="总市值" title="总市值" type="html" width="150" sortable></vxe-column>
    <vxe-column field="2017年每股盈利" title="2017年每股盈利" type="html" width="150" sortable></vxe-column>
    <vxe-column field="2018年每股盈利" title="2018年每股盈利" type="html" width="150" sortable></vxe-column>
    <vxe-column field="yysrzzl_2018" title="2018年营业收入增长率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="jlrzz_2018" title="2018年净利润增长" type="html" width="150" sortable></vxe-column>
    <vxe-column field="yysrzzl_2019q3" title="2019年前三季度营业收入增长率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="jlrzz_2019q3" title="2019年净利润增长" type="html" width="150" sortable></vxe-column>
    <vxe-column field="EPS_2019" title="2019年每股盈利" type="html" width="150" sortable></vxe-column>
    <vxe-column field="grow_2019" title="2019年成长" type="html" width="150" sortable></vxe-column>
    <vxe-column field="2020年前三季" title="2020年前三季每股盈利" type="html" width="150" sortable></vxe-column>
    <vxe-column field="EPS_2020" title="2020年每股盈利" type="html" width="150" sortable></vxe-column>
    <vxe-column field="grow_2020" title="2020年成长" type="html" width="150" sortable></vxe-column>
    <vxe-column field="净资产收益率" title="净资产收益率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="每股经营现金流" title="每股经营现金流" type="html" width="150" sortable></vxe-column>
    <vxe-column field="EPS_2021q2" title="2021年第三季度每股收益" type="html" width="150" sortable></vxe-column>
    <vxe-column field="净利率" title="净利率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="毛利率" title="毛利率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="2021每股净资产" title="2021每股净资产" type="html" width="150" sortable></vxe-column>
    <vxe-column field="环比增长率" title="环比增长率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2021" title="2021年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2019" title="2019年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2018" title="2018年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2017" title="2017年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2016" title="2016年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stocksholder_2015" title="2015年股东数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="从2015年到2020年股东数量变化" title="从2015年到2020年股东数量变化" type="html" width="150" sortable></vxe-column>

    <vxe-column field="户均持股数量" title="户均持股数量" type="html" width="150" sortable></vxe-column>
    <vxe-column field="大股东持股比例" title="大股东持股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="二股东持股比例" title="二股东持股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="三股东持股比例" title="三股东持股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="四股东持股比例" title="四股东持股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="前十大股东合计持股比例" title="前十大股东合计持股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="重要机构持仓" title="重要机构持仓" type="html" width="300" sortable></vxe-column>
    <vxe-column field="十大股东增仓占流通股比例" title="十大股东增仓占流通股比例" type="html" width="150" sortable></vxe-column>
    <vxe-column field="cash_2020" title="2020年现金流" type="html" width="150" sortable></vxe-column>
    <vxe-column field="负债率" title="负债率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stockholderReduce_2018" title="2018年股东数量减少" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stockholderReduce_2019" title="2019年股东数量减少" type="html" width="150" sortable></vxe-column>
    <vxe-column field="stockholderReduce_2021" title="2021年股东数量减少" type="html" width="150" sortable></vxe-column>
    <vxe-column field="流通股占比" title="流通股占比" type="html" width="150" sortable></vxe-column>
    <vxe-column field="predict_2021" title="2021年预估" type="html" width="150" sortable></vxe-column>
    <vxe-column field="predictGrow_2021" title="2021年预估成长" type="html" width="150" sortable></vxe-column>
    <vxe-column field="syl_2019" title="2019年市盈率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="syl_2020" title="2020年市盈率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="syl_2021" title="2021年市盈率" type="html" width="150" sortable></vxe-column>
    <vxe-column field="筹码集中度" title="筹码集中度(%)" type="html" width="150" sortable></vxe-column>
    <vxe-column field="gnname" title="概念类型" type="html" width="400" sortable></vxe-column>

    <!--      <vxe-column field="purple" title="purple" type="html" width="150" sortable></vxe-column>-->

    <vxe-column field="紫色条件" title="紫色条件" type="html" width="150" sortable></vxe-column>
    <vxe-column field="条件满足" title="条件满足" type="html" width="150" sortable></vxe-column>


    <template #empty>
            <span style="color: #f53838;">
              <p>没有更多数据了！</p>
            </span>
    </template>
  </vxe-table>
    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize :lock-view="true"
               :esc-closable="true" :show-zoom="true" :lock-scroll="false" :mask-closable="true">
      <template #default>{{ detailInfo }}</template>
    </vxe-modal>
  </div>

</template>

<script>
import axios from "axios";
import XEUtils from 'xe-utils'
import VXETable from "vxe-table";
// import VXETable from "vxe-table";

export default {
  data() {
    return {
      selectTab: "tab1",
      showDetails: false,
      selectRow: null,
      list1: [],
      filterName1: '',
      tableData1: [],
      total: 0,
      detailInfo: "",
      loading1: true
    }
  },
  created() {
    this.getData()
    this.searchEvent1()
  },
  methods: {
    cellStyle({row, rowIndex, column}) {
      const purple = row.purple.split(',')
      const orange = row.orange.split(',')
      for (let each = 0; each < purple.length; each++) {
        if (column.property === purple[each]) {
          return {
            backgroundColor: '#c09aee',
            color: '#ffffff'
          }
        }
      }
      for (let each = 0; each < orange.length; each++) {
        if (column.property === orange[each]) {
          return {
            backgroundColor: '#f60',
            color: '#ffffff'
          }
        }
      }
      // if (row.purple.indexOf('净利率') !== -1) {
      //   if (column.property === "净利率")
      //
      // }
    },
    getData() {
      // let url = 'http://localhost/my/get.php'
      let url = 'http://101.35.153.165/get.php'
      axios.get(url).then((response) => {
        this.info = JSON.stringify(response.data.data)
        this.tableData1 = response.data.data
        this.list1 = this.tableData1
        this.total = this.list1.length
        this.loading1 = false
      })
    },
    showSearchEvent1(tab) {
      if (tab !== "tab1") {
        const dict = {"tab2": "新能源", "tab3": "医疗", "tab4": "科技"}
        this.filterName1 = dict[tab]
        const filterName = dict[tab]
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['gnname']
        const rest = this.tableData1.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.list1 = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
        this.total = this.list1.length
      } else {
        this.list1 = this.tableData1
        this.total = this.list1.length
      }
    },
    searchEvent1() {
      const startTime = Date.now()
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()

      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['公司名称', '代码', 'gnname', '行业']
        const rest = this.tableData1.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.list1 = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
        VXETable.modal.message({content: `用时 ${Date.now() - startTime}毫秒`, status: 'info'})
      } else {
        this.list1 = this.tableData1
        VXETable.modal.message({content: `用时 ${Date.now() - startTime}毫秒`, status: 'info'})
      }
      this.total = this.list1.length


    },
    showDetailEvent(row) {
      this.selectRow = row
      this.showDetails = true
      let url = `http://101.35.153.165/getBaseInfo.php?code=${row.代码}`
      axios.get(url).then((response) => {
        let baseinfodata = response.data.data[0]["baseinfo"]
        const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
        const filterRE = new RegExp(filterName, 'gi')
        let info = ""
        if (this.filterName1.length !== 0) {
          info = XEUtils.toValueString(row.gnname).replace(`<span class="keyword-lighten">${filterName}</span>`, filterName)
          let baseinfoList = XEUtils.toValueString(baseinfodata).split(",|;")
          let baseinfo = ""
          for (let i = 0; i < baseinfoList.length; i++) {
            baseinfo = baseinfo + `${i}.` + baseinfoList[i] + "\n"
          }
          info = "分类:\n\n" + info + "\n\n" + "公司大事:\n\n" + baseinfo
        } else {
          info = row.gnname
          let baseinfoList = XEUtils.toValueString(baseinfodata).split(",|;")
          let baseinfo = ""
          for (let i = 0; i < baseinfoList.length; i++) {
            baseinfo = baseinfo + `${i}.` + baseinfoList[i] + "\n"
          }
          info = "分类:\n\n" + info + "\n\n" + "公司大事:\n\n" + baseinfo
        }
        this.detailInfo = info
      })

    },
  }
}
</script>
<style>
.page-view {
  padding-left: 10%;
  padding-right: 10%;
  min-width: 800px;
  margin-top: 50px;
}

</style>
