import type { DirectiveBinding } from 'vue';
import { PromiseService } from '../services/promise.service';

interface FadeStaggerBinding {
    startDelay?: number;
    delayBetweenItems?: number;
    duration?: number;
}

export const fadeStagger = {
    // begin state
    beforeMount(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const duration = binding.value?.duration || 0.2;

        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transition = `${duration}s`;
            // child.style.transform = 'translateY(10px)';
        });
    },

    // end state
    async mounted(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const delayBetweenItems = binding.value?.delayBetweenItems || 15;
        const startDelay = binding.value?.startDelay || 0;

        await PromiseService.sleep(startDelay);

        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                // child.style.transform = 'translateY(0)';
            }, index * delayBetweenItems);
        });
    },
};
