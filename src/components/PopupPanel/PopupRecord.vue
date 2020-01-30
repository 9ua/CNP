<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup records">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_close" @click="hide"></div>
      <div class="popup_container">
        <order-table v-if="isOrder"></order-table>
        <detail-table v-if="isDetail"></detail-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OrderTable from "./PopupRecord/OrderTable";
import DetailTable from "./PopupRecord/DetailTable";

export default {
  computed: {
    ...mapGetters("history", ["isDetail", "isOrder"])
  },
  methods: {
    ...mapActions("popup", ["close"]),
    ...mapActions("music", ["playSound"]),
    hide() {
      this.playSound("ack");
      this.close();
    }
  },
  components: {
    OrderTable,
    DetailTable
  }
};
</script>