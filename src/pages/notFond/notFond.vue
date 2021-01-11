<template>
  <div class="Notfond-wrap">
    <div class="number">404</div>
    <div class="text"><span>没有找到该页面...</span><br>{{ timeText }}秒后自动回到{{ name }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeText: 5,
      name:''
    };
  },
  mounted() {
    this.time()
  },
  methods: {
    time() {
      let token = window.utils.storage.getter('headerToken')
      if(token){
        this.name='主页'}
        else {
        this.name='登录页面'
      }
      let that = this
      let time = 5
      let id = setInterval(function () {
        time--
        that.timeText = time
        if (time === 0) {
          if(token){
            that.$router.push({path: '/home/workbench'})
          }else {
            that.$router.push({path: '/'})
          }
          time = 3
          clearInterval(id)
        }
      }, 1000)

    }
  }
};
</script>
<style lang="scss" scoped>
.Notfond-wrap {
  height: 100vh;
  background: #fff;
  text-align: center;
  .number {
    position: relative;
    font: 900 30vmin 'Consolas';
    letter-spacing: 5vmin;
    text-shadow: 2px -1px 0 #000, 4px -2px 0 #0a0a0a, 6px -3px 0 #0f0f0f, 8px -4px 0 #141414, 10px -5px 0 #1a1a1a, 12px -6px 0 #1f1f1f, 14px -7px 0 #242424, 16px -8px 0 #292929;
  }

  .number::before {
    background-color: #673ab7;
    background-image: radial-gradient(closest-side at 50% 50%, #ffc107 100%, rgba(0, 0, 0, 0)), radial-gradient(closest-side at 50% 50%, #e91e63 100%, rgba(0, 0, 0, 0));
    background-repeat: repeat-x;
    background-size: 40vmin 40vmin;
    background-position: -100vmin 20vmin, 100vmin -25vmin;
    width: 100%;
    height: 100%;
    mix-blend-mode: screen;
    -webkit-animation: moving 10s linear infinite both;
    animation: moving 10s linear infinite both;
    display: block;
    position: absolute;
    content: "";
  }

  @-webkit-keyframes moving {
    to {
      background-position: 100vmin 20vmin, -100vmin -25vmin;
    }
  }
  @keyframes moving {
    to {
      background-position: 100vmin 20vmin, -100vmin -25vmin;
    }
  }

  .text {
    font: 400 5vmin "Courgette";
  }

  .text span {
    font-size: 10vmin;
  }
}
</style>

