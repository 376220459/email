<template>
    <div class="communication-content-whole">
        <div class="communication-content-left">
            <div class="left-first">
                <span class="left-title"><strong>联系人</strong></span>
                <div class="left-friends">
                    <span :style={font:allFont}>所有联系人</span>
                    <span>未分组联系人</span>
                </div>
            </div>

            <div class="left-second">
                <span class="left-title"><strong>联系组</strong></span>
                <div class="left-group">
                    <span>邮件列表</span>
                    <span>管理星标联系人</span>
                </div>
            </div>
        </div>


        <div class="communication-content-content">
            <div class="top">
                <div class="top-new"><el-button type="success">+新建联系人</el-button></div>
                <div class="top-operate">
                    <ul>
                        <div style="border-radius:10px 0 0 10px"><li>写信</li></div>
                        <div><li>复制到组</li></div>
                        <div><li>删除</li></div>
                        <div style="border-radius:0 10px 10px 0"><li>更多</li></div>
                    </ul>
                </div>
                <div class="top-search">
                    <el-input size="mini" placeholder="搜索所有联系人"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
                </div>
            </div>

            <div class="content">
                <div class="content-msg">
                    <span>醒醒吧孩子，你没朋友的~ <span style="color:#A9A9A9;font-size:13px;">您可以：</span></span>
                </div>
                <div class="content-operate">
                    <el-button type="success">+新建联系人</el-button>
                    <el-button type="info">导入联系人</el-button>
                    <el-button type="info">复制其他邮箱通讯录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'communicationContent',
    data () {
        return {
            allFont: 'bold 25px STXinwei'
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .communication-content-whole{
        display: grid;
        grid-template: 1fr / 1fr 6fr;
        width: 100%;
        height: 100%;
        .communication-content-left{
            user-select: none;
            border-right: 1px solid #C0C0C0;
            font-size: 13px;
            float: left;
            .left-first{
                border-bottom: 1px dotted #C0C0C0;
                height: 30%;
                span{
                    display: block;
                }
                .left-title{
                    color: #B8B8B8;
                    text-align: left;
                    // margin: 15px 0;
                }
                .left-friends{
                    text-align: left;
                    margin-left: 10px;
                    span{
                        margin-top: 20px;
                        cursor: pointer;
                    }
                    span:hover{
                        font-size: 14px;
                        color: #3399FF;
                    }
                }
            }
            .left-second{
                height: 70%;
                span{
                    display: block;
                }
                .left-title{
                    color: #B8B8B8;
                    text-align: left;
                    // margin: 15px 0;
                }
                .left-group{
                    text-align: left;
                    margin-left: 10px;
                    span{
                        margin-top: 20px;
                        cursor: pointer;
                    }
                    span:hover{
                        font-size: 14px;
                        color: #3399FF;
                    }
                }
            }
        }
        .communication-content-content{
            display: grid;
            grid-template: 1fr 8fr / 1fr;
            .top{
                // background-color: #3399FF;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                border-bottom: 1px solid #C0C0C0;
                .top-new{
                    float: left;
                    margin: 3px;
                }
                .top-operate{
                    float: left;
                    margin: 10px;
                    user-select: none;
                    li{
                        list-style: none;
                    }
                    div{
                        float: left;
                        font-size: 13px;
                        background-color: #F5F5DC;
                        border: 1px solid #B8B8B8;
                        padding: 3px 10px;
                        cursor: pointer;
                    }
                    div:hover{
                        color: #3399FF;
                    }
                }
                .top-search{
                    float: left;
                    margin: 8px;
                }
            }
            .content{
                // background-color: aqua;
                .content-msg{
                    // background-color: #3399FF;
                    width: 30%;
                    font-size: 15px;
                    margin: 20px 10px;
                }
                .content-operate{
                    button{
                        float: left;
                        margin: 0 5px;
                    }
                }
            }
        }
    }
</style>

