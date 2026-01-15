<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { supabase } from '@/app/supabase';
import { PromiseService } from '@/app/shared/services/promise.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';

const router = useRouter();
const authStore = useAuthStore();
const favouriteStore = useFavouriteStore();

onMounted(async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    authStore.setSession(session);
    await favouriteStore.init();

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
