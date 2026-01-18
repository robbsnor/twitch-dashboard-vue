<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/app/supabase';
import { PromiseService } from '@/app/shared/services/promise.service';

const router = useRouter();

onMounted(async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    await PromiseService.sleep(500);
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
