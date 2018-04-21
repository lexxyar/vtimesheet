<template>
  <div class="tarifname container">
    <Alert v-if="alert" v-bind:message="alert"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">TARIF NAMES</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/TarifnameAdd" class="btn btn-primary float-right">
          <i class="fas fa-plus"></i>
        </router-link>
      </div>
    </div>

    <input type="text" class="form-control" placeholder="Search in table" v-model="filterInput"/>
    <br/>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="obj in filterBy(tarifname, filterInput)">
        <td>
          <router-link v-bind:to="'/TarifnameEdit/'+obj.id">
            {{obj.name}}
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Alert from '../../Alert';

  export default {
    name: 'Tarifnames',
    data() {
      return {
        tarifname: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchData: function () {
        this.$http.get('http://rest/api/tarifname').then(function (response) {
          this.tarifname = response.body;
        });
      },
      filterBy: function (list, value) {
        return list.filter(function (obj) {
          let r = new RegExp(value, "i");
          return r.test(obj.name);
        });
      }
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchData();
    },
    components: {
      Alert
    }
  }
</script>

