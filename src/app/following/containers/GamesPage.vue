<script setup lang="ts">
import { TitleService } from '../../shared/services/title.service';

TitleService.setTitle('Games');
</script>

<template>
    <Section>
        <ul>
            <li>
                <RouterLink to="/games/Call of Duty: Black Ops">Call of Duty: Black Ops</RouterLink>
            </li>
        </ul>
    </Section>
</template>

<style scoped lang="scss"></style>
