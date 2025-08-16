<template>
	<v-chip
		v-for="word in wordStore.words"
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