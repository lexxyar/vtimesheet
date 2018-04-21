<template>
  <div class="regionadd container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">ADD POSITION</h1>
    <form v-on:submit="addPosition">

      <div class="wall">
        <h4>Position info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Position name" v-model="position.name"/>
        </div>

        <div class="form-group">
          <label>Position FRS</label>
          <select class="form-control" v-model="position.positionfrsid">
            <option v-for="pos in positionfrs" v-bind:value="pos.id">
              {{pos.name}}
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
    name: 'PositionAdd',
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
      addPosition: function (e) {
        if (!this.position.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.position.name,
            positionfrs: this.position.positionfrsid
          };

          this.$http.post("http://rest/api/position", newObj).then(function (response) {
            this.$router.push({path: "/Positions", query: {alert: "Position added"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchPositionFRS();
    },
    components:{
      Alert
    }
  }
</script>

