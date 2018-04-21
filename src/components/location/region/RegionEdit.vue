<template>
  <div class="regionedit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT REGION</h1>
    <form v-on:submit="updateRegion">

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
    name: 'RegionEdit',
    data() {
      return {
        region: {},
        alert: ''
      }
    },
    methods: {
      fetchRegion: function (id) {
        this.$http.get('http://rest/api/region/' + id).then(function (response) {
          this.region = response.body;
        });
      },
      updateRegion: function (e) {
        if (!this.region.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.region.name
          };

          this.$http.put("http://rest/api/region/" + this.$route.params.id, newObj).then(function (response) {
            this.$router.push({path: "/Regions", query: {alert: "Region saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchRegion(this.$route.params.id);
    },
    components:{
      Alert
    }
  }
</script>

