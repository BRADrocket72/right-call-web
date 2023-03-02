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
                console.log(error);
            }
        },
        async fetchVideoClipById(videoId) {
            try {
                const data = await axios.get('http://localhost:3000/api/videoclip/getOne/' + videoId)
                this.videoClip = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async postVideo(videoFile,videoName) {
            try {
                const config = {
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                var bodyFormData = new FormData();
                bodyFormData.append("file", videoFile)
                bodyFormData.append("name",videoName)
                const data = await axios({ method: 'post', url: 'http://localhost:3000/api/videoclip/post', data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }, config: config })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async postInstructorsCustomizedVideo(videoName, videoUrl, timeStamps) {
            try {
                const data = await axios.post('http://localhost:3000/api/videoClip/postInstructorVideo', 
                { 
                    videoName: videoName,
                    videoUrl: videoUrl,
                    timeStamps: timeStamps
                })
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async updateTimestamps(id, timestamps) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/videoclip/update/${id}`, { timeStamps: timestamps })
                return data.data
            } catch (error) {
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