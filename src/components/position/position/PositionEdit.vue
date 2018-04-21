<template>
  <div class="regionedit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT POSITION</h1>
    <form v-on:submit="updatePosition">

      <div class="wall">
        <h4>Position info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Position name" v-model="position.name"/>
        </div>

        <div class="form-group">
          <label>Position FRS</label>
          <select class="form-control" v-model="position.positionfrsid">
            <option v-for="pfrs in positionfrs" v-bind:value="pfrs.id">
              {{pfrs.name}}
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
    name: 'PositionEdit',
    data() {
      return {
        position:{},
        positionfrs: [],
        alert: ''
      }
    },
    methods: {
      fetchPositionFRS: function () {
        this.$http.get('http://rest/api/positionfrs').then(function (response) {
          this.positionfrs = response.body;
        });
      },
      fetchPosition: function (id) {
        this.$http.get('http://rest/api/position/' + id).then(function (response) {
          this.position = response.body;
        });
      },
      updatePosition: function (e) {
        if (!this.position.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.position.name,
            positionfrs: this.position.positionfrsid
          };

          this.$http.put("http://rest/api/position/" + this.$route.params.id, newObj).then(function (response) {
            this.$router.push({path: "/Positions", query: {alert: "Position saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchPositionFRS();
      this.fetchPosition(this.$route.params.id);
    },
    components:{
      Alert
    }
  }
</script>

