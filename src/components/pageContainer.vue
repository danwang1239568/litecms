<script setup>
import { defineProps } from 'vue'
const prop = defineProps({
  title: {
    require: true,
    type: String
  }
})
</script>

<template>
  <el-scrollbar class="box" height="calc(78% + 70px)">
    <el-card class="card">
      <template #header>
        <div class="header">
          <span>{{ prop.title }}</span>
          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.box {
  font-size: 16px;
  padding: 20px;
  height: 100vh;

  .card {
    min-height: calc(98vh - 200px);
    box-sizing: border-box;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
