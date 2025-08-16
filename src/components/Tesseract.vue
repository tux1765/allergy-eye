<template>
	<v-btn @click="convertGreyscaleWorker">
		Scan
	</v-btn>
<!--	<v-img TODO: make this a debug setting-->
<!--		v-if="greyscaleImg"-->
<!--		:src="greyscaleImg"-->
<!--	/>-->
</template>

<script setup>
import { createWorker } from 'tesseract.js'
import {ref, watch} from 'vue'

const emit = defineEmits(['scanComplete'])
const props = defineProps({
	image: String
})

const greyscaleImg = ref(null)

const startWorker = async () => {
	console.debug('Starting Worker')
	const worker = await createWorker('eng')
	const res = await worker.recognize(greyscaleImg.value, {}, {blocks: true, text: true})
	await worker.terminate()
	emit('scanComplete', res.data)
}

watch(greyscaleImg, () => {
	startWorker()
})

const isLoadingGreyscale = ref(false)
const convertGreyscaleWorker = () => {
	const worker = new Worker(new URL('../workers/worker.js', import.meta.url), {type: "module"})
	isLoadingGreyscale.value = true
	worker.postMessage(props.image)
	console.debug('message posted to worker')
	worker.onmessage = (e) => {
		isLoadingGreyscale.value = false
		greyscaleImg.value = e.data
		console.debug('msg received from worker')
		worker.terminate()
	}

	worker.onerror = (err) => {
		console.error(err)
	}
}
</script>