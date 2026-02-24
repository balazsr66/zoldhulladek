<script setup>
import { ArrowRight, Phone, Mail, MapPin } from "lucide-vue-next";

const contacts = [
  { icon: Phone, text: "+36 30 123 4567", href: "tel:+36301234567" },
  { icon: Mail, text: "info@greenmachpro.hu", href: "mailto:info@greenmachpro.hu" },
  { icon: MapPin, text: "Budapest és környéke, egész Magyarország", href: "#" },
];

const badges = ["Ingyenes felmérés", "24h visszahívás", "Átlátható ár"];

const handleFocus = (e) => {
  e.target.style.border = "1px solid rgba(63,163,77,0.5)";
};

const handleBlur = (e) => {
  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
};
</script>

<template>
  <section
    id="contact"
    class="py-24 lg:py-32 relative overflow-hidden"
    :style="{ background: '#0F1A12' }"
  >
    <!-- Background gradient -->
    <div
      class="absolute inset-0"
      :style="{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,61,43,0.5) 0%, transparent 70%)',
      }"
    />

    <!-- Decorative line -->
    <div
      class="absolute top-0 left-0 right-0 h-px"
      :style="{
        background:
          'linear-gradient(90deg, transparent, rgba(63,163,77,0.4), transparent)',
      }"
    />

    <div class="relative z-10 max-w-[1200px] mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- LEFT SIDE -->
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 mb-6">
            <div class="h-px w-6" :style="{ background: '#3FA34D' }" />
            <span
              class="text-sm font-semibold tracking-widest uppercase"
              :style="{ color: '#3FA34D', fontFamily: 'Inter, sans-serif' }"
            >
              Ajánlatkérés
            </span>
            <div class="h-px w-6" :style="{ background: '#3FA34D' }" />
          </div>

          <h2
            class="text-white uppercase mb-6"
            :style="{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.05,
            }"
          >
            Indítsuk el
            <span :style="{ color: '#3FA34D' }"> a munkát!</span>
          </h2>

          <p
            class="text-gray-300 mb-10 max-w-lg lg:mx-0 mx-auto"
            :style="{
              fontFamily: 'Inter, sans-serif',
              fontSize: '17px',
              lineHeight: 1.7,
            }"
          >
            Ingyenes helyszíni felmérés, kötelezettség nélküli ajánlat.
            24 órán belül visszahívjuk és egyeztetünk.
          </p>

          <!-- Contact items -->
          <div class="flex flex-col gap-4 mb-10">
            <a
              v-for="(item, i) in contacts"
              :key="i"
              :href="item.href"
              class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors lg:justify-start justify-center"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :style="{
                  background: 'rgba(63,163,77,0.12)',
                  border: '1px solid rgba(63,163,77,0.2)',
                }"
              >
                <component :is="item.icon" :size="18" :style="{ color: '#3FA34D' }" />
              </div>
              <span :style="{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }">
                {{ item.text }}
              </span>
            </a>
          </div>

          <!-- Trust badges -->
          <div class="flex flex-wrap gap-3 lg:justify-start justify-center">
            <span
              v-for="badge in badges"
              :key="badge"
              class="px-4 py-2 rounded-xl text-sm"
              :style="{
                background: 'rgba(63,163,77,0.1)',
                border: '1px solid rgba(63,163,77,0.25)',
                color: '#3FA34D',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }"
            >
              ✓ {{ badge }}
            </span>
          </div>
        </div>

        <!-- RIGHT SIDE FORM -->
        <div
          class="p-8 lg:p-10 rounded-2xl relative overflow-hidden"
          :style="{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(63,163,77,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }"
        >
          <div
            class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            :style="{ background: 'linear-gradient(90deg, #1F3D2B, #3FA34D)' }"
          />

          <h3
            class="text-white mb-6"
            :style="{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '28px',
              fontWeight: 700,
            }"
          >
            Ingyenes ajánlatkérés
          </h3>

          <form class="flex flex-col gap-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-400 text-sm mb-1.5">Neve *</label>
                <input
                  type="text"
                  placeholder="Kiss János"
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                  :style="{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }"
                  @focus="handleFocus"
                  @blur="handleBlur"
                />
              </div>

              <div>
                <label class="block text-gray-400 text-sm mb-1.5">Telefonszám *</label>
                <input
                  type="tel"
                  placeholder="+36 30 ..."
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                  :style="{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }"
                  @focus="handleFocus"
                  @blur="handleBlur"
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-400 text-sm mb-1.5">Email cím</label>
              <input
                type="email"
                placeholder="email@example.com"
                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                :style="{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }"
                @focus="handleFocus"
                @blur="handleBlur"
              />
            </div>

            <div>
              <label class="block text-gray-400 text-sm mb-1.5">
                Terület mérete (hektár)
              </label>
              <select
                class="w-full px-4 py-3 rounded-xl text-white text-sm outline-none cursor-pointer"
                :style="{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }"
              >
                <option value="" style="background:#1A1A1A">Válasszon...</option>
                <option value="0.5" style="background:#1A1A1A">0.5 ha alatt</option>
                <option value="1" style="background:#1A1A1A">0.5 – 1 ha</option>
                <option value="3" style="background:#1A1A1A">1 – 3 ha</option>
                <option value="5" style="background:#1A1A1A">3 – 5 ha</option>
                <option value="10" style="background:#1A1A1A">5+ ha</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-400 text-sm mb-1.5">Leírás</label>
              <textarea
                rows="4"
                placeholder="Terep típusa, növényzet, egyéb megjegyzés..."
                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none resize-none transition-all"
                :style="{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }"
                @focus="handleFocus"
                @blur="handleBlur"
              />
            </div>

            <button
              type="submit"
              class="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 mt-2"
              :style="{
                background: 'linear-gradient(135deg, #3FA34D, #2d8a3a)',
                fontSize: '17px',
                boxShadow: '0 8px 32px rgba(63,163,77,0.35)',
              }"
            >
              Ajánlatot kérek – Ingyen
              <ArrowRight :size="20" />
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>