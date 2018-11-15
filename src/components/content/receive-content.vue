<template>
    <div class="receive-content-whole">
        <div class="receive-content-left">
            <ul>
                <li @click="toReceive">
                    <span :style={font:receiveFont}>收件箱</span>
                    <span>(0)</span>
                </li>
                <li @click="sorryMessage">
                    <span><i class="el-icon-warning"></i></span>
                    <span>重要邮件</span>
                </li>
                <li @click="sorryMessage">
                    <span><i class="el-icon-date"></i></span>
                    <span>代办邮件</span>
                </li>
                <li @click="sorryMessage">
                    <span><i class="el-icon-star-on"></i></span>
                    <span>星标联系人邮件</span>
                </li>
                <li @click="sorryMessage">
                    <span>草稿箱</span>
                </li>
                <li @click="toSended">
                    <span :style={font:sendedFont}>已发送</span>
                </li>
            </ul>
        </div>

<!-- 收件 -->
        <div class="receive-content-receive" id="receive">
            <div class="operate">
                <div class="checkAll">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div class="delete">
                    <el-tooltip content="删除"><el-button @click="deleteEmails" type="danger" icon="el-icon-delete" circle></el-button></el-tooltip>
                </div>
                <div class="report">
                    <el-tooltip content="举报"><el-button type="warning" icon="el-icon-warning" circle></el-button></el-tooltip>
                </div>
                <div class="others">
                    <ul>
                        <li style="cursor:pointer;border-radius:5px 0 0 5px;">
                            <el-dropdown>
                                <span>标记为<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>已读</el-dropdown-item>
                                    <el-dropdown-item>未读</el-dropdown-item>
                                    <el-dropdown-item>红旗</el-dropdown-item>
                                    <el-dropdown-item>待办</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li style="cursor:pointer">
                            <el-dropdown>
                                <span>移动到<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>草稿</el-dropdown-item>
                                    <el-dropdown-item>已发送</el-dropdown-item>
                                    <el-dropdown-item>已删除</el-dropdown-item>
                                    <el-dropdown-item>垃圾邮件</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li style="cursor:pointer;border-radius:0 5px 5px 0;">
                            <el-dropdown>
                                <span>更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>导出选中邮件</el-dropdown-item>
                                    <el-dropdown-item>转发选中邮件</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
                <div class="refresh">
                    <el-tooltip content="刷新"><el-button @click="refresh" type="success" icon="el-icon-refresh" circle></el-button></el-tooltip>
                </div>
            </div>

            <div class="emails">
                <div class="emails-msg">
                    共有<strong>{{ numAll }}</strong>封邮件，<strong>{{ numNot }}</strong>件未读:
                </div>
                
                <div class="emails-email" v-for="(item,index) in emails" :key="index">
                    <div class="email-check"><el-checkbox @change="handleCheckedEmailsChange" v-model="emailsId" :label="index+1"></el-checkbox></div>
                    <div class="email-fromAddress"><strong>{{ item.fromAddress }}</strong></div>
                    <div @click="toRead(index)" class="email-subject"><i class="el-icon-message" style="margin-right:5px;"></i><strong>{{ item.subject }}</strong></div>
                    <div class="email-date">{{ item.date }}</div>
                </div>
                <!-- {{ emailsId }} -->
            </div>
        </div>
        
<!-- 阅读 -->
        <div class="receive-content-read" id="read">
            <div class="read-button">
                <el-button size="mini" type="success" @click="toReturn">返回</el-button>
            </div>
            <div class="read-info">
                <ul>
                    <li>
                        <span style="color:#A9A9A9;">发件人：</span>
                        <span>{{ this.a_email.fromAddress }}</span>
                    </li>
                    <li>
                        <span style="color:#A9A9A9;">日 期：</span>
                        <span>{{ this.a_email.date }}</span>
                    </li>
                    <li>
                        <span style="color:#A9A9A9;">主 题：</span>
                        <span>{{ this.a_email.subject }}</span>
                    </li>
                </ul>
            </div>
            <div class="read-attachments">
                <span>附件：</span>
                <span class="attachment-link" @click="download">{{ this.a_email.attachmentName }}</span>
            </div>
            <div class="read-text">
                <p style="font-size:20px;color:#8B4513;margin-bottom:10px;">正文：</p>
                <p style="font-size:15px;">{{ this.a_email.text }}</p>
            </div>
        </div>

<!-- 已发送 -->
        <div class="receive-content-sended" id="sended">
            <div class="operate">
                <div class="checkAll">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div class="delete">
                    <el-tooltip content="删除"><el-button @click="deleteEmails" type="danger" icon="el-icon-delete" circle></el-button></el-tooltip>
                </div>
                <div class="report">
                    <el-tooltip content="举报"><el-button type="warning" icon="el-icon-warning" circle></el-button></el-tooltip>
                </div>
                <div class="others">
                    <ul>
                        <li style="cursor:pointer;border-radius:5px 0 0 5px;">
                            <el-dropdown>
                                <span>标记为<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>已读</el-dropdown-item>
                                    <el-dropdown-item>未读</el-dropdown-item>
                                    <el-dropdown-item>红旗</el-dropdown-item>
                                    <el-dropdown-item>待办</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li style="cursor:pointer">
                            <el-dropdown>
                                <span>移动到<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>草稿</el-dropdown-item>
                                    <el-dropdown-item>已发送</el-dropdown-item>
                                    <el-dropdown-item>已删除</el-dropdown-item>
                                    <el-dropdown-item>垃圾邮件</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li style="cursor:pointer;border-radius:0 5px 5px 0;">
                            <el-dropdown>
                                <span>更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>导出选中邮件</el-dropdown-item>
                                    <el-dropdown-item>转发选中邮件</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
                <div class="refresh">
                    <el-tooltip content="刷新"><el-button @click="refresh" type="success" icon="el-icon-refresh" circle></el-button></el-tooltip>
                </div>
            </div>

            <div class="emails">
                <div class="emails-msg">
                    共有<strong>{{ numAll }}</strong>封邮件已发送。
                </div>
                
                <div class="emails-email" v-for="(item,index) in emails" :key="index">
                    <div class="email-check"><el-checkbox @change="handleCheckedEmailsChange" v-model="emailsId" :label="index+1"></el-checkbox></div>
                    <div class="email-fromAddress"><strong>{{ item.fromAddress }}</strong></div>
                    <div @click="toRead(index)" class="email-subject"><i class="el-icon-message" style="margin-right:5px;"></i><strong>{{ item.subject }}</strong></div>
                    <div class="email-date">{{ item.date }}</div>
                </div>
                <!-- {{ emailsId }} -->
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    inject: ['reload'],
    name: 'receiveContent',
    data () {
        return {
            t: true,
            // index: 0,
            numNot: 0,
            returnFlag: 'receive',
            receiveFont: 'bold 25px STXinwei',
            sendedFont: '',
            emails: [
                {
                    fromAddress: '张三',
                    subject: 'Hello Email',
                    date: '2018-10-18 21:37',
                    text: 'Hello Email||Hello Email||Hello Email||Hello Email||Hello Email||'
                },
                {
                    fromAddress: '李四',
                    subject: 'Hello Vue',
                    date: '2018-10-18 21:37',
                    text: 'Hello Vue||Hello Vue||Hello Vue||Hello Vue||Hello Vue||Hello Vue||Hello Vue||'
                },
                {
                    fromAddress: '王五',
                    subject: 'Hello ES6',
                    date: '2018-10-18 21:37',
                    text: 'Hello ES6||Hello ES6||Hello ES6||Hello ES6||Hello ES6||Hello ES6||Hello ES6||'
                },
            //     {
            //         fromAddress: 'Wang5',
            //         subject: 'Hello Email',
            //         date: '2018-10-18 21:37'
            //     },
            ],
            a_email:{
                text: '',
                fromAddress: '',
                date: '',
                subject: '',
                attachmentName: '',
                attachmentLink: ''
            },
            isIndeterminate: false,
            checkAll: false,
            emailsId:[]
        }
    },
    computed: {
        numAll(){
            return this.emails.length;
        }
    },
    methods: {
        toSended(){
            [this.returnFlag,this.receiveFont,this.sendedFont] = ['sended','','bold 25px STXinwei'];
            // this.returnFlag = 'sended';
            var receive = document.getElementById('receive');
            var read = document.getElementById('read');
            var sended = document.getElementById('sended');
            [receive.style.display,read.style.display,sended.style.display] = ['none','none','grid'];
        },
        toReceive(){
            [this.returnFlag,this.receiveFont,this.sendedFont] = ['receive','bold 25px STXinwei',''];
            // this.returnFlag = 'receive';
            // this.receiveFont = 'bold 25px arial';
            // this.sendedFont = ''
            var receive = document.getElementById('receive');
            var read = document.getElementById('read');
            var sended = document.getElementById('sended');
            [receive.style.display,read.style.display,sended.style.display] = ['grid','none','none'];
        },
        toRead(indexs){
            // this.index = indexs;
            var receive = document.getElementById('receive');
            var read = document.getElementById('read');
            var sended = document.getElementById('sended');
            [receive.style.display,read.style.display,sended.style.display] = ['none','grid','none'];
            this.a_email.text = this.emails[indexs].text;
            this.a_email.fromAddress = this.emails[indexs].fromAddress;
            this.a_email.subject = this.emails[indexs].subject;
            this.a_email.attachmentName = this.emails[indexs].attachmentName;
            this.a_email.attachmentLink = this.emails[indexs].attachmentLink;
            this.a_email.date = this.emails[indexs].date;
        },
        toReturn(){
            var receive = document.getElementById('receive');
            var read = document.getElementById('read');
            var sended = document.getElementById('sended');
            if(this.returnFlag == 'receive'){
                [receive.style.display,read.style.display,sended.style.display] = ['grid','none','none'];
            }else if(this.returnFlag == 'sended'){
                [receive.style.display,read.style.display,sended.style.display] = ['none','none','grid'];
            }
        },
        download(){
            window.open('http://192.168.43.166:8080/Mail/'+this.a_email.attachmentLink);
        },
        refresh(){
            this.$http.get('http://192.168.43.166:8080/Mail/getAllReceiveMails.action',
            {timeout:5000}
            )
            .then((res)=>{
                // console.log(document.cookie);
                // console.log(res);
                if(res.data){
                    this.emails = [];
                    res.data.forEach((item,index)=>{
                        console.log(item.fromAddress);
                        console.log(item.fromAddress.indexOf(' '));
                        // item.emails = [];
                        item.fromAddress = item.fromAddress.substring(1,item.fromAddress.indexOf(' ')-1);
                        this.emails.push(res.data[index]);
                        // console.log(this.emails[index].fromAddress);
                        // this.emails[index].fromAddress.substring(1,this.emails[index].fromAddress.index(' '));
                        // console.log(this.emails[index].fromAddress);
                    })
                    console.log("收件箱信息接收成功。");
                    console.log(res.data);
                    console.log('----------------------------------以上是收件箱信息获取----------------------------------');
                }
                else{
                    console.log("收件箱信息接收失败");
                }
            })
            .catch((err)=>{
                console.log("收件箱信息请求超时。");
                // this.$router.push({path:'/'});
            })
        },
        sorryMessage(){
            this.$message({
                type: 'error',
                message: '对不起，暂无数据。',
                showClose: true
            });
        },
        handleCheckedEmailsChange(){
            if(this.emailsId.length == this.emails.length){
                this.isIndeterminate = false;
                this.checkAll = true;
            }
            else if(this.emailsId.length == 0){
                this.isIndeterminate = false;
                this.checkAll = false;
            }
            else{
                this.isIndeterminate = true;
            }
        },
        handleCheckAllChange(){
            this.isIndeterminate = false;
            if(this.checkAll){
                this.emails.forEach((item,index)=>this.emailsId.push(index+1));
            }
            else{
                this.emailsId = [];
            }
        },
        deleteEmails(){
            var con = false;
            if(this.emailsId.length){
                con = confirm('您确定要删除选中内容？');
            }
            if(con){
                // if(this.emailsId.length == this.emails.length){
                //     this.emails = [];
                //     this.$message({
                //         type: 'success',
                //         showClose: true,
                //         message: '您已成功删除所有邮件。'
                //     });
                // }
                // else{
                    var num = 1;
                    // var arr = [];
                    // this.emailsId.forEach((item)=>{
                    //     arr.push(item);
                    // })
                    var arr = [...this.emailsId]
                    arr.sort((a,b)=>b-a);
                    // console.log(arr);
                    arr.forEach((item)=>{
                        this.emailsId.splice(0,1);
                        this.emails.splice(item-1,1);
                    });
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '您已成功删除所选邮件。'
                    });
                // }
                this.isIndeterminate = false;
                this.checkAll = false;
            }
            
        }
    },
    mounted(){
        // var querystring = require('querystring');
        var read = document.getElementById('read');
        var receive = document.getElementById('receive');
        var sended = document.getElementById('sended');
        read.style.display = 'none';
        receive.style.display = 'grid';
        sended.style.display = 'none';
        this.$http.get('http://192.168.43.166:8080/Mail/getAllReceiveMails.action',
        {timeout:5000}
        )
        .then((res)=>{
            // console.log(document.cookie);
            // console.log(res);
            if(res.data){
                res.data.forEach((item,index)=>{
                    console.log(item.fromAddress);
                    console.log(item.fromAddress.indexOf(' '));
                    // item.emails = [];
                    item.fromAddress = item.fromAddress.substring(1,item.fromAddress.indexOf(' ')-1);
                    this.emails.push(res.data[index]);
                    // console.log(this.emails[index].fromAddress);
                    // this.emails[index].fromAddress.substring(1,this.emails[index].fromAddress.index(' '));
                    // console.log(this.emails[index].fromAddress);
                })
                console.log("收件箱信息接收成功。");
                console.log(res.data);
                console.log('----------------------------------以上是收件箱信息获取----------------------------------');
            }
            else{
                console.log("收件箱信息接收失败");
            }
        })
        .catch((err)=>{
            console.log("收件箱信息请求超时。");
        })
    }
}
</script>

<style lang="scss" scoped>
    .receive-content-whole{
        display: grid;
        grid-template: 1fr / 1fr 6fr;
        width: 100%;
        height: 100%;
        .receive-content-left{
            user-select: none;
            border-right: 1px solid #C0C0C0;
            font-size: 13px;
            text-align:left;
            // float: left;
            li{
                list-style: none;
                margin: 20px 10px;
                cursor: pointer;
            }
            li:hover{
                transform: scale(1.1);
                color: #3399FF;
            }
        }
        .receive-content-receive,.receive-content-sended{
            display: grid;
            grid-template: 1fr 15fr / 1fr;
            .operate{
                border-bottom: 1px solid #C0C0C0;
                li{
                    list-style: none;
                    float: left;
                    border: 1px solid gray;
                    background-color: #F5F5DC;
                }
                .checkAll,.delete,.report,.others,.refresh{
                    float: left;
                    margin: 5px 10px;
                }
                .checkAll,.others{
                    margin-top: 15px;
                    user-select: none;
                }
            }
            .emails{
                // border: 1px solid skyblue;
                .emails-msg{
                    // float: left;
                    text-align: left;
                    font-size: 10px;
                    color: #A9A9A9;
                    margin-bottom: 10px;
                }
                .emails-email{
                    height: 20px;
                    border-bottom: 1px solid gray;
                    font-size: 10px;
                    cursor: pointer;
                    display: grid;
                    grid-template: 1fr / 1fr 2fr 5fr 2fr;
                    .email-fromAddress,.email-subject{
                        margin-top: 5px;
                        text-align: left;
                    }
                    .email-date{
                        margin-top: 10px;
                        text-align: right;
                    }
                    .email-fromAddress strong:hover{
                        color: #3399FF;
                    }
                    .email-subject strong:hover{
                        color: #3399FF;
                    }
                }
                .emails-email:hover{
                    background: #F5F5DC;
                }
            }
        }
        .receive-content-read{
            display: grid;
            grid-template: .5fr 2fr 1fr 8fr / 1fr;
            // div{
            //     border: 1px solid black;
            // }
            .read-button{
                display: flex;
                justify-content: left;
                margin: 2px 0 0 5px;
            }
            .read-info{
                // display: flex;
                // justify-content: left;
                text-align: left;
                font-size: 15px;
                li{
                    margin: 5px 0 0 10px;
                    list-style: none;
                }
            }
            .read-attachments{
                font-size: 12px;
                display: flex;
                justify-content: left;
                span{
                    margin: 8px 0 0 10px;
                }
                .attachment-link:hover{
                    color: #3399FF;
                    cursor: pointer;
                    user-select: none;
                }
            }
            .read-text{
                background-color: #FFFAFA;
                width: 80%;
                text-align: left;
                word-wrap: break-word;
                margin: 0 auto;
                border-radius: 20px;
                p{
                    text-indent: 2em;
                }
            }
        }
    }
</style>

