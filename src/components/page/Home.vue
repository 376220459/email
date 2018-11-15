<template>
    <div class="homeWhole">
        <div class="top-nav"><topNav></topNav></div>
    </div>
</template>

<script>
import topNav from '@/components/common/top-nav'

export default {
    name: 'Home',
    components: {
        topNav: topNav
    },
    mounted(){
        this.$message.success({
            showClose: true,
            message: '欢迎回来'
        });
    }
}
</script>

<style lang="scss" scoped>
    .homeWhole{
        height: 100%;
        background-color: #F8F8F8;
        .top-nav{
            height: 100%;
        }
    }
</style>


