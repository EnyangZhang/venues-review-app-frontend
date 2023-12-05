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
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }


</style>
<template>

  <div v-if="login">
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <!--<div class="layout-logo">-->
          <!--<h1-->
          <!--</div>-->
          <div class="layout-nav">
            <MenuItem name="1">

              <Button type="primary" @click="modal = true">Change Venue info</Button>
              <Modal
                v-model="modal"
                title="Modify Venue"
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
                <Button type="primary" @click="Upload = true">Upload photo</Button>
                <Modal
                  v-model="Upload"
                  title="Upload venue photo"
                  @on-ok="ok2"
                  @on-cancel="cancel2"
                  ok-text="Save">

                  <Form :model="uploadPhoto" label-position="top">
                    <div v-if="this.UerrorFlag" style="color: #ff0000;">
                      {{this.Uerror}}
                    </div>

                    <FormItem label="Photo description">
                      <Input v-model="uploadPhoto.description"></Input>
                      <div v-if="descriptionFlag" style="color: #ff0000;">
                        {{descriptionError}}
                      </div>
                    </FormItem>

                    <FormItem label="Set primary">

                      <Select v-model="ifPrimary" style="width:200px">
                        <Option value="true" >true</Option>
                        <Option value="false" >false</Option>

                      </Select>

                    </FormItem>

                  <input type="file" accept=".jpeg,.jpg,.png" id="venuePhoto">

                  </Form>
                  <Button type="primary" @click="checkInputUpload">Submit</Button>

                </Modal>

            </MenuItem>
            <MenuItem name="3">

            </MenuItem>
            <MenuItem name="4">
              <Icon type="md-exit" />
              <Button type="primary" :to="{name: 'myvenues'}">
                My venues
              </Button>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '20px 20px 0', background: '#fff', minHeight: '500px'}">
        <Carousel autoplay v-model="value1" loop>

          <CarouselItem v-for='photo in photos' >
            <div class="layout-footer-center">
              <img :src="getImagePath(photo)" height="400px" width="400px" />
            </div>
          </CarouselItem>

        </Carousel>
        <table>
          <tr>
            <td>
              <div style="padding: 10px;background: #f8f8f9">
                <Card title="Details" icon="md-information-circle" :padding="0" shadow style="width: 300px;">
                  <CellGroup>

                    <!--<Cell title="Only show titles" />-->
                    <Cell title="Venue name" :label="detail.venueName" style="white-space: normal;"/>
                    <Cell title="Category" :label="detail.category.categoryName" style="white-space: normal;"/>
                    <Cell title="Admin user Name" :label="detail.admin.username" style="white-space: normal;"/>
                    <Cell title="city" :label="detail.city" style="white-space: normal;"/>
                    <Cell title="Address" :label="detail.address" style="white-space: normal;"/>
                    <Cell title="Added date" :label="detail.dateAdded" style="white-space: normal;"/>
                    <Cell title="short description" :label="this.detail.shortDescription" style="white-space: normal;"/>

                    <Collapse v-model="value2" accordion>
                      <Panel name="1" >
                        Long description
                        <p slot="content">{{this.detail.longDescription}}</p>
                      </Panel>

                    </Collapse>

                    <Cell title="Mean star rating" :extra="rate.MSR" />
                    <Cell title="Mode cost rating" :extra="rate.MCR" />

                  </CellGroup>
                </Card>
              </div>
            </td>
            <Table border :columns="columns2" :data="this.detail.photos"></Table>

            <Table border :columns="columns1" :data="reviews"></Table>
          </tr>
        </table>
      </Content>
      <Footer class="layout-footer-center">Seng365 Assignment2</Footer>
    </Layout>
  </div>
  </div>

  <div v-else="login">
    Please login
  </div>


</template>

<script>
  export default {
    data () {
      return {

        columns2:[
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
          {
            title: 'Description',
            key: 'photoDescription',
            width: 500,

          },
          {
            title: 'Is Primary',
            key: 'isPrimary',
            width: 100,

          },
          {
            title: 'Action',
            key: 'photoName',
            width: 150,
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
                      this.setPrimary(params.index)
                    }
                  }
                }, 'SetPrimary'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        login: false,
        venueCategory:[
        ],
        categorys: [
        ],
        detail: {
          //   "venueName": "Erskine Building",
          //   "admin": {
          //     "userId": 3,
          //     "username": "superman"
          //   },
          //   "category": {
          //     "categoryId": 1,
          //     "categoryName": "Accommodation",
          //     "categoryDescription": "The best places to stay in town."
          //   },
          //   "city": "Auckland",
          //   "shortDescription": "Many a late night has been spent here",
          //   "longDescription": "",
          //   "dateAdded": "2018-12-31T11:00:00.000Z",
          //   "address": "Erskine Science Rd, Ilam, Christchurch 8041, New Zealand",
          //   "latitude": -43.522535,
          //   "longitude": 172.581086,
          //   "photos": [
          //     {
          //       "photoFilename": "hkWQvNlj8sOnA46cWz0roqDYyRr323dt.png",
          //       "photoDescription": "A scenic view.",
          //       "isPrimary": true
          //     }
          //   ]
        },
        columns1:[
          {
            title: 'Review Body',
            key: 'reviewBody',
            width: 700,

          },
          {
            title: 'Star rate',
            key: 'starRating',
            width: 90,

          },
          {
            title: 'Cost rate',
            key: 'costRating',
            width: 90,

          },
          {
            title: 'User name',
            key: 'username',
            width: 200,

          },
          {
            title: 'Time posted',
            key: 'timePosted',
            width: 200,

          }
        ],
        reviews: [
          // {
          //   "reviewAuthor": {
          //     "userId": 8,
          //     "username": "dr.manhatten"
          //   },
          //   "reviewBody": "No more $2 rice, it's all a lie.",
          //   "starRating": 3,
          //   "costRating": 4,
          //   "timePosted": "2019-02-20T09:05:24.000Z"
          // },
          // {
          //   "reviewAuthor": {
          //     "userId": 9,
          //     "username": "vampire.slayer"
          //   },
          //   "reviewBody": "Good rice for a good price.",
          //   "starRating": 4,
          //   "costRating": 2,
          //   "timePosted": "2019-02-12T05:42:01.000Z"
          // }
        ],

        data1:{},
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
        switchValue: true,
        value1: 0,
        value2: '0',
        venues: [],
        rate: {},
        photos: [],


        Uerror:'',
        UerrorFlag: false,
        Upload: false,
        descriptionFlag: false,
        descriptionError:'',
        ifPrimaryFlag: false,
        ifPrimaryError: '',
        ifPrimary: "",

        uploadPhoto: {
          file:'',
          description:'',
          ifPrimary:'',
        }
      }
    },

    mounted: function(){
      this.logincheck();
      this.getVenueCategory();
      this.getReview();
      this.getRating();
      this.getdetail();
    },

    methods: {
      setPrimary: function(index){
        this.$http.post( 'http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/photos/' + this.detail.photos[index].photoFilename + '/setPrimary','', {headers: {"X-Authorization": this.$cookies.get('user').token}})
          .then(function(){
            window.location.reload();

          }, function(error){
            alert("Set primary failed")
          })
      },
      remove: function(index){
        this.$http.delete( 'http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/photos/' + this.detail.photos[index].photoFilename, {headers: {"X-Authorization": this.$cookies.get('user').token}})
          .then(function(){
            window.location.reload();

          }, function(error){
            alert("Fail remove")
          })
      },
      photoUrl: function(index){
        if(this.detail.photos.length == 0){
          return '/src/photos/default.png'
        } else {
          return 'http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/photos/' + this.detail.photos[index].photoFilename;
        }
      },

      checkInputUpload:function(){
        this.descriptionFlag = false;
        this.ifPrimaryFlag  = false;

        this.uploadPhoto.file = document.getElementById('venuePhoto').files[0];

        if(this.ifPrimary === 'true'){
          this.uploadPhoto.ifPrimary = true;
        } else {
          this.uploadPhoto.ifPrimary = false;
        }
        let photo = new FormData();
        photo.append('photo', this.uploadPhoto.file);
        photo.append('description', this.uploadPhoto.description.toString());
        photo.append('makePrimary', this.uploadPhoto.ifPrimary);
        // if(!this.UerrorFlag) {
          this.$http.post('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/photos', photo,
            {
              headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "content-type": 'multipart/form-data',
                "X-Authorization": this.$cookies.get('user').token
              }
            })
            .then(function () {
              this.Upload = false;
              window.location.reload();
            }, function (error) {
              this.Uerror = 'Invalid data, please fill all gaps';
              this.UerrorFlag = true;
            })
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
      ok2() {
        this.$Message.info('Your input been saved');
      },
      cancel2() {
        this.$Message.info('Your input been reset');
        this.uploadPhoto = {
          file:'',
          description:'',
          ifPrimary:'',
        };

        this.UerrorFlag = false;
        this.descriptionFlag = false;
        this.ifPrimaryFlag  = false;
      },
      logincheck: function () {
        if (this.$cookies.get('user') === null) {
          this.login = false;
        } else {
          this.login = true;
        }
      },
      getReview: function(){
        this.$http.get('http://127.0.0.1:4941/api/v1/venues/'+ this.$route.params.venueId + '/reviews')
          .then(function(response){
            this.reviews = response.data;
          })
          .then(function(){
            for(var i = 0; i < this.reviews.length; i++){
              this.reviews[i].username = this.reviews[i].reviewAuthor.username;

              if(this.reviews[i].starRating === null){
                this.reviews[i].starRating = "3";
              } else {
                this.reviews[i].starRating = this.reviews[i].starRating.toString();
              }
              if(this.reviews[i].costRating === null || this.reviews[i].costRating === 0) {
                this.reviews[i].costRating = "Free"
              } else if(this.reviews[i].costRating === 1) {
                this.reviews[i].costRating = "$"
              } else if(this.reviews[i].costRating === 2) {
                this.reviews[i].costRating = "$$"
              } else if(this.reviews[i].costRating === 3) {
                this.reviews[i].costRating = "$$$"
              } else if(this.reviews[i].costRating === 4) {
                this.reviews[i].costRating = "$$$$"
              }
            }
          })
      },

      getdetail: function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId)
          .then(function (response) {
            this.detail = response.data;
            this.processPhoto();
          });
      },
      getRating: function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/venues')
          .then(function (response) {
            this.venues = response.data;
            this.storeRating();
          });
      },
      storeRating: function(){
        for(var i = 0; i < this.venues.length; i++){
          if(this.venues[i].venueId == this.$route.params.venueId){
            this.rate.MSR = this.venues[i].meanStarRating;
            this.rate.MCR = this.venues[i].modeCostRating;
            if(this.rate.MSR === null){
              this.rate.MSR = "3";
            } else {
              this.rate.MSR = this.rate.MSR.toString();
            }
            if(this.rate.MCR === null || this.rate.MCR === 0) {
              this.rate.MCR = "Free"
            } else if(this.rate.MCR === 1) {
              this.rate.MCR = "$"
            } else if(this.rate.MCR === 2) {
              this.rate.MCR = "$$"
            } else if(this.rate.MCR === 3) {
              this.rate.MCR = "$$$"
            } else if(this.rate.MCR === 4) {
              this.rate.MCR = "$$$$"
            }
            break;
          }
        }
      }
      ,
      processPhoto: function(){
        if (this.detail.photos.length == 0) {
          this.photos.push('default')
        }
        for (var i = 0; i < this.detail.photos.length; i++) {
          this.photos.push(this.detail.photos[i].photoFilename);
        }
      },

      getImagePath: function(photo) {
        if(photo == 'default'){
          return "/src/photos/default.png"
        } else {
          return 'http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/photos/' + photo;
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
        this.data1 = {};

        if (this.venueInfo.VN !== '') {
          this.data1.venueName = this.venueInfo.VN;
        }

        if (this.venueInfo.CA !== '') {
          this.data1.categoryId = this.venueInfo.CA;
        }

        if (this.venueInfo.SD !== '') {
          this.data1.shortDescription = this.venueInfo.SD;
        }

        if (this.venueInfo.LD !== '') {
          this.data1.longDescription = this.venueInfo.LD;
        }

        if (this.venueInfo.CT !== '') {
          this.data1.city = this.venueInfo.CT;
        }

        if (this.venueInfo.AD !== '') {
          this.data1.address = this.venueInfo.AD;
        }

        if (this.venueInfo.LA !== '' ) {
          if( isNaN(parseInt(this.venueInfo.LA)) ){
          this.LAFlag = true;
          this.LAError = 'Please enter number'
        } else if(parseInt(this.venueInfo.LA) > 90){
          this.LAFlag = true;
          this.LAError = 'Please enter number less or equal then 90'
        } else {
            this.data1.latitude = parseInt(this.venueInfo.LA);

          }
        }

        if (this.venueInfo.LO !== '' ) {
          if( isNaN(parseInt(this.venueInfo.LO))){
          this.LOFlag = true;
          this.LOError = 'Please enter number'
        } else if(parseInt(this.venueInfo.LO) > 180){
          this.LOFlag = true;
          this.LOError = 'Please enter number less or equal then 180'
        } else {
            this.data1.longitude = parseInt(this.venueInfo.LO);
          }
        }

        if (!this.VNFlag && !this.CAFlag && !this.SDFlag && !this.LDFlag && !this.CTFlag && !this.ADFlag&& !this.LAFlag&& !this.LOFlag && ! this.errorFlag) {
          this.processInput();
        }
      },
      processInput: function(){
        this.register();
      },
      register: function () {
        this.$http.patch('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId, this.data1 , {headers: {"X-Authorization": this.$cookies.get('user').token}})
          .then(function () {
            this.modal = false;
            alert('submit succeed');
            window.location.reload();

          }, function (error) {
            this.error = "Invalid input";
            this.errorFlag = true;

          })
      }

    }
  }
</script>

<style scoped>

</style>
