<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup notice">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_close" @click="hide"></div>
      <div class="popup_container">
        <p class="popup_desc light">{{ message }}</p>
      </div>
      <div class="popup_btn_wrapper">
        <div class="popup_btn check" @click="hide"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("popup", ["message", "temp"])
  },
  methods: {
    ...mapActions("popup", ["close", "showTemp"]),
    ...mapActions("music", ["playSound", "stopSound"]),
    hide() {
      this.playSound("ack");
      this.close();
      this.showTemp();
    }
  }
};
</script>

<style>
</style>
