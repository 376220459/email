<template>
    <div class="home-content-whole">
        <div class="home-content-info">
            <div class="info-img">
                <img width="90%" src="../../assets/pic/logo.png" alt="头像">
            </div>
            <div class="info-msg">
                <span><el-tooltip :content="userInfo" placement="top-start"><strong class="user-name">{{ userName }}</strong></el-tooltip>,{{ userMsg }}</span>
            </div>
            <div class="info-icon">
                <div @click="sorryMessage">
                    <i style="font-size: 30px;" class="el-icon-message"></i>
                    <p>未读邮件</p>
                </div>
                <div @click="sorryMessage">
                    <i style="font-size: 30px;" class="el-icon-time"></i>
                    <p>待办邮件</p>
                </div>
                <div @click="sorryMessage">
                    <i style="font-size: 30px;" class="el-icon-star-on"></i>
                    <p>星标邮件</p>
                </div>
                <div @click="sorryMessage">
                    <i style="font-size: 30px;" class="el-icon-warning"></i>
                    <p>重要邮件</p>
                </div>
            </div>
            <div class="info-time">
                <div>
                    {{ year }} 年 {{ month }} 月 {{ date }} 日
                </div>
                <div>
                    {{ hours }}:{{ minutes }}:{{ seconds }}
                </div>
            </div>
        </div>

        <div class="home-content-carousel">
            <div class="carousel">
                <el-carousel indicator-position="outside">
                    <el-carousel-item>
                        <img width="100%" src="../../assets/pic/001.jpg" alt="carousel">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img width="100%" src="../../assets/pic/002.jpg" alt="carousel">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img width="100%" src="../../assets/pic/003.jpg" alt="carousel">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img width="100%" src="../../assets/pic/004.jpg" alt="carousel">
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="font">
                <span>Email</span>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'

export default {
    store,
    name: 'homeContent',
    data () {
        return {
            userName: this.$store.state.username,
            userMsg: '坐上你的纸飞机，寻找消失的梦。',
            year: 0,
            month: 0,
            date: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            userInfo: '管理员'
        }
    },
    methods: {
        dateUpdate(){
            var dateNow = new Date();
            this.year = dateNow.getFullYear();
            this.month = dateNow.getMonth();
            this.date = dateNow.getDate();
            this.hours = dateNow.getHours();
            this.minutes = dateNow.getMinutes();
            this.seconds = dateNow.getSeconds();
            this.hours = this.check(this.hours);
            this.minutes = this.check(this.minutes);
            this.seconds = this.check(this.seconds);
            setTimeout(this.dateUpdate, 1000);
        },
        check(str){
            var num;
            str<=9?num='0'+str:num=str
            return num;
        },
        sorryMessage(){
            this.$message({
                type: 'error',
                message: '对不起，暂无数据。',
                showClose: true
            })
        }
    },
    beforeMount(){
        this.dateUpdate();
    }
}

</script>

<style lang="scss" scoped>
    .home-content-whole{
        user-select: none;
        float: left;
        width: 84.8%;
        height: 100%;
        .home-content-info{
            width: 100%;
            height: 30%;
            border-bottom: 1px solid #C0C0C0;
            .info-img{
                user-select: none;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                margin: 20px;
                border: 1px solid #A0A0A0;
                /* 启用弹性盒布局 */
                display: flex;
                /* 使子元素水平居中 */
                justify-content: center;
                /* 使子元素垂直居中 */
                align-items: center;
                overflow: hidden;
                float: left;
            }
            .info-msg{
                // border: 1px solid black;
                width: 50%;
                text-align: left;
                margin: 25px 0 10px 0;
                font-size: 13px;
                float: left;
                .user-name{
                    color:#409EFF;
                    cursor:pointer;
                    font-size: 15px;
                }
                .user-name:hover{
                    color: #909399;
                }
            }
            .info-icon{
                // border: 1px solid red;
                width: 50%;
                height: 40px;
                text-align: left;
                float: left;
                div{
                    text-align: center;
                    float: left;
                    margin: 0 10px;
                    cursor: pointer;
                }
                div:hover{
                    transform: scale(1.1);
                    color: #3399FF;
                }
            }
            .info-time{
                // border: 1px solid red;
                width: 200px;
                height: 50px;
                font-size: 20px;
                font-family: 'STCaiyun';
                float: right;
                div{
                    margin-bottom: 5px;
                }
            }
        }
        .home-content-carousel{
            width: 100%;
            height: 70%;
            display: grid;
            grid-template: 1fr / 4fr 3fr;
            // border: 1px solid red
            .carousel{
                height: 100%;
            }
            .font{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 3rem;
                color: 	#F5F5DC
            }
        }
    }
</style>

