<template>
	<v-layout class="rounded rounded-md">
		<v-app-bar>
			<v-app-bar-nav-icon @click="navDrawer = !navDrawer"/>
			<v-app-bar-title>Allergy Eye</v-app-bar-title>
		</v-app-bar>

		<v-navigation-drawer v-model="navDrawer">
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
import {onMounted, ref} from 'vue'

const wordStore = useWordStore()

const navDrawer = ref(true)

onMounted(() => {
	wordStore.hydrateWords()
})
</script>

