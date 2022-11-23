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
        },
        async fetchVideoClipById(videoId) {
            try {
                const data = await axios.get('http://localhost:3000/api/videoclip/getOne/' + videoId)
                this.videoClip = data.data
                return data.data
            } catch (error) {
                alert(error)
                console.log(error);
            }
        },
        async postVideo(videoUrl) {
            try{
                const data = await axios.post('http://localhost:3000/api/videoclip/post', { videoURL: videoUrl})
                return data.data
            } catch(error) {
                alert(error)
                console.log(error)
            }
        },

        async updateTimestamps(id,timestamps) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/videoclip/update/${id}`, { timeStamps: timestamps})
                return data
            } catch(error) {
                alert(error)
                console.log(error)
            }
        }
    },
})