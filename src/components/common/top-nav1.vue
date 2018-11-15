<template>
    <div class="top-nav-whole">
        <el-tabs @tab-click="clickTab" v-model="editableTabsValue" >
        <el-tab-pane label="首页" style="height:100%;">
            <div class="home-home">
                <homeLeftNav></homeLeftNav>
                <homeContent></homeContent>
            </div>
        </el-tab-pane>
        <el-tab-pane label="通讯录" style="height:100%;">
            <div class="home-communication">
                <communicationContent></communicationContent>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收件箱" style="height:100%;">
            <div class="home-inbox">
                <homeLeftNav></homeLeftNav>
            </div>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
import homeLeftNav from '@/components/common/home-left-nav'
import communicationContent from '@/components/content/communication-content'
import homeContent from '@/components/content/home-content'

export default {
    name: 'topNav',
    components: {
        homeLeftNav: homeLeftNav,
        communicationContent: communicationContent,
        homeContent:homeContent
    },
    data () {
        return {
            editableTabsValue: '0'
        }  
    },
    methods: {
        clickTab(tab,event){
            // console.log(tab);
            // console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-nav-whole{
        height: 100%;
        .home-home{
            height: 100%;
        };
        .home-communication{
            height: 100%;
        }
        .home-inbox{
            height: 100%;
        }

    }
</style>