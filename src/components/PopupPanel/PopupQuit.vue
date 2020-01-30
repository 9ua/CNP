<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup notice">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_close" @click="hide"></div>
      <div class="popup_container">
        <p class="popup_desc light">您確定要離開遊戲?</p>
      </div>
      <div class="popup_btn_wrapper">
        <div class="popup_btn back" @click="hide"></div>
        <div class="popup_btn check" @click="quit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("platform", ["doQuit"]),
    ...mapActions("music", ["playSound"]),
    ...mapActions("popup", ["close"]),
    quit() {
      this.playSound("ack");
      this.doQuit();
    },
    hide() {
      this.playSound("ack");
      this.close();
    }
  }
};
</script>