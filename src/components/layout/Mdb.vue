<script setup>
import { ref } from "vue";
import { Zap, Gauge, ShieldCheck, Wifi, ArrowRight } from "lucide-vue-next";

// Image és adatok
const machineImage = "https://images.unsplash.com/photo-1675726061078-01a91334f26f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMG1hY2hpbmVyeSUyMHRlcnJhaW4lMjB2ZWdldGF0aW9uJTIwY3V0dGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE3OTk5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { icon: Gauge, value: "55°", label: "Max. lejtési szög" },
  { icon: Zap, value: "600 cm", label: "Munkaszélesség" },
  { icon: ShieldCheck, value: "RC", label: "Távirányítás" },
  { icon: Wifi, value: "150m", label: "Irányítási hatótáv" },
];

const specs = [
  ["Motor", "Kubota diesel, 24 LE"],
  ["Súly", "630 kg"],
  ["Vágószerv", "Nyeles / aprítós fej"],
  ["Hajtás", "Kettős hidrosztatikus"],
  ["Kezelés", "Távirányítás – RC"],
  ["Kezelő szükséges", "Nem kell a gép mellé"],
];
</script>

<template>
  <section id="machine" class="py-24 lg:py-32 relative overflow-hidden" :style="{ background: '#0F1A12' }">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5"
      :style="{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(63,163,77,0.3) 80px, rgba(63,163,77,0.3) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(63,163,77,0.3) 80px, rgba(63,163,77,0.3) 81px)' }"
    />
    <!-- Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      :style="{ background: 'radial-gradient(circle, rgba(63,163,77,0.08) 0%, transparent 70%)' }"
    />

    <div class="relative z-10 max-w-[1200px] mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
          <div class="h-px w-6" :style="{ background: '#3FA34D' }"></div>
          <span class="text-sm font-semibold tracking-widest uppercase" :style="{ color: '#3FA34D', fontFamily: 'Inter, sans-serif' }">A technológia</span>
          <div class="h-px w-6" :style="{ background: '#3FA34D' }"></div>
        </div>
        <h2 class="text-white uppercase mb-4" :style="{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1 }">
          MDB LV600 PRO – <span :style="{ color: '#3FA34D' }">Ipari Erő</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.7 }">
          A világ egyik legkorszerűbb távirányítású terepkezelő gépe. Ott dolgozik, ahol embernek nem szabad.
        </p>
      </div>

      <!-- Main layout -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Machine image with floating badges -->
        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden" :style="{ boxShadow: '0 0 60px rgba(63,163,77,0.15), 0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(63,163,77,0.2)' }">
            <img :src="machineImage" alt="MDB LV600 PRO professzionális terepkezelő gép" class="w-full h-[420px] lg:h-[500px] object-cover" />
            <div class="absolute inset-0" :style="{ background: 'linear-gradient(to top, rgba(15,26,18,0.6) 0%, transparent 60%)' }"></div>

            <!-- Machine badge -->
            <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div class="flex items-center gap-3 px-4 py-3 rounded-xl" :style="{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(63,163,77,0.3)' }">
                <div class="w-2 h-2 rounded-full animate-pulse" :style="{ background: '#3FA34D' }"></div>
                <span class="text-white text-sm font-semibold" :style="{ fontFamily: 'Inter, sans-serif' }">MDB LV600 PRO</span>
                <span class="text-gray-400 text-xs" :style="{ fontFamily: 'Inter, sans-serif' }">Éles bevetésen</span>
              </div>
            </div>
          </div>

          <!-- Floating stat badges -->
          <div v-for="(stat, i) in stats" :key="i" class="absolute hidden lg:flex"
            :class="[
              i === 0 ? '-top-4 -right-4' : '',
              i === 1 ? 'top-1/3 -right-6' : '',
              i === 2 ? '-bottom-4 -right-4' : '',
              i === 3 ? 'top-1/3 -left-6' : ''
            ]"
          >
            <div class="flex items-center gap-2 px-4 py-3 rounded-xl" :style="{ background: 'rgba(15,26,18,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(63,163,77,0.35)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="{ background: 'rgba(63,163,77,0.15)' }">
                <component :is="stat.icon" size="16" :style="{ color: '#3FA34D' }"/>
              </div>
              <div>
                <div class="text-white font-bold" :style="{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '20px', lineHeight: 1 }">{{ stat.value }}</div>
                <div class="text-gray-400" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Specs -->
        <div>
          <h3 class="text-white mb-8" :style="{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '32px', fontWeight: 700 }">Technikai adatok</h3>

          <!-- Spec table -->
          <div class="flex flex-col gap-3 mb-8">
            <div v-for="([label, value], i) in specs" :key="i" class="flex items-center justify-between py-3 px-4 rounded-xl"
              :style="{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }">
              <span class="text-gray-400" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }">{{ label }}</span>
              <span class="text-white font-medium" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }">{{ value }}</span>
            </div>
          </div>

          <!-- Mobile stats -->
          <div class="grid grid-cols-2 gap-3 mb-8 lg:hidden">
            <div v-for="(stat, i) in stats" :key="i" class="flex items-center gap-3 p-4 rounded-xl" :style="{ background: 'rgba(63,163,77,0.08)', border: '1px solid rgba(63,163,77,0.2)' }">
              <component :is="stat.icon" size="18" :style="{ color: '#3FA34D' }"/>
              <div>
                <div class="text-white font-bold" :style="{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '20px', lineHeight: 1 }">{{ stat.value }}</div>
                <div class="text-gray-400" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Highlights -->
          <div class="flex flex-col gap-3 mb-8">
            <div v-for="(point, i) in [
              'Kezelő nem kell a gép mellé – maximális biztonság',
              'Gumilánc – nem károsítja a terepet',
              'Hidraulikus karos vágószerv – precíz munka'
            ]" :key="i" class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" :style="{ background: 'rgba(63,163,77,0.15)' }">
                <div class="w-2 h-2 rounded-full" :style="{ background: '#3FA34D' }"></div>
              </div>
              <span class="text-gray-300" :style="{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.5 }">{{ point }}</span>
            </div>
          </div>

          <a href="#contact" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105"
            :style="{ background: 'linear-gradient(135deg, #3FA34D, #2d8a3a)', fontFamily: 'Inter, sans-serif', fontSize: '16px', boxShadow: '0 8px 32px rgba(63,163,77,0.3)' }">
            Foglaljon gépbemutatót
            <ArrowRight size="18"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>