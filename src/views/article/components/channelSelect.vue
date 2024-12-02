<script setup>
  import {
    ref,
    defineProps,
    defineEmits
  } from 'vue';
  import {
    artGetChannels
  } from '@/api/article';

  const channelList = ref([])
  const getChannelList = async () => {
    // const res = await artGetChannels()
    //channelList.value = res.data.data
    setTimeout(() => {
      channelList.value = [{
          id: 1,
          cate_name: '新闻',
          cate_alias: 'news'
        },
        {
          id: 2,
          cate_name: '热点',
          cate_alias: 'hot'
        },
        {
          id: 3,
          cate_name: '程序员',
          cate_alias: 'worker'
        },
        {
          id: 4,
          cate_name: '游戏',
          cate_alias: 'game'
        },
        {
          id: 5,
          cate_name: '日常',
          cate_alias: 'life'
        }
      ]
    }, 1000)
  }
  getChannelList()

  const emit = defineEmits(['update:modelValue'])
  defineProps({
    modelValue: {
      type: [Number, String]
    }
  })


</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" style="width: 100%;">
    <el-option v-for="item in channelList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
  </el-select>
</template>

<style>
</style>
