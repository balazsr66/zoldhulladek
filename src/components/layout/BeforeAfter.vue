<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { MoveHorizontal } from "lucide-vue-next";

const sliderPosition = ref(50);
const isDragging = ref(false);
const containerRef = ref(null);

const handleMove = (event) => {
  if (!containerRef.value) return;

  const { left, width } = containerRef.value.getBoundingClientRect();
  let clientX;

  if (event.touches) {
    clientX = event.touches[0].clientX;
  } else {
    clientX = event.clientX;
  }

  const position = ((clientX - left) / width) * 100;
  sliderPosition.value = Math.min(100, Math.max(0, position));
};

const handleMouseDown = () => {
  isDragging.value = true;
};

const handleMouseUp = () => {
  isDragging.value = false;
};

onMounted(() => {
  const onMove = (e) => isDragging.value && handleMove(e);
  const onUp = () => handleMouseUp();

  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchend", onUp);
  });
});
</script>

<template>
  <section id="work" class="py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
            <div class="h-px w-6" :style="{ background: '#3FA34D' }"></div>
            <span class="text-[#3FA34D] font-bold tracking-widest uppercase text-sm block">
            Referenciák
            </span>
            <div class="h-px w-6" :style="{ background: '#3FA34D' }"></div>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
          A különbség magáért beszél
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Látványos eredmények, tiszta terület. Húzza a csúszkát és nézze meg, mire képes a technológiánk.
        </p>
      </div>

      <!-- Before/After slider -->
      <div 
        ref="containerRef"
        class="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
        @mousedown="handleMouseDown"
        @touchstart="handleMouseDown"
      >
        <!-- After Image (Background) -->
        <div class="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1622775584644-3e179faea429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhcmVkJTIwZm9yZXN0JTIwbGFuZCUyMGNsZWFuJTIwZ3JvdW5kfGVufDF8fHx8MTc3MTgwMDU1OXww&ixlib=rb-4.1.0&q=80&w=1200" 
            alt="After" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-8 right-8 bg-[#3FA34D]/90 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider">
            Utána
          </div>
        </div>

        <!-- Before Image (Clipped) -->
        <div 
          class="absolute inset-0 w-full h-full overflow-hidden"
          :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
        >
          <img 
            src="https://images.unsplash.com/photo-1693590511973-06f642cf0d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyZ3Jvd24lMjBkZW5zZSUyMGJydXNoJTIwZm9yZXN0fGVufDF8fHx8MTc3MTgwMDU2MHww&ixlib=rb-4.1.0&q=80&w=1200" 
            alt="Before" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-8 left-8 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider">
            Előtte
          </div>
        </div>

        <!-- Slider Handle -->
        <div 
          class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20"
          :style="{ left: sliderPosition + '%' }"
        >
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#1F3D2B] border-4 border-[#3FA34D]">
            <MoveHorizontal size="20"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>