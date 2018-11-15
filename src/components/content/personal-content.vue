<template>
    <div class="personal-content-whole">
        <div class="personal-content-left">
            <div class="personal-info">
                <div class="info-title">个人信息</div>
                <div class="user-img">
                    <img width="90%" :src="user.userImg" alt="头像">
                </div>
                <div class="user-others">
                    <ul>
                        <li><strong>昵称：</strong>{{ user.userName }}</li>
                        <li><strong>性别：</strong>{{ user.userSex }}</li>
                        <li><strong>年龄：</strong>{{ user.userAge }}</li>
                        <li><strong>个性签名：</strong>{{ user.userWords }}</li>
                    </ul>
                </div>
            </div>
            <div class="email-info">
                <div class="info-title">邮件信息</div>
                <ul>
                    <li>-您总共收到了 <strong>{{ user.receiveAll }}</strong> 封邮件。</li>
                    <li>-您总共发出了 <strong>{{ user.sendAll }}</strong> 封邮件。</li>
                    <li>-您总共删除了 <strong>{{ user.deleteAll }}</strong> 封邮件。</li>
                </ul>
            </div>
        </div>

        <div class="personal-content-right">
            <ul>
                <li>E</li>
                <li>M</li>
                <li>A</li>
                <li>I</li>
                <li>L</li>
            </ul>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'

export default {
    store,
    inject: ['reload'],
    name: 'personalContent',
    data () {
        return {
            user: {
                userName: '王少华',
                userSex: '男',
                userAge: '21',
                userWords: 'This is my E-mail System.',
                userImg: require('@/assets/pic/logo.png'),
                sendAll: 0,
                receiveAll: 0,
                deleteAll: 0
            }
        }
    },
    methods: {
        
    },
    mounted(){
        console.log(this.$store.state.userId);
        console.log(this.$route.path.substring(6));
        var querystring = require('querystring');
        this.$http.post('http://192.168.43.166:8080/Mail/getUserById.action',
        querystring.stringify({userid: this.$route.path.substring(6)}),
        {timeout:3000})
        .then((res)=>{
            if(res.data){
                console.log('找到该id');
                console.log('----------------------------------以上是个人信息获取----------------------------------');
                [this.user.userName,this.user.userSex,this.user.userAge,this.user.userWords]=[res.data.username,res.data.sex,res.data.age,res.data.qianming];
                this.user.userSex = this.user.userSex==0?'男':'女';
                this.user.userWords =  this.user.userWords==null?'您还没有设置签名，快想一个吧~':this.user.userWords
            }
            else{
                console.log('没找到该id');
            }
        })
        .catch((err)=>{
            console.log(err);
            this.$message({
                type: 'error',
                showClose: true,
                message: '数据请求出错，请重新登陆'
            });
            // this.$router.push({path:'/'});
            // this.reload();
        })
    }
}
</script>

<style lang="scss" scoped>
    .personal-content-whole{
        user-select: none;
        display: grid;
        grid-template: 1fr / 3fr 1fr;
        width: 100%;
        height: 100%;
        .personal-content-left{
            display: grid;
            grid-template: 4fr 3fr / 1fr;
            .info-title{
                    float: left;
                    font-size: 20px;
                    color: #A9A9A9
                }
            .personal-info{
                .user-img{
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    border: 1px solid #A0A0A0;
                    /* 启用弹性盒布局 */
                    display: flex;
                    /* 使子元素水平居中 */
                    justify-content: center;
                    /* 使子元素垂直居中 */
                    align-items: center;
                    overflow: hidden;
                    margin: 50px 0 0 100px;
                    float: left;
                }
                .user-others{
                    float: left;
                    text-align: left;
                    font-size: 13px;
                    margin: 50px 0 0 20px;
                    li{
                        list-style: none;
                    }
                }
            }
            .email-info{
                text-align: left;
                li{
                    list-style: none;
                    font-size: 15px;
                    margin: 30px 0 0 200px;
                    strong{
                        cursor: pointer;
                    }
                    strong:hover{
                        color: #3399FF;
                    }
                }
            }
        }
        .personal-content-right{
            margin: 10px 20px 0 0;
            li{
                list-style: none;
                font-size: 80px;
                color: #F5F5DC;
            }
        }
    }
</style>