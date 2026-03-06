<script setup>
import { computed, ref, reactive } from "vue";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-vue-next";

// form state
const form = reactive({
  name: "",
  phone: "",
  email: "",
  message: "",
});

// validation
const errors = reactive({
  name: false,
  phone: false,
  email: false,
  message: false,
});

const loading = ref(false);
const success = ref(false);
const apiError = ref("");

// contact info
const contacts = [
  { icon: Phone, text: "+36 20 973 1980", href: "tel:+36209731980" },
  { icon: Mail, text: "okorendszer@gmail.com", href: "mailto:okorendszer@gmail.com" },
  { icon: MapPin, text: "Budapest és környéke", href: "tel:+36209731980" },
];

const badges = ["Ingyenes felmérés", "24h visszahívás", "Átlátható ár"];
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const isFormReady = computed(() => {
  return (
    form.name.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.email.trim().length > 0 &&
    EMAIL_REGEX.test(form.email.trim()) &&
    form.message.trim().length > 0
  );
});

// validation function
const validate = () => {
  errors.name = !form.name.trim();
  errors.phone = !form.phone.trim();
  errors.email = !form.email.trim() || !EMAIL_REGEX.test(form.email.trim());
  errors.message = !form.message.trim();
  return !errors.name && !errors.phone && !errors.email && !errors.message;
};

// submit form
const submitForm = async () => {
  apiError.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Hiba a küldés során");

    success.value = true;
    apiError.value = "";
    Object.keys(form).forEach((k) => (form[k] = ""));
    setTimeout(() => (success.value = false), 4000);
  } catch (err) {
    apiError.value = err instanceof Error ? err.message : "Hiba történt. Próbáld újra.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-bounce {
  animation: bounce 0.6s ease-in-out 0s 2;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>

<template>
  <section id="contact" class="py-24 lg:py-32 relative overflow-hidden" style="background: #0F1A12;">
    <div class="absolute inset-0" style="background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,61,43,0.5) 0%, transparent 70%);"></div>
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(63,163,77,0.4), transparent);"></div>

    <div class="relative z-10 max-w-[1200px] mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left contact info -->
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 mb-6">
            <div class="h-px w-6" style="background: #3FA34D;"></div>
            <span class="text-sm font-semibold tracking-widest uppercase" style="color: #3FA34D;">Ajánlatkérés</span>
            <div class="h-px w-6" style="background: #3FA34D;"></div>
          </div>

          <h2 class="text-white uppercase mb-6" style="font-family: 'Barlow Condensed', sans-serif; font-size: clamp(38px, 5vw, 64px); font-weight: 800; line-height: 1.05;">
            Indítsuk el <span style="color: #3FA34D;">a munkát!</span>
          </h2>
          <p class="text-gray-300 mb-10 max-w-lg lg:mx-0 mx-auto" style="font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.7;">
            Ingyenes helyszíni felmérés, kötelezettség nélküli ajánlat. 24 órán belül visszahívjuk és egyeztetünk.
          </p>

          <div class="flex flex-col gap-4 mb-10">
            <a v-for="(item, i) in contacts" :key="i" :href="item.href" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors lg:justify-start justify-center">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background: rgba(63,163,77,0.12); border: 1px solid rgba(63,163,77,0.2);">
                <component :is="item.icon" size="18" style="color: #3FA34D;" />
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 15px;">{{ item.text }}</span>
            </a>
          </div>

          <div class="flex flex-wrap gap-3 lg:justify-start justify-center">
            <span v-for="badge in badges" :key="badge" class="px-4 py-2 rounded-xl text-sm" style="background: rgba(63,163,77,0.1); border: 1px solid rgba(63,163,77,0.25); color: #3FA34D; font-family: 'Inter', sans-serif; font-weight: 500;">
              ✓ {{ badge }}
            </span>
          </div>
        </div>

        <!-- Right form -->
        <div class="p-8 lg:p-10 rounded-2xl relative overflow-hidden" style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(63,163,77,0.2); box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
          <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style="background: linear-gradient(90deg, #1F3D2B, #3FA34D);"></div>
          <h3 class="text-white mb-6" style="font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 700;">
            Ingyenes ajánlatkérés
          </h3>

          <form @submit.prevent="submitForm" class="flex flex-col gap-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-name" class="block text-gray-400 text-sm mb-1.5">Neve *</label>
                <input id="contact-name" v-model="form.name" type="text" required placeholder="Példa Név"
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                  :class="{ 'border-green-400 border-2': errors.name }"
                  style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);" />
              </div>
              <div>
                <label for="contact-phone" class="block text-gray-400 text-sm mb-1.5">Telefonszám *</label>
                <input id="contact-phone" v-model="form.phone" type="tel" required placeholder="+36 30 ..."
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                  :class="{ 'border-green-400 border-2': errors.phone }"
                  style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);" />
              </div>
            </div>

            <div>
              <label for="contact-email" class="block text-gray-400 text-sm mb-1.5">Email cím *</label>
              <input id="contact-email" v-model="form.email" type="email" required placeholder="email@pelda.com"
                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                :class="{ 'border-green-400 border-2': errors.email }"
                style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);" />
            </div>

            <div>
              <label for="contact-message" class="block text-gray-400 text-sm mb-1.5">Leírás *</label>
              <textarea id="contact-message" v-model="form.message" rows="4" required placeholder="Terep típusa, terület mérete, növényzet, egyéb megjegyzés..."
                :class="{ 'border-green-400 border-2': errors.message }"
                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none resize-none transition-all"
                style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);"></textarea>
            </div>

            <button
              type="submit"
              :disabled="loading || !isFormReady"
              class="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 mt-2 bg-gradient-to-br from-[#3FA34D] to-[#2d8a3a] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span v-if="!loading">Ajánlatot kérek - Ingyen</span>
              <span v-else>Elküldés...</span>
            </button>

            <div v-if="success" class="mt-4 text-green-400 font-semibold animate-bounce text-center">✓ Sikeresen elküldve!</div>
            <div v-if="apiError" class="mt-2 text-red-500 font-medium text-center">{{ apiError }}</div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
