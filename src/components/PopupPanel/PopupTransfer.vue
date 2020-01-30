<template>
  <div class="popup_wrapper">
    <div class="popup_mask"></div>
    <div class="popup exchange">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_container">
        <div class="row">
          <div class="coin_block" v-for="coin in limitBy(walletInfo, 2, 0)" :class="coin.class">
            <div class="coin_amount">{{ coin.amount | currency("", 0) }}</div>
          </div>
        </div>
        <div class="row">
          <div class="coin_block" v-for="coin in limitBy(walletInfo, 2, 2)" :class="coin.class">
            <div class="coin_amount">{{ coin.amount | currency("", 0) }}</div>
          </div>
        </div>

        <div class="row">
          <div class="column">
            <div class="select_item">
              <img src="/images/common/popup_exchange_select_coin.png" alt>

              <div class="select_input" @click="open = !open">
                <p>{{ coin.name }}</p>
                <span class="balance_border"></span>
              </div>
              <div class="drop_row scale-down" v-show="open">
                <div class="drop_item" v-for="info in walletInfo" @click="changeCoin(info.type)">
                  <div class="coin_icon" :class="'type_0' + info.type"></div>
                  <p>{{ info.name }}</p>
                </div>
              </div>
              <span class="dropdown_icon" @click="open = !open"></span>
            </div>
            <div class="select_item">
              <img src="/images/common/popup_exchange_point.png" alt>

              <div class="select_input">
                <p>{{ amount | currency("", 0) }}</p>
                <span class="balance_border"></span>
              </div>
            </div>

            <div class="select_item">
              <img src="/images/common/popup_exchange_player_balance.png" alt>
              <div class="select_input balance">
                <p>{{ preBalance | currency("", 0) }}</p>
                <span class="balance_border"></span>
                <span class="balance_icon"></span>
              </div>
            </div>
          </div>
          <div class="refresh">
            <img src="/images/common/exchange_refresh.png" alt @click="refresh">
          </div>
        </div>
        <div class="popup_btn_wrapper">
          <div class="popup_btn back" @click="back"></div>
          <div class="popup_btn check" @click="transfer"></div>
        </div>
      </div>
      <div class="popup_container">
        <div class="keyboard">
          <div class="row">
            <div class="key_btn num_btn key_1" @click="append(1)"></div>
            <div class="key_btn num_btn key_2" @click="append(2)"></div>
            <div class="key_btn num_btn key_3" @click="append(3)"></div>
          </div>
          <div class="row">
            <div class="key_btn num_btn key_4" @click="append(4)"></div>
            <div class="key_btn num_btn key_5" @click="append(5)"></div>
            <div class="key_btn num_btn key_6" @click="append(6)"></div>
          </div>
          <div class="row">
            <div class="key_btn num_btn key_7" @click="append(7)"></div>
            <div class="key_btn num_btn key_8" @click="append(8)"></div>
            <div class="key_btn num_btn key_9" @click="append(9)"></div>
          </div>
          <div class="row">
            <div class="key_btn num_btn key_0" @click="append(0)"></div>
            <div class="key_btn back_btn" @click="backward"></div>
          </div>
          <div class="row">
            <div class="key_btn clear_btn" @click="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Coin } from "../../../libs";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      open: false,
      amount: 0,
      select: Coin.Gold
    };
  },
  computed: {
    ...mapGetters("platform", ["walletInfo"]),
    ...mapState("platform", ["transferLock"]),
    coin() {
      return this.walletInfo.find(item => item.type == this.select);
    },
    preBalance() {
      return Math.floor(this.coin.rate * this.amount);
    }
  },
  watch: {
    open(val) {
      this.playSound("ack");
    }
  },
  methods: {
    ...mapActions("platform", [
      "returnPlatform",
      "refreshWallet",
      "lockTransfer"
    ]),
    ...mapActions("game", ["C2S_WalletTransfer"]),
    ...mapActions("music", ["playSound"]),
    refresh() {
      this.playSound("ack");
      this.refreshWallet();
    },
    back() {
      this.playSound("ack");
      this.returnPlatform({});
    },
    changeCoin(type) {
      this.playSound("ack");
      this.select = type;
      this.open = false;
      if (this.coin.amount < this.amount) {
        this.amount = this.coin.amount;
      }
    },
    append(num) {
      this.playSound("ack");
      let s = this.amount.toString();
      s = s + num.toString();
      this.amount = parseInt(s, 10);
      if (this.amount > this.coin.amount) {
        this.amount = this.coin.amount;
      }
    },
    backward() {
      this.playSound("ack");
      let s = this.amount.toString();
      const len = s.length;
      if (len === 1) {
        this.amount = 0;
        return;
      }
      s = s.substr(0, len - 1);
      this.amount = parseInt(s, 10);
    },
    clear() {
      this.playSound("ack");
      this.amount = 0;
    },
    transfer() {
      if (this.transferLock) {
        return;
      }
      this.playSound("ack");
      if (this.amount > this.coin.amount) {
        return;
      }
      if ((this.amount * this.coin.rate) % 1 !== 0) {
        this.amount = this.preBalance / this.coin.rate;
      }
      if (this.amount === 0) {
        return;
      }
      this.lockTransfer();
      setTimeout(() => {
        this.C2S_WalletTransfer({
          coin_type: parseInt(this.select, 10),
          coin_amount: this.amount
        });
      }, 600);
    }
  }
};
</script>