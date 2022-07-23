<template>
  <q-layout view="lHr lpR fFf">
    <q-header elevated class="bg-indigo-1 text-grey-10">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="new-font text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon
            class="header-icon q-pa-md lt-md"
            name="fa-solid fa-kiwi-bird"
            size="sm"
            color="secondary"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="283"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="bg-secondary text-white leftBorder"
    >
      <q-icon
        class="q-pa-md"
        name="fa-solid fa-kiwi-bird"
        size="lg"
      />

      <q-list>
        <q-item to="/" clickable v-ripple exact class="new-font">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-house" />
          </q-item-section>

          <q-item-section class="nowrap text-h6 text-weight-bold"><span>&lt;&#8725;</span>Home<span>&gt;</span></q-item-section>
        </q-item>

        <q-item to="/about" clickable v-ripple exact class="new-font">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-circle-info" />
          </q-item-section>

          <q-item-section class="nowrap text-h6 text-weight-bold"
            ><span>&lt;&#8725;</span>About<span>&gt;</span></q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        placeholder="Search Twitter"
        rounded
        outlined
        dense
        class="q-ma-md new-font"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list padding separator class="new-font">
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey"
              >What's happening</q-item-label
            >
            <q-item-label class="text-weight-bold">Chainsaw Man Returns!</q-item-label>
            <q-item-label caption
              >The long awaited hit series returns Wednesday, July 13th, 2022.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>2 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey"
              >What's happening</q-item-label
            >
            <q-item-label class="text-weight-bold">Breaking News: Spice and Wolf is getting a new anime adaptation! </q-item-label>
            <q-item-label caption
              >The Spice and Wolf light novel series is getting a new anime. A key visual and a video ending with the animes announcement have been released.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>6 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey"
              >What's happening</q-item-label
            >
            <q-item-label class="text-weight-bold">Attention! Yukino > Yui</q-item-label>
            <q-item-label caption
              >It has been recently confirmed that Yukino Yukinoshita of Oregairu is peak.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>11 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
.new-font
  font-family: Consolas,monaco,monospace
.nowrap
  clear: both
  display: inline-block
  overflow: hidden
  white-space: nowrap
</style>
