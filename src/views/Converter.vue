<template>
  <div class="converter">
    <div class="forTransferBlocks">
      <div class="basicWrapperDiv">
        <div class="forValuteName">
          {{ getList.Valute[selectedFirstValute].Name }}
        </div>

        <select
          v-model="selectedFirstValute"
          onfocus="this.size=7"
          onblur="this.size=1"
          onchange="this.size=1;  this.blur(); "
        >
          <template v-for="nameValute in getList.Valute" :key="nameValute.ID">
            <option :value="nameValute.CharCode">
              {{ nameValute.CharCode }}
            </option>
          </template>
        </select>

        <input class="enterNumber" type="number" v-model="enteredCount" />
      </div>
      <button v-on:click="overwriteValues()">⇄</button>
      <div class="basicWrapperDiv">
        <div class="forValuteName">
          {{ getList.Valute[selectedSecondValute].Name }}
        </div>

        <select
          v-model="selectedSecondValute"
          onfocus="this.size=7"
          onblur="this.size=1"
          onchange="this.size=1;  this.blur(); "
        >
          <template
            v-for="nameTwoValute in getList.Valute"
            :key="nameTwoValute.ID"
          >
            <option :value="nameTwoValute.CharCode">
              {{ nameTwoValute.CharCode }}
            </option>
          </template>
        </select>

        <input
          class="enterNumber"
          type="text"
          readonly
          :value="computeConverteredValue"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Converter",
  data() {
    return {
      selectedSecondValute: "GBP",
      selectedFirstValute: "AUD",
      enteredCount: 1,
    };
  },
  methods: {
    overwriteValues() {
      const temp = this.selectedFirstValute;
      this.selectedFirstValute = this.selectedSecondValute;
      this.selectedSecondValute = temp;
    },
  },
  computed: {
    computeConverteredValue() {
      const el = this.getList.Valute;
      const value =
        (this.enteredCount *
          (el[this.selectedFirstValute].Value /
            el[this.selectedFirstValute].Nominal)) /
        (el[this.selectedSecondValute].Value /
          el[this.selectedSecondValute].Nominal);

      return value.toFixed(2);
    },
    getList() {
      return this.$store.getters.getWholeList;
    },
  },
};
</script>
<style lang="scss">
.forTransferBlocks {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: auto;
    margin-bottom: auto;
    margin: 0px 20px;
    color: #585858;
    background-color: rgb(234, 245, 243);
    border: none;
    outline: none;
    &:focus {
      outline: none;
    }
  }

  .basicWrapperDiv {
    display: inline-block;
    border-radius: 12px;
    box-sizing: content-box;
    background-color: #ffffff;
    padding: 10px 5px;
    width: 200px;

    box-shadow: 3px 3px 6px rgba($color: #000000, $alpha: 0.3);
    .forValuteName {
      opacity: 0.6;
    }
    select {
      display: inline-block;
      position: absolute;
      margin-left: -90px;
      margin-top: 10px;
      margin-right: 10px;
      border: white;
      &:active,
      &:focus {
        outline: none;
      }
      option {
        &:hover {
          background: rgba(137, 187, 245, 0.2);
        }
      }
    }

    .enterNumber {
      border: none;
      width: 90px;
      float: right;
      margin-top: 10px;
      margin-right: 10px;
      padding-left: 10px;
      border-bottom: 1.5px solid rgb(15, 14, 14);
      transition: 0.3s;
      &:focus {
        outline: none;
        border: none;
        border-bottom: 1.5px solid #42b983;
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
