<template>
  <button :class="['btnUi', props.className]"
          :disabled="props.disabled"
          :style="props.disabled ? {'opacity':0.6,'cursor':'not-allowed'} : {}"
          @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script setup lang="ts">

  const props = defineProps<{
      className : string,
      disabled : boolean
  }>();

  const emit = defineEmits(['click']);

</script>

<style lang="scss" scoped>
.btnUi{
  line-height: 1;
  padding: 10px 15px;
  outline: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &--add {
    background-color: #F48C06;
    color: #000;
    text-decoration: none;
  }

  &--delete {
    background-color: #F56C6C;
    color: #000;
    text-decoration: none;
  }
}
</style>