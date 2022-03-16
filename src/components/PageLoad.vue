<template>
  <div class="page-view">
    <vxe-grid ref="xGrid" v-bind="gridOptions" :cell-style="cellStyle" max-height="500px">

      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
          <vxe-form-item field="gnname">
            <template>
              <vxe-input v-model="formData.gnname" type="text" placeholder="请输入分类名"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="code">
            <template>
              <vxe-input v-model="formData.code" type="text" placeholder="请输入代码或公司名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template>
              <vxe-button type="submit" status="primary" content="查询"></vxe-button>
              <vxe-button type="reset" content="重置"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <!--自定义空数据模板-->
      <template #empty>
            <span style="color: red;">
              <img src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif">
              <p>没有更多数据了！</p>
            </span>
      </template>

    </vxe-grid>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize :lock-view="true"
               :esc-closable="true" :show-zoom="true" :lock-scroll="false" :mask-closable="true">
      <p v-html="detailInfo">{{ detailInfo }}</p>
    </vxe-modal>
  </div>


</template>

<script>
import {mapState} from 'vuex'
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import axios from "axios";

export default {
  data() {
    return {
      detailInfo: null,
      showDetails: false,
      formData: {
        gnname: '',
        code: ''
      },
      gridOptions: {
        resizable: true,
        showOverflow: true,
        border: 'inner',
        rowId: 'id',
        printConfig: {
          columns: [
            {field: '代码'},
            {field: '最新价'},
          ]
        },
        sortConfig: {
          trigger: 'cell',
          remote: true,
          defaultSort: {
            field: '代码',
            order: 'asc'
          }
        },
        filterConfig: {
          remote: true
        },
        pagerConfig: {
          pageSize: 15,
          pageSizes: [5, 15, 20, 50, 100, 200, 500, 1000]
        },
        exportConfig: {
          // 默认选中类型
          type: 'xlsx',
          // 局部自定义类型
          types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
          // 自定义数据量列表
          modes: ['current', 'all']
        },
        radioConfig: {
          labelField: 'id',
          reserve: true,
          highlight: true
        },
        proxyConfig: {
          seq: true, // 启用动态序号代理
          sort: true, // 启用排序代理
          filter: true, // 启用筛选代理
          props: {
            result: 'result', // 配置响应结果列表字段
            total: 'page.total' // 配置响应结果总页数字段
          },
          ajax: {
            // 接收 Promise 对象
            query: ({page, sorts, filters}) => {
              const queryParams = Object.assign({}, this.formData)
              // 处理排序条件
              const firstSort = sorts[0]
              if (firstSort) {
                queryParams.sort = firstSort.property
                queryParams.order = firstSort.order
              }
              // 处理筛选条件
              filters.forEach(({property, values}) => {
                queryParams[property] = values.join(',')
              })
              let url = `http://101.35.153.165/getDataPage.php?pageSize=${page.pageSize}&currentPage=${page.currentPage}&${XEUtils.serialize(queryParams)}`
              return fetch(url).then(response => response.json())
              // return fetch(`http://localhost/My/getDataPage.php?${XEUtils.serialize(queryParams)}`).then(response => response.json())
            },
            // 被某些特殊功能所触发，例如：导出数据 mode=all 时，会触发该方法并对返回的数据进行导出
            // queryAll: () => fetch(`${this.serveApiUrl}/api/pub/all`).then(response => response.json())
          }
        },
        toolbarConfig: {
          export: true,
          zoom: true,
          print: true,
          custom: true,
          slots: {
            buttons: 'toolbar_buttons'
          }
        },
        columns: [
          // { type: 'seq', width: 60, fixed: 'left' },
          // { type: 'radio', title: 'ID', width: 120, fixed: 'left' },
          {field: '代码', title: '代码', minWidth: 160, sortable: true},
          {field: "公司名称", title: "公司名称", type: "html", fixed: "left", width: "150", align: 'center'},
          {field: '最新价', title: '最新价', minWidth: 160, sortable: true},
          {
            field: '查看详情',
            title: '查看该股信息',
            fixed: 'left',
            align: 'center',
            width: 150,
            showOverflow: true,
            slots: {
              // 使用 JSX 渲染
              default: ({row}) => {
                return [
                  // <span style="color: blue" onClick={() => this.addressClickEvent(row)}>查看详情</span>
                  <vxe-button><a onClick={() => this.showDetailEvent(row)}>查看该股详情</a></vxe-button>
                ]
              }
            }
          },
          {field: "估值大小", title: "估值大小", type: "html", width: "150", sortable: true},
          {field: "目标价", title: "目标价", type: "html", width: "150", sortable: true},
          {field: "上升空间", title: "上升空间", type: "html", width: "150", sortable: true},
          {field: "所在地区", title: "所在地区", type: "html", width: "150"},
          {field: "tradeday", title: "交易日期", type: "html", width: "150"},
          {field: "行业", title: "行业", type: "html", width: "150"},
          {field: "市净率", title: "市净率", type: "html", width: "150", sortable: true},
          {field: "总股本", title: "总股本", type: "html", width: "150", sortable: true},
          {field: "流通股", title: "流通股", type: "html", width: "200", sortable: true},
          {field: "总市值", title: "总市值", type: "html", width: "150", sortable: true},
          {field: "2017年每股盈利", title: "2017年每股盈利", type: "html", width: "150", sortable: true},
          {field: "2018年每股盈利", title: "2018年每股盈利", type: "html", width: "150", sortable: true},
          {field: "yysrzzl_2018", title: "2018年营业收入增长率", type: "html", width: "150", sortable: true},
          {field: "jlrzz_2018", title: "2018年净利润增长", type: "html", width: "150", sortable: true},
          {field: "yysrzzl_2019q3", title: "2019年前三季度营业收入增长率", type: "html", width: "150", sortable: true},
          {field: "jlrzz_2019q3", title: "2019年净利润增长", type: "html", width: "150", sortable: true},
          {field: "EPS_2019", title: "2019年每股盈利", type: "html", width: "150", sortable: true},
          {field: "grow_2019", title: "2019年成长", type: "html", width: "150", sortable: true},
          {field: "2020年前三季", title: "2020年前三季每股盈利", type: "html", width: "150", sortable: true},
          {field: "EPS_2020", title: "2020年每股盈利", type: "html", width: "150", sortable: true},
          {field: "grow_2020", title: "2020年成长", type: "html", width: "150", sortable: true},
          {field: "净资产收益率", title: "净资产收益率", type: "html", width: "150", sortable: true},
          {field: "每股经营现金流", title: "每股经营现金流", type: "html", width: "150", sortable: true},
          {field: "EPS_2021q2", title: "2021年第三季度每股收益", type: "html", width: "150", sortable: true},
          {field: "净利率", title: "净利率", type: "html", width: "150", sortable: true},
          {field: "毛利率", title: "毛利率", type: "html", width: "150", sortable: true},
          {field: "2021每股净资产", title: "2021每股净资产", type: "html", width: "150", sortable: true},
          {field: "环比增长率", title: "环比增长率", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2021", title: "2021年股东数量", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2019", title: "2019年股东数量", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2018", title: "2018年股东数量", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2017", title: "2017年股东数量", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2016", title: "2016年股东数量", type: "html", width: "150", sortable: true},
          {field: "stocksholder_2015", title: "2015年股东数量", type: "html", width: "150", sortable: true},
          {field: "从2015年到2020年股东数量变化", title: "从2015年到2020年股东数量变化", type: "html", width: "150", sortable: true},
          {field: "户均持股数量", title: "户均持股数量", type: "html", width: "150", sortable: true},
          {field: "大股东持股比例", title: "大股东持股比例", type: "html", width: "150", sortable: true},
          {field: "二股东持股比例", title: "二股东持股比例", type: "html", width: "150", sortable: true},
          {field: "三股东持股比例", title: "三股东持股比例", type: "html", width: "150", sortable: true},
          {field: "四股东持股比例", title: "四股东持股比例", type: "html", width: "150", sortable: true},
          {field: "前十大股东合计持股比例", title: "前十大股东合计持股比例", type: "html", width: "150", sortable: true},
          {field: "重要机构持仓", title: "重要机构持仓", type: "html", width: "300", sortable: true},
          {field: "十大股东增仓占流通股比例", title: "十大股东增仓占流通股比例", type: "html", width: "150", sortable: true},
          {field: "cash_2020", title: "2020年现金流", type: "html", width: "150", sortable: true},
          {field: "负债率", title: "负债率", type: "html", width: "150", sortable: true},
          {field: "stockholderReduce_2018", title: "2018年股东数量减少", type: "html", width: "150", sortable: true},
          {field: "stockholderReduce_2019", title: "2019年股东数量减少", type: "html", width: "150", sortable: true},
          {field: "stockholderReduce_2021", title: "2021年股东数量减少", type: "html", width: "150", sortable: true},
          {field: "流通股占比", title: "流通股占比", type: "html", width: "150", sortable: true},
          {field: "predict_2021", title: "2021年预估", type: "html", width: "150", sortable: true},
          {field: "predictGrow_2021", title: "2021年预估成长", type: "html", width: "150", sortable: true},
          {field: "syl_2019", title: "2019年市盈率", type: "html", width: "150", sortable: true},
          {field: "syl_2020", title: "2020年市盈率", type: "html", width: "150", sortable: true},
          {field: "syl_2021", title: "2021年市盈率", type: "html", width: "150", sortable: true},
          {field: "筹码集中度", title: "筹码集中度(%)", type: "html", width: "150", sortable: true},
          {field: "gnname", title: "概念类型", type: "html", width: "400", sortable: true},
          {field: "紫色条件", title: "紫色条件", type: "html", width: "150", sortable: true},
          {field: '条件满足', title: '条件满足', minWidth: 160, sortable: true},

        ]
      }
    }
  },
  computed: {},
  methods:
    {
      showDetailEvent(row) {
        // this.selectRow = row
        this.showDetails = true
        let url = `http://101.35.153.165/getBaseInfo.php?code=${row.代码}`
        axios.get(url).then((response) => {
          let baseinfodata = response.data.data[0]["baseinfo"]
          let info = ""
          info = XEUtils.toValueString(row.gnname)
          let baseinfoList = XEUtils.toValueString(baseinfodata).split(",|;")
          baseinfoList = [...new Set(baseinfoList)]
          let baseinfo = ""
          for (let i = 0; i < baseinfoList.length; i++) {
            baseinfo = baseinfo + baseinfoList[i] + "\n" + "\n"
          }
          info = `<h2 style='color: #2984f1'>竞争对手:</h2>${row.竞争对手}` + `<h2 style='color: #2984f1'>复权价:${row.总复权价}倍</h2>` + " <h2 style='color: #2984f1'>分类</h2>" + info + "\n\n" + "<h2 style='color: #2984f1'>公司大事</h2>" + baseinfo
          this.detailInfo = info
          // VXETable.modal.alert(info)
        })
      },
      cellStyle({row, rowIndex, column}) {
        const purple = row.purple.split(',')
        const orange = row.orange.split(',')
        for (let each = 0; each < purple.length; each++) {
          if (column.property === purple[each]) {
            return {
              backgroundColor: '#a166e7',
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
      searchEvent() {
        const $grid = this.$refs.xGrid
        $grid.commitProxy('query')
      },
      resetEvent() {
        const $grid = this.$refs.xGrid
        $grid.commitProxy('reload')
      },
      formatAmount({cellValue}) {
        return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {digits: 2})}` : ''
      },
      formatDate({cellValue}) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
      }
    }
}

</script>
<style>
.page-view {
  padding: 16px 10% 15px 10%;
  min-width: 800px;
  margin-top: 50px;
}
</style>
