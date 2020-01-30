<template>
  <div class="parent_table">
    <div class="duration_tabs">
      <div
        class="tabs_btn"
        v-for="(item, index) in durations"
        :key="index"
        :class="{pressed: item.key === duration}"
        @click="changeDuration(item.key)"
      >
        <p>{{ item.alias }}</p>
      </div>
    </div>
    <div class="records_table">
      <div class="thead">
        <div class="inner">
          <div class="th flex_2">局號</div>
          <div class="th flex_2">日期</div>
          <div class="th flex_1">桌號</div>
          <div class="th flex_1">注單</div>
          <div class="th flex_1">下注金額</div>
          <div class="th flex_1">輸贏金額</div>
          <div class="th flex_1">返還金</div>
          <div class="th flex_1">狀態</div>
          <div class="th flex_2">ID</div>
        </div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="(order, idnex) in orders" :key="idnex">
          <div class="td flex_2">
            <p>{{ order.game_round }}</p>
          </div>
          <div class="td flex_2">
            <p>{{ order.created_at | moment("YYYY-MM-DD HH:mm:ss") }}</p>
          </div>
          <div class="td flex_1">
            <p>{{ order.game_room }}</p>
          </div>
          <div class="td flex_1">
            <div class="game_order_btn" :class="{ disabled: order.status !==2 }" @click="getDetail(order)"></div>
          </div>
          <div class="td flex_1">
            <p>{{ order.amount | chipVal }}</p>
          </div>
          <div class="td flex_1">
            <p>{{ order.win | chipVal }}</p>
          </div>
          <div class="td flex_1">
            <p>{{ order.status === 1 ? 0 : order.win + order.amount | chipVal }}</p>
          </div>
          <div class="td flex_1">
            <p>{{ order.statusText }}</p>
          </div>
          <div class="td flex_2">
            <p>{{ order.uuid | truncate(8) }}</p>
          </div>
        </div>
      </div>
      <div class="table_pager" v-if="pageCount > 0">
        <div class="current_page">
          <p>第 {{ pageIndex }} 頁，共 {{ pageCount }} 頁</p>
        </div>
        <div class="pager_ui">
          <div class="pager_btn prev" v-if="prevEnable" @click="prev"></div>
          <div class="pager_btn next" v-if="nextEnable" @click="next"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("history", [
      "durations",
      "duration",
      "orders",
      "pageIndex",
      "pageCount"
    ]),
    ...mapGetters("history", ["prevEnable", "nextEnable"])
  },
  methods: {
    ...mapActions("history", ["next", "prev"]),
    ...mapActions("music", ["playSound"]),
    changeDuration(val) {
      this.playSound("ack");
      this.$store.dispatch("history/changeDuration", val);
    },
    getDetail(order) {
      if (order.status == 1) return;
      this.playSound("ack");
      this.$store.dispatch("history/showDetail", { order });
    }
  }
};
</script>