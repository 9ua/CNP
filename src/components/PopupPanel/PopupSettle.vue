<template>
  <div class="popup_wrapper">
    <div class="popup_mask"></div>
    <div class="popup settlement">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_container">
        <div class="coin_block" :class="`type_0` + info.type" v-for="info in walletInfo">
          <div class="coin_amount">{{ info.amount | currency("", 0) }}</div>
        </div>
      </div>
      <div class="popup_btn_wrapper">
        <div class="popup_btn check" @click="confirm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("platform", ["walletInfo"])
  },
  methods: {
    ...mapActions("platform", ["settleConfirm"]),
    ...mapActions("music", ["playSound"]),
    confirm() {
      this.playSound("ack");
      this.settleConfirm();
    }
  }
};
</script>