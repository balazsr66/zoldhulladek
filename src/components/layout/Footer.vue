<script setup>
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-vue-next"

const currentYear = new Date().getFullYear()
</script>
<template>
  <footer class="bg-[#1A1A1A] text-white pt-24 pb-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

        <!-- Logo & Info -->
        <div class="space-y-6">
          <a href="#" class="text-3xl font-bold tracking-tighter text-white block">
            ÖKO<span class="text-[#3FA34D]">RENDSZER</span>
          </a>

          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            Professzionális telektisztítás, bozótirtás és zöldhulladék kezelés.
            MDB LV300 PRO távirányításos munkagépünkkel a legmeredekebb terepen is biztonságosan dolgozunk.
          </p>

          <div class="flex gap-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
            >
              <a href="https://www.facebook.com/okorendszer" target="_blank"><Facebook :size="20" /></a>
            </a>

            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
            >
              <a href="https://www.instagram.com/okorendszerkft/" target="_blank">
                <Instagram :size="20" />
              </a>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">Szolgáltatások</h4>

          <ul class="space-y-4 text-gray-400 text-sm">
            <li class="hover:text-[#3FA34D] transition-colors">Bozótirtás</li>
            <li class="hover:text-[#3FA34D] transition-colors">Telektisztítás</li>
            <li class="hover:text-[#3FA34D] transition-colors">Zöldhulladék kezelés</li>
            <li class="hover:text-[#3FA34D] transition-colors">Tuskózás</li>
            <li class="hover:text-[#3FA34D] transition-colors">Gépi földmunka</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-bold mb-6">Kapcsolat</h4>

          <ul class="space-y-6 text-gray-400 text-sm">
            <li class="flex items-start gap-3">
              <MapPin class="text-[#3FA34D] shrink-0" :size="20" />
              <span>
                1164 Budapest, Cukornád utca 63. <br />
                Kiszállás országosan!
              </span>
            </li>

            <li class="flex items-center gap-3">
              <Phone class="text-[#3FA34D] shrink-0" :size="20" />
              <a
                href="tel:+36209731980"
                class="hover:text-white transition-colors"
              >
                +36 20 973 1980
              </a>
            </li>

            <li class="flex items-center gap-3">
              <Mail class="text-[#3FA34D] shrink-0" :size="20" />
              <a
                href="mailto:okorendszer@gmail.com"
                class="hover:text-white transition-colors"
              >
                okorendszer@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; {{ currentYear }} ÖkoRendszer. Minden jog fenntartva.</p>

        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">
            Adatvédelmi tájékoztató
          </a>
          <a href="#" class="hover:text-white transition-colors">
            ÁSZF
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>