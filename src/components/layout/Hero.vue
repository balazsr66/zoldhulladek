<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Play, X } from "lucide-vue-next"

const features = [
  "Akár 60°-os lejtőn is",
  "Napi 3-5000 m² teljesítmény",
  "Biztonságos távvezérlés",
  "Teljes zöldhulladék zúzás",
]

const videos = [
  {
    desktopSrc: "/videos/mdb_bozotirtas_video.mp4",
    mobileSrc: "/videos/mobile/mdb_bozotirtas_video.mp4",
    title: "Bozótirtás",
  },
  {
    desktopSrc: "/videos/mdb_telektisztitas_video.mp4",
    mobileSrc: "/videos/mobile/mdb_telektisztitas_video.mp4",
    title: "Telektisztítás",
  },
  {
    desktopSrc: "/videos/mdb_terulettisztitas_video.mp4",
    mobileSrc: "/videos/mobile/mdb_terulettisztitas_video.mp4",
    title: "Területtisztítás",
  },
  {
    desktopSrc: "/videos/mdb_tisztitas_video.mp4",
    mobileSrc: "/videos/mobile/mdb_tisztitas_video.mp4",
    title: "Tisztítás",
  },
]

const isVideoModalOpen = ref(false)
const activeVideoIndex = ref(0)
const activeVideoRef = ref(null)
const videoLoadError = ref(false)
const isMobileViewport = ref(false)
const mobileViewportQuery = "(max-width: 767px)"
const DEFERRED_REVEAL_EVENT = "landing:reveal-deferred-sections"
let previousBodyOverflow = ""
let mobileViewportMediaQuery = null

const activeVideo = computed(() => videos[activeVideoIndex.value])
const activeVideoSrc = computed(() =>
  isMobileViewport.value ? activeVideo.value.mobileSrc : activeVideo.value.desktopSrc
)

const syncViewport = (eventOrQuery) => {
  isMobileViewport.value = eventOrQuery.matches
}

const openVideoModal = (startIndex = 0) => {
  activeVideoIndex.value = startIndex
  isVideoModalOpen.value = true
}

const closeVideoModal = () => {
  stopActiveVideo()
  isVideoModalOpen.value = false
}

const nextVideo = () => {
  activeVideoIndex.value = (activeVideoIndex.value + 1) % videos.length
}

const prevVideo = () => {
  activeVideoIndex.value = (activeVideoIndex.value - 1 + videos.length) % videos.length
}

const handleModalKeydown = (event) => {
  if (!isVideoModalOpen.value) return

  if (event.key === "Escape") {
    closeVideoModal()
    return
  }

  if (event.key === "ArrowRight") {
    nextVideo()
    return
  }

  if (event.key === "ArrowLeft") {
    prevVideo()
  }
}

const playActiveVideo = async () => {
  await nextTick()
  const videoEl = activeVideoRef.value
  if (!videoEl) return

  videoLoadError.value = false
  const playPromise = videoEl.play()
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {})
  }
}

const stopActiveVideo = () => {
  const videoEl = activeVideoRef.value
  if (!videoEl) return

  videoEl.pause()
  videoEl.currentTime = 0
}

const handleVideoError = () => {
  videoLoadError.value = true
}

const requestDeferredSectionsReveal = () => {
  window.dispatchEvent(new CustomEvent(DEFERRED_REVEAL_EVENT))
}

const scrollToContact = (attempt = 0) => {
  const el = document.getElementById("contact")
  if (!el) {
    if (attempt === 0) {
      requestDeferredSectionsReveal()
    }

    if (attempt >= 20) return

    window.setTimeout(() => {
      scrollToContact(attempt + 1)
    }, 50)
    return
  }

  const headerEl = document.querySelector('[data-site-header="true"]')
  const currentHeaderHeight = headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
  const isDesktop = window.matchMedia("(min-width: 768px)").matches

  // Desktopon a header scroll közben kisebbre vált,
  // ezért az induló (nagyobb) magasságból korrigálunk.
  const effectiveHeaderHeight =
    isDesktop && window.scrollY <= 50
      ? Math.max(currentHeaderHeight - 16, 0)
      : currentHeaderHeight

  const offset = el.getBoundingClientRect().top + window.pageYOffset - effectiveHeaderHeight

  window.scrollTo({ top: offset, behavior: "smooth" })
}

watch(isVideoModalOpen, (isOpen) => {
  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    playActiveVideo()
    window.addEventListener("keydown", handleModalKeydown)
    return
  }

  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener("keydown", handleModalKeydown)
})

watch(activeVideoSrc, () => {
  videoLoadError.value = false
  if (isVideoModalOpen.value) {
    playActiveVideo()
  }
})

onMounted(() => {
  mobileViewportMediaQuery = window.matchMedia(mobileViewportQuery)
  syncViewport(mobileViewportMediaQuery)

  if (typeof mobileViewportMediaQuery.addEventListener === "function") {
    mobileViewportMediaQuery.addEventListener("change", syncViewport)
    return
  }

  if (typeof mobileViewportMediaQuery.addListener === "function") {
    mobileViewportMediaQuery.addListener(syncViewport)
  }
})

onBeforeUnmount(() => {
  stopActiveVideo()
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener("keydown", handleModalKeydown)

  if (!mobileViewportMediaQuery) return

  if (typeof mobileViewportMediaQuery.removeEventListener === "function") {
    mobileViewportMediaQuery.removeEventListener("change", syncViewport)
    return
  }

  if (typeof mobileViewportMediaQuery.removeListener === "function") {
    mobileViewportMediaQuery.removeListener(syncViewport)
  }
})
</script>

<template>
  <section
    data-critical-hero="true"
    class="relative w-full overflow-hidden flex items-center justify-center min-h-screen min-h-[100svh] md:h-[100vh] md:min-h-[700px] pt-[calc(env(safe-area-inset-top)+4rem)] md:pt-0"
  >
    <!-- Background -->
    <div data-critical-hero-bg="true" class="absolute inset-0 z-0">
      <picture data-critical-hero-media="true" class="block w-full h-full">
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
          data-critical-hero-img="true"
          src="/images/hero-desktop-1280.webp"
          srcset="/images/hero-desktop-1024.webp 1024w, /images/hero-desktop-1280.webp 1280w, /images/hero-desktop-1600.webp 1600w"
          sizes="100vw"
          alt="MDB LV300 PRO bozótirtás meredek terepen"
          width="1600"
          height="1008"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          class="block w-full h-full object-cover object-[76%_35%] md:object-center scale-105"
        />
      </picture>
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:via-black/50 md:to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/80 to-transparent opacity-60 mix-blend-multiply" />
    </div>

    <!-- Content -->
    <div
      data-critical-hero-content="true"
      class="container relative z-10 mx-auto px-4 md:px-6 h-full min-h-[calc(100vh-env(safe-area-inset-top)-4rem)] min-h-[calc(100svh-env(safe-area-inset-top)-4rem)] md:min-h-0 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-12 pt-14 pb-8 md:pt-20 md:pb-0"
    >
      <!-- Left Column -->
      <div class="flex flex-col flex-1 w-full max-w-2xl h-full min-h-[420px] pt-4 text-center md:text-left md:h-auto md:min-h-0 md:pt-0">
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
        <div class="hero-reveal hero-reveal-3 mt-auto mb-14 pt-3 flex flex-col sm:flex-row items-center gap-6 md:gap-4 justify-center md:mt-0 md:mb-0 md:pt-0 md:justify-start">
          <button
            type="button"
            @click="scrollToContact"
            class="bg-[#3FA34D] hover:bg-[#348a40] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(63,163,77,0.4)] hover:shadow-[0_0_30px_rgba(63,163,77,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Kérjen ajánlatot!
            <ArrowRight :size="20" />
          </button>

          <button
            type="button"
            @click="openVideoModal(0)"
            class="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 bg-black/30 hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-3 group"
          >
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

  <Teleport to="body">
    <div v-if="isVideoModalOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        class="absolute inset-0 bg-black/85 backdrop-blur-sm"
        aria-label="Videó popup bezárása"
        @click="closeVideoModal"
      />

      <div
        class="relative z-10 w-full max-w-6xl rounded-2xl border border-white/15 bg-[#0F1113] p-3 md:p-4 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-video-gallery-title"
        aria-describedby="hero-video-gallery-desc"
      >
        <h2 id="hero-video-gallery-title" class="sr-only">Videó galéria</h2>
        <p id="hero-video-gallery-desc" class="sr-only">
          Használja a bal és jobb nyilakat a videók közötti váltáshoz.
        </p>

        <div class="mb-2 flex justify-end md:mb-0">
          <button
            type="button"
            class="z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/80 md:absolute md:right-2 md:top-2 md:h-auto md:w-auto md:p-2"
            aria-label="Bezárás"
            @click="closeVideoModal"
          >
            <X :size="20" />
          </button>
        </div>

        <button
          type="button"
          class="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/65 p-2 text-white hover:bg-black/80"
          aria-label="Előző videó"
          @click="prevVideo"
        >
          <ChevronLeft :size="24" />
        </button>

        <button
          type="button"
          class="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/65 p-2 text-white hover:bg-black/80"
          aria-label="Következő videó"
          @click="nextVideo"
        >
          <ChevronRight :size="24" />
        </button>

        <div class="overflow-hidden rounded-xl bg-black">
          <video
            ref="activeVideoRef"
            :key="activeVideoSrc"
            :src="activeVideoSrc"
            class="h-[42vh] w-full object-contain md:h-[72vh]"
            controls
            playsinline
            preload="metadata"
            autoplay
            muted
            @error="handleVideoError"
          >
            A böngészője nem támogatja a videó lejátszást.
          </video>
        </div>

        <p v-if="videoLoadError" class="mt-3 px-2 text-xs text-amber-300 md:text-sm">
          A videó nem tölthető be ebben a böngészőben.
        </p>

        <div class="mt-3 flex items-center justify-between px-2 text-xs text-gray-300 md:text-sm">
          <span>{{ activeVideo.title }}</span>
          <span>{{ activeVideoIndex + 1 }} / {{ videos.length }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.hero-reveal {
  opacity: 1;
  transform: none;
}
</style>
