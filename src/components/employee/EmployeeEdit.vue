<template>
  <div class="employee container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT EMPLOYEE</h1>
    <form v-on:submit="updateEmployee">

      <div class="wall">
        <h4>Employee info</h4>

        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="First name" v-model="employee.fio"/>
        </div>
        <div class="form-group">
          <label>Position</label>
          <select class="form-control" v-model="employee.positionid">
            <option v-for="pos in position" v-bind:value="pos.id">
              {{pos.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="wall">
        <h4>Contacts</h4>

        <div class="form-group">
          <label>Phone Ext</label>
          <input type="text" class="form-control" placeholder="Phone Ext" v-model="employee.workphone"/>
        </div>
        <div class="form-group">
          <label>Phone Mobile</label>
          <input type="text" class="form-control" placeholder="Mobile phone" v-model="employee.mobilephone"/>
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="text" class="form-control" placeholder="E-mail" v-model="employee.email"/>
        </div>
      </div>

      <div class="wall">
        <h4>Location</h4>

        <div class="form-group">
          <label>City</label>
          <select class="form-control" v-model="employee.cityid">
            <option v-for="cty in city" v-bind:value="cty.id">
              {{cty.name}}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../Alert';

  export default {
    name: 'EmployeeEdit',
    data() {
      return {
        employee: {},
        city: [],
        position: [],
        alert: ''
      }
    },
    methods: {
      fetchCity: function () {
        this.$http.get('http://rest/api/region').then(function (response) {
          this.city = response.body;
        });
      },
      fetchPosition: function () {
        this.$http.get('http://rest/api/position').then(function (response) {
          this.position = response.body;
        });
      },
      fetchEmployee: function (id) {
        this.$http.get('http://rest/api/employee/' + id).then(function (response) {
          this.employee = response.body;
          this.employee.fio = this.employee.firstname + " " + this.employee.lastname + " " + this.employee.secondname;
        });
      },
      updateEmployee: function (e) {
        if (!this.employee.firstname || !this.employee.lastname || !this.employee.email) {
          this.alert = "Fill required fields";
        } else {
          let newEmployee = {
            firstname: this.employee.firstname,
            lastname: this.employee.lastname,
            secondname: this.employee.secondname,
            workphone: this.employee.workphone,
            mobilephone: this.employee.mobilephone,
            email: this.employee.email,
            positionid: this.employee.positionid,
            cityid: this.employee.cityid,
            birthdate: this.employee.birthdate
          };

          this.$http.put("http://rest/api/employee/update/" + this.$route.params.id, newEmployee).then(function (response) {
            this.$router.push({path: "/", query: {alert: "Employee saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchCity();
      this.fetchPosition();
      this.fetchEmployee(this.$route.params.id);
    },
    components: {
      Alert
    }
  }
</script>

