import { defineStore } from 'pinia'
import axios from 'axios'

export const useVideoClipStore = defineStore("VideoClip", {
    state: () => ({
        clips: []
    }),
    getters: {
        getVideoClips(state) {
            return state.clips
        }
    },
    actions: {
        async fetchVideoClips() {
            try {
                const data = await axios.get('http://localhost:3000/api/videoclip/getall')
                this.videoClips = data.data
                return data.data
            } catch (error) {
                alert(error)
                console.log(error);
            }
        }
    },
})