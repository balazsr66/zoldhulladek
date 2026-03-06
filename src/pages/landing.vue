<script setup>
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import Header from '@components/layout/Header.vue'
import Hero from '@/components/layout/Hero.vue'
import ProblemBlock from '@/components/layout/ProblemBlock.vue'

const Services = defineAsyncComponent(() => import('@/components/layout/Services.vue'))
const Mdb = defineAsyncComponent(() => import('@/components/layout/Mdb.vue'))
const BeforeAfter = defineAsyncComponent(() => import('@/components/layout/BeforeAfter.vue'))
const Process = defineAsyncComponent(() => import('@/components/layout/Process.vue'))
const CTA = defineAsyncComponent(() => import('@/components/layout/CTA.vue'))
const Faq = defineAsyncComponent(() => import('@/components/layout/Faq.vue'))
const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'))

const showDeferredSections = ref(false)
const loadTriggerRef = ref(null)

let observer = null
let idleCallbackId = null
let fallbackTimeoutId = null

const revealDeferredSections = () => {
  if (showDeferredSections.value) return
  showDeferredSections.value = true

  if (observer) {
    observer.disconnect()
    observer = null
  }

  if (idleCallbackId !== null && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(idleCallbackId)
    idleCallbackId = null
  }

  if (fallbackTimeoutId !== null) {
    window.clearTimeout(fallbackTimeoutId)
    fallbackTimeoutId = null
  }
}

onMounted(() => {
  if ("IntersectionObserver" in window && loadTriggerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealDeferredSections()
        }
      },
      { rootMargin: "700px 0px" }
    )
    observer.observe(loadTriggerRef.value)
  }

  if ("requestIdleCallback" in window) {
    idleCallbackId = window.requestIdleCallback(revealDeferredSections, { timeout: 1800 })
  } else {
    fallbackTimeoutId = window.setTimeout(revealDeferredSections, 900)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }

  if (idleCallbackId !== null && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(idleCallbackId)
    idleCallbackId = null
  }

  if (fallbackTimeoutId !== null) {
    window.clearTimeout(fallbackTimeoutId)
    fallbackTimeoutId = null
  }
})
</script>

<template>
  <Header />
  <Hero />
  <ProblemBlock />

  <div ref="loadTriggerRef" class="h-px w-full" aria-hidden="true"></div>

  <template v-if="showDeferredSections">
    <Services />
    <Mdb />
    <BeforeAfter />
    <Process />
    <CTA />
    <Faq />
    <Footer />
  </template>
</template>
