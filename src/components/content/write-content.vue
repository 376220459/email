<template>
    <div class="write-content-whole">
        <div class="write-button">
            <el-button @click="send" size="mini" type="success"><i class="el-icon-success"></i>发送</el-button>
            <el-button size="mini" type="primary"><i class="el-icon-warning"></i>存草稿</el-button>
            <el-button size="mini" type="warning"><i class="el-icon-error"></i> 取消</el-button>
        </div>
        <div class="write-info">
            <div id="receiveMan">
                <span>收件人：</span><input id="receiveMans" autofocus="autofocus" @focus="focusColor('receiveMan')" @blur="blurColor('receiveMan')" maxlength="15" type="text">
            </div>
            <div id="theme">
                <span>主题：</span><input id="themes" @focus="focusColor('theme')"  @blur="blurColor('theme')" maxlength="30" type="text">
            </div>
        </div>
        <div class="write-attachments">
            <form class="attachments" enctype="multipart/form-data" method="post">
                <span>
                    <i class="el-icon-upload"></i>添加附件：<span style="color:#A9A9A9">（最大3G）</span>
                </span>
                <input id="file" style="color:red" type="file" accept="*"/>
            </form>
        </div>
        <div class="write-content">
            <textarea id="text" class="textarea" placeholder="正文内容" wrap="hard" name="" cols="200%" rows="35%"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: 'writeContent',
    data () {
        return{
            receiveMans: '',
            themes: '',
            text: ''
        }
    },
    methods: {
        focusColor(divId){
            var divId = document.getElementById(divId);
            divId.style.borderBottom = '1px solid #5F9EA0';
        },
        blurColor(divId){
            var divId = document.getElementById(divId);
            divId.style.borderBottom = '1px solid #F0FFFF';
        },
        send(){
            var querystring = require('querystring');
            var receiveMans = document.getElementById('receiveMans');
            var themes = document.getElementById('themes');
            var text = document.getElementById('text');
            var file = document.getElementById('file');
            var formdata = new FormData();
            formdata.append('file',file.files[0]);
            formdata.append('toAddress',receiveMans.value);//encodeURIComponent()
            formdata.append('subject',themes.value);
            formdata.append('text',text.value);
            if(receiveMans.value == '' || themes.value == '' || text.value == ''){
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '请完整填写发送信息！'
                });
                return;
            }
            this.$http.post('http://192.168.43.166:8080/FileUpLoader/FileUpLoader',
            formdata,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;multipart/form-data;boundary=----WebKitFormBoundaryrAduLoDuMV1CvTtV'
                }
            },
            // querystring.stringify({
            //     toAddress: receiveMans.value,
            //     subject: themes.value,
            //     text: text.value
            // }),
            {timeout: 5000}
            )
            .then((res)=>{
                console.log(res);
                if(res.data){
                    console.log('发送成功。');
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '发送成功'
                    });
                }
            })
            .catch((err)=>{
                console.log('请求出错。');
                console.log(err);
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '请求出错，请稍后再试'
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .write-content-whole{
        width: 85%;
        height: 100%;
        display: grid;
        grid-template: 2fr 2fr 1fr 18fr / 1fr;
        margin: auto;
        // div{
        //     border: 1px solid black;
        // }
        .write-button{
            button{
                float: left;
                margin: 5px 10px 0 0;
            }
        }
        .write-info{
            div{
                width: 100%;
                font-size: 10px;
                margin: 5px 0 0 0;
                border-bottom: 1px solid #F0FFFF;
                display: flex;
                justify-content: left;
                input{
                    border: none;
                    outline:none;
                    background: none;
                    width: 95%;
                }
            }
        }
        
        .write-attachments{
            .attachments{
                float: left;
                font-size: 10px;
                margin-left: 6px;
            }
        }
        .write-content{
            .textarea{
                margin-top: 10px;
                resize: none;
            }
        }
    }
</style>
