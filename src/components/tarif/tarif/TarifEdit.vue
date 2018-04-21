<template>
  <div class="tarifedit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">EDIT TARIF</h1>
    <form v-on:submit="updateData">

      <div class="wall">
        <h4>Tarif info</h4>

        <div class="form-group">
          <label>Year</label>
          <select class="form-control" v-model="tarif.year">
            <option v-for="ty in tarifYear" v-bind:value="ty.year">{{ty.year}}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Tarif Name</label>
          <select class="form-control" v-model="tarif.tarifid">
            <option v-for="tr in tarifname" v-bind:value="tr.id">{{tr.name}}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Region</label>
          <select class="form-control" v-model="tarif.regionid">
            <option v-for="rg in region" v-bind:value="rg.id">{{rg.name}}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Position FRS</label>
          <select class="form-control" v-model="tarif.positionfrsid">
            <option v-for="pfrs in positionfrs" v-bind:value="pfrs.id">{{pfrs.name}}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Tarif</label>
          <input type="text" class="form-control" placeholder="Tarif" v-model="tarif.tarif"/>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from '../../Alert';

  export default {
    name: 'TarifEdit',
    data() {
      return {
        tarif: {},
        tarifYear: [],
        region: [],
        positionfrs: [],
        tarifname: [],
        alert: ''
      }
    },
    methods: {
      fetchData: function (id) {
        this.$http.get('http://rest/api/tarif/' + id).then(function (response) {
          this.tarif = response.body;
        });
      },
      fetchTarifYear: function () {
        this.$http.get('http://rest/api/tarifyear').then(function (response) {
          this.tarifYear = response.body;
          let iCurrentYear = (new Date()).getFullYear();
          if (this.tarifYear.indexOf(iCurrentYear) === -1) {
            this.tarifYear.push({year: iCurrentYear});
          }
        });
      },
      fetchRegions: function () {
        this.$http.get('http://rest/api/region').then(function (response) {
          this.region = response.body;
        });
      },
      fetchPositionFRS: function () {
        this.$http.get('http://rest/api/positionfrs').then(function (response) {
          this.positionfrs = response.body;
        });
      },
      fetchTarifname: function () {
        this.$http.get('http://rest/api/tarifname').then(function (response) {
          this.tarifname = response.body;
        });
      },
      updateData: function (e) {
        if (!this.tarif.tarif) {
          this.alert = "Fill required fields";
        } else {
          let newObj = {
            year: this.tarif.year,
            region: this.tarif.regionid,
            positionfrs: this.tarif.positionfrsid,
            tarifname: this.tarif.tarifid,
            tarif: this.tarif.tarif
          };

          this.$http.put("http://rest/api/tarif/" + this.$route.params.id, newObj).then(function (response) {
            this.$router.push({path: "/Tarifs", query: {alert: "Tarif saved"}});
          });

          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchTarifYear();
      this.fetchRegions();
      this.fetchPositionFRS();
      this.fetchTarifname();
      this.fetchData(this.$route.params.id);
    }
    ,
    components: {
      Alert
    }
  }
</script>

