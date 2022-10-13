<template>
    <div>
        <h1>{{msg}}</h1>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <video id="myVideoPlayer" src="../assets/prototype_withAudio.webm" controls />
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoEditor',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  video {
    width: 45%;
  }
  </style>


  