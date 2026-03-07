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
const DEFERRED_REVEAL_EVENT = "landing:reveal-deferred-sections"
const deferredSectionIds = new Set(["services", "machine", "work", "process", "contact", "faq"])

let observer = null

const revealDeferredSections = () => {
  if (showDeferredSections.value) return
  showDeferredSections.value = true

  if (observer) {
    observer.disconnect()
    observer = null
  }
}

const revealDeferredSectionsByEvent = () => {
  revealDeferredSections()
}

const revealDeferredSectionsForCurrentHash = () => {
  const hash = window.location.hash
  if (!hash) return

  const id = hash.slice(1)
  if (deferredSectionIds.has(id)) {
    revealDeferredSections()
  }
}

onMounted(() => {
  window.addEventListener(DEFERRED_REVEAL_EVENT, revealDeferredSectionsByEvent)
  window.addEventListener("hashchange", revealDeferredSectionsForCurrentHash)
  revealDeferredSectionsForCurrentHash()

  if ("IntersectionObserver" in window && loadTriggerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealDeferredSections()
        }
      },
      { rootMargin: "250px 0px" }
    )
    observer.observe(loadTriggerRef.value)
    return
  }

  // Fallback for very old browsers without IntersectionObserver support.
  revealDeferredSections()
})

onBeforeUnmount(() => {
  window.removeEventListener(DEFERRED_REVEAL_EVENT, revealDeferredSectionsByEvent)
  window.removeEventListener("hashchange", revealDeferredSectionsForCurrentHash)

  if (observer) {
    observer.disconnect()
    observer = null
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
