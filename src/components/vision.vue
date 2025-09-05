<template>
	<v-btn @click="sendToVision">
		Google Vision
	</v-btn>
</template>

<script setup>
import visionApi from '@/controllers/vision.js'

const sendToVision = async () => {
	try {
		const res = await visionApi.getVision()
		console.log(res)
	} catch (e) {
		console.error(e)
	}
}
</script>