<script setup lang="ts">
import tag from './tag.vue'
import DocFooter from './DocFooter.vue';
import Visitor from './Visitor.vue';
import HomeUnderline from './HomeUnderline.vue'
import { useData } from "vitepress";
import { usePageId } from '../composables'
import DefaultTheme from 'vitepress/theme';
import { nextTick, onMounted, provide, reactive } from 'vue';
import Giscus from '@giscus/vue'
import Typer from './Typer.vue';

const { Layout } = DefaultTheme
const { isDark, page, frontmatter,theme } = useData()
const pageId = usePageId()
const { comment } = theme.value

const hitokoto = reactive({
  text: '',
  href: ''
})
const getOne = () => {
  if (page.value.relativePath.indexOf('index') !== -1) {
    fetch('https://v1.hitokoto.cn').then(response => response.json()).then(data => {
      hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
      hitokoto.text = data.hitokoto
    }).catch(console.error)
  }
}

onMounted(() => {
  getOne()
})

</script>
<template>
  <Layout>
    <template #home-hero-info-after>
      <p class="tagline pt-4 text-xl">
        ✨ <Typer v-if="hitokoto.text" :text="hitokoto.text" :speed="60" />
      </p>
    </template>
    <template #home-hero-info-before>
      <HomeUnderline />
    </template>
    <template #home-hero-image>
      <div class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="rgb(255, 255, 255)"
          stroke="var(--vp-c-brand-1)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book"
          fill-opacity="0">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      </div>
    </template>
    <template #nav-bar-title-after>
      <Visitor />
    </template>
    <template #doc-before>
      <tag />
    </template>
    <template #doc-after>
      <DocFooter />
    </template>

    <template v-if="comment && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <Giscus
          id="comments"
          mapping="specific"
          :term="pageId"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          v-bind="{ ...comment }"
        />
      </div>
    </template>

  </Layout>
</template>

<style>
.prev-next.prev-next {
  border-top: none;
}

.doc-comments {
  margin-top: 24px;
  margin-bottom: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

/* 调整SVG容器大小 */
.svg-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.svg-container svg {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .svg-container svg {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .svg-container svg {
    width: 120px;
    height: 120px;
  }
}
</style>