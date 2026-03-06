<script setup>
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-vue-next"

const links = [
  { name: "TelektisztÃ­tÃ¡s", href: "#services" },
  { name: "BozÃ³tirtÃ¡s", href: "#services" },
  { name: "ZÃ¶ldhulladÃ©k kezelÃ©s", href: "#services" },
]

const scrollToSection = (href) => {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (!el) return

  const offset = el.getBoundingClientRect().top + window.pageYOffset - 70
  window.scrollTo({ top: offset, behavior: "smooth" })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#1A1A1A] text-white pt-24 pb-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <!-- Logo & Info -->
        <div class="space-y-6">
          <a href="#" @click.prevent="scrollToTop" class="text-3xl font-bold tracking-tighter text-white block">
            Ã–KO<span class="text-[#3FA34D]">RENDSZER</span>
          </a>

          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            ProfesszionÃ¡lis telektisztÃ­tÃ¡s, bozÃ³tirtÃ¡s Ã©s zÃ¶ldhulladÃ©k kezelÃ©s.
            MDB LV300 PRO tÃ¡virÃ¡nyÃ­tÃ¡sos munkagÃ©pÃ¼nkkel a legmeredekebb terepen is biztonsÃ¡gosan dolgozunk.
          </p>

          <div class="flex gap-4">
            <a
              href="https://www.facebook.com/okorendszer"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
              aria-label="Facebook oldal megnyitÃ¡sa"
            >
              <Facebook :size="20" aria-hidden="true" focusable="false" />
            </a>

            <a
              href="https://www.instagram.com/okorendszerkft/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
              aria-label="Instagram oldal megnyitÃ¡sa"
            >
              <Instagram :size="20" aria-hidden="true" focusable="false" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-6">SzolgÃ¡ltatÃ¡sok</h3>

          <ul class="space-y-4 text-gray-400 text-sm">
            <li v-for="link in links" :key="link.name" class="hover:text-[#3FA34D] transition-colors">
              <a href="#" @click.prevent="scrollToSection(link.href)">{{ link.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-bold mb-6">Kapcsolat</h3>

          <ul class="space-y-6 text-gray-400 text-sm">
            <li class="flex items-start gap-3">
              <MapPin class="text-[#3FA34D] shrink-0" :size="20" />
              <span>
                1164 Budapest, CukornÃ¡d utca 63. <br />
                KiszÃ¡llÃ¡s Budapesten Ã©s kÃ¶rnyÃ©kÃ©n!
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
        <p>&copy; {{ currentYear }} Ã–koRendszer. Minden jog fenntartva.</p>

        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">
            AdatvÃ©delmi tÃ¡jÃ©koztatÃ³
          </a>
          <a href="#" class="hover:text-white transition-colors">
            ÃSZF
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

