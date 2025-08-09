<template>
	<v-file-upload v-model="file"/>
</template>

<script setup>
import {useImageStore} from '@/stores/image.js'
import {ref, watch} from 'vue'

const imgStore = useImageStore()
const file = ref(null)

watch(file, () => {
	imgStore.assignImage({newImage: file.value})
})
</script>