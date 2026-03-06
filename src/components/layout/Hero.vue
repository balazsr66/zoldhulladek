<script setup>
import { ArrowRight, CheckCircle2, Play } from "lucide-vue-next"

const features = [
  "Akár 60°-os lejtőn is",
  "Napi 3-5000 m² teljesítmény",
  "Biztonságos távvezérlés",
  "Teljes zöldhulladék zúzás",
]

const scrollToContact = () => {
  const el = document.getElementById("contact")
  if (!el) return

  const headerEl = document.querySelector('[data-site-header="true"]')
  const currentHeaderHeight = headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
  const isDesktop = window.matchMedia("(min-width: 768px)").matches

  // Desktopon a header scroll közben kisebbre vált (md:py-6 -> md:py-4),
  // ezért az induló (nagyobb) magasságból korrigálunk.
  const effectiveHeaderHeight =
    isDesktop && window.scrollY <= 50
      ? Math.max(currentHeaderHeight - 16, 0)
      : currentHeaderHeight

  const offset = el.getBoundingClientRect().top + window.pageYOffset - effectiveHeaderHeight

  window.scrollTo({ top: offset, behavior: "smooth" })
}
</script>

<template>
  <section
    class="relative w-full overflow-hidden flex items-center justify-center min-h-[100svh] md:h-[100vh] md:min-h-[700px] pt-[calc(env(safe-area-inset-top)+4rem)] md:pt-0"
  >
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <picture class="block w-full h-full">
        <source
          media="(max-width: 767px)"
          srcset="/images/hero-mobile-540.webp 540w, /images/hero-mobile-828.webp 828w, /images/hero-mobile-960.webp 960w"
          sizes="100vw"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcset="/images/hero-desktop-1024.webp 1024w, /images/hero-desktop-1280.webp 1280w, /images/hero-desktop-1600.webp 1600w"
          sizes="100vw"
          type="image/webp"
        />
        <img
          src="/images/hero-desktop-1280.webp"
          srcset="/images/hero-desktop-1024.webp 1024w, /images/hero-desktop-1280.webp 1280w, /images/hero-desktop-1600.webp 1600w"
          sizes="100vw"
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
        <div class="hidden items-center gap-2 px-4 py-2 rounded-full bg-[#3FA34D]/20 border border-[#3FA34D]/30 backdrop-blur-sm mb-6">
          <span class="w-2 h-2 rounded-full bg-[#3FA34D] animate-pulse" />
          <span class="text-[#3FA34D] font-bold text-sm tracking-widest uppercase">
            MDB LV300 PRO Technology
          </span>
        </div>

        <!-- Headline -->
        <h1 class="hero-reveal hero-reveal-1 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5 md:mb-6 tracking-tight">
          EXTRÉM TEREP, <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3FA34D] to-[#86efac]">
            TÖKÉLETES EREDMÉNY
          </span>
        </h1>

        <!-- Description -->
        <p class="hero-reveal hero-reveal-2 text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
          Professzionális telektisztítás, bozótirtás és zöldhulladék kezelés távirányításos technológiával, meredek rézsűkön is.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-reveal hero-reveal-3 mt-auto mb-20 pt-3 flex flex-col sm:flex-row items-center gap-8 md:gap-4 justify-center md:mt-0 md:mb-0 md:pt-0 md:justify-start">
          <button
            type="button"
            @click="scrollToContact"
            class="bg-[#3FA34D] hover:bg-[#348a40] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(63,163,77,0.4)] hover:shadow-[0_0_30px_rgba(63,163,77,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Kérjen ajánlatot!
            <ArrowRight :size="20" />
          </button>

          <button class="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 bg-black/30 hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-3 group">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#3FA34D] transition-colors">
              <Play :size="14" fill="currentColor" class="ml-0.5" />
            </div>
            Videó megtekintése
          </button>
        </div>
      </div>

      <!-- Right Floating Card -->
      <div class="hidden w-[380px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative group hover:border-[#3FA34D]/50 transition-colors">
        <div class="absolute -top-6 -right-6 w-24 h-24 bg-[#3FA34D]/20 rounded-full blur-2xl group-hover:bg-[#3FA34D]/30 transition-all" />

        <p class="text-2xl font-bold text-white mb-2">Azonnali kapacitás</p>
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
    <div class="hero-reveal hero-reveal-4 absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
      <span class="text-white/50 text-xs uppercase tracking-widest">Görgessen lejjebb</span>
      <div class="w-0.5 h-12 bg-gradient-to-b from-[#3FA34D] to-transparent rounded-full" />
    </div>
  </section>
</template>

<style scoped>
.hero-reveal {
  opacity: 0;
  transform: translateY(26px);
  animation: hero-reveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-reveal-1 {
  animation-delay: 0.1s;
}

.hero-reveal-2 {
  animation-delay: 0.25s;
}

.hero-reveal-3 {
  animation-delay: 0.38s;
}

.hero-reveal-4 {
  animation-delay: 1s;
}

@keyframes hero-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
