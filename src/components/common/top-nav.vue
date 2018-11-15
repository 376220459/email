<template>
    <div class="top-nav-whole">
        <el-tabs @tab-click="clickTab" v-model="editableTabsValue">
        <el-tab-pane label="首页" style="height:100%;">
            <div class="home-home">
                <div class="home-left-nav-whole">
                    <div class="home-left-nav-top">
                        <div class="top-receive" @click="receiveClick">
                            <span><i class="el-icon-message"></i></span>
                            <span class="top-font">收信</span> 
                        </div>
                        <div class="top-write" @click="writeClick">
                            <span><i class="el-icon-edit-outline"></i></span>
                            <span class="top-font">写信</span> 
                        </div>
                    </div>

                    <div class="home-left-nav-content">
                        <ul>
                            <li @click="receiveClick">
                                <span><strong>收件箱</strong></span>
                                <span>(0)</span>
                            </li>
                            <li @click="sorryMessage">
                                <span><i class="el-icon-warning"></i></span>
                                <span>重要邮件</span>
                            </li>
                            <li @click="sorryMessage">
                                <span><i class="el-icon-time"></i></span>
                                <span>代办邮件</span>
                            </li>
                            <li @click="sorryMessage">
                                <span><i class="el-icon-star-on"></i></span>
                                <span>星标联系人邮件</span>
                            </li>
                            <li @click="sorryMessage">
                                <span>草稿箱</span>
                            </li>
                            <li @click="sorryMessage">
                                <span>已发送</span>
                            </li>
                            <li>
                                <span>
                                    <el-tree :data="fileOther" :props="defaultProps" @node-click="fileOtherClick"></el-tree>
                                </span>
                            </li>
                            <li @click="sorryMessage">
                                <span>文件中心</span>
                            </li>
                            <li @click="sorryMessage">
                                <span>附件图集</span>
                            </li>
                        </ul>
                    </div>
                </div>
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
                <receiveContent></receiveContent>
            </div>
        </el-tab-pane>
        <el-tab-pane label="写信" style="height:100%;">
            <div class="home-write">
                <writeContent></writeContent>
            </div>
        </el-tab-pane>
        <el-tab-pane label="个人中心" style="height:100%;">
            <div class="home-personal">
                <personalContent></personalContent>
            </div>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
import communicationContent from '@/components/content/communication-content'
import receiveContent from '@/components/content/receive-content'
import homeContent from '@/components/content/home-content'
import personalContent from '@/components/content/personal-content'
import writeContent from '@/components/content/write-content'
// import store from '@/vuex/store'
// import {mapState} from 'vuex'

export default {
    // store,
    name: 'topNav',
    components: {
        // homeLeftNav: homeLeftNav,
        homeContent:homeContent,
        communicationContent: communicationContent,
        receiveContent: receiveContent,
        personalContent: personalContent,
        writeContent: writeContent,
    },
    data () {
        return {
            editableTabsValue: '0',
            // editableTabsValue: this.$store.state.count+'',
            fileOther: [
            {
                label: '其他两个文件夹',
                children: [
                    {
                        label: '已删除'
                    },
                    {
                        label: '垃圾'
                    }
                ]
            }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }  
    },
    // computed: {
    //     ...mapState(['count'])
    // },
    methods: {
        clickTab(tab,event){
            // console.log(tab);
            // console.log(event);
        },
        fileOtherClick(data){
            if(data.label == '已删除'){
                this.$message.success('已删除文件...');
            }
            else if(data.label == '垃圾'){
                this.$message.success('垃圾文件...');
            }
        },
        receiveClick(){
            this.editableTabsValue = '2';
        },
        writeClick(){
            this.editableTabsValue = '3';
        },
        sorryMessage(){
            this.$message({
                type: 'error',
                message: '对不起，暂无数据。',
                showClose: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-nav-whole{
        height: 100%;
        .home-home,.home-communication,.home-inbox,.home-write,.home-personal{
            height: 100%;
        }
    }
    .home-left-nav-whole{
        user-select: none;
        float: left;
        width: 15%;
        height: 100%;
        border-right: 1px solid #C0C0C0;
        .home-left-nav-top{
            width: 100%;
            height: 10%;
            border-bottom: 1px solid #C0C0C0;
            //margin-top: 3px;
            .top-receive,.top-write{
                // border-right: 1px solid gray;
                width: 49%;
                height: 100%;
                float: left;
                font-size: 15px;
                margin-top: 10px;
                cursor: pointer;
            }
            div:hover{
                transform: scale(1.1);
                color: #3399FF;
            }
        }
        .home-left-nav-content{
            width: 100%;
            height: 90%;
            text-align: left;
            font-size: 13px;
            li{
                margin: 15px 0;
                cursor: pointer;
            }
            li:hover{
                color: #3399FF;
                font-size: 14px;
            }
        }
    }
</style>