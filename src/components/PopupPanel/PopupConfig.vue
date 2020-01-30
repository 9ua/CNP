<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup config">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_close" @click="hide"></div>
      <div class="popup_container">
        <div class="block">
          <div class="row">
            <p class="config_label music">音樂</p>
          </div>
          <div class="row">
            <div class="config_switch" :class="[bgm ? 'turn_on' : 'turn_off']" @click="bgmSwitch"></div>
          </div>
        </div>
        <div class="block">
          <div class="row">
            <p class="config_label sound">音效</p>
          </div>
          <div class="row">
            <div
              class="config_switch"
              :class="[effect ? 'turn_on' : 'turn_off']"
              @click="effectSwitch"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("music", ["bgm", "effect"])
  },
  methods: {
    ...mapActions("popup", ["close"]),
    ...mapActions("music", ["playSound"]),
    bgmSwitch() {
      this.$store.commit("music/bgmSwitch", {});
    },
    effectSwitch() {
      this.$store.commit("music/effectSwitch", {});
    },
    hide() {
      this.playSound("ack");
      this.close();
    }
  }
};
</script>