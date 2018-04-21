<template>
  <div class="tasks">
    <Message v-bind:message="oMessage"></Message>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">TASKS</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/TaskAdd" class="btn btn-primary float-right">
          <i class="fas fa-plus"></i>
        </router-link>
      </div>
    </div>

    <!--<input type="text" class="form-control" placeholder="Search in table" v-model="filterInput"/>-->
    <br/>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Number</th>
        <th scope="col">Consult</th>
        <th scope="col">Developer</th>
        <th scope="col">Document evaluate</th>
        <th scope="col">Document evaluate dayoff</th>
        <th scope="col">Planned start</th>
        <th scope="col">Real start</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="obj in aObjects">
        <td>
          <router-link v-bind:to="'/TaskEdit/'+obj.id">
            {{obj.number}}
          </router-link>
        </td>
        <td>
          {{obj.clastname}} {{obj.cfirstname}} {{obj.csecondname}}
        </td>
        <td>
          {{obj.dlastname}} {{obj.dfirstname}} {{obj.dsecondname}}
        </td>
        <td>
          {{obj.doceval}}
        </td>
        <td>
          {{obj.docevaldayoff}}
        </td>
        <td>
          {{obj.plannedstart}}
        </td>
        <td>
          {{obj.realstart}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aObjects: [],
        oMessage: {
          error: "",
          warning: "",
          info: "",
          success: ""
        }
      }
    },
    methods: {
      fetchData() {
        this.$http.get('http://rest/api/task').then(function (response) {
          this.aObjects = response.body;
        });
      }
    },
    created() {
      if (this.$route.query.message) {
        this.oMessage = this.$route.query.message;
      }
      this.fetchData();
    }
  }
</script>
