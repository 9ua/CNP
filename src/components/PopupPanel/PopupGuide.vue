<template>
  <div class="popup_wrapper">
    <div class="popup_mask" @click="hide"></div>
    <div class="popup help">
      <div class="popup_label">
        <span class="popup_header"></span>
      </div>
      <div class="popup_close" @click="hide"></div>
      <div class="popup_help_block">
        <div class="popup_container">
          <div class="help_page" :class="pageClass"></div>
        </div>
        <div class="help_pager">
          <div class="prev" @click="prev"></div>
          <div class="next" @click="next"></div>
          <p>{{ current + 1 }} / {{ len }} 頁</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      current: 0,
      pages: 10
    };
  },
  computed: {
    pageClass() {
      return `page_${this.current + 1}`;
    },
    len() {
      return this.pages;
    }
  },
  methods: {
    ...mapActions("music", ["playSound"]),
    next() {
      this.playSound("swift");
      this.current = (this.current + 1) % this.len;
    },
    prev() {
      this.playSound("swift");
      this.current = (this.current - 1 + this.len) % this.len;
    },
    ...mapActions("popup", ["close"]),
    hide() {
      this.playSound("ack");
      this.close();
    }
  }
};
</script>