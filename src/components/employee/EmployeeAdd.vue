<template>
  <div class="employee container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <!--<h1 class="page-header">NEW EMPLOYEE</h1>-->

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">NEW EMPLOYEE</h1>
      <div class="btn-toolbar mb-2 mb-md-0">

      </div>
    </div>

    <form v-on:submit="addEmployee">

      <div class="well">
        <h4>Employee info</h4>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="First, Last and Second name" v-model="employee.fio"/>
        </div>


        <!--<div class="form-group">-->
        <!--<label>First name</label>-->
        <!--<input type="text" class="form-control" placeholder="First name" v-model="employee.first_name"/>-->
        <!--</div>-->
        <!--<div class="form-group">-->
        <!--<label>Last name</label>-->
        <!--<input type="text" class="form-control" placeholder="Last name" v-model="employee.last_name"/>-->
        <!--</div>-->
        <!--<div class="form-group">-->
        <!--<label>Second name</label>-->
        <!--<input type="text" class="form-control" placeholder="Second name" v-model="employee.second_name"/>-->
        <!--</div>-->
        <div class="form-group">
          <label>Phone Ext</label>
          <input type="text" class="form-control" placeholder="Phone Ext" v-model="employee.phoneext"/>
        </div>
        <div class="form-group">
          <label>Phone Mobile</label>
          <input type="text" class="form-control" placeholder="Mobile phone" v-model="employee.phonemob"/>
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="text" class="form-control" placeholder="E-mail" v-model="employee.email"/>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../Alert';

  export default {
    name: 'EmployeeAdd',
    data() {
      return {
        employee: {},
        alert: ''
      }
    },
    methods: {
      addEmployee: function (e) {
        let fio = this.employee.fio;
        let aFio = fio.split(' ');
        this.employee.first_name = aFio[1].trim() ? aFio[1].trim() : "";
        this.employee.last_name = aFio[0].trim() ? aFio[0].trim() : "";
        this.employee.second_name = aFio[2].trim() ? aFio[2].trim() : "";

        if (!this.employee.first_name || !this.employee.last_name || !this.employee.email) {
          this.alert = "Fill required fields";
        } else {
          let newEmployee = {
            first_name: this.employee.first_name,
            last_name: this.employee.last_name,
            second_name: this.employee.second_name,
            phoneext: this.employee.phoneext,
            phonemob: this.employee.phonemob,
            email: this.employee.email
          };

          console.log(newEmployee);
          this.$http.post("http://rest/api/employee/add", newEmployee).then(function (response) {
            this.$router.push({path: "/", query: {alert: "Employee added"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    components: {
      Alert
    }
  }
</script>

