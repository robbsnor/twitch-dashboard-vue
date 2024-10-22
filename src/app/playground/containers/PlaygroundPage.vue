<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

onMounted(() => {
    gsapGo();
});

const gsapGo = () => {
    const centerX = window.innerWidth / 2;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    const initialWidth = Math.ceil(document.querySelector('.box')!.getBoundingClientRect().width);
    const initialHeight = Math.ceil(document.querySelector('.box')!.getBoundingClientRect().height);

    // set initial position
    tl.set(".box", {
        y: window.innerHeight,
        x: centerX,
        width: 0,
        height: 0,
        padding: 0,
    });

    tl.set('.box__inner', {
        opacity: 0,
        translateY: -10,
    });

    // bounce up
    tl.to(".box", {
        y: '-=50px',
        duration: .5,
        width: 20,
        opacity: 1,
        height: 20,
        left: -10,
        top: -10,
        ease: 'back.out',
    });

    // end
    tl.to(".box", {
        width: initialWidth,
        height: initialHeight,
        duration: .5,
        ease: 'expo',
    }, '-=.1');

    tl.to(".box__inner", {
        opacity: 1,
        translateY: 0,
        duration: .2,
    }, '-=.4');
};
</script>

<template>
    <div class="playground">
        <Section title="Playground">


        </Section>
    </div>

    <div class="box">
        <div class="box__inner">Big booty bitches in the house!</div>
    </div>
</template>

<style scoped lang="scss">
.playground {}

.box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $c-primary;
    color: black;
    padding: 10px 30px;
    border-radius: 999px;
    transform: translate(-50%, -50%);

    &__inner {
        text-align: center;
    }
}
</style>
