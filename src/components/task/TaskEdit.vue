<template>
  <div class="taskedit">
    <Message v-bind:message="oMessage"></Message>

    <h1 class="page-header">EDIT TASK</h1>
    <form v-on:submit="updateData">

      <div class="wall">
        <h4>Task info</h4>

        <div class="form-group">
          <label for="idNumber">Number</label>
          <input type="text" id="idNumber" class="form-control" placeholder="Task number" v-model="oObject.number"/>
        </div>

        <div class="form-group">
          <label for="idConsult">Consult</label>
          <select id="idConsult" class="form-control" v-model="oObject.consultid">
            <option v-for="cons in aConsult" v-bind:value="cons.id">
              {{cons.lastname}} {{cons.firstname}} {{cons.secondname}}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="idDeveloper">Developer</label>
          <select id="idDeveloper" class="form-control" v-model="oObject.developerid">
            <option v-for="dev in aDeveloper" v-bind:value="dev.id">
              {{dev.lastname}} {{dev.firstname}} {{dev.secondname}}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="idDocTarif">Doc developer tarif</label>
          <select id="idDocTarif" class="form-control" v-model="oObject.docdevtarifid">
            <option v-for="tarif in aTarif" v-bind:value="tarif.id">
              {{tarif.positionfrs}} {{tarif.region}} ({{tarif.tarif}})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="idDoceval">Doc evaluation</label>
          <input type="text" id="idDoceval" class="form-control" placeholder="" v-model="oObject.doceval"/>
        </div>

        <div class="form-group">
          <label for="idPlannedstart">Planned start</label>
          <input type="text" id="idPlannedstart" class="form-control" placeholder="" v-model="oObject.plannedstart"/>
        </div>

        <div class="form-group">
          <label for="idRealstart">Real start</label>
          <input type="text" id="idRealstart" class="form-control" placeholder="" v-model="oObject.realstart"/>
        </div>

      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        oObject: {},
        aConsult: [],
        aDeveloper: [],
        aTarif: [],
        oMessage: {
          error: "",
          warning: "",
          info: "",
          success: ""
        }
      }
    },
    created() {
      this.fetchConsults();
      this.fetchDevelopers();
      this.fetchTarifs();
      this.fetchData(this.$route.params.id);

    },
    methods: {
      fetchData: function (id) {
        this.$http.get('http://rest/api/task/' + id).then(function (response) {
          this.oObject = response.body;
        });
      },
      fetchConsults: function () {
        this.$http.get('http://rest/api/employee').then(function (response) {
          this.aConsult = response.body;
        });
      },
      fetchDevelopers: function () {
        this.$http.get('http://rest/api/employee').then(function (response) {
          this.aDeveloper = response.body;
        });
      },
      fetchTarifs: function () {
        this.$http.get('http://rest/api/tarif/get/' + (new Date()).getFullYear().toString()).then(function (response) {
          this.aTarif = response.body;
        });
      },
      updateData: function (e) {
        e.preventDefault();

        if (!this.oObject.number || !this.oObject.consultid
          || !this.oObject.developerid || !this.oObject.doceval
          || !this.oObject.docdevtarifid) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            number: this.oObject.number,
            consultid: this.oObject.consultid,
            developerid: this.oObject.developerid,
            doceval: this.oObject.doceval,
            docevaldayoff: this.oObject.docevaldayoff,
            docdevtarifid: this.oObject.docdevtarifid,
            plannedstart: this.oObject.plannedstart,
            realstart: this.oObject.realstart
          };

          this.$http.put("http://rest/api/task/" + this.$route.params.id, newObj).then(function (response) {
            let oMsg = response.body;
            let sMsgType = Object.keys(oMsg)[0];

            this.oMessage = {
              error: "",
              warning: "",
              info: "",
              success: ""
            };
            this.oMessage[sMsgType] = oMsg[sMsgType].text;

            if (sMsgType != "error") {
              this.$router.push({path: "/Tasks", query: {message: this.oMessage}});
            }
          });
        }
      }
    }
  }
</script>
