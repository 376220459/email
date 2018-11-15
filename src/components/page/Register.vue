<template>
    <div class="register-whole"
    v-loading="loadLock"
    element-loading-text="正在跳转至登陆页面，请稍等..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="leftImg">

        </div>
        <div class="content">
            <div class="title">
                <span style="margin-left:10px">欢迎注册：</span>
            </div>
            <div class="registerForm">
                <div class="form">
                    <el-form ref="registerForm" hide-required-asterisk status-icon :model="registerForm" :rules="rules" label-position="left" label-width="150px" size="small">
                        <el-form-item prop="address" label="邮箱地址:">
                            <el-input v-model="registerForm.address"><template slot="append">@localhost</template></el-input>
                        </el-form-item>
                        <el-form-item prop="username" label="昵称/用户名:">
                            <el-input v-model="registerForm.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码:">
                            <el-input v-model="registerForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordCheck" label="确认密码:">
                            <el-input  @keyup.native.enter="register('registerForm')"  v-model="registerForm.passwordCheck" type="password"></el-input>
                        </el-form-item>
                        <el-form-item prop="age" label="年龄:">
                            <el-input @keyup.native.enter="register('registerForm')" v-model="registerForm.age" type="number" min="1" max="150" @blur="ageReload"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex" label="性别:">
                            <el-radio label="0" v-model="registerForm.sex">男</el-radio>
                            <el-radio label="1" v-model="registerForm.sex">女</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="register('registerForm')">注册</el-button>
                            <el-button type="primary" @click="goBack">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'

export default {
    store,
    inject: ['reload'],
    name: 'Register',
    data () {
        var passwordCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请确认密码'));
            }
            else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            }
            else {
                callback();
            }
        };
        return{
            rules: {
                address: [
                    { required: true, message: '请输入邮箱地址'},
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符'},
                    { pattern: /^[A-Za-z0-9_]+$/,message: '邮箱地址由字母、数字、下划线组成'}
                ],
                username: [
                    { required: true, message: '请输入用户名'},
                    { min: 2, max: 9, message: '长度在 2 到 9 个字符'},
                    { pattern: /^[A-Za-z\u4e00-\u9fa5]+$/,message: '用户名由字母、汉字组成'}
                ],
                password: [
                    { required: true, message: '请输入密码'},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符'},
                    { pattern: /^[A-Za-z0-9.\@+-]+$/,message: '密码由字母、数字、指定符号（+ - @ .）组成'}
                ],
                passwordCheck: [
                    { validator: passwordCheck},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符'},
                    { pattern: /^[A-Za-z0-9.\@+-]+$/,message: '密码由字母、数字、指定符号（+ - @ .）组成'}
                ]
            },
            registerForm:{
                address: '',
                username: '',
                password: '',
                passwordCheck: '',
                age: '0',
                sex: '0'
            },
            loadLock: false
        }
    },
    methods: {
        ageReload(){
            if(this.registerForm.age && (this.registerForm.age<0 || this.registerForm.age>100)){
                this.registerForm.age = '0';
            }
            this.registerForm.age = Math.floor(this.registerForm.age);
        },
        register(formName){
            // if(!(this.registerForm.address&&this.registerForm.username&&this.registerForm.password&&this.registerForm.passwordCheck)){
            //     alert('请先完整填写注册信息。');
            //     return;
            // };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var querystring = require('querystring');
                    this.$http.post('http://192.168.43.166:8080/Mail/register.action',
                    querystring.stringify({
                        address: this.registerForm.address+'@localhost',
                        username: this.registerForm.username,
                        password: this.registerForm.password,
                        age: this.registerForm.age,
                        sex: this.registerForm.sex
                    }),
                    {timeout:3000})
                    .then((res)=>{
                        console.log(res.data);
                        if(res.data){
                            console.log('注册成功。');
                            console.log('----------------------------------以上是注册信息获取----------------------------------');
                            this.$store.state.address = this.registerForm.address+'@localhost';
                            this.$store.state.password = this.registerForm.password;
                            this.$message({
                                type: 'success',
                                message: '恭喜你，注册成功！'
                            });
                            this.loadLock = true;
                            setTimeout(()=>{
                                this.$router.push({path:'/'});
                            },1000);
                        }
                        else{
                            console.log(res.data);
                            console.log('邮箱地址已被抢先注册。');
                            this.$message({
                                type: 'error',
                                message: '邮箱地址已被抢先注册。'
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.$message({
                                type: 'warning',
                                message: '请求超时，请稍后注册。'
                        });
                        this.reload();
                        // this.$router.push({path:'/register'});
                    })
                }
                else{
                    return false;
                }
            })
            
        },
        goBack(){
            this.$router.push({path:'/'});
        }
    }
}
</script>

<style lang="scss" scoped>
    .register-whole{
        user-select: none;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: 1fr / 2fr 5fr;
        // background-color: #C0C0C0;
        background: url(../../assets/pic/registerBack.jpg);
        .content{
            // background-color: aquamarine;
            display: grid;
            grid-template: 1fr 4fr / 1fr;
            .title{
                font-size: 4em;
                text-align: left;
                color: #F0F8FF;
            }
            .registerForm{
                .form{
                    width: 50%;
                    margin-left: 200px;
                }
            }
        }
    }
</style>
