<template>
	<div
		:style="{
			border: '3px solid red',
			position: 'absolute',
			left: `${x}px`,
			top: `${y}px`,
			width: `${width}px`,
			height: `${height}px`
		}"
	/>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const props = defineProps({
	origWidth: Number,
	origHeight: Number,
	scaledWidth: Number,
	scaledHeight: Number,
	bbox: Object
})

const x = ref(0)
const y = ref(0)
const width = ref(0)
const height = ref(0)

onMounted(() => {
	const scaleX = props.scaledWidth / props.origWidth
	const scaleY = props.scaledHeight / props.origHeight
	const scaleWidth = props.bbox.x1 - props.bbox.x0
	const scaleHeight = props.bbox.y1 - props.bbox.y0

	x.value = props.bbox.x0 * scaleX
	y.value = props.bbox.y0 * scaleY
	width.value = scaleWidth * scaleX
	height.value = scaleHeight * scaleY
})


</script>