<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

let tl = gsap.timeline({ repeat: -1, repeatDelay: 2, yoyo: true });

onMounted(() => {
    gsapGo()
});

const close = () => {
    tl.reverse()
}

const gsapGo = () => {
    const offsetBottom = 50;

    const titEl = document.querySelector('.tit')!
    const initialWidth = Math.ceil(titEl.getBoundingClientRect().width);
    const initialHeigth = Math.ceil(titEl.getBoundingClientRect().height);

    const initialPadding = window.getComputedStyle(titEl).padding;

    // set initial position
    tl.set(".tit", {
        width: 0,
        height: 0,
        padding: 0,
        opacity: 0,
    });

    tl.set('.tit__inner', {
        opacity: 0,
        y: -20,
    });

    // bounce up
    tl.to(".tit", {
        y: -offsetBottom - initialHeigth,
        width: 20,
        height: 20,
        duration: .5,
        opacity: 1,
        ease: 'back.out',
    });

    // end
    tl.to(".tit", {
        width: initialWidth,
        height: 'unset',
        duration: .2,
        padding: initialPadding
    }, '-=.1');

    tl.to(".tit__inner", {
        opacity: 1,
        y: 0,
        duration: .5,
        ease: 'back.out'
    }, '<');
};
</script>

<template>
    <div class="playground">
        <Section title="Playground">

        </Section>
    </div>

    <div class="tits">
        <div class="tit" @click="close()">
            <div class="tit__inner">
                Welcome back, Hopp!
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playground {}

.tits {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    top: 100vh;
}

.tit {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $c-primary;
    color: black;
    padding: 10px 20px;
    border-radius: 10px;
    overflow: hidden;

    &__inner {
        text-align: center;
        flex-shrink: 0;
    }
}
</style>
