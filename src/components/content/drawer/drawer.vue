<!-- el-drawer -->
<template>
  <el-drawer
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    :show-close="false"
    :size="size"
    @close="onclose"
    @open="onopen"
    @opened="onopened"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: "drawer",
  data() {
    return {
      size: "33.33%"
    };
  },
  props: {
    //抽出抽屉
    drawer: {
      type: Boolean,
      default: false,
      required: true
    },
    direction: {
      type: String,
      default: "rtl"
    }
  },
  methods: {
    onclose() {
      this.$emit("onclose");
    },
    handleClose() {
      this.$emit("handleclose");
    },
    onopen(){
      this.$emit("onopen");
    },
    onopened(){
      this.$emit("onopened");
    }
  }
};
</script>

<style scoped>
</style>