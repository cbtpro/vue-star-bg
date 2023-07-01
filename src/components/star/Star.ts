// Copyright 2023 Peter Chen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { maxOrbit, random } from '@/utils';

interface IStarOptions {
  w: number;
  h: number;
  maxStars: number;
}
export default class Star {
  /** 运行的最大轨道 */
  orbitRadius: number;
  /** 半径 */
  radius: number;
  /** 运动轨道坐标x */
  orbitX: number;
  /** 运动轨道坐标y */
  orbitY: number;
  /** 事件流逝速度 */
  timePassed: number;
  /** 运动速度 */
  speed: number;
  /** 透明度 */
  alpha: number;
  constructor(options: IStarOptions) {
    const { w, h, maxStars } = options;
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 900000;
    this.alpha = random(2, 10) / 1;
  }
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    // 闪烁频率
    const twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  }
}
