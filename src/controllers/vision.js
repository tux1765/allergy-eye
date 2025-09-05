import axios from 'axios'

export default {
	getVision() {
		return axios.get('/api/vision')
	}
}