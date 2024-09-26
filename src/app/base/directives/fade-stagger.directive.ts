import type { DirectiveBinding } from "vue";

interface FadeStaggerBinding {
    delay?: number;
}

export const fadeStagger = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];

        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transition = `.5s`;
            child.style.transform = 'translateY(10px)';
        });
    },
    mounted(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const delay = binding.value?.delay || 40;

        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
};
