<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card ref="imgCard" min-width="500">
					<v-img :src="image" ref="imgTag">
						<WordOverlay
							v-for="bbox of bboxs"
							:key="bbox.x0"
							:origWidth="300"
							:origHeight="964"
							:scaledHeight="imgHeight"
							:scaledWidth="imgWidth"
							:bbox="bbox"
						/>
					</v-img>
				</v-card>
			</v-col>
			<v-col>
				<Tesseract :image="image" @scanComplete="updateBbox"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import image from '@/assets/pbcookie.jpg'
import WordOverlay from '@/components/WordOverlay.vue'
import Tesseract from '@/components/Tesseract.vue'
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from 'vue'

const imgCard = useTemplateRef('imgCard')
const imgHeight = ref(0)
const imgWidth = ref(0)

const onResize = () => {
	imgHeight.value = imgCard.value.$el.clientHeight
	imgWidth.value = imgCard.value.$el.clientWidth
}
const resizeObserver = new ResizeObserver(onResize)
onMounted(async () => {
	resizeObserver.observe(imgCard.value.$el)
})

onBeforeUnmount(() => {
	resizeObserver.unobserve(imgCard)
})

const bboxs = ref([])
const updateBbox = (data) => {
	for (const block of data.blocks) {
		for (const paragraph of block.paragraphs) {
			for (const line of paragraph.lines) {
				if (line.text.match(/peanut/i)) {
					for (const word of line.words) {
						if (word.text.match(/peanut/i)) {
							bboxs.value.push(word.bbox)
						}
					}
				}
			}
		}
	}
}
</script>
