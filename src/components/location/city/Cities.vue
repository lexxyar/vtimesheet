<template>
  <div class="city container">
    <Alert v-if="alert" v-bind:message="alert"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">CITIES</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/CityAdd" class="btn btn-primary float-right">
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
        <th scope="col">Region</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ct in filterBy(city, filterInput)">
        <td>
          <router-link v-bind:to="'/CityEdit/'+ct.id">
            {{ct.name}}
          </router-link>
        </td>
        <td>{{ct.region}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Alert from '../../Alert';

  export default {
    name: 'Cityes',
    data() {
      return {
        city:[],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchCity: function () {
        this.$http.get('http://rest/api/city').then(function (response) {
          this.city = response.body;
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
      this.fetchCity();
    },
    components: {
      Alert
    }
  }
</script>

