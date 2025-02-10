<template>
  <div class="assembly-header noSelect">
    <div class="header-box" v-show="isHeader">
        <div v-show="container === 1" class="logo">
          <span>{{ name }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "assembly-header",
  watch: {
    container() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
      });
    }
  },
  computed: {
    ...mapGetters([
      "isHeader",
      "container",
      "globalTheme",
      "isCollapse",
      "drawer",
      "name"
    ])
  },
  components: {

  },
  data() {
    return {
    
    };
  },
  mounted() {
   
  },
  methods: {
   
  }
};
</script>

<style lang="scss">
.assembly-header {
  .header-btn {
    position: absolute;
    bottom: -16px;
    left: 50%;
    z-index: 10;
    padding: 0 10px;
    border-radius: 0 0 10px 10px;
    border-top: none;
    width: 100%;
  }

  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height:60px;
    margin-left: 20px;
  }

  .logo {
    max-width: 248px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }

  .menu-item {
    display: inline-block;
    padding: 0 12px;
    height: 59px;
    line-height: 59px;

    i {
      font-size: 18px;
    }

    .el-badge__content {
      border: none;
    }
  }

  .my-dropdown {
    padding: 0;
  }
}
</style>