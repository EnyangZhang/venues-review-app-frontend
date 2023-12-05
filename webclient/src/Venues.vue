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
  <div id = "venues">
  <div class="layout">

    <Layout>

      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">

          <div class="layout-nav">

            <MenuItem name="1">

              <Icon type="ios-color-filter-outline" />

              <Button type="primary" @click="getEverything">Filter</Button>
              <Modal
                v-model="filterAct"
                title="Filter"
                @on-ok="ok"
                @on-cancel="cancel">

                <p>
                  <Select v-model="selectCity" style="width:200px">
                    <Option v-for="city in this.city" :value="city" :key="city">{{ city }}</Option>
                  </Select>
                  Select city
                </p>


                <p>
                  <Select v-model="selectCategory" style="width:200px">
                  <Option v-for="cate in this.categorys" :value="cate" :key="cate">{{ cate }}</Option>
                </Select>
                  Select Venue Category
                </p>

                <p>
                  <Select v-model="sortBy" style="width:200px">
                    <Option v-for="sort in sortMethod" :value="sort.value" :key="sort.value">{{ sort.label }}</Option>
                  </Select>
                  <Switch size="large" @on-change="change">
                    <span slot="open">rever</span>
                    <span slot="close">norm</span>
                  </Switch>
                  Sort by and reverse
                </p>

                <p>
                  <Select v-model="starRate" style="width:200px">
                    <Option :value="0" :key="0">{{ 'None' }}</Option>
                    <Option :value="1" :key="1">{{ '1 star' }}</Option>
                    <Option :value="2" :key="2">{{ '2 star' }}</Option>
                    <Option :value="3" :key="3">{{ '3 star' }}</Option>
                    <Option :value="4" :key="4">{{ '4 star' }}</Option>
                    <Option :value="5" :key="5">{{ '5 star' }}</Option>
                  </Select>
                  Select min star rating
                </p>

                <p>
                  <Select v-model="costRate" style="width:200px">
                    <Option :value="5" :key="5">{{ 'None' }}</Option>
                    <Option :value="0" :key="0">{{ 'Free' }}</Option>
                    <Option :value="1" :key="1">{{ '$' }}</Option>
                    <Option :value="2" :key="2">{{ '$$' }}</Option>
                    <Option :value="3" :key="3">{{ '$$$' }}</Option>
                    <Option :value="4" :key="4">{{ '$$$$' }}</Option>
                  </Select>
                  Select max cost rating
                </p>

                <p>
                  <Input v-model="q" placeholder="Enter venue name or key word" style="width: 300px" />
                  Search city name
                </p>

              </Modal>

            </MenuItem>

            <MenuItem name="2">

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

      <Content :style="{margin: '20px 20px 0', background: '#fff', minHeight: '500px'}">
        <Card>
          <h4>{{item}}</h4>
          <div style="min-height: 720px;">
            <Table border :columns="columns1" :data="separateData"></Table>
          </div>
          <Page :current="page" :total="this.processed.length" @on-change = "pageData" simple/>
        </Card>
      </Content>

      <Footer class="layout-footer-center">Seng365 Assignment2</Footer>
    </Layout>
  </div>
    </div>

</template>
<script>
  export default {
    data () {
      return {
        filterAct: false,
        reqQuary: {},
        selectCity: '',
        selectCategory: '',
        q: '',
        sortBy: '',
        reverse: false,
        sortMethod : [
          {
            value: 'STAR_RATING',
            label: 'Mean star rating'
          },
          {
            value: 'COST_RATING',
            label: 'Mode cost rating'
          },
          {
            value: 'DISTANCE',
            label: 'Distance'
          },
        ],
        starRate:'None',
        costRate:'None',
        page:1,
        item: '',
        permitToloc:false,
        location: {},

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
                }, 'detail')])}
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
        ],

        venue: [
          // {
          //   "venueId": 1,
          //   "venueName": "The Wok",
          //   "categoryId": 2,
          //   "city": "Christchurch",
          //   "shortDescription": "Home of the world-famous $2 rice",
          //   "latitude": -43.523617,
          //   "longitude": 172.582885,
          //   "meanStarRating": 3.5,
          //   "modeCostRating": 4,
          //   "primaryPhoto": "photo-1553636101531.jpg"
          //    "distance": 9945.08083446349
          // }
        ],
        venueDetail: [

        ],

        //From VuenueCategory
        venueCategory:[
          // {
          //   "categoryId": 1,
          //   "categoryName": "Accommodation",
          //   "categoryDescription": "The best places to stay in town."
          // }
        ],
        city: [

        ],
        categorys: [

        ],
        //process
        data:[

          // {
          //   "venueId": 1,
          //   "primaryPhoto": "photo-1553636101531.jpg"
          //   "venueName": "The Wok",
          //   "category": "Accommodation",
          //   "city": "Christchurch",
          //   "msr": 3.5,
          //   "mcr": 4,
          // }
        ],

        processed: [

        ],
        separateData:[

        ]
      }
    },
    mounted: function(){
      this.getVenueCategory();
      this.getLocation();
      this.getVenue();
    },
    methods: {
      lastPage(){
        this.$Message.info('Last batch has been reached');
      },
      ok () {
        this.$Message.info('Submitted');
        this.quaryDecider();
      },
      cancel () {
        this.$Message.info('Cancelled');
      },
      jumpToDetail (index) {
        this.$router.push({name :"venue",  params:{venueId: this.processed[index].venueId}});
      },
      change: function(){
        if(this.reverse) {
          this.$Message.info('Normal order');
          this.reverse = false;
        } else {
          this.$Message.info('Reversed order');
          this.reverse = true;
        }
        },

      photoUrl: function(index){
        if(this.processed[index].primaryPhoto === null){
          return '/src/photos/default.png'
        } else {
          return 'http://127.0.0.1:4941/api/v1/venues/' + this.processed[index].venueId + '/photos/' + this.processed[index].primaryPhoto
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
                    }, 'detail')])}
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
      getVenue:function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/venues')
          .then(function (response) {
            this.venue = response.data;
            this.processData();// venue data
            this.processed = this.data;
            this.pageData(1);
          });
      },
      getVenueCategory:function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/categories')
          .then(function (response) {
            this.venueCategory = response.data;
          })
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
      getEverything: function() {
        this.getCity();
        this.getCategorys()
      },

      getCity: function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/venues')
          .then(function (response) {
            this.city = response.data;
            this.filterAct = true;
            let cityList = [];
            cityList.push('None');
            for(var i = 0; i < this.city.length; i++){
              if(!cityList.includes(this.city[i].city)){
                cityList.push(this.city[i].city);
              }
            }
            this.city = cityList;
          })
      },
      getCategorys: function() {
        this.categorys = [];
        this.categorys.push('None');
        for(var i = 0; i < this.venueCategory.length; i++){
          this.categorys.push(this.venueCategory[i].categoryName);
        }
      },
      desiredCity: function(){
        this.processed = [];
        for(var i = 0; i < this.data.length; i++){
          if(this.data[i].city === this.selectCity) {
                let data = {
                  "venueId": this.data[i].venueId,
                  "primaryPhoto": this.data[i].primaryPhoto,
                  "venueName": this.data[i].venueName,
                  "categoryName": this.data[i].categoryName,
                  "city": this.data[i].city,
                  "meanStarRating": this.data[i].meanStarRating,
                  "modeCostRating": this.data[i].modeCostRating
                };
            if(this.permitToloc){
              data.distance = this.data[i].distance;
            }
                this.processed.push(data);
            }
        }
      },

      quaryDecider: function(){
        this.reqQuary = {};

        if(this.q !== ''){
          this.reqQuary.q = this.q;
        }

        if(this.selectCategory !== '' && this.selectCategory !== 'None'){
          for(var i = 0; i < this.venueCategory.length; i ++){
            if(this.venueCategory[i].categoryName === this.selectCategory) {
              this.reqQuary.categoryId = this.venueCategory[i].categoryId;
              break;
            }
          }
        }

        if(this.sortBy === 'STAR_RATING' || this.sortBy === 'COST_RATING'){
          this.reqQuary.sortBy = this.sortBy;
        }

        this.reqQuary.reverseSort = this.reverse;

        if(this.starRate !== 0 && this.starRate !== "None"){
          this.reqQuary.minStarRating = this.starRate;
        }

        if(this.costRate !== 5 && this.costRate!== "None"){
          this.reqQuary.maxCostRating = this.costRate;
        }

        if(this.permitToloc){
          this.reqQuary.myLatitude = this.location.lat;
          this.reqQuary.myLongitude = this.location.lng;
          if(this.sortBy === 'DISTANCE') {
            this.reqQuary.sortBy = this.sortBy;
          }
        } else {
          if(this.sortBy === 'DISTANCE'){
            alert("Please enable location tracking for distance sorting")
          }
        }

        this.quaryData();
      },

      quaryData:function() {
        this.$http.get('http://127.0.0.1:4941/api/v1/venues' , {params: this.reqQuary})
          .then(function (response) {
            this.venue = response.data;
            this.processData();
            if(this.selectCity !== 'None' && this.selectCity !== '') {
              this.desiredCity();
            } else {
              this.processed = this.data;
            }
            this.pageData(1);
          });
      },

      pageData: function(page) {
        this.page = page;
        let pages = Math.ceil(this.processed.length/10);
        if(this.page !== pages){
          this.item = (this.page*10-9).toString() + "-" + (this.page*10).toString() + " of " + this.processed.length;
          this.separateData = this.processed.slice(this.page*10-10, this.page*10);
        } else {
          this.item = (this.page*10-9).toString() + "-" + (this.processed.length).toString() + " of " + this.processed.length;
          this.separateData = this.processed.slice(this.page*10-10, this.processed.length);
          this.lastPage();
        }
      },


    }
  }

</script>
