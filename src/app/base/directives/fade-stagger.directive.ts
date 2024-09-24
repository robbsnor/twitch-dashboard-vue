import type { DirectiveBinding } from "vue";

interface FadeStaggerBinding {
    delay?: number;
}

export const fadeStagger = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];

        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transition = `opacity .5s`;
        });
    },
    mounted(el: HTMLElement, binding: DirectiveBinding<FadeStaggerBinding>) {
        const children = Array.from(el.children) as HTMLElement[];
        const delay = binding.value?.delay || 40;

        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
            }, index * delay);
        });
    }
};
