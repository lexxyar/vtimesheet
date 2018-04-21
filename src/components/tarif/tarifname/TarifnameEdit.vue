<template>
  <div class="tarifnameedit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT TARIF NAME</h1>
    <form v-on:submit="updateData">

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
    name: 'TarifnameEdit',
    data() {
      return {
        tarifname: {},
        alert: ''
      }
    },
    methods: {
      fetchData: function (id) {
        this.$http.get('http://rest/api/tarifname/' + id).then(function (response) {
          this.tarifname = response.body;
        });
      },
      updateData: function (e) {
        if (!this.tarifname.name) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            name: this.tarifname.name
          };

          this.$http.put("http://rest/api/tarifname/" + this.$route.params.id, newObj).then(function (response) {
            this.$router.push({path: "/Tarifnames", query: {alert: "Tarif name saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchData(this.$route.params.id);
    },
    components: {
      Alert
    }
  }
</script>

