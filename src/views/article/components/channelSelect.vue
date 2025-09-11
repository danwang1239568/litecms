<script setup>
import {
  ref,
  defineProps,
  defineEmits
} from 'vue';
import {
  artGetChannelsApi
} from '@/api/article';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsApi()
  channelList.value = res.data.data
}
getChannelList()


</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 100%;"
  >
    <el-option
      v-for="item in channelList"
      :label="item.name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<style>
</style>
