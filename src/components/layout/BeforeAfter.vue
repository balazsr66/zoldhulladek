<script setup>
import { ref, onBeforeUnmount } from "vue";
import { MoveHorizontal } from "lucide-vue-next";

const sliderPosition = ref(50);
const isDragging = ref(false);
const containerRef = ref(null);

// images
const beforeImg = "/images/before-1536.webp";
const beforeImgSrcset = "/images/before-960.webp 960w, /images/before-1536.webp 1536w";
const afterImg = "/images/after-1280.webp";
const afterImgSrcset = "/images/after-960.webp 960w, /images/after-1280.webp 1280w";

const dragBounds = ref({ left: 0, width: 1 });
const pendingClientX = ref(null);
let rafId = null;
let dragListenersAttached = false;

const getClientX = (event) => {
  if ("touches" in event) return event.touches[0]?.clientX ?? null;
  return event.clientX ?? null;
};

const updateBounds = () => {
  if (!containerRef.value) return;
  const { left, width } = containerRef.value.getBoundingClientRect();
  dragBounds.value = { left, width: Math.max(width, 1) };
};

const applyPendingPosition = () => {
  rafId = null;
  if (pendingClientX.value === null) return;

  const { left, width } = dragBounds.value;
  const position = ((pendingClientX.value - left) / width) * 100;
  sliderPosition.value = Math.min(100, Math.max(0, position));
};

const queuePositionUpdate = (clientX) => {
  pendingClientX.value = clientX;
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(applyPendingPosition);
};

const handleMove = (event) => {
  if (!isDragging.value) return;
  const clientX = getClientX(event);
  if (clientX === null) return;
  queuePositionUpdate(clientX);
};

const handleResize = () => {
  if (isDragging.value) updateBounds();
};

const handleDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  removeDragListeners();
};

const addDragListeners = () => {
  if (dragListenersAttached) return;
  dragListenersAttached = true;
  window.addEventListener("mousemove", handleMove, { passive: true });
  window.addEventListener("touchmove", handleMove, { passive: true });
  window.addEventListener("mouseup", handleDragEnd, { passive: true });
  window.addEventListener("touchend", handleDragEnd, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
};

const removeDragListeners = () => {
  if (!dragListenersAttached) return;
  dragListenersAttached = false;
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("touchmove", handleMove);
  window.removeEventListener("mouseup", handleDragEnd);
  window.removeEventListener("touchend", handleDragEnd);
  window.removeEventListener("resize", handleResize);
};

const handleDragStart = (event) => {
  const clientX = getClientX(event);
  if (clientX === null) return;

  addDragListeners();
  updateBounds();
  isDragging.value = true;
  queuePositionUpdate(clientX);
};

onBeforeUnmount(() => {
  removeDragListeners();
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
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
        class="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none touch-none"
        @mousedown="handleDragStart"
        @touchstart="handleDragStart"
      >
        <!-- After Image (Background) -->
        <div class="absolute inset-0 w-full h-full">
          <img
            :src="afterImg"
            :srcset="afterImgSrcset"
            sizes="(min-width: 1280px) 1024px, 100vw"
            alt="After"
            width="1280"
            height="1707"
            loading="lazy"
            decoding="async"
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
            :src="beforeImg"
            :srcset="beforeImgSrcset"
            sizes="(min-width: 1280px) 1024px, 100vw"
            alt="Before"
            width="1536"
            height="1152"
            loading="lazy"
            decoding="async"
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
            <MoveHorizontal size="20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
