<template>
  <div id="configuration">
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
      tucked: false,
      sleeves: 'short'
    }
  },
  computed: {
    modelName: function () {
      return this.sleeves + '-' + (this.tucked ? 'tucked' : 'untucked');
    }
  },
  methods: {
    updateConfiguration() {
      this.$emit('updateConfiguration');
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
}
</style>
