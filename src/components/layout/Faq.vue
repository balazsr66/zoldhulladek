<script setup>
import { ref } from "vue"
import { Plus, Minus } from "lucide-vue-next"

const openIndex = ref(0)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}

function getItemStyle(i) {
  const isOpen = openIndex.value === i

  return {
    background: isOpen ? "rgba(31,61,43,0.08)" : "white",
    border: `1px solid ${
      isOpen ? "rgba(63,163,77,0.3)" : "rgba(0,0,0,0.07)"
    }`,
    boxShadow: isOpen
      ? "0 4px 20px rgba(63,163,77,0.08)"
      : "0 2px 8px rgba(0,0,0,0.04)"
  }
}

const faqs = [
  {
    q: "Milyen terepre alkalmas az MDB LV300 PRO?",
    a: "A gép akár 60 fokos lejtőn is biztonságosan tud dolgozni..."
  },
  {
    q: "Kell-e valaki a gép mellé a munkavégzés során?",
    a: "Nem. A gép távirányítással üzemel..."
  },
  {
    q: "Mennyi idő alatt végeznek egy átlagos telken?",
    a: "Ez erősen függ a terület méretétől..."
  },
  {
    q: "Mi történik az irtott anyaggal?",
    a: "Az irtott anyagot helyszínen aprítjuk..."
  },
  {
    q: "Ingyenes a helyszíni felmérés?",
    a: "Igen, teljesen ingyenes és kötelezettség nélküli."
  },
  {
    q: "Tudnak rendszeres karbantartást végezni?",
    a: "Igen. Számos ügyfelünkkel van éves karbantartási szerződésünk."
  }
]
</script>
<template>
  <section
    id="faq"
    class="py-24 lg:py-32"
    style="background: #F5F5F5"
  >
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

        <!-- Left: Header -->
        <div class="lg:sticky lg:top-24 lg:self-start">
          <div class="inline-flex items-center gap-2 mb-4">
            <div class="h-px w-6 bg-[#3FA34D]" />
            <span
              class="text-sm font-semibold tracking-widest uppercase"
              style="color:#3FA34D; font-family:'Inter', sans-serif"
            >
              GYIK
            </span>
          </div>

          <h2
            class="uppercase mb-4"
            style="
              font-family:'Barlow Condensed', sans-serif;
              font-size:clamp(32px, 4vw, 48px);
              font-weight:800;
              color:#1A1A1A;
              line-height:1.1;
            "
          >
            Gyakran ismételt
            <span style="color:#1F3D2B">kérdések</span>
          </h2>

          <p
            class="text-gray-500"
            style="font-family:'Inter', sans-serif; font-size:16px; line-height:1.7"
          >
            Nem találja a választ? Hívjon minket közvetlenül!
          </p>

          <a
            href="tel:+36209731980"
            class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            style="
              background:#1F3D2B;
              color:white;
              font-family:'Inter', sans-serif;
              font-size:15px;
            "
          >
            +36 20 973 1980
          </a>
        </div>

        <!-- Right: FAQ List -->
        <div class="flex flex-col gap-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="rounded-2xl overflow-hidden transition-all duration-200"
            :style="getItemStyle(i)"
          >
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              @click="toggle(i)"
            >
              <span
                class="text-gray-800 font-medium"
                style="font-family:'Inter', sans-serif; font-size:16px; line-height:1.5"
              >
                {{ faq.q }}
              </span>

              <div
                class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                :style="{
                  background: openIndex === i ? '#3FA34D' : 'rgba(0,0,0,0.05)'
                }"
              >
                <Minus
                  v-if="openIndex === i"
                  class="text-white"
                  :size="16"
                />
                <Plus
                  v-else
                  :size="16"
                  style="color:#1F3D2B"
                />
              </div>
            </button>

            <div v-if="openIndex === i" class="px-6 pb-5">
              <p
                class="text-gray-500"
                style="font-family:'Inter', sans-serif; font-size:15px; line-height:1.7"
              >
                {{ faq.a }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>