<script setup>
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-vue-next"

const links = [
  { name: "Telektisztítás", href: "#services" },
  { name: "Bozótirtás", href: "#services" },
  { name: "Zöldhulladék kezelés", href: "#services" },
]

const scrollToSection = (href) => {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (!el) return

  const headerEl = document.querySelector('[data-site-header="true"]')
  const headerHeight = headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
  const offset = el.getBoundingClientRect().top + window.pageYOffset - headerHeight
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
            ÖKO<span class="text-[#3FA34D]">RENDSZER</span>
          </a>

          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            Professzionális telektisztítás, bozótirtás és zöldhulladék kezelés.
            MDB LV300 PRO távirányításos munkagépünkkel a legmeredekebb terepen is biztonságosan dolgozunk.
          </p>

          <div class="flex gap-4">
            <a
              href="https://www.facebook.com/okorendszer"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
              aria-label="Facebook oldal megnyitása"
            >
              <Facebook :size="20" aria-hidden="true" focusable="false" />
            </a>

            <a
              href="https://www.instagram.com/okorendszerkft/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#3FA34D] transition-colors"
              aria-label="Instagram oldal megnyitása"
            >
              <Instagram :size="20" aria-hidden="true" focusable="false" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-6">Szolgáltatások</h3>

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
                1164 Budapest, Cukornád utca 63. <br />
                Kiszállás Budapesten és környékén!
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
