<template>
    <div class="home-left-nav-whole">
        <div class="home-left-nav-top">
            <div class="top-receive">
                <span><i class="el-icon-message"></i></span>
                <span class="top-font">收信</span> 
            </div>
            <div class="top-write">
                <span><i class="el-icon-edit-outline"></i></span>
                <span class="top-font">写信</span> 
            </div>
        </div>

        <div class="home-left-nav-content">
            <ul>
                <li>
                    <span><strong>收件箱</strong></span>
                    <span>(0)</span>
                </li>
                <li>
                    <span><i class="el-icon-warning"></i></span>
                    <span>重要邮件</span>
                </li>
                <li>
                    <span><i class="el-icon-time"></i></span>
                    <span>代办邮件</span>
                </li>
                <li>
                    <span><i class="el-icon-star-on"></i></span>
                    <span>星标联系人邮件</span>
                </li>
                <li>
                    <span>草稿箱</span>
                </li>
                <li>
                    <span>已发送</span>
                </li>
                <li>
                    <span>
                        <el-tree :data="fileOther" :props="defaultProps" @node-click="fileOtherClick"></el-tree>
                    </span>
                </li>
                <li>
                    <span>文件中心</span>
                </li>
                <li>
                    <span>附件图集</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'homeLeftNav',
    data () {
        return {
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

            }
        }
    },
    methods: {
        fileOtherClick(data){
            if(data.label == '已删除'){
                this.$message.success('已删除文件...');
            }
            else if(data.label == '垃圾'){
                this.$message.success('垃圾文件...');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .home-left-nav-whole{
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

