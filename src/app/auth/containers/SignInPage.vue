<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/app/supabase';

const router = useRouter();

onMounted(async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    router.push({ name: 'live' });
});
</script>

<template>
    <div class="log-in">
        <Section first>
            <Spinner padding text="Loggin you in..." />
        </Section>
    </div>
</template>
