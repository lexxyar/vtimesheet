<template>
  <div class="regionadd container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">ADD CITY</h1>
    <form v-on:submit="addCity">

      <div class="wall">
        <h4>City info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="City name" v-model="city.name"/>
        </div>

        <div class="form-group">
          <label>Region</label>
          <select class="form-control" v-model="city.regionid">
            <option v-for="reg in region" v-bind:value="reg.id">
              {{reg.name}}
            </option>
          </select>
        </div>

      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../../Alert';
  export default {
    name: 'CityAdd',
    data() {
      return {
        city:{},
        region: [],
        alert: ''
      }
    },
    methods: {
      fetchRegion: function () {
        this.$http.get('http://rest/api/region').then(function (response) {
          this.region = response.body;
        });
      },
      addCity: function (e) {
        if (!this.city.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.city.name,
            region: this.city.regionid
          };

          this.$http.post("http://rest/api/city", newObj).then(function (response) {
            this.$router.push({path: "/Cities", query: {alert: "City added"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchRegion();
    },
    components:{
      Alert
    }
  }
</script>

