<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup route">
      <!-- <div class="popup_label">
        <span class="popup_header"></span>
      </div> -->
      <div class="popup_close" @click="hide"></div>
      <div class="route_title"></div>
      <road-map :room="room.result_history" :isRoute="true"></road-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import OrderTable from "./PopupRecord/OrderTable";
import DetailTable from "./PopupRecord/DetailTable";
import RoadMap from "@/components/Common/RoadMap";

export default {
  computed: {
    ...mapGetters("history", ["isDetail", "isOrder"]),
    ...mapGetters("lobby", ["getRoomInfo"]),
    ...mapState("game", ["tableId"]),
    room() {
      return this.getRoomInfo(this.tableId);
    },
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
    DetailTable,
    RoadMap
  }
};
</script>