<template>
  <div class="tarifnameadd container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">ADD TARIF NAME</h1>
    <form v-on:submit="addData">

      <div class="wall">
        <h4>Tarif name info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Tarif name" v-model="tarifname.name"/>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../../Alert';
  export default {
    name: 'TarifnameAdd',
    data() {
      return {
        tarifname: {},
        alert: ''
      }
    },
    methods: {
      addData: function (e) {
        if (!this.tarifname.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.tarifname.name
          };

          this.$http.post("http://rest/api/tarifname", newObj).then(function (response) {
            this.$router.push({path: "/Tarifnames", query: {alert: "Tarif name added"}});
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

