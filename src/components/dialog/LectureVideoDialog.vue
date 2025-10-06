<template>
  <el-dialog v-model="visibility" @closed="onDialogClosed">
    <template #header>
      <div>{{ props.title }}</div>
      <el-button @click="hide">X</el-button>
    </template>
    <div style="width: 100%; padding-top: 15px">
      <video
          ref="videoRef"
          class="video-js vjs-default-skin"
          style="width: 100%; height: auto;">
      </video>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, onBeforeUnmount, nextTick } from 'vue'
  import videojs from 'video.js'
  import type Player from 'video.js/dist/types/player'

  const videoRef = ref<HTMLVideoElement>();
  const player = ref<Player | null>(null);
  const visibility = ref<boolean>(false);

  const props = defineProps<{
    videoId: string,
    title: string
  }>();

  const initPlayer = async () => {
    await nextTick();

    if (videoRef.value && !player.value) {
      player.value = videojs(videoRef.value, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        sources: [{
          // URL tới master.m3u8 để stream HLS
          src: `http://localhost:8080/api/lecture/stream/${props.videoId}/master.m3u8`,
          type: 'application/x-mpegURL'  // HLS format
        }]
      });
    }
  };

  const show = () => {
    visibility.value = true;
    nextTick(() => {
      initPlayer();
    });
  }

  const hide = () => {
    visibility.value = false;
    if (player.value) {
      player.value.pause();
      player.value.currentTime(0);
    }
  }

  const onDialogClosed = () => {
    if (player.value) {
      player.value.dispose();
      player.value = null;
    }
  }

  onBeforeUnmount(() => {
    if (player.value) {
      player.value.dispose();
    }
  });

  defineExpose({ show, hide })
</script>