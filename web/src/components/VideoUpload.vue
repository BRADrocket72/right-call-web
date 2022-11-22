<template>
    <div>
        <label><h4>Upload Video File:</h4></label>
        <input type="file" id="videoUpload" name="videoUpload" />
        <br/>
        <h1>Or</h1>
        <label><h4>Enter Video Url:</h4></label>
        <input type="text" id="videoUrlUpload" name="videoUrlUpload" />
        <br/>
        <br/>
        <button @click="uploadVideo">Upload Video</button>
    </div>
</template>

<script>
import { useVideoClipStore } from "@/stores/VideoClipStore";

export default {
    name: 'VideoUpload',
    setup() {
        var VideoClip = useVideoClipStore();
        return VideoClip;
    },
    methods: {
        async uploadVideo() {
            const videoURL = document.getElementById("videoUrlUpload").value
            await this.postVideo(videoURL)
        }
    }
}
</script>