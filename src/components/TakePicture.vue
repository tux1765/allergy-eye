<template>
	<v-file-input
		v-model="image"
		:prepend-icon="mdiCamera"
		capture="user"
		accept="image/*"
		density="compact"
		hide-input
	/>
</template>

<script setup>
import {mdiCamera} from "@mdi/js"
import {ref, watch} from 'vue'
import {useImageStore} from '@/stores/image.js'

const imgStore = useImageStore()
const image = ref(null)

watch(image, () => {
	imgStore.assignImage({newImage: image.value})
})
</script>