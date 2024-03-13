<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
</script>

<template>
  <Header />
  <Tabs>
    <Tab to="/notes">Notes</Tab>
    <Tab to="/tasks">Tasks</Tab>
  </Tabs>
  <main>
    <RouterView></RouterView>
  </main>
</template>
