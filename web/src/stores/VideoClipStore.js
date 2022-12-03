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
        async postVideo(videoFile) {
            try {
                var bodyFormData = new FormData();
                bodyFormData.append("file", videoFile)
                const data = await axios({ method: 'post', url: 'http://localhost:3000/api/videoclip/post', data: bodyFormData, headers: { "Content-Type": "multipart/form-data" } })
                return data.data
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async updateTimestamps(id, timestamps) {
            try {
                await axios.patch(`http://localhost:3000/api/videoclip/update/${id}`, { timeStamps: timestamps })
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteVideoClip(videoClipId) {
            try {
                const data = await axios.delete('http://localhost:3000/api/videoclip/delete/' + videoClipId)
                return data.data
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
    }
})