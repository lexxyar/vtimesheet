<template>
  <div class="tarif container">
    <Alert v-if="alert" v-bind:message="alert"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="page-header">UPLOAD TARIFS</h1>
    </div>

    <!--<h3>Select Year</h3>-->
    <div class="form-group">
      <select class="form-control" v-model="iYear">
        <option v-for="ty in tarifYear" v-bind:value="ty.year">{{ty.year}}</option>
      </select>
    </div>

    <!--<h3>Select Tarif Name</h3>-->
    <div class="custom-control custom-radio" v-for="(tar, idx) in tarifname">
      <input type="radio" class="custom-control-input" name="tarif-name" v-bind:value="tar.id"
             v-model="iTarifNameIdx" v-bind:id="'tarif-name-'+idx"/>
      <label class="custom-control-label" v-bind:for="'tarif-name-'+idx">{{tar.name}}</label>
    </div>

    <div class="form-group">
      <label>Position field name</label>
      <input type="text" class="form-control" placeholder="ROLE" v-bind:value="sPositionFieldName"/>
    </div>

    <div class="form-group">
      <label>Work Specific field name</label>
      <input type="text" class="form-control" placeholder="Work Specific" v-bind:value="sWorkSpecificFieldName"/>
    </div>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="idWorkSpecific" v-model="bWorkSpecific" />
      <label class="form-check-label" for="idWorkSpecific">
        Create missed Work Specific items
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="idUpdateExist" v-model="bUpdareExistItems" />
      <label class="form-check-label" for="idUpdateExist">
        Update exist items
      </label>
    </div>

    <h3>Select Tarif File</h3>
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="customFile" v-on:change="handleFileChange" accept=".xlsx"/>
      <label class="custom-file-label" for="customFile" v-model="sFileName">{{sFileName}}</label>
    </div>

    <br/>
    <br/>

    <button class="btn btn-primary" v-on:click="uploadData">
      <i class="fas fa-upload"></i>
      Upload
    </button>

  </div>
</template>

<script>
  import Alert from '../../Alert';
  import Vue from 'vue'
  import FileUpload from 'v-file-upload'
  //  import { FileUploadService } from 'v-file-upload'
  import {FileUploadService} from 'v-file-upload'

  Vue.use(FileUpload);

  export default {
    name: 'Tarifs',
    data() {
      return {
//        jsonText: "",
//        oFields: {},
//        aFieldsPosition: [],
//        sFieldsPositionChecked: "",
//        aFieldsRegion: [],
//        aFieldsRegionChecked: [],
        tarifname: [],
        iTarifNameIdx: -1,
        iYear: new Date().getFullYear(),
        tarifYear: [],
        iCurrentYear: 0,
        sPositionFieldName: 'роль',
        oFile: {},
        sFileName: "Choose file",
        sWorkSpecificFieldName: "направление деятельности",
        bWorkSpecific: true,
        bUpdareExistItems: true,
        alert: ''
      }
    },
    methods: {
      onFileChange: function (file) {
        this.oFileData = {
          year: this.iYear,
          tarifname: this.iTarifNameIdx,
          positionFieldName: this.sPositionFieldName
        };
        console.log(this.oFileData);
//        var files = e.target.files || e.dataTransfer.files;
//        if (!files.length)
//          return;
        this.fileUploaded = file;

      },
      fetchTarifNames: function () {
        this.$http.get('http://rest/api/tarifname').then(function (response) {
          this.tarifname = response.body;
          if (this.tarifname.length > 0) {
            this.iTarifNameIdx = this.tarifname[0].id;
          }
        });
      },
      onParse: function () {
        let aJson = [];
        try {
          aJson = JSON.parse(this.jsonText)
        } catch (ex) {
          this.alert = "Data not in JSON format";
          aJson = [];
          this.aFieldsPosition = [];
          this.aFieldsRegion = [];
          return;
        }
        this.alert = '';
        let oFirst = aJson[0];
        let aFields = Object.keys(oFirst);
        this.aFieldsPosition = aFields;
        this.aFieldsRegion = aFields;

        this.oFields = new Array();
        for (let i = 0; i < aFields.length; i++) {
          this.oFields[aFields[i]] = "";
        }

      },
      fetchTarifYear: function () {
        this.$http.get('http://rest/api/tarifyear').then(function (response) {
          this.tarifYear = response.body;
          this.iCurrentYear = (new Date()).getFullYear();
          this.iCurrentYear--;
          if (this.tarifYear.findIndex(this.findYearIndex) === -1) {
            this.tarifYear.push({year: this.iCurrentYear});
          }

          this.iCurrentYear++;
          if (this.tarifYear.findIndex(this.findYearIndex) === -1) {
            this.tarifYear.push({year: this.iCurrentYear});
          }

          this.iCurrentYear++;
          if (this.tarifYear.findIndex(this.findYearIndex) === -1) {
            this.tarifYear.push({year: this.iCurrentYear});
          }
        });
      },
      findYearIndex: function (element, index, array) {
        return element.year == this.iCurrentYear;
      },
      handleFileChange: function (e) {
        this.oFile = e.target.files[0];
//        console.log(this.oFile);
        this.sFileName = (this.oFile.name) ? this.oFile.name : "Choose file";
      },
      onProgress: function (e) {

      },
      uploadData: function () {
//        console.log(this.bWorkSpecific);
//        return;
        if (!this.oFile) {
          this.alert = "Choose a file";
          return;
        }
        let oFileData = {
          year: this.iYear,
          tarifname: this.iTarifNameIdx,
          positionFieldName: this.sPositionFieldName,
          workSpecificFieldName: this.sWorkSpecificFieldName,
          createWorkSpecific: this.bWorkSpecific,
          updateExistItems: this.bUpdareExistItems
        };
        let sUrl = 'http://rest/api/tarif/uploadxlsx';

        let fileUpload = new FileUploadService(
          sUrl,
          {},
          this.onProgress
        );

        fileUpload
          .upload(this.oFile, oFileData)
          .then(e => {
            // Handle success
            console.log("SUCCESS");
            this.$router.push({path: "/Tarifs", query: {alert: "Tarifs loaded"}});
          })
          .catch(e => {
            // Handle error
            console.log(e);
            this.alert = 'Tarifs not loaded. Please check file format';
          })
      }
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchTarifNames();
      this.fetchTarifYear();
    },
    components: {
      Alert
    }
  }
</script>

