<template>
  <div id="configuration">
    <select @change="updateConfiguration" v-model="fm">
      <option value="21">FM20/21</option>
      <option value="19">FM18/19</option>
    </select>

    <select @change="updateConfiguration" v-model="sleeves">
      <option value="short">Short sleeves</option>
      <option value="long">Long sleeves</option>
    </select>

    <input @change="updateConfiguration" type="checkbox" v-model="tucked">Tucked
  </div>
</template>

<script>
export default {
  name: 'ConfigurationSetter',
  data() {
    return {
      fm: '21',
      tucked: false,
      sleeves: 'short'
    }
  },
  computed: {
    modelName: function () {
      return 'fm' + this.fm + '/' + this.sleeves + '-' + (this.tucked ? 'tucked' : 'untucked');
    }
  },
  methods: {
    updateConfiguration() {
      this.$bus.emit('updated-configuration');
    }
  }
}
</script>

<style>
#configuration {
  text-align: right;
  padding-right: 10px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 1;
}
</style>
