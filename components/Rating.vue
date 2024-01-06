<script setup lang="ts">
defineProps<{
  voteAverage: number;
}>();

const { formatVoteAverage, getVotePercentage } = useUtils();
</script>

<template>
  <div class="flex gap-x-1">
    <div class="relative flex">
      <div
        class="absolute top-0 left-0 overflow-hidden flex"
        :style="{ width: getVotePercentage(voteAverage) }"
      >
        <Icon
          v-for="i in 5"
          :key="i"
          class="text-amber min-w-[20px] min-h-[20px]"
          name="material-symbols:star"
        />
      </div>
      <Icon
        v-for="i in 5"
        :key="i"
        class="text-amber"
        name="material-symbols:star-outline"
        size="20"
      />
    </div>
    <span>{{ formatVoteAverage(voteAverage) }}</span>
  </div>
</template>
