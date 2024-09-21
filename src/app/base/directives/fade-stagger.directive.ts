import type { DirectiveBinding } from "vue";

interface FadeStaggerBinding {
    index: number;
    delay?: number;
}


export const fadeStagger = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        // Set the initial state of the element
        const index = binding.value.index;
        const delay = binding.value.delay || 10; // default delay is 10ms

        el.style.opacity = '0';
        el.style.transition = `opacity 0.5s ease ${index * delay}ms`;
    },
    mounted(el: any, binding: any) {
        // Apply the fade-in effect after the component is mounted
        const index = binding.value.index;
        const delay = binding.value.delay || 10;

        setTimeout(() => {
            el.style.opacity = 1;
        }, index * delay);
    }
};
