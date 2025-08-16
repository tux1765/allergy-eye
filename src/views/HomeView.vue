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
				</v-card>
			</v-col>
			<v-col>
				<v-card class="text-center">
					<v-card-title>
						Capture or Upload an image!
					</v-card-title>
					<v-card-text>
						<div class="mb-5">
							<TakePicture />
						</div>
						<FileUpload />
						<Tesseract
							v-if="imgStore.image"
							:image="imgStore.imageUrl"
							@scanComplete="updateBbox"
						/>
						<div class="mt-2">
							{{imgStore.imageText}}
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import TakePicture from '@/components/TakePicture.vue'
import Tesseract from '@/components/Tesseract.vue'
import WordOverlay from '@/components/WordOverlay.vue'
import {useImageStore} from '@/stores/image.js'
import {useWordStore} from '@/stores/words.js'
import {storeToRefs} from 'pinia'
import {onBeforeUnmount, onMounted, ref, useTemplateRef, watch} from 'vue'

const imgStore = useImageStore()
const wordStore = useWordStore()

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
				for (const ingredient of wordStore.words) {
					const regexp = new RegExp(ingredient, 'i')
					if (line.text.match(regexp)) {
						for (const word of line.words) {
							if (word.text.match(regexp)) {
								bboxs.value.push(word.bbox)
							}
						}
					}
				}
			}
		}
	}
}
</script>
