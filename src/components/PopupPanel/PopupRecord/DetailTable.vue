<template>
  <div class="child_table" v-if="order">
    <div class="bet_order_deatail">
      <div class="order_status">
        <div class="column custom">
          <div class="data_row label">
            <p>局號</p>
          </div>
          <div class="data_row flex_3">
            <p>{{ order.game_round }}</p>
          </div>
          <div class="data_row label">
            <p>桌號</p>
          </div>
          <div class="data_row">
            <p>{{ order.game_room }}</p>
          </div>
        </div>
        <div class="column custom">
          <div class="data_row label">
            <p>日期</p>
          </div>
          <div class="data_row flex_1">
            <p>{{ order.created_at | moment("YYYY-MM-DD HH:mm:ss") }}</p>
          </div>
        </div>
        <div class="column custom">
          <div class="data_row label">
            <p>ID</p>
          </div>
          <div class="data_row">
            <p>{{ order.uuid }}</p>
          </div>
        </div>
      </div>
      <div class="go_back" @click="setMode('order')">
        <div class="btn"></div>
      </div>
    </div>
    <div class="records_table">
      <div class="thead">
        <div class="inner">
          <div v-for="(field, index) in fieldDefined" :key="index" class="th flex_1">{{ field.text }}</div>
        </div>
      </div>
      <div class="tbody">
        <!-- banker -->
        <div class="tr" v-for="(item, index) in data" :key="index">
          <div class="td flex_1" v-for="(field, index) in fieldDefined" :key="index">
            <p v-if="field.key === 'name'">{{ field.handler(item) }}</p>
            <div v-if="field.key === 'poker'" class="result_img">
              <img v-for="cardName in field.handler(item).slice(0,2)" :src="field.imgSrcHandler(cardName)" :key="cardName">
            </div>
            <div v-if="field.key === 'poker'" class="result_img">
              <img v-for="cardName in field.handler(item).slice(2)" :src="field.imgSrcHandler(cardName)" :key="cardName">
            </div>
            <p v-if="field.key === 'cardType'">{{ field.handler(item, 0) }}</p>
            <p v-if="field.key === 'cardType'">{{ field.handler(item, 1) }}</p>
            <p v-if="field.key === 'betType'">{{ field.handler(item) }}</p>
            <p v-if="field.key === 'betAmount'">{{ field.handler(item) }}</p>
            <p v-if="field.key === 'result'">{{ field.handler(item, 0) }}</p>
            <p v-if="field.key === 'result'">{{ field.handler(item, 1) }}</p>
            <p v-if="field.key === 'odds'">{{ field.handler(item) }}</p>
            <p v-if="field.key === 'payout'">{{ field.handler(item) }}</p>
            <p v-if="field.key === 'returnChip'">{{ field.handler(item) }}</p>
            <p v-if="field.key === 'status'">{{ field.handler(item) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { PositionMap, CardsTypeZhMap } from "@/libs"

const gamePosition = ["banker", "right", "center", "left"];

export default {
  computed: {
    ...mapState("history", ["details", "order"]),
    fieldDefined() {
      return [
        {
          key: "name",
          handler: this.getName,
          text: "位置"
        },
        {
          key: "poker",
          handler: this.orderByCard,
          imgSrcHandler: this.imgSrc,
          text: "撲克牌"

        },
        {
          key: "cardType",
          handler: this.getCardType,
          text: "牌型"
        },
        {
          key: "betType",
          handler: this.getBetType,
          text: "下注標的"
        },
        {
          key: "betAmount",
          handler: this.getBetAmount,
          text: "下注金額"
        },
        {
          key: "result",
          handler: this.getGameResult,
          text: "結果"
        },
        {
          key: "odds",
          handler: this.getRate,
          text: "賠率"
        },
        {
          key: "payout",
          handler: this.getPayout,
          text: "輸贏金額"
        },
        {
          key: "returnChip",
          handler: this.getReturnChip,
          text: "返還金"
        },
        {
          key: "status",
          handler: this.getStatus,
          text: "狀態"
        },
      ]
    },
    bankerResult() {
      const condition = this.order && this.order.hasOwnProperty("summary")
      return condition ? [JSON.parse(this.order.summary)] : [];
    },
    rightResult() {
      const data = this.details.filter(item => item.position === gamePosition[1])
      return data ? data.sort((a, b) => a.status-b.status) : [];
    },
    centerResult() {
      const data = this.details.filter(item => item.position === gamePosition[2])
      return data ? data.sort((a, b) => a.status-b.status) : [];
    },
    leftResult() {
      const data = this.details.filter(item => item.position === gamePosition[3])
      return data ? data.sort((a, b) => a.status-b.status) : [];
    },
    data() {
      return [...this.bankerResult, ...this.rightResult, ...this.centerResult, ...this.leftResult];
    }
  },
  methods: {
    ...mapActions("music", ["playSound"]),
    setMode(mode) {
      this.playSound("ack");
      this.$store.commit("history/setMode", mode);
    },
    imgSrc(card) {
      return `/images/poker_card/records_thumb/1F0${card}.svg`;
    },
    isBetType(data) {
      return data.summary !== undefined && data.summary !== '底注'
    },
    cardName(key) {
      return CardsTypeZhMap[key]
    },
    orderByCard(data) {
      if(this.isBetType(data)) return [];
      const gameResult = this.getResult(data);
      const front = gameResult.option.front || [];
      const end = gameResult.option.end || [];
      const mergeArray = front.concat(end);
      return mergeArray.map((cardIndex, index) => {
        return gameResult.cards[cardIndex];
      }); 
    },
    getResult(data) {
      return data.position === gamePosition[0] ? data : JSON.parse(data.result);
    },
    getName(data) {
      const { position, status } = data;
      let result = "";
      if (status === -1 && status !== undefined) return result;
      switch(position) {
        case gamePosition[0]:
          result = "莊家"
          break
        case gamePosition[1]:
          result = "右閒家"
          break
        case gamePosition[2]:
          result = "中閒家"
          break
        case gamePosition[3]:
          result = "左閒家"
          break
      }
      return result;
    },
    getCardType(data, index) {
      if(this.isBetType(data)) return "";
      const gameResult = this.getResult(data);
      const result = this.cardName(gameResult.option.point[index]);
      if (result === "四支刀" && index === 1) return "";
      return result;
    },
    getBetType(data) {
      return data.summary;
    },
    getBetAmount(data) {
      return data.amount;
    },
    getGameResult(data, index) {
      const { position, play_code, result } = data;
      const bounsArray = ["805", "807"];
      if (position === gamePosition[0]) return
      if (this.isBetType(data)) {
        const isScattered = result === "-1";
        const bonusCardName = this.cardName(result);
        if (index == 0) {
          return bonusCardName ? bonusCardName : "無";
        }
        
      } else {
        if (index === 0) {
          if (data.win < 0) return "輸";
          if (data.win > 0) return "贏";
          if (data.win === 0) return "和";
        }
        if (index === 1) {
          try {
            const format = JSON.parse(result)
            const { type } = format;
            const showBonusCard = bounsArray.indexOf(String(type)) !== -1;
            return showBonusCard ? `(${this.cardName(type)})` : null
          } catch (e) {}
          return null
        }
      }
    },
    getRate(data) {
      const rate = data.rate
      return rate > 0 ? `1:${rate}` : gamePosition[0] === data.position ? "" : "-";
    },
    getPayout(data) {
      if (gamePosition[0] === data.position) return "";
      return data.win;
    },
    getReturnChip(data) {
      if (gamePosition[0] === data.position) return "";
      return data.amount + data.win;
    },
    getStatus(data) {
      if (gamePosition[0] === data.position) return "";
      return data.statusText;
    }
  }
};
</script>