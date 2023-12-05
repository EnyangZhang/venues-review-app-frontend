
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
<div>


  <div v-if="login">
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">



            <MenuItem name="1">
              <Button type="primary" @click="modal = true">Add Venue</Button>
              <Modal
                v-model="modal"
                title="Post Venue"
                @on-ok="ok"
                @on-cancel="cancel"
                ok-text="Save">

              <Form :model="venueInfo" label-position="top">
                <div v-if="errorFlag" style="color: #ff0000;">
                  {{error}}
                </div>
                <FormItem label="Venue name">
                  <Input v-model="venueInfo.VN"></Input>
                  <div v-if="VNFlag" style="color: #ff0000;">
                    {{VNError}}
                  </div>
                </FormItem>


                  <FormItem label="Category">
                    <Select v-model="venueInfo.CA" style="width:200px">
                      <Option v-for="cate in this.categorys" :value="cate.categoryId" :key="cate.categoryId">{{ cate.categoryName }}</Option>
                    </Select>
                  </FormItem>

                    <FormItem label="short description">
                      <Input v-model="venueInfo.SD"></Input>
                      <div v-if="SDFlag" style="color: #ff0000;">
                        {{SDError}}
                      </div>
                    </FormItem>

                      <FormItem label="Long description">
                        <Input v-model="venueInfo.LD"></Input>
                        <div v-if="LDFlag" style="color: #ff0000;">
                          {{LDError}}
                        </div>
                      </FormItem>

                        <FormItem label="City">
                          <Input v-model="venueInfo.CT"></Input>
                          <div v-if="CTFlag" style="color: #ff0000;">
                            {{CTError}}
                          </div>
                        </FormItem>

                          <FormItem label="Address">
                            <Input v-model="venueInfo.AD"></Input>
                            <div v-if="ADFlag" style="color: #ff0000;">
                              {{ADError}}
                            </div>
                          </FormItem>

                            <FormItem label="Latitude">
                              <Input v-model="venueInfo.LA"></Input>
                              <div v-if="LAFlag" style="color: #ff0000;">
                                {{LAError}}
                              </div>
                            </FormItem>

                              <FormItem label="Longitude">
                                <Input v-model="venueInfo.LO"></Input>
                                <div v-if="LOFlag" style="color: #ff0000;">
                                  {{LOError}}
                                </div>
                              </FormItem>

              </Form>
                <Button type="primary" @click="checkInput">Submit</Button>

              </Modal>


            </MenuItem>




            <MenuItem name="2">


              <Icon type="ios-keypad"></Icon>
              <Button type="primary" @click="modal2 = true">Modify user info</Button>
              <Modal
                v-model="modal2"
                title="Modify Venue"
                @on-ok="ok2"
                @on-cancel="cancel2"
                ok-text="Save">

                <Form :model="userModInfo" label-position="top">
                  <div v-if="errorFlag" style="color: #ff0000;">
                    {{error}}
                  </div>
                  <FormItem label="Given name">
                    <Input v-model="userModInfo.GN"></Input>
                    <div v-if="GNFlag" style="color: #ff0000;">
                      {{GNError}}
                    </div>
                  </FormItem>

                  <FormItem label="Family name">
                    <Input v-model="userModInfo.FN"></Input>
                    <div v-if="FNFlag" style="color: #ff0000;">
                      {{FNError}}
                    </div>
                  </FormItem>


                  <FormItem label="Current password">
                    <Input v-model="userModInfo.OPW" type="password"></Input>
                    <div v-if="OPWFlag" style="color: #ff0000;">
                      {{OPWError}}
                    </div>
                  </FormItem>

                  <FormItem label="New password">
                    <Input v-model="userModInfo.PW" type="password"></Input>
                    <div v-if="PWFlag" style="color: #ff0000;">
                      {{PWError}}
                    </div>
                  </FormItem>

                  <FormItem label="Comfirm your password">
                    <Input v-model="userModInfo.PWA" type="password"></Input>
                    <div v-if="PWAFlag" style="color: #ff0000;">
                      {{PWAError}}
                    </div>
                  </FormItem>

                </Form>


                <Button type="primary" @click="checkInputUser">Submit</Button>

              </Modal>

            </MenuItem>
            <MenuItem name="3">

            </MenuItem>
            <MenuItem name="4">
              <Icon type="md-exit" />
              <Button type="primary" :to="{name: 'home'}">
                Home
              </Button>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
        <card>
          <Table border :columns="columns2" :data="userDate"></Table>

        </card>
        <card>
          Select a user photo to upload
          <input type="file" accept=".jpeg,.jpg,.png" id="userPhoto">
          <Button type="primary" @click="upLoad">Upload</Button>
          <Button type="primary" @click="deletePhoto">delete</Button>

        </card>
        <card>
          <Table border :columns="columns1" :data="processed"></Table>
        </card>
      </Content>

      <Footer class="layout-footer-center">Assignment 2</Footer>
    </Layout>
  </div>
  </div>

  <div v-else="login">

    Please login

  </div>

</div>
</template>

<script>
    export default {
      data() {
        return {
          modal2:false,
          GNFlag: false,
          GNError: '',
          FNFlag: false,
          FNError: '',
          OPWFlag:false,
          OPWError:'',
          PWFlag:false,
          PWError:'',
          PWAFlag:false,
          PWAError:'',
          errorUser: '',
          errorFlagUser: false,


          dataUser:{},
          userModInfo:{
            GN:'',
            FN:'',
            OPW:'',
            PW:'',
            PWA:'',
          },


          userDate:[],
          photoFlag:true,
          url:'',
          columns2: [
            {
              title: 'User name',
              key: 'username'
            },
            {
              title: 'Given name',
              key: 'givenName'
            },
            {
              title: 'Family name',
              key: 'familyName'
            },
            {
              title: 'Email address',
              key: 'email'
            },

            {
              title: 'Profile photo',
              key:'photo',
              width: '200px;',
              render:(h) => {
                return h('img', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  attrs: {
                    src: this.url, style: 'width: 120px; height: 120px;'
                  },
                  style: {

                  }
                })
              }
            },
          ],

          venueCategory:[
          ],
          categorys: [
          ],
          data1:{},
          login: false,
          modal:false,
          VNFlag:false,
          VNError:'',
          CAFlag:false,
          CAError:'',
          SDFlag:false,
          SDError:'',
          LDFlag:false,
          LDError:'',
          CTFlag:false,
          CTError:'',
          ADFlag:false,
          ADError:'',
          LAFlag:false,
          LAError:'',
          LOFlag:false,
          LOError:'',
          error:'',
          errorFlag: false,

          venueInfo:{
            VN:'',
            CA:'',
            SD:'',
            LD:'',
            CT:'',
            AD:'',
            LA:'',
            LO:''
          },
          columns1: [
            {
              title: 'Details',
              key:'venueId',
              width: 80,
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.jumpToDetail(params.index);
                      }
                    }
                  }, 'Modify')])}
            },
            {
              title: 'Venue name',
              key: 'venueName'
            },
            {
              title: 'Category',
              key: 'categoryName'
            },
            {
              title: 'City',
              key: 'city'
            },
            {
              title: 'Mean star rating',
              key: 'meanStarRating'
            },
            {
              title: 'Mode cost rating',
              key: 'modeCostRating'
            },

            {
              title: 'Venue photo',
              key:'photo',
              width: '200px;',
              render:(h, params) => {
                return h('img', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  attrs: {
                    src: this.photoUrl(params.index), style: 'width: 100px; height: 100px;'
                  },
                  style: {

                  }
                })
              }
            },
          ],
          location: {},
          permitToloc:false,
          venue:[
            ],

          data:[],
          processed:[],
          reqQuary:{}

        }
        },
      mounted: function () {
        this.logincheck();
        this.userPhotoUrl();
        this.getVenueCategory();
        this.getVenue();
        this.getLocation();
        this.getUser();

      },
      methods: {
        upLoad: function(){
          let file = document.getElementById("userPhoto").files[0];
          if(file === undefined){
            alert("Please attach valid photo")
          }else if((file.size/1024/1024/10) > 2){
            alert("Too large")
          }
          else {
            this.$http.put('http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId + '/photo', file,{headers: {
              "content-type": file.type,
              "X-Authorization": this.$cookies.get('user').token}} )
              .then(function(){
                alert("Photo upload succeed")
                window.location.reload();
              })
          }
        },
        deletePhoto: function(){
          this.$http.delete('http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId + '/photo', {headers: {"X-Authorization": this.$cookies.get('user').token}} )
            .then(function(){
              alert("Delete succeed")
              window.location.reload();

            }, function(error){
              alert("Fail deleting")
            })
        },
        getUser: function(){
          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId, {headers: {"X-Authorization": this.$cookies.get('user').token}})
            .then(function(response){
              this.userDate.push(response.data);

            })
        },
        userPhotoUrl: function(){
          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId + '/photo')
            .then(function(response){
              this.photoFlag = true;
              this.setUrl();
            }, function(error){
              this.photoFlag = false;
              this.setUrl();
            })
        },
        setUrl: function(){
          if(this.photoFlag === true) {
           this.url =  'http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId + '/photo';
          } else {
            this.url = '/src/photos/default.png';
          }
        },
        ok2() {
          this.$Message.info('Your input been saved');

        },
        cancel2() {
          this.$Message.info('Your input been reset');
          this.userModInfo = {
            GN:'',
            FN:'',
            OPW:'',
            PW:'',
            PWA:'',
          };
            this.GNFlag= false;
            this.FNFlag= false;
            this.OPWFlag=false;
            this.PWFlag=false;
            this.PWAFlag=false;
            this.errorFlagUser= false;


        },
        checkInputUser: function(){
          this.GNFlag= false;
          this.FNFlag= false;
          this.OPWFlag=false;
          this.PWFlag=false;
          this.PWAFlag=false;
          this.errorFlagUser= false;
          this.dataUser = {};

          if (this.userModInfo.GN !== '') {
            this.dataUser.givenName = this.userModInfo.GN;
          }

          if (this.userModInfo.FN !== '') {
            this.dataUser.familyName = this.userModInfo.FN;
          }

          if (this.userModInfo.OPW !== '') {
            if(this.$cookies.get('user').PW != this.userModInfo.OPW) {
              this.OPWFlag = true;
              this.OPWError = 'Wrong password';
            }
          }


          if (this.userModInfo.PW !== '') {
          }

          if(this.userModInfo.OPW === '' && this.userModInfo.PW === '' && this.userModInfo.PWA === ''){

          } else if(this.userModInfo.OPW !== '' && this.userModInfo.PW === '' && this.userModInfo.PWA === '') {
            this.PWFlag = true;
            this.PWError = 'Please enter new password'
          }
          else if(this.userModInfo.OPW === ''){
            this.OPWFlag = true;
            this.OPWError = 'Please enter current password first';
          } else if (this.userModInfo.OPW !== '' && this.OPWFlag != true && this.userModInfo.PW !== '' && this.userModInfo.PW == this.userModInfo.PWA) {
            this.dataUser.password = this.userModInfo.PWA
          } else if (this.userModInfo.PW != this.userModInfo.PWA) {
            this.PWAFlag = true;
            this.PWAError = 'Password not matches'
          }

          if(!this.GNFlag && !this.FNFlag && !this.EAFlag && !this.OPWFlag && !this.PWFlag && !this.PWAFlag){
            this.postchange();
          }

        },

        postchange: function() {
          this.$http.patch('http://127.0.0.1:4941/api/v1/users/' + this.$cookies.get('user').userId, this.dataUser, {headers: {"X-Authorization": this.$cookies.get('user').token}})
            .then(function(){
              this.modal2 = false;
              alert('submit succeed');
              window.location.reload();
            }, function(error){
              this.errorUser='Invalid input';
              this.errorFlagUser = true;
            })
        },

        ok() {
          this.$Message.info('Your input been saved');

        },
        cancel() {
          this.$Message.info('Your input been reset');
          this.venueInfo = {
            VN: '',
            CA: '',
            SD: '',
            LD: '',
            CT: '',
            AD: '',
            LA: '',
            LO: '',
          };
          this.VNFlag = false;
          this.CAFlag = false;
          this.SDFlag = false;
          this.LDFlag = false;
          this.CTFlag = false;
          this.ADFlag = false;
          this.LAFlag = false;
          this.LOFlag = false;
          this.errorFlag = false;
        },
        getVenueCategory:function() {
          this.$http.get('http://127.0.0.1:4941/api/v1/categories')
            .then(function (response) {
              this.venueCategory = response.data;
            })
              .then(function(){
                this.getCategorys();
              })
        },
        getCategorys: function() {
          this.categorys = [];
          for(var i = 0; i < this.venueCategory.length; i++){
            this.categorys.push({"categoryName" : this.venueCategory[i].categoryName,
                                  "categoryId" : this.venueCategory[i].categoryId});
          }
        },
        getVenue:function() {
          this.$http.get('http://127.0.0.1:4941/api/v1/venues', {params: {"adminId": this.$cookies.get('user').userId}})
            .then(function (response) {
              this.venue = response.data;
              this.processData();// venue data
              this.processed = this.data;
            });
        },
        processData: function(){
          this.data = [];
          for(var i = 0; i < this.venue.length; i++){
            for(var j = 0; j < this.venueCategory.length; j++) {
              if(this.venue[i].categoryId === this.venueCategory[j].categoryId) {
                let data = {
                  "venueId": this.venue[i].venueId,
                  "primaryPhoto": this.venue[i].primaryPhoto,
                  "venueName": this.venue[i].venueName,
                  "categoryName": this.venueCategory[j].categoryName,
                  "city": this.venue[i].city,
                  "meanStarRating": this.venue[i].meanStarRating,
                  "modeCostRating": this.venue[i].modeCostRating
                };

                if(this.permitToloc){
                  data.distance = this.venue[i].distance;
                }
                this.data.push(data);
                break;
              }
            }
          }
          for(var i = 0; i < this.data.length; i++){
            if(this.data[i].meanStarRating == null){
              this.data[i].meanStarRating = 3;
            }
            if(this.data[i].modeCostRating == null || this.data[i].modeCostRating === 0){
              this.data[i].modeCostRating = 'Free';
            } else if(this.data[i].modeCostRating === 1){
              this.data[i].modeCostRating = '$';
            } else if(this.data[i].modeCostRating === 2){
              this.data[i].modeCostRating = '$$';
            } else if(this.data[i].modeCostRating === 3){
              this.data[i].modeCostRating = '$$$';
            } else if(this.data[i].modeCostRating === 4){
              this.data[i].modeCostRating = '$$$$';
            }
          }

        },
        getLocation: function(){
          this.$getLocation({
            enableHighAccuracy: false, //defaults to false
            timeout: Infinity, //defaults to Infinity
            maximumAge: 0 //defaults to 0
          })
            .then(coordinates => {
              this.location = {
                "lat": coordinates.lat,
                "lng": coordinates.lng
              };
              this.permitToloc = true;
              this.quaryDecider();
              this.columns1 = [
                {
                  title: 'Details',
                  key:'venueId',
                  width: 80,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.jumpToDetail(params.index)
                          }
                        }
                      }, 'View')])}
                },
                {
                  title: 'Venue name',
                  key: 'venueName'
                },
                {
                  title: 'Category',
                  key: 'categoryName'
                },
                {
                  title: 'City',
                  key: 'city'
                },
                {
                  title: 'Mean star rating',
                  key: 'meanStarRating'
                },
                {
                  title: 'Mode cost rating',
                  key: 'modeCostRating'
                },
                {
                  title: 'Distance',
                  key:"distance",
                },
                {
                  title: 'Photo',
                  key:'photo',
                  width: '200px;',
                  render:(h, params) => {
                    return h('img', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      attrs: {
                        src: this.photoUrl(params.index), style: 'width: 100px; height: 100px;'
                      },
                      style: {

                      }
                    })
                  }
                },
              ];
            });


        },
        photoUrl: function(index){
          if(this.processed[index].primaryPhoto === null){
            return '/src/photos/default.png'
          } else {
            return 'http://127.0.0.1:4941/api/v1/venues/' + this.processed[index].venueId + '/photos/' + this.processed[index].primaryPhoto
          }
        },
        quaryDecider: function(){
          this.reqQuary = {};


          if(this.permitToloc) {
            this.reqQuary.myLatitude = this.location.lat;
            this.reqQuary.myLongitude = this.location.lng;
          }

          this.reqQuary.adminId = this.$cookies.get('user').userId;
          this.quaryData();
        },
        quaryData:function() {
          this.$http.get('http://127.0.0.1:4941/api/v1/venues' , {params: this.reqQuary})
            .then(function (response) {
              this.venue = response.data;
              this.processData();
              this.processed = this.data;
            });
        },
        jumpToDetail (index) {
          this.$router.push({name :"myvenue",  params:{venueId: this.processed[index].venueId}});
        },
        logincheck: function () {
          if (this.$cookies.get('user') === null) {
            this.login = false;
          } else {
            this.login = true;
          }
        },
        checkInput: function () {
          this.VNFlag = false;
          this.CAFlag = false;
          this.SDFlag = false;
          this.LDFlag = false;
          this.CTFlag = false;
          this.ADFlag = false;
          this.LAFlag = false;
          this.LOFlag = false;
          this.errorFlag = false;

          if (this.venueInfo.VN === '') {
            this.VNFlag = true;
            this.VNError = 'Empty venue name'
          }

          if (this.venueInfo.CA === '') {
            this.CAFlag = true;
            this.CAError = 'Empty category'
          }

          if (this.venueInfo.SD === '') {
            this.SDFlag = true;
            this.SDError = 'Empty short description'
          }

          if (this.venueInfo.LD === '') {
            this.LDFlag = true;
            this.LDError = 'Empty Long description'
          }

          if (this.venueInfo.CT === '') {
            this.CTFlag = true;
            this.CTError = 'Empty city'
          }

          if (this.venueInfo.AD === '') {
            this.ADFlag = true;
            this.ADError = 'Empty address'
          }

          if (this.venueInfo.LA === '' ) {
            this.LAFlag = true;
            this.LAError = 'Empty latitude'
          } else if( isNaN(parseInt(this.venueInfo.LA)) ){
            this.LAFlag = true;
            this.LAError = 'Please enter number'
          } else if(parseInt(this.venueInfo.LA) > 90){
            this.LAFlag = true;
            this.LAError = 'Please enter number less or equal then 90'
          }

          if (this.venueInfo.LO === '' ) {
            this.LOFlag = true;
            this.LOError = 'Empty longitude'
          } else if( isNaN(parseInt(this.venueInfo.LO))){
            this.LOFlag = true;
            this.LOError = 'Please enter number'
          } else if(parseInt(this.venueInfo.LO) > 180){
            this.LOFlag = true;
            this.LOError = 'Please enter number less or equal then 180'
          }

          if (!this.VNFlag && !this.CAFlag && !this.SDFlag && !this.LDFlag && !this.CTFlag && !this.ADFlag&& !this.LAFlag&& !this.LOFlag && ! this.errorFlag) {
            this.processInput();
          }
        },
        processInput: function(){
          this.data1 = {};
          this.data1.venueName=this.venueInfo.VN;
          this.data1.categoryId = this.venueInfo.CA;
          this.data1.shortDescription = this.venueInfo.SD;
          this.data1.longDescription = this.venueInfo.LD;
          this.data1.city = this.venueInfo.CT;
          this.data1.address = this.venueInfo.AD;
          this.data1.latitude = parseInt(this.venueInfo.LA);
          this.data1.longitude = parseInt(this.venueInfo.LO);
          this.register(this.data1);
        },
        register: function (data) {
          this.$http.post('http://127.0.0.1:4941/api/v1/venues',data , {headers: {"X-Authorization": this.$cookies.get('user').token}})
            .then(function () {
              this.modal = false;
              alert('submit succeed');
              window.location.reload();

            }, function (error) {
              this.error = "Invalid input";
              this.errorFlag = true;

            })
        },
      }
    }
</script>

<style scoped>

</style>
