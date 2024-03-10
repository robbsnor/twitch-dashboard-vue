<template>
    <div class="stream_types_placing">
        <div class="stream_types">
            <div class="stream_type">
                Highlights
                <vue-feather type="film" class="stream_type_icons stream_type_icons_right_aligned"></vue-feather>
            </div>

            <div class="stream_type">
                Streams
                <vue-feather type="play" class="stream_type_icons stream_type_icons_left_aligned "></vue-feather>
            </div>


            <div class="stream_type">
                Clips
                <vue-feather type="paperclip" class="stream_type_icons stream_type_icons_right_aligned"></vue-feather>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.stream_types_placing {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0px;
}

.stream_types {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 20px;
    font-size: 48px;
    color: $c-white;
}

.stream_type {
    position: relative;
}

.stream_type_icons {
    position: absolute;
    color: $c-primary;
    opacity: 0.4;
    width: 50px;
}

.stream_type_icons_left_aligned {
    top: -15px;
    left: -20px;
}

.stream_type_icons_right_aligned {
    top: -10px;
    right: -30px;
}
</style>
