<template>
	<v-btn @click="startWorker">
		Scan
	</v-btn>
</template>

<script setup>
import { createWorker } from 'tesseract.js'

const emit = defineEmits(['scanComplete'])
const props = defineProps({
	image: String
})

const startWorker = async () => {
	const worker = await createWorker('eng')
	const res = await worker.recognize(props.image, {}, {blocks: true, text: true})
	await worker.terminate()
	emit('scanComplete', res.data)
}
</script>