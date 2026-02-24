<script setup>
import { ref } from "vue"
import { AlertTriangle, TrendingDown, Clock, Shield } from "lucide-vue-next"

const problemImage =
  "https://images.unsplash.com/photo-1768915579657-2f7b72c8843c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyZ3Jvd24lMjBsYW5kJTIwYnJ1c2glMjBjbGVhcmluZyUyMGJlZm9yZSUyMGFmdGVyfGVufDF8fHx8MTc3MTc5OTkyM3ww&ixlib=rb-4.1.0&q=80&w=1080"

const problems = [
  {
    icon: AlertTriangle,
    title: "Tűzveszély",
    desc: "Száraz bozót és sűrű aljnövényzet kritikus tűzkockázatot jelent nyáron.",
  },
  {
    icon: TrendingDown,
    title: "Értékcsökkenés",
    desc: "A becserjésedett telek értéke akár 30–40%-kal is csökkenhet.",
  },
  {
    icon: Clock,
    title: "Késői beavatkozás",
    desc: "Hagyományos gépekkel meredek terepen heteket vesz igénybe a munka.",
  },
  {
    icon: Shield,
    title: "Munkavédelmi kockázat",
    desc: "Meredek lejtőkön a hagyományos gépkezelés komoly balesetveszéllyel jár.",
  },
]
</script>

<template>
<section id="problem" class="py-24 lg:py-32" style="background:#F5F5F5">
  <div class="max-w-[1200px] mx-auto px-6">

    <!-- Section header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 mb-4">
        <div class="h-px w-6" style="background:#3FA34D" />
        <span class="text-sm font-semibold tracking-widest uppercase" style="color:#3FA34D; font-family:'Inter',sans-serif">
          Ismeri ezt a problémát?
        </span>
        <div class="h-px w-6" style="background:#3FA34D" />
      </div>
      <h2 class="uppercase" style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(32px,4vw,52px);font-weight:800;color:#1A1A1A;line-height:1.1;">
        Mikor válik a telek <span style="color:#1F3D2B">problémává?</span>
      </h2>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <!-- Left: Problems -->
      <div class="flex flex-col gap-6">
        <div
          v-for="(item, i) in problems"
          :key="i"
          class="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg group"
          style="background:white;border:1px solid rgba(0,0,0,0.06);box-shadow:0 2px 12px rgba(0,0,0,0.06)"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style="background: rgba(31,61,43,0.08); border:1px solid rgba(31,61,43,0.12)"
          >
            <component :is="item.icon" size="22" stroke-width="1.5" style="color:#1F3D2B"/>
          </div>
          <div>
            <h3 class="mb-1" style="font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;color:#1A1A1A">
              {{ item.title }}
            </h3>
            <p style="font-family:'Inter',sans-serif;font-size:15px;color:#555;line-height:1.65">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="relative">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            :src="problemImage"
            alt="Becserjésedett meredek terep"
            class="w-full h-[480px] object-cover"
          />
          <!-- Overlay gradient -->
          <div
            class="absolute inset-0"
            style="background: linear-gradient(to top, rgba(31,61,43,0.7) 0%, transparent 50%)"
          />
          <!-- Bottom label -->
          <div class="absolute bottom-6 left-6 right-6">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
              style="background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2)"
            >
              <div class="w-2 h-2 rounded-full animate-pulse" style="background:#3FA34D"/>
              <span class="text-white text-sm font-medium" style="font-family:'Inter',sans-serif">
                Kezeletlen terület – komoly kockázat
              </span>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute -top-4 -right-4 w-24 h-24 rounded-2xl -z-10" style="background: rgba(63,163,77,0.12)" />
        <div class="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl -z-10" style="background: rgba(31,61,43,0.1)" />
      </div>
    </div>
  </div>
</section>
</template>