<!--
 Copyright 2023 Peter Chen
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, toRef } from 'vue';
import { useImageLoader } from '@/hooks/image';
import Star from './Star';

interface IStarProps {
  imageUrl: string;
  maxStars?: number;
}

const props = withDefaults(defineProps<IStarProps>(), {
  maxStars: 1200
});

const canvasRef = ref<HTMLCanvasElement>();

let id: number | undefined = undefined;

const imageUrl = toRef(props, 'imageUrl');
const { image } = useImageLoader(imageUrl);

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) {
    throw new Error('canvas元素不能为空');
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('canvas元素不能为空');
  }
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  const hue = 217;
  // 创建存储星星的容器
  const stars = ref<Star[]>([]);
  const maxStars = props.maxStars;
  const count = ref(0);

  const canvas2 = document.createElement('canvas');
  const ctx2 = canvas2.getContext('2d');
  if (!ctx2) {
    throw new Error('canvas获取context失败！');
  }
  canvas2.width = 100;
  canvas2.height = 100;
  const half = canvas2.width / 2;
  const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#fff');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

  for (let i = 0; i < maxStars; i++) {
    const option = {
      w,
      h,
      maxStars
    };
    const star = new Star(option);
    stars.value.push(star);
    count.value++;
  }

  const animation = () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    // 清除画布
    ctx.fillRect(0, 0, w, h);
    if (image.value) {
      const { width, height } = image.value;
      // 绘制背景图片
      ctx.drawImage(image.value, 0, 0, w, (height * w) / width);
    }

    // 绘制星星
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 1, l = stars.value.length; i < l; i++) {
      stars.value[i].draw(ctx, canvas2);
    }

    // 将动画放入动画帧中，提升性能
    id = window.requestAnimationFrame(animation);
  };

  animation();
}

onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
});
onBeforeUnmount(() => {
  if (id) {
    window.cancelAnimationFrame(id);
  }
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<template>
  <div class="container">
    <canvas ref="canvasRef" class="star-bg-canvas"></canvas>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
