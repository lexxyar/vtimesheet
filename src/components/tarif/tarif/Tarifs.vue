<template>
  <div class="tarif container">
    <Alert v-if="alert" v-bind:message="alert"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">TARIFS</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <!--<router-link to="/TarifAdd" class="btn btn-primary float-right mr-2">-->
          <!--<i class="fas fa-plus"></i>-->
        <!--</router-link>-->
        <router-link to="/TarifUpload" class="btn btn-primary float-right">
          <i class="fas fa-upload"></i>
        </router-link>
      </div>
    </div>

    <!--<input type="text" class="form-control" placeholder="Search in table" v-model="filterInput"/>-->

    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
      <div class="" role="group">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary" v-bind:class="{ active: (filter.tarifname.indexOf(tar.id) > -1) }"
                 v-for="tar in tarifname" v-on:click="tarifNameFilter(tar.id)">
            <input type="checkbox" autocomplete="off" v-bind:value="tar.id"/>
            {{tar.name}}
          </label>
        </div>

        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
            {{filter.rgiontxt}}
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item" href="#" v-on:click="filterRegion(-1)">Select all</a>
            <a class="dropdown-item" href="#" v-for="rg in region" v-on:click="filterRegion(rg.id)">{{rg.name}}</a>
          </div>
        </div>

        <div class="btn-group" role="group">
          <button id="btnGroupDrop2" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
            {{filter.tarifYear}}
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
            <a class="dropdown-item" href="#" v-for="yr in tarifYear"
               v-on:click="filterTarifYear(yr.year)">{{yr.year}}</a>
          </div>
        </div>
      </div>

      <!--<div class="btn-group" role="group">-->
        <!--<div class="btn-group" role="group" aria-label="Button group with nested dropdown">-->
        <!--<button id="btnGroupDrop3" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"-->
                <!--aria-haspopup="true" aria-expanded="false">-->
          <!--{{filter.tarifYear}}-->
        <!--</button>-->
        <!--<div class="dropdown-menu" aria-labelledby="btnGroupDrop3">-->
          <!--<a class="dropdown-item" href="#" v-for="yr in tarifYear"-->
             <!--v-on:click="filterTarifYear(yr.year)">{{yr.year}}</a>-->
        <!--</div>-->

        <!--<button type="button" class="btn btn-secondary">1</button>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <br/>
    <br/>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Work Specific</th>
        <th scope="col">Region</th>
        <th scope="col">Position FRS</th>
        <th scope="col">Tarif Name</th>
        <th scope="col">Tarif</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="obj in filterBy(tarif, filterInput)">
        <td>
          {{obj.workspecific}}
        </td>
        <td>
          <!--<router-link v-bind:to="'/TarifEdit/'+obj.id">-->
            {{obj.region}}
          <!--</router-link>-->
        </td>
        <td>
          {{obj.positionfrs}}
        </td>
        <td>
          {{obj.tarifname}}
        </td>
        <td>
          {{obj.tarif}}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Alert from '../../Alert';

  export default {
    name: 'Tarifs',
    data() {
      return {
        tarif: [],
        tarifname: [],
        filter: {
          region: -1,
          tarifname: [],
          rgiontxt: "All regions",
          tarifYear: (new Date()).getFullYear().toString()
        },
        region: [],
        tarifYear: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchData: function () {
        this.$http.get('http://rest/api/tarif').then(function (response) {
          this.tarif = response.body;
        });
      },
      fetchTarifNames: function () {
        this.$http.get('http://rest/api/tarifname').then(function (response) {
          this.tarifname = response.body;
          if (this.tarifname.length > 0) {
            this.filter.tarifname.push(this.tarifname[0].id);
          }
        });
      },
      fetchRegions: function () {
        this.$http.get('http://rest/api/region').then(function (response) {
          this.region = response.body;
        });
      },
      filterRegion: function (id) {
        this.filter.region = id;
        let sText = "All regions";
        if (id > -1) {
          for (let i = 0; i < this.region.length; i++) {
            if (this.region[i].id === id) {
              sText = this.region[i].name;
              break;
            }
          }
        }
        this.filter.rgiontxt = sText;
      },
      filterTarifYear: function (year) {
//        console.log(year);
        this.filter.tarifYear = year;
      },
      filterBy: function (list, value) {
        let that = this;
        return list.filter(function (obj) {
          let bRes = true;
          bRes = bRes && that.filter.tarifname.indexOf(obj.tarifid) > -1;

          let bRegion = true;
          bRegion = that.filter.region === -1 ? true : (obj.regionid === that.filter.region);

          let bYear = true;
          bYear = obj.year === that.filter.tarifYear;

          bRes = bRes && bRegion && bYear;
          return bRes;
        });
      },
      tarifNameFilter: function (tarifnameId) {
        let iFind = this.filter.tarifname.indexOf(tarifnameId);
        if (iFind > -1) {
          this.filter.tarifname.splice(iFind, 1);
        } else {
          this.filter.tarifname.push(tarifnameId);
        }
      },
      fetchTarifYear: function () {
        this.$http.get('http://rest/api/tarifyear').then(function (response) {
          this.tarifYear = response.body;
        });
      },
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
//      this.filter.tarifYear = (new Date()).getFullYear().toString();
//      console.log(this.filter.tarifYear);

      this.fetchTarifNames();
      this.fetchRegions();
      this.fetchTarifYear();
      this.fetchData();
    },
    components: {
      Alert
    }
  }
</script>

