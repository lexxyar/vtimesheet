<template>
  <div class="positionfrsadd container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">ADD POSITION FRS</h1>
    <form v-on:submit="addPositionFRS">

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
    data() {
      return {
        positionfrs: {},
        alert: ''
      }
    },
    methods: {
      addPositionFRS: function (e) {
        if (!this.position.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.positionfrs.name
          };

          this.$http.post("http://rest/api/positionfrs", newObj).then(function (response) {
            this.$router.push({path: "/Positionsfrs", query: {alert: "Position FRS added"}});
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

