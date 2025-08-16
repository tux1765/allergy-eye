<template>
	<v-btn @click="startScanning">
		Scan
	</v-btn>
	<div>
		<v-progress-circular
			v-if="loading"
			class="mt-4"
			indeterminate
			color="primary"
			:size="80"
			:width="6"
		>
			Scanning
		</v-progress-circular>
	</div>
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
const loading = ref(false)

const startWorker = async () => {
	console.debug('Starting Worker')
	const worker = await createWorker('eng')
	const res = await worker.recognize(greyscaleImg.value, {}, {blocks: true, text: true})
	await worker.terminate()
	emit('scanComplete', res.data)
}

const isLoadingGreyscale = ref(false)
const convertGreyscaleWorker = () => {
	const worker = new Worker(new URL('../workers/worker.js', import.meta.url), {type: "module"})
	isLoadingGreyscale.value = true
	worker.postMessage(props.image)
	console.debug('message posted to worker')
	return new Promise((resolve) => {
		worker.onmessage = (e) => {
			isLoadingGreyscale.value = false
			greyscaleImg.value = e.data
			console.debug('msg received from worker')
			worker.terminate()
			resolve(true)
		}

		worker.onerror = (err) => {
			console.error(err)
			resolve(false)
		}
	})
}

const startScanning = async () => {
	loading.value = true
	const didConvert = await convertGreyscaleWorker()
	if (didConvert) await startWorker()
	loading.value = false
}
</script>