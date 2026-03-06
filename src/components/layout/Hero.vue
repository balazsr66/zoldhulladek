<script setup>
import { ref, onMounted } from "vue"
import { useMotion } from "@vueuse/motion"
import { useElementVisibility } from "@vueuse/core"
import { ArrowRight, CheckCircle2, Play } from "lucide-vue-next"

// Apple-style easing
const appleEase = [0.16, 1, 0.3, 1]

// Refs
const sectionRef = ref(null)
const badgeRef = ref(null)
const headlineRef = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const cardRef = ref(null)
const scrollRef = ref(null)

// Features
const features = [
  "Akár 60°-os lejtőn is",
  "Napi 3-5000 m² teljesítmény",
  "Biztonságos távvezérlés",
  "Teljes zöldhulladék zúzás"
]

const scrollToContact = () => {
  const el = document.getElementById("contact")
  if (!el) return

  const headerEl = document.querySelector('[data-site-header="true"]')
  const headerHeight = headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
  const offset = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12

  window.scrollTo({ top: offset, behavior: "smooth" })
}

// Scroll-trigger animációs setup
onMounted(() => {
  const setupAnim = (elRef, opts) => {
    const isVisible = useElementVisibility(elRef, { threshold: 0.2 })
    useMotion(elRef, opts)
    isVisible.value && elRef.value && elRef.value.__motion?.enter()
  }

  setupAnim(badgeRef, { initial: { opacity: 0, y: 40 }, enter: { opacity: 1, y: 0, transition: { duration: 1, easing: appleEase } } })
  setupAnim(headlineRef, { initial: { opacity: 0, y: 50 }, enter: { opacity: 1, y: 0, transition: { duration: 1.1, delay: 0.15, easing: appleEase } } })
  setupAnim(descRef, { initial: { opacity: 0, y: 40 }, enter: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, easing: appleEase } } })
  setupAnim(ctaRef, { initial: { opacity: 0, y: 30 }, enter: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.45, easing: appleEase } } })
  setupAnim(cardRef, { initial: { opacity: 0, y: 50 }, enter: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, easing: appleEase } } })
  setupAnim(scrollRef, { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 1, delay: 1.5, easing: appleEase } } })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative w-full overflow-hidden flex items-center justify-center min-h-[100svh] md:h-[100vh] md:min-h-[700px] pt-[calc(env(safe-area-inset-top)+4rem)] md:pt-0"
  >

    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <picture class="block w-full h-full">
        <source media="(max-width: 767px)" srcset="/mdb_hero_mobile.webp" type="image/webp" />
        <img
          src="/bozótirtás.webp"
          alt="MDB LV300 PRO bozótirtás meredek terepen"
          width="1600"
          height="1008"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          class="w-full h-full object-cover object-[76%_35%] md:object-center scale-105"
        />
      </picture>
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:via-black/50 md:to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/80 to-transparent opacity-60 mix-blend-multiply" />
    </div>

    <!-- Content -->
    <div
      class="container relative z-10 mx-auto px-4 md:px-6 h-full min-h-[calc(100svh-env(safe-area-inset-top)-4rem)] md:min-h-0 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-12 pt-14 pb-8 md:pt-20 md:pb-0"
    >

      <!-- Left Column -->
      <div class="flex flex-col flex-1 w-full max-w-2xl h-full min-h-[420px] pt-6 text-center md:text-left md:h-auto md:min-h-0 md:pt-0">

        <!-- Badge -->
        <div ref="badgeRef" class="hidden items-center gap-2 px-4 py-2 rounded-full bg-[#3FA34D]/20 border border-[#3FA34D]/30 backdrop-blur-sm mb-6">
          <span class="w-2 h-2 rounded-full bg-[#3FA34D] animate-pulse" />
          <span class="text-[#3FA34D] font-bold text-sm tracking-widest uppercase">
            MDB LV300 PRO Technology
          </span>
        </div>

        <!-- Headline -->
        <h1 ref="headlineRef" class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5 md:mb-6 tracking-tight">
          EXTRÉM TEREP, <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3FA34D] to-[#86efac]">
            TÖKÉLETES EREDMÉNY
          </span>
        </h1>

        <!-- Description -->
        <p ref="descRef" class="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
          Professzionális telektisztítás, bozótirtás és zöldhulladék kezelés távirányításos technológiával, meredek rézsűkön is.
        </p>

        <!-- CTA Buttons -->
        <div class="mt-auto mb-20 pt-3 flex flex-col sm:flex-row items-center gap-8 md:gap-4 justify-center md:mt-0 md:mb-0 md:pt-0 md:justify-start">
          <button
            type="button"
            @click="scrollToContact"
            ref="ctaRef"
            class="bg-[#3FA34D] hover:bg-[#348a40] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(63,163,77,0.4)] hover:shadow-[0_0_30px_rgba(63,163,77,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Kérjen ajánlatot!
            <ArrowRight :size="20" />
          </button>

          <button class="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-3 group">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#3FA34D] transition-colors">
              <Play :size="14" fill="currentColor" class="ml-0.5" />
            </div>
            Videó megtekintése
          </button>
        </div>

      </div>

      <!-- Right Floating Card -->
      <div ref="cardRef" class="hidden w-[380px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative group hover:border-[#3FA34D]/50 transition-colors">
        <div class="absolute -top-6 -right-6 w-24 h-24 bg-[#3FA34D]/20 rounded-full blur-2xl group-hover:bg-[#3FA34D]/30 transition-all" />

        <h3 class="text-2xl font-bold text-white mb-2">Azonnali kapacitás</h3>
        <p class="text-gray-400 mb-6 text-sm">
          Ne várjon hónapokat. Professzionális gépparkunkkal akár 48 órán belül kezdünk.
        </p>

        <div class="space-y-4 mb-8">
          <div v-for="(item, i) in features" :key="i" class="flex items-center gap-3">
            <CheckCircle2 class="text-[#3FA34D]" :size="20" />
            <span class="text-gray-200 font-medium">{{ item }}</span>
          </div>
        </div>

        <button class="w-full py-4 rounded-xl bg-white text-[#1F3D2B] font-bold text-lg hover:bg-[#3FA34D] hover:text-white transition-all shadow-lg flex justify-between px-6 items-center group/btn">
          Hívjon most
          <ArrowRight :size="20" class="transform group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div class="mt-4 text-center">
          <span class="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            MDB LV300 PRO Powered
          </span>
        </div>
      </div>

    </div>

    <!-- Scroll Indicator -->
    <div ref="scrollRef" class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
      <span class="text-white/50 text-xs uppercase tracking-widest">Görgessen lejjebb</span>
      <div class="w-0.5 h-12 bg-gradient-to-b from-[#3FA34D] to-transparent rounded-full" />
    </div>

  </section>
</template>

