<script setup>
import { ref } from 'vue'

import Page from '@/components/Page.vue'
import Header from '@/components/Header.vue'
import TasksView from '@/components/TasksView.vue'
import NotesView from '@/components/NotesView.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

const navigation = ref('notes')
</script>

<template>
  <Page>
    <Header />
    <TasksView v-if="navigation === 'tasks'" />
    <NotesView v-else-if="navigation === 'notes'" />
  </Page>
</template>
