<template>
  <div class="regionadd container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">ADD REGION</h1>
    <form v-on:submit="addRegion">

      <div class="wall">
        <h4>Region info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Region name" v-model="region.name"/>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../../Alert';
  export default {
    name: 'RegionAdd',
    data() {
      return {
        region: {},
        alert: ''
      }
    },
    methods: {
      addRegion: function (e) {
        if (!this.region.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.region.name
          };

          this.$http.post("http://rest/api/region", newObj).then(function (response) {
            this.$router.push({path: "/Regions", query: {alert: "Region added"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {

    },
    components:{
      Alert
    }
  }
</script>

