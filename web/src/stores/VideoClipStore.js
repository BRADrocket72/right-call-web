import { defineStore } from 'pinia'
import axios from 'axios'
import process from 'process'

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
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/videoclip/getall`)
                this.videoClips = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchVideoClipById(videoId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/videoclip/getOne/` + videoId)
                this.videoClip = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async postVideo(videoFile, videoName) {
            try {
                const config = {
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                var bodyFormData = new FormData();
                bodyFormData.append("file", videoFile)
                bodyFormData.append("name", videoName)
                const data = await axios({ method: 'post', url: `${process.env.VUE_APP_API_BASE_URL}/videoclip/post`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }, config: config })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async postInstructorsCustomizedVideo(videoName, videoUrl, timeStamps) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/videoClip/postInstructorVideo`,
                    {
                        videoName: videoName,
                        videoUrl: videoUrl,
                        timeStamps: timeStamps
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateTimestamps(id, timestamps) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/videoclip/update/${id}`, { timeStamps: timestamps })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteVideoClip(videoClipId) {
            try {
                const data = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/videoclip/delete/` + videoClipId)
                return data.data
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
    }
})