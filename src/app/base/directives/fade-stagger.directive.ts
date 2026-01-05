import type { DirectiveBinding } from 'vue';

interface FadeStaggerBinding {
    delay?: number;
    time?: number;
}

export const fadeStagger = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const time = binding.value?.time || 0.2;

        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transition = `${time}s`;
            // child.style.transform = 'translateY(10px)';
        });
    },
    mounted(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const delay = binding.value?.delay || 15;

        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                // child.style.transform = 'translateY(0)';
            }, index * delay);
        });
    },
};
