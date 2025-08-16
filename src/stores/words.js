import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useWordStore = defineStore('words', () => {
	const words = ref([])

	const addWord = ({word}) => {
		words.value.push(word)
		saveWords()
	}

	const deleteWord = ({word}) => {
		words.value = words.value.filter(item => item !== word)
		localStorage.setItem('words', JSON.stringify(words.value))
	}

	const hydrateWords = () => {
		const localStorageWords = localStorage.getItem('words')
		if (localStorageWords) words.value = JSON.parse(localStorageWords)
	}

	const saveWords = () => {
		localStorage.setItem('words', JSON.stringify(words.value))
	}

	return {words, addWord, deleteWord, hydrateWords}
})