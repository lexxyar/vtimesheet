<template>
  <div class="details container">

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">{{employee.first_name}} {{employee.last_name}} {{employee.second_name}}
      </h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link v-bind:to="'/EmployeeEdit/'+employee.id" class="btn btn-primary mr-2" role="button">
          <i class="far fa-edit"></i>
        </router-link>
        <button class="btn btn-danger" v-on:click="deleteEmploee(employee.id)">
          <i class="far fa-trash-alt"></i>
        </button>

      </div>
    </div>

    <ul class="list-group">
      <li class="list-group-item">{{employee.phonemob}}</li>
      <li class="list-group-item">{{employee.phoneext}}</li>
      <li class="list-group-item">{{employee.email}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'EmployeeDetail',
    data() {
      return {
        employee: ''
      }
    },
    methods: {
      fetchEmployee: function (id) {
        this.$http.get('http://rest/api/employee/' + id).then(function (response) {
          this.employee = response.body;
        });
      },
      deleteEmploee: function (id) {
        this.$http.delete('http://rest/api/employee/delete/' + id).then(function (response) {
//          this.employee = response.body;
          this.$router.push({path: "/", query: {alert: "Employee deleted"}});
        });
      }
    },
    created: function () {
      this.fetchEmployee(this.$route.params.id);
    },
  }
</script>

