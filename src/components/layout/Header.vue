<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { Menu, Phone } from "lucide-vue-next"

import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "reka-ui"

import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from "reka-ui"

const isScrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { name: "Szolgáltatások", href: "#services" },
  { name: "Technológia", href: "#machine" },
  { name: "Referenciák", href: "#work" },
  { name: "Folyamat", href: "#process" },
  { name: "GYIK", href: "#faq" },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (href) => {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (!el) return

  const headerEl = document.querySelector('[data-site-header="true"]')
  const headerHeight = headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
  const offset = el.getBoundingClientRect().top + window.pageYOffset - headerHeight

  window.scrollTo({ top: offset, behavior: "smooth" })
  mobileOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  mobileOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <nav
    data-site-header="true"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-[#1A1A1A]/95 backdrop-blur-md py-0 md:py-4 shadow-lg border-b border-white/5'
        : 'bg-black py-0 md:py-6',
    ]"
  >
    <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
      <a href="#" @click.prevent="scrollToTop" class="text-2xl md:text-3xl font-bold tracking-tighter text-white">
        ÖKO<span class="text-[#3FA34D]">RENDSZER</span>
      </a>

      <NavigationMenuRoot class="hidden lg:flex" orientation="horizontal">
        <NavigationMenuList class="flex gap-8 items-center">
          <NavigationMenuItem v-for="link in navLinks" :key="link.name">
            <NavigationMenuLink as-child>
              <a
                href="#"
                @click.prevent="scrollToSection(link.href)"
                class="text-white/90 hover:text-[#3FA34D] text-sm font-medium tracking-wide uppercase transition-colors"
              >
                {{ link.name }}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>

      <div class="hidden lg:flex items-center gap-4">
        <a
          href="tel:+36209731980"
          class="flex items-center gap-2 text-white font-medium hover:text-[#3FA34D] transition-colors"
        >
          <Phone :size="18" />
          <span>+36 20 973 1980</span>
        </a>

        <button
          @click="scrollToSection('#contact')"
          class="bg-[#3FA34D] hover:bg-[#348a40] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#3FA34D]/25 transform hover:scale-105"
        >
          Ajánlatkérés
        </button>
      </div>

      <DialogRoot v-model:open="mobileOpen">
        <DialogTrigger as-child>
          <button
            class="lg:hidden text-white p-2"
            type="button"
            :aria-label="mobileOpen ? 'Menü bezárása' : 'Menü megnyitása'"
            :aria-expanded="mobileOpen ? 'true' : 'false'"
            aria-controls="mobile-nav-panel"
            aria-haspopup="dialog"
          >
            <Menu :size="28" />
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />

          <DialogContent
            id="mobile-nav-panel"
            class="fixed top-0 right-0 z-[70] h-full w-[min(85vw,320px)] bg-[#1A1A1A] text-white px-6 pb-6 flex flex-col gap-6 shadow-2xl"
            style="padding-top: calc(env(safe-area-inset-top) + 1rem);"
          >
            <a
              v-for="link in navLinks"
              :key="link.name"
              href="#"
              @click.prevent="scrollToSection(link.href)"
              class="text-lg font-medium hover:text-[#3FA34D]"
            >
              {{ link.name }}
            </a>

            <hr class="border-white/10" />

            <a href="tel:+36209731980" class="flex items-center gap-3 text-lg font-medium">
              <Phone class="text-[#3FA34D]" :size="20" />
              +36 20 973 1980
            </a>

            <button
              @click="scrollToSection('#contact')"
              class="bg-[#3FA34D] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Ajánlatkérés
            </button>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </nav>
</template>
