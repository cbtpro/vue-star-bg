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

/**
 * 生成范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @param isFloat 是否包含小数点
 * @returns number
 */
export const random = (min = 0, max = 100, isFloat = false) => {
  const array = new Uint32Array(1);
  const maxUint = 0xffffffff;
  const randomNumber = crypto.getRandomValues(array)[0] / maxUint;
  const randomRangeValue = (max - min + 1) * randomNumber + min;
  return isFloat ? randomRangeValue : Math.floor(randomRangeValue);
};

export const maxOrbit = (x: number, y: number) => {
  const max = Math.max(x, y);
  const diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
};

