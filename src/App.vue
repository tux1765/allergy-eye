<template>
	<v-layout class="rounded rounded-md">
		<v-app-bar>
			<v-app-bar-nav-icon/>
			<v-app-bar-title>Title</v-app-bar-title>
		</v-app-bar>

		<v-navigation-drawer>
			<v-list nav>
				<v-list-item title="Navigation drawer" link></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<RouterView />
		</v-main>
	</v-layout>
</template>

<script setup>
import {RouterView} from 'vue-router'
</script>

