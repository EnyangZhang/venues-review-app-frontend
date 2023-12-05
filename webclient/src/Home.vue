
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 600px;
    margin: 0 auto;
    margin-right: 0px;
  }
  .layout-footer-center{
    text-align: center;
  }


</style>
<template>




  <div class="layout">

    <div v-if="login">

      <Layout>

        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">

            <div class="layout-nav">
              <MenuItem name="1">
                <Button type="primary" :to="{name: 'myvenues'}">My info</Button>
              </MenuItem>
              <MenuItem name="2">

              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-contact" />
                <Button type="primary" @click="logout">
                  Logout
                </Button>
              </MenuItem>
              <MenuItem name="4">
                <Icon type="md-exit" />
                <Button type="primary" :to="{name: 'venues'}">
                  Venues
                </Button>
              </MenuItem>
            </div>
          </Menu>
        </Header>


        <Content :style="{margin: '20px 20px 0', background: '#fff', minHeight: '500px'}">
          <div>
            <img src= "/src/photos/back.jpg"/>
          </div>
        </Content>
        <Footer class="layout-footer-center">Seng365 Assignment2</Footer>
      </Layout>

    </div>

    <div v-else>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">

          <div class="layout-nav">
            <MenuItem name="1">

              <Button type="primary" @click="modal1 = true" >Register</Button>
              <Modal
                v-model="modal1"
                title="Register yourself"
                @on-ok="ok"
                @on-cancel="cancel"
                ok-text="Save">

                <Form :model="infoInput" label-position="top">
                  <FormItem label="Given name">
                    <Input v-model="infoInput.GN"></Input>
                    <div v-if="GNFlag" style="color: #ff0000;">
                      {{GNError}}
                    </div>
                  </FormItem>
                  <FormItem label="Family name">
                    <Input v-model="infoInput.FN"></Input>
                    <div v-if="FNFlag" style="color: #ff0000;">
                      {{FNError}}
                    </div>
                  </FormItem>
                  <FormItem label="User name">
                    <Input v-model="infoInput.UN"></Input>
                    <div v-if="UNFlag" style="color: #ff0000;">
                      {{UNError}}
                    </div>
                    <div v-if="errorFlag" style="color: #ff0000;">
                      {{error}}
                    </div>
                  </FormItem>
                  <FormItem label="Email address">
                    <Input v-model="infoInput.EA"></Input>
                    <div v-if="EAFlag" style="color: #ff0000;">
                      {{EAError}}
                    </div>
                    <div v-if="errorFlag" style="color: #ff0000;">
                      {{error}}
                    </div>
                  </FormItem>

                  <FormItem label="Password">
                    <Input v-model="infoInput.PW" type="password"></Input>
                    <div v-if="PWFlag" style="color: #ff0000;">
                      {{PWError}}
                    </div>
                  </FormItem>

                  <FormItem label="Confirmation">
                    <Input v-model="infoInput.PWA" type="password"></Input>
                    <div v-if="PWAFlag" style="color: #ff0000;">
                      {{PWAError}}
                    </div>
                  </FormItem>
                </Form>

                <Button type="primary" @click="checkInput">Register</Button>

              </Modal>

            </MenuItem>
            <MenuItem name="2">

            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-contact" />


              <Button type="primary" @click="modal2 = true">Login</Button>
              <!--"modal2 = true"-->
              <Modal
                v-model="modal2"
                title="Common Modal dialog box title"
                @on-ok="ok2"
                @on-cancel="cancel2"
              ok-text="Save">

                <Form :model="userPw" label-position="top">

                  <div v-if="loginFlag" style="color: #ff0000;">
                    {{error}}
                  </div>

                  <FormItem label="User name or Email address">
                    <Input v-model="userPw.UN"></Input>
                  </FormItem>

                  <FormItem label="Password">
                    <Input v-model="userPw.PW" type="password"></Input>
                  </FormItem>

                </Form>


                <Button type="primary" @click="loginUser">Login</Button>
              </Modal>



            </MenuItem>
            <MenuItem name="4">
              <Icon type="md-exit" />
              <Button type="primary" :to="{name: 'venues'}">
                Venues
              </Button>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '20px 20px 0', background: '#fff', minHeight: '500px'}">
        <Card>

          <img src= "/src/photos/back.jpg"/>

        </Card>
      </Content>
      <Footer class="layout-footer-center">Seng365 Assignment2</Footer>
    </Layout>
    </div>
  </div>


</template>
<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        login: false,
        loginInfo: {},

        GNFlag: false,
        GNError: '',
        FNFlag: false,
        FNError: '',
        UNFlag: false,
        UNError: '',
        EAFlag: false,
        EAError: '',
        PWFlag: false,
        PWError: '',
        PWAFlag: false,
        PWAError: '',

        modal1: false,
        infoInput: {
          GN: '',
          FN: '',
          UN: '',
          EA: '',
          PW: '',
          PWA: '',
        },
        loginFlag:false,
        modal2: false,
        loginInfoLg: {},
        userPw: {
          UN: '',
          PW: ''
        }
      }
    },
    mounted: function () {
      this.logincheck();
    },
    methods: {
      logincheck: function(){
        if(this.$cookies.get('user') === null){
          this.login = false;
        } else {
          this.login = true;
        }
      },
      ok() {
        this.$Message.info('Your input been saved');
      },
      cancel() {
        this.$Message.info('Your input been reset');
        this.infoInput = {
          GN: '',
          FN: '',
          UN: '',
          EA: '',
          PW: '',
          PWA: '',
        };
        this.GNFlag = false;
        this.FNFlag = false;
        this.UNFlag = false;
        this.PWFlag = false;
        this.EAFlag = false;
        this.PWAFlag = false;
        this.errorFlag = false;
      },
      ok2 () {
        this.$Message.info('saved');
      },
      cancel2 () {
        this.userPw.PW = '';
        this.userPw.UN = '';
        this.loginFlag = false;
        this.$Message.info('reset');
      },
      checkInput: function () {
        this.GNFlag = false;
        this.FNFlag = false;
        this.UNFlag = false;
        this.PWFlag = false;
        this.EAFlag = false;
        this.PWAFlag = false;
        this.errorFlag = false;

        if (this.infoInput.GN === '') {
          this.GNFlag = true;
          this.GNError = 'Empty given name'
        } else if (this.infoInput.GN.length > 64) {
          this.GNFlag = true;
          this.GNError = 'Given name should no longer then 64 characters'
        }

        if (this.infoInput.FN === '') {
          this.FNFlag = true;
          this.FNError = 'Empty family name'
        } else if (this.infoInput.FN.length > 64) {
          this.FNFlag = true;
          this.FNError = 'Family name should no longer then 64 characters'
        }

        if (this.infoInput.UN === '') {
          this.UNFlag = true;
          this.UNError = 'Empty user name'
        } else if (this.infoInput.UN.length > 64) {
          this.UNFlag = true;
          this.UNError = 'User name should no longer then 64 characters'
        }

        if (this.infoInput.EA === '') {
          this.EAFlag = true;
          this.EAError = 'Empty email address'
        } else if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.infoInput.EA)) {
          this.EAFlag = true;
          this.EAError = 'Please enter right email form'
        }

        if (this.infoInput.PW === '') {
          this.PWFlag = true;
          this.PWError = 'Empty password'
        }
        if (this.infoInput.PWA === '' && this.PWFlag === false) {
          this.PWAFlag = true;
          this.PWAError = 'Empty confirmation'
        } else if (this.infoInput.PWA !== this.infoInput.PW) {
          this.PWAFlag = true;
          this.PWAError = 'Password not matches'
        }

        if (!this.GNFlag && !this.FNFlag && !this.UNFlag && !this.EAFlag && !this.PWFlag && !this.PWAFlag) {
          this.register();
        }
      },

      register: function () {
        this.$http.post('http://127.0.0.1:4941/api/v1/users', {
          "username": this.infoInput.UN,
          "givenName": this.infoInput.GN,
          "familyName": this.infoInput.FN,
          "email": this.infoInput.EA,
          "password": this.infoInput.PW
        })
          .then(function () {
            this.modal1 = false;
            alert('Register succeed')
            this.loginRegUser();
          }, function (error) {
            this.error = "User name or email already in use";
            this.errorFlag = true;

          })
      },
      loginRegUser: function(){
        this.$http.post('http://127.0.0.1:4941/api/v1/users/login', {
          "username": this.infoInput.UN,
          "password": this.infoInput.PW
        })
          .then(function(response){
            this.loginInfo = response.data;
            this.loginInfo.PW = this.infoInput.PW;
            this.$cookies.set('user', this.loginInfo);
            window.location.reload();
          })
      },
      loginUser: function(){
        this.$http.post('http://127.0.0.1:4941/api/v1/users/login', {
          "email" : this.userPw.UN,
          "username": this.userPw.UN,
          "password": this.userPw.PW
        })
          .then(function(response){
            this.loginInfoLg = response.data;
            this.loginInfoLg.PW = this.userPw.PW;
            this.modal2 = false;
            this.$cookies.set('user', this.loginInfoLg);
            window.location.reload();

          },function (error) {
            this.error = "User name or password is invalid";
            this.loginFlag = true;
          })
          },
      logout: function(){
        this.$http.post('http://127.0.0.1:4941/api/v1/users/logout','', {headers: {"X-Authorization": this.$cookies.get('user').token}})
          .then(function(response){
            this.$cookies.remove('user');
            this.login = false;
          }, function(error){
          this.$cookies.remove('user');
        })
      }
    }
  }
</script>
