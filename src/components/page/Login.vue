<template>
    <div
    class="login-whole"
    v-loading="loadLock"
    element-loading-text="正在登陆，请稍等..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="title">
            <span>{{ title }}</span>
        </div>
        <div class="logo">
            <img width="60%" src="../../assets/pic/logo.png" alt="plane">
        </div>
        <div class="login">
            <el-form hide-required-asterisk :rules="rules" label-position="left" label-width="120px" :model="loginForm">
                <el-form-item label="用户名：" prop="address">
                    <el-input autofocus="autofocus" placeholder="请输入邮箱：×××@localhost" v-model="loginForm.address" size="mini" style="width:90%" type="text" clearable="clearable"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" id="ps" size="mini" style="width:90%" type="password" @keyup.native.enter="login">
                        <i id="eye" @click="showPassWord" slot="suffix" class="el-icon-email-yanjing-bi"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="code">
                <div class="code-input">验证码: <el-input v-model="codeInput" placeholder="算式的计算结果" id="codeInput" size="mini" style="width:60%" type="text" @keyup.native.enter="login"></el-input></div>
                <div style="user-select:none;" class="code-value" @click="codeRefresh">
                    {{code1}}{{codeSymbol}}{{code2}}=？
                </div>
            </div>
            <el-button size="mini" :plain="true" type="success" @click="login">登录</el-button>
            <el-button size="mini" :plain="true" type="info" @click="register">注册</el-button>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
var querystring = require('querystring');

export default {
    store,
    name: 'Login',
    data () {
        return {
            loadLock: false,
            title: '欢迎来到纸飞机邮箱模拟系统',
            true: true,
            false: false,
            code1: 0,
            code2: 0,
            codeSymbols: ['+','-'],
            codeSymbol: '+',
            codeValue: 0,
            loginForm: {
                address: '',
                password: ''
            },
            rules: {
                address: [
                    // {required: true, message: '请输入用户名',trigger: 'blur'},
                    // {pattern: /^[A-Za-z0-9_\-.]@localhost$/,message: '请输入正确格式的用户名'}
                ],
                password: [
                    // {required: true, message: '请输入密码', trigger: 'blur'},
                ]
            },
            codeInput: ''
        }
    },
    methods: {
        login(){
            if(this.loginForm.address=='' || this.loginForm.password==''){
                this.$message.warning("请输入邮箱或密码");
            }
            else if(this.codeInput == this.codeValue && this.codeInput){
                this.loadLock = true;
                // this.$router.push({path:'/home/001'});
                this.$http.post('http://192.168.43.166:8080/Mail/getUserMessage.action',
                querystring.stringify(this.loginForm),
                {timeout:5000})
                .then((res)=>{
                    // console.log(res);
                    if(res.data){
                        console.log("登陆成功。");
                        console.log(res.data);
                        console.log('----------------------------------以上是登陆信息获取----------------------------------');
                        this.$store.commit('inputId',res.data.userid);
                        this.$store.state.username = res.data.username;
                        this.$router.push({path:'/home/'+res.data.userid});
                    }
                    else{
                        this.$message({
                            type: 'error',
                            message: '邮箱名或密码错误',
                            showClose: true
                        });
                        this.loadLock = false;
                        this.codeRefresh();
                    }
                })
                .catch((err)=>{
                    console.log('登陆信息请求出错。');
                    console.log(err);
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: 'Error！！！请连接至后台数据库...'
                    });
                    this.loadLock = false;
                    this.codeRefresh();
                })
                // this.$router.push({path:'/home/001'})
            }
            else if(this.codeInput == ''){
                this.$message.warning("请输入验证码");
            }
            else{
                this.$message.error("验证码输入错误，请重新输入");
                this.codeRefresh();
            }
        },
        register(){
            // console.log('register');
            this.$store.state.address = '';
            this.$store.state.password = '';
            this.$router.push({path:'/register'})
        },
        showPassWord(){
            var ps = document.getElementById('ps');
            var eye = document.getElementById('eye');
            // console.log(ps);
            console.log(eye.className);
            if(ps.type == "password"){
                ps.type = "text";
                eye.className = 'el-icon-view';
            }
            else{
                ps.type = "password";
                eye.className = 'el-icon-email-yanjing-bi';
            }
        },
        randomCode(){
            //return Math.floor((Math.random()*(MAX-MIN+1)+MIN));
            return Math.floor((Math.random()*(33-10+1)+10));
        },
        randomSymbol(){
            //return Math.floor((Math.random()*(MAX-MIN+1)+MIN));
            return Math.floor((Math.random()*(1-0+1)+0));
        },
        codeRefresh(){
            this.code1 = this.randomCode();
            this.code2 = this.randomCode();
            this.codeSymbol = this.codeSymbols[this.randomSymbol()];
            this.codeValue = ((this.codeSymbol == '+')?(this.code1+this.code2):(this.code1-this.code2));
            this.codeInput = '';
        }
    },
    beforeMount(){
        this.codeRefresh();
        if(this.$store.state.address && this.$store.state.password){
            this.loginForm.address = this.$store.state.address;
            this.loginForm.password = this.$store.state.password;
        }
    },
    // created(){
    //     this.$http.post('api/Mail/getUserServlet',querystring.stringify(
    //         {
    //             address: 'huwei',
    //             password: '123'
    //         }
    //     ))
    //     .then((response)=>{
    //         console.log(response.data);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }
}
</script>

<style lang="scss" scoped>
    .login-whole{
        user-select: none;
        width: 100%;
        height: 100%;
        .title{
            // border: 1px solid black;
            height: 10%;
            width: 100%;
            font-size: 0.8rem;
            user-select: none;
        };
        .logo{
            // border: 1px solid black;
            height: 90%;
            width: 70%;
            float: left;
        };
        .login{
            // border: 1px solid black;
            height: 90%;
            width: 30%;
            float: left;
            button{
                margin: 20px 20px;
            };
            .code{
                width: 100%;
                height: 20%;
                margin: 30px 0;
                
                .code-input{
                    font-size: 0.3rem;
                    float: left;
                    width: 70%
                }
                .code-value{
                    width: 50px;
                    height: 30px;
                    border: 1px solid DimGray;
                    float: left;
                    font-family: 'FZShuTi';
                    font-size: 13px;
                    cursor: pointer;
                    word-wrap:break-word;
                    border-radius: 6px;
                    background-color: DimGray;
                    color: white;
                    font-weight: bold
                }
            }
        }
    }
</style>

