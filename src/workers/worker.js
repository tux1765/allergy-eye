import {Jimp} from 'jimp'

onmessage = async (event) => {
	try {
		const newImage = await Jimp.read(event.data)
		newImage.greyscale()
		postMessage(await newImage.getBase64('image/png'))
	} catch (e) {
		console.error(e)
	}
}