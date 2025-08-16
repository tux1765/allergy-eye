<template>
	<v-layout class="rounded rounded-md">
		<v-app-bar>
			<v-app-bar-nav-icon/>
			<v-app-bar-title>Title</v-app-bar-title>
		</v-app-bar>

		<v-navigation-drawer>
			<v-list>
				<v-list-item>
					<AddWords />
				</v-list-item>
				<v-list-item>
					<DisplayWords />
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<RouterView />
		</v-main>
	</v-layout>
</template>

<script setup>
import AddWords from '@/components/AddWords.vue'
import DisplayWords from '@/components/DisplayWords.vue'
import {useWordStore} from '@/stores/words.js'
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'

const wordStore = useWordStore()

onMounted(() => {
	wordStore.hydrateWords()
})
</script>

