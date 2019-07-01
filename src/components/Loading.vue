<template>
  <div>
    <div class="spinnerLoading" style="display: none">
      <div class="spinner-containerLoading container1Loading">
        <div class="circle1Loading"></div>
        <div class="circle2Loading"></div>
        <div class="circle3Loading"></div>
        <div class="circle4Loading"></div>
      </div>
      <div class="spinner-containerLoading container2Loading">
        <div class="circle1Loading"></div>
        <div class="circle2Loading"></div>
        <div class="circle3Loading"></div>
        <div class="circle4Loading"></div>
      </div>
      <div class="spinner-containerLoading container3Loading">
        <div class="circle1Loading"></div>
        <div class="circle2Loading"></div>
        <div class="circle3Loading"></div>
        <div class="circle4Loading"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .spinnerLoading {
    margin: 200px auto;
    width: 100px;
    height: 100px;
    position: relative;
  }

  .container1Loading > div, .container2Loading > div, .container3Loading > div {
    width: 30px;
    height: 30px;
    background-color: #f82a59;

    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelayLoading 1.2s infinite ease-in-out;
    animation: bouncedelayLoading 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .spinnerLoading .spinner-containerLoading {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .container2Loading {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  .container3Loading {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  .circle1Loading { top: 0; left: 0; }
  .circle2Loading { top: 0; right: 0; }
  .circle3Loading { right: 0; bottom: 0; }
  .circle4Loading { left: 0; bottom: 0; }

  .container2Loading .circle1Loading {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .container3Loading .circle1Loading {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .container1Loading .circle2Loading {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .container2Loading .circle2Loading {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .container3Loading .circle2Loading {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .container1Loading .circle3Loading {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .container2Loading .circle3Loading {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .container3Loading .circle3Loading {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .container1Loading .circle4Loading {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .container2Loading .circle4Loading {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .container3Loading .circle4Loading {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes bouncedelayLoading {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelayLoading {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
</style>
