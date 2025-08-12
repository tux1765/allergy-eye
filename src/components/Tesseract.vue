<template>
	<v-btn @click="startWorker">
		Scan
	</v-btn>
<!--	<v-img TODO: make this a debug setting-->
<!--		v-if="greyscaleImg"-->
<!--		:src="greyscaleImg"-->
<!--	/>-->
</template>

<script setup>
import {Jimp} from 'jimp'
import { createWorker } from 'tesseract.js'
import {ref} from 'vue'

const emit = defineEmits(['scanComplete'])
const props = defineProps({
	image: String
})

const greyscaleImg = ref(null)

const startWorker = async () => {
	const worker = await createWorker('eng')
	await convertToGreyscale()
	const res = await worker.recognize(greyscaleImg.value, {}, {blocks: true, text: true})
	await worker.terminate()
	emit('scanComplete', res.data)
}

const convertToGreyscale = async () => {
	try {
		const newImage = await Jimp.read(props.image)
		newImage.greyscale()
		greyscaleImg.value = await newImage.getBase64('image/png')
	} catch (e) {
		console.error(e)
	}
}
</script>