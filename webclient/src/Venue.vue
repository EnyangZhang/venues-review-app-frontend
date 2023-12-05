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
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">

          <div class="layout-nav">
            <MenuItem name="1">
              <div v-if="login">
              <Button type="primary" @click="modal = true">Add review</Button>
              <Modal
                v-model="modal"
                title="Modify Venue"
                @on-ok="ok"
                @on-cancel="cancel"
                ok-text="Save">

                <Form :model="reviewInput" label-position="top">
                  <div v-if="errorFlag" style="color: #ff0000;">
                    {{error}}
                  </div>
                  <FormItem label="Review common">
                    <Input v-model="reviewInput.body"></Input>
                    <div v-if="bodyFlag" style="color: #ff0000;">
                      {{bodyError}}
                    </div>
                  </FormItem>


                  <FormItem label="Choose star rate">
                    <Select v-model="reviewInput.starRate" style="width:200px">
                      <Option :value="1" :key="1">{{ '1 star' }}</Option>
                      <Option :value="2" :key="2">{{ '2 star' }}</Option>
                      <Option :value="3" :key="3">{{ '3 star' }}</Option>
                      <Option :value="4" :key="4">{{ '4 star' }}</Option>
                      <Option :value="5" :key="5">{{ '5 star' }}</Option>
                    </Select>
                    <div v-if="SRFlag" style="color: #ff0000;">
                      {{SRError}}
                    </div>
                  </FormItem>

                <FormItem label="Choose cost rate">
                  <Select v-model="reviewInput.costRate" style="width:200px">
                    <Option :value="0" :key="0">{{ 'Free' }}</Option>
                    <Option :value="1" :key="1">{{ '$' }}</Option>
                    <Option :value="2" :key="2">{{ '$$' }}</Option>
                    <Option :value="3" :key="3">{{ '$$$' }}</Option>
                    <Option :value="4" :key="4">{{ '$$$$' }}</Option>
                  </Select>
                  <div v-if="CRFlag" style="color: #ff0000;">
                    {{CRError}}
                  </div>
                </FormItem>


                </Form>


                <Button type="primary" @click="checkInput">Submit</Button>

              </Modal>

</div>
            </MenuItem>
            <MenuItem name="2">
            </MenuItem>
            <MenuItem name="3">
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
  <Table border :columns="columns2" :data="adminInfo"></Table>

  <Table border :columns="columns1" :data="reviews"></Table>

</tr>

</table>
      </Content>
      <Footer class="layout-footer-center">Seng365 Assignment2</Footer>
    </Layout>
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
                    src: this.url, style: 'width: 100px; height: 100px;'
                  },
                  style: {

                  }
                })
              }
            },
            {
              title: 'User name',
              key: 'username',
              width: 200,

            },
            {
              title: 'Given name',
              key: 'username',
              width: 200,

            },
            {
              title: 'Family name',
              key: 'familyName',
              width: 200,

            },
          ],

          adminInfo: [
          ],
          url:'',

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


          switchValue: true,
          value1: 0,
          value2: '0',
          venues: [],
          rate: {},
          photos: [],

          login: false,
          modal: false,
          reviewInput: {
            body:'',
            starRate:'',
            costRate:''
          },
          errorFlag:false,
          error:'',
          bodyFlag:false,
          bodyError:'',
          SRFlag:false,
          SRError:'',
          CRFlag:false,
          CRError:''


        }

      },

      mounted: function(){
        this.logincheck();
        this.getReview();
        this.getRating();
        this.getdetail();
        this.getAdminInfo();

      },

      methods: {
        logincheck: function () {
          if (this.$cookies.get('user') === null) {
            this.login = false;
          } else {
            this.login = true;
          }
        },
        getAdminInfo: function(){
          this.$http.get('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId)
            .then(function(response){
              console.log(response.data)
              this.processAdminInfo((response.data.admin).userId);
              this.userPhotoUrl((response.data.admin).userId);
            })
        },

    processAdminInfo: function(userId){
      if(this.$cookies.get('user') === null){
        this.$http.get('http://127.0.0.1:4941/api/v1/users/' + userId)
          .then(function (response) {
            this.adminInfo.push(response.data);
          })
      }
      else if(userId !== this.$cookies.get('user').userId) {
        this.$http.get('http://127.0.0.1:4941/api/v1/users/' + userId)
          .then(function (response) {
            this.adminInfo.push(response.data);
          })
      } else {
        this.$http.get('http://127.0.0.1:4941/api/v1/users/' + userId, {headers: {"X-Authorization": this.$cookies.get('user').token}})
          .then(function (response) {
            this.adminInfo.push(response.data);
            this.columns2=[
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
                      src: this.url, style: 'width: 100px; height: 100px;'
                    },
                    style: {

                    }
                  })
                }
              },
              {
                title: 'User name',
                key: 'username',
                width: 200,

              },
              {
                title: 'Given name',
                key: 'username',
                width: 200,

              },
              {
                title: 'Family name',
                key: 'familyName',
                width: 200,

              },
              {
                title:'Email adress',
                key: 'email',
                width: 200
              }
            ]
          })
      }
    },

        userPhotoUrl: function(userId){
          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + userId + '/photo')
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

        ok() {
          this.$Message.info('Your input been saved');

        },
        cancel() {
          this.$Message.info('Your input been reset');
          this.reviewInput = {
            body:'',
            starRate:'',
            costRate:''
          };
          this.errorFlag = false;
          this.bodyFlag = false;
          this.SRFlag = false;
          this.CRFlag = false;
        },
        checkInput: function () {
            this.bodyFlag = false;
            this.errorFlag = false;
          if (this.reviewInput.body === '') {
            this.bodyFlag = true;
            this.bodyError = 'Empty body'
          }
          if (this.reviewInput.starRate === '') {
            this.SRFlag = true;
            this.SRError = 'Empty star rate'
          }
          if (this.reviewInput.costRate === '') {
            this.CRFlag = true;
            this.CRError = 'Empty cost rate'
          }
          if(!this.bodyFlag && !this.SRFlag && ! this.CRFlag){
            this.postReview();
          }
        },

        postReview: function(){
          this.$http.post('http://127.0.0.1:4941/api/v1/venues/' +this.$route.params.venueId + '/reviews', {
            "reviewBody": this.reviewInput.body,
            "starRating": this.reviewInput.starRate,
            "costRating": this.reviewInput.costRate
          }, {headers: {"X-Authorization": this.$cookies.get('user').token}})
            .then(function(){
              this.modal = false;
              alert('submit succeed');
              window.location.reload();
            }, function(error){
            this.error = "You can only post one review for the same venue or and you can't post review for venue that you are administrating";
            this.errorFlag = true;
          })

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
            })
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
          }


      }
    }
</script>

<style scoped>

</style>
