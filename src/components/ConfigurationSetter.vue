<template>
  <div id="configuration">
    <div class="config-field config-field-last">
      <select @change="updateConfigurationWithTextureRefresh" v-model="fm">
        <option value="21">FM20/21 Kit</option>
        <option value="19">FM18/19 Kit</option>
        <option value="ball">FM21 Ball</option>
      </select>
    </div>
    <div id="config-shirt" v-show="fm == 21 || fm == 19">
      <div class="config-field">
        <select @change="updateConfiguration" v-model="sleeves">
          <option value="short">Short sleeves</option>
          <option value="long">Long sleeves</option>
        </select>
      </div>
      <div class="config-field checkbox">
        <ol class="switches">
          <li>
            <input @change="updateConfiguration" id="tucked-option" type="checkbox" v-model="tucked">
            <label for="tucked-option"><span>Tucked</span><span></span></label>
          </li>
        </ol>
      </div>
      <div class="config-field config-field-last checkbox">
        <ol class="switches">
          <li>
            <input @change="updateConfigurationWithTextureRefresh" id="numbers-overlay-option" type="checkbox" v-model="numbersOverlay">
            <label for="numbers-overlay-option"><span>Show numbers/name position</span><span></span></label>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationSetter',
  data() {
    return {
      fm: '21',
      tucked: false,
      sleeves: 'short',
      numbersOverlay: false
    }
  },
  computed: {
    modelName: function () {
      if (this.fm === 'ball') {
        return 'ball/ball21';
      }

      return 'fm' + this.fm + '/' + this.sleeves + '-' + (this.tucked ? 'tucked' : 'untucked');
    }
  },
  methods: {
    updateConfiguration() {
      this.$bus.emit('updated-configuration', { textureRefresh: false });
    },
    updateConfigurationWithTextureRefresh() {
      if (this.fm === 'ball') {
        this.$bus.emit('updated-configuration', { textureRefresh: false });
        return;
      }

      if (this.$root.$children[0].$refs.viewer.$refs.textureLoader.currentTextureData === null) {
        this.$bus.emit('updated-configuration', { textureRefresh: false });
      }

      this.$bus.emit('updated-configuration', {textureRefresh: true});
    }
  }
}
</script>

<style>
#configuration {
  position: relative;
  padding: 30px;
  font-family: 'PT Serif', serif;
}

select{
  font-family: 'PT Serif', serif;
  width: 100%;
  padding: 5px;
  border-radius: 8px;
  color: white;
  background-color: #404b63;
  border: none;
}

.config-field{
  margin-bottom: 20px;
}

.config-field-last{
  margin-bottom: 0 !important;
}

#config-shirt{
  border-top: 1px solid #2c3548;
  margin-top: 15px;
  padding-top: 15px;
}

.switches{
  font-size: 14px;
  padding-left: 0 !important;
  margin: 0 !important;
}

.switches label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switches span:last-child {
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 15px;
  background: #404b63;
  transition: all 0.3s;
}

.switches span:last-child::before,
.switches span:last-child::after {
  content: "";
  position: absolute;
}

.switches span:last-child::before {
  left: 1px;
  top: 1px;
  width: 24px;
  height: 24px;
  background: #f1f1f3;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s;
}

.switches span:last-child::after {
  top: 50%;
  right: 8px;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/uncheck-switcher.svg);
  background-size: 12px 12px;
}

.switches [type="checkbox"]:checked + label span:last-child {
  background: #007EC1;
}

.switches [type="checkbox"]:checked + label span:last-child::before {
  transform: translateX(24px);
}

.switches [type="checkbox"]:checked + label span:last-child::after {
  width: 14px;
  height: 14px;
  left: 8px;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/checkmark-switcher.svg);
  background-size: 14px 14px;
}

@media screen and (max-width: 600px) {
  .switches li::before {
    display: none;
  }
}

[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

:root {
  --white: #f1f1f3;
  --gray: #404b63;
  --blue: #18172c;
  --green: #007EC1;
}

ol {
  list-style: none;
}
</style>
