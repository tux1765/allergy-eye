<template>
	<v-chip
		v-for="word of wordStore.words"
		:key="word"
		closable
		@click:close="wordStore.deleteWord({word})"
	>
		{{word}}
	</v-chip>
</template>

<script setup>
import {useWordStore} from '@/stores/words.js'

const wordStore = useWordStore()
</script>