<!-- 集成header column imgcolumn hrefcolumn sortable fix pager 等功能的Table组件 REMARK BY SLL 20200619-->
<!-- column fixed 拖动情况下造成列表错乱 -->
<template>
  <div>
    <el-table
      ref="table"
      :data="tableInfo.data"
      border
      stripe
      :fit="true"
      style="width: 100%"
      highlight-current-row
      height="400"
      size="small"
      empty-text="暂无数据"
      @select="selectrow"
      @select-all="selectall"
      @selection-change="selectedchange"
      @row-click="rowclick"
    >
      <!-- 循环所有列 -->
      <template v-for="(item,index) in tableInfo.fieldList">
        <el-table-column
          v-if="!item.type"
          :key="index"
          :label="item.label"
          :prop="item.value"
          :sortable="item.sortable==1?true:false"
          :min-width="item.minWidth||120"
          :fixed="item.fixed==1?true:false"
          :width="item.width"
        >
          <template slot-scope="slotProp">
            <template v-if="item.cellType=='img'">
              <img style="display:block;" :src="slotProp.row[item.value]" height="20" alt />
            </template>
            <template v-else-if="item.cellType=='link'">
              <a
                :href="slotProp.row[item.value]"
                target="_blank"
              >{{slotProp.row[item.hreflabel]||slotProp.row[item.value]}}</a>
            </template>
            <template v-else>{{slotProp.row[item.value]}}</template>
          </template>
        </el-table-column>
        <el-table-column :type="item.type" :key="index" v-else></el-table-column>
      </template>

      <!-- 加载带按钮组的操作列 -->
      <template v-if="!!(tableInfo.btn)&&!!(tableInfo.btn.btns)&&tableInfo.btn.btns.length>0">
        <el-table-column min-width="100" :label="tableInfo.btn.colname||'操作'">
          <template slot-scope="slotProp">
            <el-button
              v-for="(btn,i) in tableInfo.btn.btns"
              :key="i"
              type="text"
              size="small"
              @click="btnClick(btn.clickFn,slotProp.row)"
            >{{btn.label}}</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页插件 -->
    <div class="r page">
      <el-pagination
        :total="tableInfo.dataTotal"
        :page-size.sync="pageSize"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        layout="total,sizes, prev, pager, next,jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pager-table",
  data() {
    return {
      pageIndex: 1,
      pageSize: this.pageSizes[0]
    };
  },
  props: {
    tableInfo: {
      type: Object,
      default() {
        return {
          data: [],
          fieldList: [],
          btn: {
            colname: "操作",
            btns: [
              {
                label: "编辑"
              },
              {
                label: "删除"
              }
            ]
          },
          dataTotal: 0
        };
      }
    },
    // dataTotal: {
    //   type: Number,
    //   required: true
    // },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 30, 50, 100];
      }
    }
  },
  methods: {
    btnClick(fn, row) {
      this.$emit(fn, row);
    },
    selectrow(selection, row) {
      this.$emit("select", selection);
    },
    selectall(selection) {
      this.$emit("select-all", selection);
    },
    //勾选行变化
    selectedchange(selection) {
      this.$emit("selection-change", selection);
    },
    //点击行
    rowclick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    // 每页加载数量
    handleSizeChange(size) {
      this.pageIndex = 1;
      this.$emit("init", this.pageIndex, size);
    },
    //   当前页码
    handleCurrentChange(currentIndex) {
      this.$emit("init", currentIndex, this.pageSize);
    },
    // 重新加载table
    reload() {
      this.pageIndex = 1;
      this.pageSize = this.pageSizes[0];
      this.$emit("init", this.pageIndex, this.pageSize);
    }
  },
  created() {
    this.$emit("init", this.pageIndex, this.pageSize);
  },
  mounted() {
    // table出现fixed列时 拖拽导致布局错乱
    let _this = this;
    setInterval(function() {
      if (_this.$refs.table) {
        _this.$refs.table.doLayout();
      }
    }, 500);
  }
};
</script>

<style scoped>
</style>