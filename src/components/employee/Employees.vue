<template>
  <div class="employee container">
    <Alert v-if="alert" v-bind:message="alert"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">EMPLOYEES
      </h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/EmployeeAdd" class="btn btn-primary float-right">
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
        <th scope="col">Ext</th>
        <th scope="col">Mobile</th>
        <th scope="col">E-mail</th>
        <th scope="col">City</th>
        <th scope="col">Region</th>
        <th scope="col">Position</th>
        <th scope="col">Position FRS</th>
        <th scope="col">Service tarif</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="emp in filterBy(employee, filterInput)">
        <td>
          <router-link v-bind:to="'/EmployeeDetail/'+emp.id">
            {{emp.lastname}} {{emp.firstname}} {{emp.secondname}}
          </router-link>
        </td>
        <td>{{emp.workphone}}</td>
        <td>{{emp.mobilephone}}</td>
        <td>{{emp.email}}</td>
        <td>{{emp.city}}</td>
        <td>{{emp.region}}</td>
        <td>{{emp.position}}</td>
        <td>{{emp.positionfrs}}</td>
        <td>{{emp.starif}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from '../Alert';

  export default {
    name: 'Employees',
    data() {
      return {
        employee: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchEmployee: function () {
        this.$http.get('http://rest/api/employee').then(function (response) {
          this.employee = response.body;
        });
      },
      filterBy: function (list, value) {
        return list.filter(function (obj) {
          let r = new RegExp(value, "i");
          return r.test(obj.lastname) || r.test(obj.firstname) || r.test(obj.secondname);
        });
      }
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchEmployee();
    },
    components: {
      Alert
    }
  }
</script>

