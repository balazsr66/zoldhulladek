<script setup>
import { ref, onMounted } from "vue"
import { useMotion } from "@vueuse/motion"
import { useElementVisibility } from "@vueuse/core"
import { Scissors, Leaf, Trash2, Mountain } from "lucide-vue-next"

const services = [
  {
    icon: Mountain,
    title: "Telektisztítás",
    desc: "Meredek, nehezen megközelíthető területek gyors és hatékony megtisztítása géppel.",
    features: ["Akár 55°-os lejtő", "Bármilyen méret", "Gyökeres irtás is"],
  },
  {
    icon: Scissors,
    title: "Bozótirtás",
    desc: "Sűrű aljnövényzet, cserjék, nád és magas fű irtása professzionális aprítással.",
    features: ["Aprítás helyszínen", "Kíméletes eljárás", "Fa védelme is"],
  },
  {
    icon: Leaf,
    title: "Zöldhulladék kezelés",
    desc: "Az irtott anyag helyszíni aprítása, elszállítása vagy komposztálásra előkészítése.",
    features: ["Helyszíni aprítás", "Elszállítás", "Komposztálás"],
  },
  {
    icon: Trash2,
    title: "Karbantartás",
    desc: "Rendszeres területgondozás – hogy a tiszta telek tiszta is maradjon.",
    features: ["Havi / szezonális", "Szerződéses áron", "Rugalmas időpont"],
  },
]

const stats = [
  { value: "500+", label: "Elvégzett projekt" },
  { value: "55°", label: "Max. meredekség" },
  { value: "48h", label: "Visszahívás" },
  { value: "100%", label: "Elégedett ügyfél" },
]

const cardRefs = ref([])  // kártyák DOM elemei
const statRefs = ref([])  // stats DOM elemei

const appleEase = [0.16, 1, 0.3, 1]

onMounted(() => {
  // Service kártyák animáció
  cardRefs.value.forEach((card, i) => {
    const isVisible = useElementVisibility(card, { threshold: 0.2 })
    useMotion(card, {
      initial: { opacity: 0, y: 40 },
      enter: { 
        opacity: 1, y: 0, 
        transition: { duration: 0.8, delay: i*0.15, easing: appleEase }
      }
    })
    if (isVisible.value && card.__motion?.enter) card.__motion.enter()
  })

  // Bottom stats animáció
  statRefs.value.forEach((stat, i) => {
    const isVisible = useElementVisibility(stat, { threshold: 0.2 })
    useMotion(stat, {
      initial: { opacity: 0, y: 20 },
      enter: {
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i*0.1, easing: appleEase }
      }
    })
    if (isVisible.value && stat.__motion?.enter) stat.__motion.enter()
  })
})

const handleMouseEnter = (e) => {
  const el = e.currentTarget
  el.style.border = "1px solid rgba(63,163,77,0.5)"
  el.style.boxShadow = "0 10px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(63,163,77,0.2)"
  el.style.background = "rgba(31,61,43,0.2)"
}

const handleMouseLeave = (e) => {
  const el = e.currentTarget
  el.style.border = "1px solid rgba(255,255,255,0.08)"
  el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"
  el.style.background = "rgba(255,255,255,0.04)"
}
</script>

<template>
<section id="services" class="py-24 lg:py-32" style="background: #1A1A1A">
  <div class="max-w-[1200px] mx-auto px-6">

    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 mb-4">
        <div class="h-px w-6" style="background: #3FA34D"></div>
        <span class="text-sm font-semibold tracking-widest uppercase" style="color:#3FA34D; font-family: 'Inter', sans-serif">
          Amit kínálunk
        </span>
        <div class="h-px w-6" style="background: #3FA34D"></div>
      </div>
      <h2 class="text-white uppercase" style="font-family:'Barlow Condensed',sans-serif; font-size:clamp(32px,4vw,52px); font-weight:800;line-height:1.1;">
        Teljes körű <span style="color:#3FA34D">területkezelés</span>
      </h2>
    </div>

    <!-- Service Cards -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(service, i) in services"
        :key="i"
        :ref="(el) => (cardRefs[i] = el)"
        class="group relative p-7 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03]"
        style="background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); box-shadow:0 4px 20px rgba(0,0,0,0.15);"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div
          class="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
          style="background: rgba(63,163,77,0.12); border:1px solid rgba(63,163,77,0.2);"
        >
          <component :is="service.icon" :size="26" :stroke-width="1.5" style="color:#3FA34D"/>
        </div>
        <h3 class="text-white mb-3" style="font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:700;">
          {{ service.title }}
        </h3>
        <p class="text-gray-400 mb-6" style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.65;">
          {{ service.desc }}
        </p>
        <ul class="flex flex-col gap-2">
          <li v-for="(f, fi) in service.features" :key="fi" class="flex items-center gap-2 text-sm" style="font-family:'Inter',sans-serif;">
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #3FA34D;"></div>
            <span class="text-gray-300">{{ f }}</span>
          </li>
        </ul>
        <div class="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style="background: linear-gradient(90deg, transparent, #3FA34D, transparent)">
        </div>
      </div>
    </div>

    <!-- Bottom Stats -->
    <div class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, i) in stats" :key="i" :ref="(el) => (statRefs[i] = el)" class="text-center py-6 px-4 rounded-2xl" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);">
        <div class="mb-1" style="font-family:'Barlow Condensed',sans-serif; font-size:42px; font-weight:800; color:#3FA34D; line-height:1;">
          {{ stat.value }}
        </div>
        <div class="text-gray-400" style="font-family:'Inter',sans-serif;font-size:14px;">
          {{ stat.label }}
        </div>
      </div>
    </div>

  </div>
</section>
</template>
