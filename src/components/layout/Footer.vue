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
            TEREP<span class="text-[#3FA34D]">MESTER</span>
          </a>

          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            Professzionális telektisztítás, bozótirtás és zöldhulladék kezelés.
            MDB LV600 PRO távirányításos munkagépünkkel a legmeredekebb terepen is biztonságosan dolgozunk.
          </p>

          <div class="flex gap-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
            >
              <Facebook :size="20" />
            </a>

            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
            >
              <Instagram :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">Szolgáltatások</h4>

          <ul class="space-y-4 text-gray-400 text-sm">
            <li><a href="#" class="hover:text-[#3FA34D] transition-colors">Bozótirtás</a></li>
            <li><a href="#" class="hover:text-[#3FA34D] transition-colors">Telektisztítás</a></li>
            <li><a href="#" class="hover:text-[#3FA34D] transition-colors">Zöldhulladék kezelés</a></li>
            <li><a href="#" class="hover:text-[#3FA34D] transition-colors">Tuskózás</a></li>
            <li><a href="#" class="hover:text-[#3FA34D] transition-colors">Gépi földmunka</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-bold mb-6">Kapcsolat</h4>

          <ul class="space-y-6 text-gray-400 text-sm">
            <li class="flex items-start gap-3">
              <MapPin class="text-[#3FA34D] shrink-0" :size="20" />
              <span>
                1000 Budapest, Minta utca 1. <br />
                Kiszállás országosan!
              </span>
            </li>

            <li class="flex items-center gap-3">
              <Phone class="text-[#3FA34D] shrink-0" :size="20" />
              <a
                href="tel:+36301234567"
                class="hover:text-white transition-colors"
              >
                +36 30 123 4567
              </a>
            </li>

            <li class="flex items-center gap-3">
              <Mail class="text-[#3FA34D] shrink-0" :size="20" />
              <a
                href="mailto:info@terepmester.hu"
                class="hover:text-white transition-colors"
              >
                info@terepmester.hu
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; {{ currentYear }} TerepMester. Minden jog fenntartva.</p>

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