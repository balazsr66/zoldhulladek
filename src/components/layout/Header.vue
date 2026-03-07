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
  DialogTitle,
  DialogDescription,
} from "reka-ui"

const isScrolled = ref(false)
const mobileOpen = ref(false)
let scrollRafId = null

const navLinks = [
  { name: "Szolgáltatások", href: "#services" },
  { name: "Technológia", href: "#machine" },
  { name: "Referenciák", href: "#work" },
  { name: "Folyamat", href: "#process" },
  { name: "GYIK", href: "#faq" },
]
const DEFERRED_REVEAL_EVENT = "landing:reveal-deferred-sections"

const syncScrolledState = () => {
  const next = window.scrollY > 50
  if (next !== isScrolled.value) {
    isScrolled.value = next
  }
  scrollRafId = null
}

const handleScroll = () => {
  if (scrollRafId !== null) return
  scrollRafId = window.requestAnimationFrame(syncScrolledState)
}

const getHeaderHeight = () => {
  const headerEl = document.querySelector('[data-site-header="true"]')
  return headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
}

const getEffectiveHeaderHeight = () => {
  const currentHeight = getHeaderHeight()
  const isDesktop = window.matchMedia("(min-width: 768px)").matches

  // Desktopon a header normál -> scrolled állapot között kb. 16px különbség van.
  if (isDesktop && !isScrolled.value) {
    return Math.max(currentHeight - 16, 0)
  }

  return currentHeight
}

const scrollToElementWithHeaderOffset = (el) => {
  const targetTop = el.getBoundingClientRect().top + window.pageYOffset - getEffectiveHeaderHeight()
  window.scrollTo({ top: targetTop, behavior: "smooth" })
}

const requestDeferredSectionsReveal = () => {
  window.dispatchEvent(new CustomEvent(DEFERRED_REVEAL_EVENT))
}

const scrollToSectionById = (id, attempt = 0) => {
  const el = document.getElementById(id)
  if (el) {
    scrollToElementWithHeaderOffset(el)
    return
  }

  if (attempt === 0) {
    requestDeferredSectionsReveal()
  }

  if (attempt >= 20) return

  window.setTimeout(() => {
    scrollToSectionById(id, attempt + 1)
  }, 50)
}

const scrollToSection = (href) => {
  const id = href.replace("#", "")
  mobileOpen.value = false
  scrollToSectionById(id)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  mobileOpen.value = false
}

onMounted(() => {
  syncScrolledState()
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
  if (scrollRafId !== null) {
    window.cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }
})
</script>

<template>
  <nav
    data-site-header="true"
    data-critical-header="true"
    :data-scrolled="isScrolled ? 'true' : 'false'"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300',
      isScrolled
        ? 'bg-[#1A1A1A]/95 backdrop-blur-md h-11 md:h-[72px] shadow-lg'
        : 'bg-black h-11 md:h-[88px]',
    ]"
  >
    <div class="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
      <a
        href="#"
        @click.prevent="scrollToTop"
        data-critical-logo="true"
        class="text-2xl md:text-3xl font-bold tracking-tighter text-white leading-none whitespace-nowrap"
      >
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
            <DialogTitle class="sr-only">Mobil menü</DialogTitle>
            <DialogDescription class="sr-only">
              Fő navigációs menü az oldal szekcióihoz.
            </DialogDescription>

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
