import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

export function animateCount(target: number, duration: number = 2000): Promise<number[]> {
  return new Promise((resolve) => {
    const steps: number[] = [];
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      steps.push(Math.floor(target * easeOutQuart));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve(steps);
      }
    };
    requestAnimationFrame(animate);
  });
}
