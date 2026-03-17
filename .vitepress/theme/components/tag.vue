<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { page,frontmatter } = useData()

const date = computed(() => new Date(page.value.lastUpdated!))

</script>
<template>
    <span v-if="frontmatter.date" class="flex items-center">
        🔥&nbsp;记录于：
        <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" class="xicon-icon"><path
                d="M26 4h-4V2h-2v2h-8V2h-2v2H6c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 22H6V12h20v14zm0-16H6V6h4v2h2V6h8v2h2V6h4v4z"
                fill="currentColor"></path></svg> -->
        {{ frontmatter.date }}
    </span>
</template>
<style>
.xicon-icon {
    width: 18px;
    height: 18px;
    font-size: 18px;
    margin-right: 4px;
}
</style>
