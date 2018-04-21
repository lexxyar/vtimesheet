<template>
  <div class="message">
    <div v-if="message.error" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{message.error}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div v-if="message.warning" class="alert alert-warning alert-dismissible fade show" role="alert">
      {{message.warning}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div v-if="message.info" class="alert alert-info alert-dismissible fade show" role="alert">
      {{message.info}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div v-if="message.success" class="alert alert-success alert-dismissible fade show" role="alert">
      {{message.success}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: [
      'message'
    ],
    data() {
      return {}
    },
    methods: {},
    computed: {},
    created: function () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
