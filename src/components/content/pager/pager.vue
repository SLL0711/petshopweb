<!-- 分页控件 -->
<template>
  <div class="r page">
    <el-pagination
      :total="dataTotal"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageIndex"
      layout="total,sizes, prev, pager, next,jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pager",
  data() {
    return {
      pageIndex: 1,
      pageSize: this.pageSizes[0]
    };
  },
  props: {
    dataTotal: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 30, 50, 100];
      }
    }
  },
  methods: {
    //   当前每页展示多少数据
    handleSizeChange(size) {
      this.pageIndex = 1;
      this.$emit("init", this.pageIndex, size);
    },
    //   当前页码
    handleCurrentChange(currentIndex) {
      this.$emit("init", currentIndex, this.pageSize);
    }
  },
  created() {
    this.$emit("init", this.pageIndex, this.pageSize);
  }
};
</script>

<style scoped>
.page {
  margin-top: 10px;
}
</style>