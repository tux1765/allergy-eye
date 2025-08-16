import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useImageStore = defineStore('image', () => {
	const image = ref(null)
	const imageHeight = ref(null)
	const imageWidth = ref(null)
	const imageText = ref(null)

	const imageUrl = computed(() => {
		if (image.value) {
			return URL.createObjectURL(image.value)
		}
		return null
	})

	const imageDimensions = computed(() => {
		return {height: imageHeight.value, width: imageWidth.value}
	})

	const assignImage = ({newImage}) => {
		image.value = newImage

		const img = new Image()
		img.onload = () => {
			imageHeight.value = img.height
			imageWidth.value = img.width
		}
		img.src = imageUrl.value
	}

	return {image, imageUrl, imageDimensions, imageHeight, imageWidth, imageText, assignImage}
})
