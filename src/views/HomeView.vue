<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card
					variant="flat"
					ref="imgCard"
					min-width="500"
				>
					<v-img
						v-if="imgStore.image"
						:src="imgStore.imageUrl"
						ref="imgTag"
					>
						<WordOverlay
							v-for="bbox of bboxs"
							:key="bbox.x0"
							:origWidth="imgStore.imageDimensions.width"
							:origHeight="imgStore.imageDimensions.height"
							:scaledHeight="scaledHeight"
							:scaledWidth="scaledWidth"
							:bbox="bbox"
						/>
					</v-img>
					<div v-else>
						Upload an image to get started!
					</div>
				</v-card>
			</v-col>
			<v-col>
				<v-card>
					<v-card-text>
						<FileUpload />
						<Tesseract
							v-if="imgStore.image"
							:image="imgStore.imageUrl"
							@scanComplete="updateBbox"
						/>
					</v-card-text>
					<v-card-text>
						{{imgStore.imageText}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import WordOverlay from '@/components/WordOverlay.vue'
import Tesseract from '@/components/Tesseract.vue'
import {onBeforeUnmount, onMounted, ref, useTemplateRef, watch} from 'vue'
import {useImageStore} from '@/stores/image.js'
import {storeToRefs} from 'pinia'

const imgStore = useImageStore()

const imgCard = useTemplateRef('imgCard')
const scaledHeight = ref(0)
const scaledWidth = ref(0)

const onResize = () => {
	scaledHeight.value = imgCard.value.$el.clientHeight
	scaledWidth.value = imgCard.value.$el.clientWidth
}
const resizeObserver = new ResizeObserver(onResize)

onMounted(async () => {
	resizeObserver.observe(imgCard.value.$el)
})

onBeforeUnmount(() => {
	resizeObserver.unobserve(imgCard.value.$el)
})

const {image} = storeToRefs(imgStore)
watch(image, () => {
	bboxs.value = [] // reset bbox values if image changes
})

const bboxs = ref([])
const updateBbox = (data) => {
	imgStore.$patch({imageText: data.text})
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
