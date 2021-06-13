<template>
  <div class="listOfCurrencies">
    <input
      class="searchInput"
      type="text"
      placeholder="Поиск"
      v-model="searchValue"
    />
    <ul class="containerForList">
      <li
        class="containerForElementOfList"
        v-for="nameValute in serchInList"
        :key="nameValute.ID"
      >
        <div class="CurrencyName">{{ nameValute.Name }}</div>
        <div class="forCourseDiv">
          <span
            >1
            {{ !convertTo[nameValute.ID] ? nameValute.CharCode : "RUB" }}</span
          >
          <button v-on:click="overwriteCurrencies(nameValute.ID)">⇄</button>
          <span>{{ currency(nameValute) }} </span>

          <span
            :class="{ dicreaseState: nameValute.Value < nameValute.Previous,  increaseState: nameValute.Value > nameValute.Previous }"
            > {{ Math.abs((nameValute.Value - nameValute.Previous).toFixed(4))}}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListOfCurrencies",
  data() {
    return {
      searchValue: "",
      valueInRUB: 0,
      convertTo: {},
    };
  },
  methods: {
    overwriteCurrencies(id) {
      this.convertTo[id] = !this.convertTo[id];
    },
    currency(el) {
      if (!this.convertTo[el.ID]) {
        let value = el.Value / el.Nominal;
        return value.toFixed(4) + "RUB";
      } else {
        let value = 1 / (el.Value / el.Nominal);
        return value.toFixed(4) + el.CharCode;
      }
    },
  },
  computed: {
    serchInList() {
      if (this.searchValue) {
        const obj = Object.values(this.getList.Valute);
        const newArray = [];
        const serach = this.searchValue.toLowerCase();
        for (const key in obj) {
          const el = obj[key];

          if ((el.Name + el.CharCode).toLowerCase().indexOf(serach) != -1)
            newArray.push(el);
        }

        return newArray;
      }
      return this.getList.Valute;
    },
    getList() {
      return this.$store.getters.getWholeList;
    },
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: rgb(234, 245, 243);
  border-radius: 5px;
  background-clip: content-box !important;
}
::-webkit-scrollbar-thumb {
  background: rgba($color: #ade0c9, $alpha: 1);
  border-radius: 8px;
}

%toCenter {
  margin-left: auto;
  margin-right: auto;
}
* {
  button {
    cursor: pointer;
  }
}
.containerForList {
  @extend %toCenter;
  padding-right: 40px;
  width: 400px;
  margin-top: 30px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

  .containerForElementOfList {
    box-shadow: 3px 3px 6px rgba($color: #000000, $alpha: 0.3);
    border-radius: 12px;
    padding: 10px 10px;
    width: 400px;
    height: 50px;
    background-color: rgb(234, 245, 243);
    margin-bottom: 5px;
    font-size: 12px;
    list-style-type: none;
    text-align: left;
    .forCourseDiv {
      button {
        margin: 0px 20px;
        color: #585858;
        background-color: rgb(234, 245, 243);
        border: none;
        outline: none;
        &:focus {
          outline: none;
        }
      }
    }
    .CurrencyName {
      opacity: 0.6;
      margin-bottom: 8px;
    }

    .dicreaseState {
      float: right;
      color: red;
      &:before{
content: '↓';
      }
    }
    .increaseState {
       float: right;
      color: green;
       &:before{
content: ' ↑';
      }
    }
  }
}

.searchInput {
  @extend %toCenter;
  width: 300px;
  padding: 12px 24px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;
  color: #575756;
  background-color: transparent;
  background-image: url("../assets/serch.png");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &:hover,
  &:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }
}
</style>
