<template>
  <div class="positionfrsedit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT POSITION FRS</h1>
    <form v-on:submit="updateRegion">

      <div class="wall">
        <h4>Position FRS info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Position FRS name" v-model="positionfrs.name"/>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../../Alert';

  export default {
    name: 'PositionfrsEdit',
    data() {
      return {
        positionfrs: {},
        alert: ''
      }
    },
    methods: {
      fetchPositionFRS: function (id) {
        this.$http.get('http://rest/api/positionfrs/' + id).then(function (response) {
          this.positionfrs = response.body;
        });
      },
      updateRegion: function (e) {
        if (!this.position.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.positionfrs.name
          };

          this.$http.put("http://rest/api/positionfrs/" + this.$route.params.id, newObj).then(function (response) {
            this.$router.push({path: "/Positionsfrs", query: {alert: "Position FRS saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchPositionFRS(this.$route.params.id);
    },
    components: {
      Alert
    }
  }
</script>

