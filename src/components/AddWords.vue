<template>
	<v-text-field
		v-model="word"
		label="Add Ingredients"
		:rules="[value => !!value || 'Required']"
	>
		<template #append>
			<v-btn
				:disabled="!word"
				:icon="mdiPlus"
				text
				flat
				@click="wordStore.addWord({word}); word = null"
			/>
		</template>
	</v-text-field>
</template>

<script setup>
import {useWordStore} from '@/stores/words.js'
import {ref} from 'vue'
import {mdiPlus} from '@mdi/js'

const wordStore = useWordStore()

const word = ref(null)
</script>