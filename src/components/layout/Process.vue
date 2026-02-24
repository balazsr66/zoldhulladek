<script setup>
import {
  Phone,
  MapPin,
  ClipboardList,
  Settings,
  CheckCircle,
} from "lucide-vue-next";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Kapcsolatfelvétel",
    desc: "Töltse ki az ajánlatkérő űrlapot vagy hívjon minket. 24 órán belül visszahívjuk.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Helyszíni felmérés",
    desc: "Szakértőink kiszállnak és ingyenesen felmérik a területet – kötelezettség nélkül.",
  },
  {
    icon: ClipboardList,
    number: "03",
    title: "Részletes ajánlat",
    desc: "Átlátható, tételes árajánlatot küldünk. Nincs rejtett költség.",
  },
  {
    icon: Settings,
    number: "04",
    title: "Munkavégzés",
    desc: "Az MDB LV600 PRO bevetésre kerül. Hatékony, gyors, biztonságos.",
  },
  {
    icon: CheckCircle,
    number: "05",
    title: "Átadás",
    desc: "A munkát személyesen adjuk át. Elégedettség esetén elszámolunk.",
  },
];
</script>

<template>
  <section
    id="process"
    class="py-24 lg:py-32"
    :style="{ background: '#1A1A1A' }"
  >
    <div class="max-w-[1200px] mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
          <div class="h-px w-6" :style="{ background: '#3FA34D' }" />
          <span
            class="text-sm font-semibold tracking-widest uppercase"
            :style="{ color: '#3FA34D', fontFamily: 'Inter, sans-serif' }"
          >
            Egyszerű folyamat
          </span>
          <div class="h-px w-6" :style="{ background: '#3FA34D' }" />
        </div>

        <h2
          class="text-white uppercase"
          :style="{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
          }"
        >
          Hogyan
          <span :style="{ color: '#3FA34D' }"> Dolgozunk?</span>
        </h2>
      </div>

      <!-- Desktop: Horizontal Stepper -->
      <div class="hidden lg:block relative">
        <!-- Connector line -->
        <div
          class="absolute top-10 left-0 right-0 h-px"
          :style="{
            background:
              'linear-gradient(90deg, transparent, rgba(63,163,77,0.4) 10%, rgba(63,163,77,0.4) 90%, transparent)',
            marginLeft: '8%',
            marginRight: '8%',
          }"
        />

        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="flex flex-col items-center text-center relative"
          >
            <!-- Step badge -->
            <div class="relative mb-6 z-10">
              <div
                class="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                :style="{
                  background: 'linear-gradient(135deg, #1F3D2B, #0d2016)',
                  border: '2px solid rgba(63,163,77,0.5)',
                  boxShadow: '0 0 20px rgba(63,163,77,0.2)',
                }"
              >
                <component
                  :is="step.icon"
                  :size="28"
                  :stroke-width="1.5"
                  :style="{ color: '#3FA34D' }"
                />
              </div>

              <!-- Number -->
              <div
                class="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                :style="{ background: '#3FA34D' }"
              >
                <span
                  class="text-white"
                  :style="{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                  }"
                >
                  {{ i + 1 }}
                </span>
              </div>
            </div>

            <h3
              class="text-white mb-2"
              :style="{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
              }"
            >
              {{ step.title }}
            </h3>

            <p
              class="text-gray-400"
              :style="{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                lineHeight: 1.6,
              }"
            >
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile: Vertical Timeline -->
      <div class="lg:hidden relative flex flex-col gap-0 pl-6">
        <!-- Vertical line -->
        <div
          class="absolute left-10 top-4 bottom-4 w-px"
          :style="{ background: 'rgba(63,163,77,0.3)' }"
        />

        <div
          v-for="(step, i) in steps"
          :key="i"
          class="flex gap-6 relative pb-10 last:pb-0"
        >
          <!-- Badge -->
          <div class="relative z-10 flex-shrink-0">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center"
              :style="{
                background: 'linear-gradient(135deg, #1F3D2B, #0d2016)',
                border: '2px solid rgba(63,163,77,0.5)',
              }"
            >
              <component
                :is="step.icon"
                :size="20"
                :stroke-width="1.5"
                :style="{ color: '#3FA34D' }"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="pt-2">
            <div
              class="text-xs font-bold mb-1"
              :style="{
                color: '#3FA34D',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.1em',
              }"
            >
              {{ step.number }}
            </div>

            <h3
              class="text-white mb-2"
              :style="{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '22px',
                fontWeight: 700,
              }"
            >
              {{ step.title }}
            </h3>

            <p
              class="text-gray-400"
              :style="{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                lineHeight: 1.6,
              }"
            >
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>