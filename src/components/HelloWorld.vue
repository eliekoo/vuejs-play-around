<template>
  <div class="container">
    <div class="dp-mask" v-show="panelShow" @click="panelShow = false"></div>
    <div class="selected-date" @click="panelShow = !panelShow">
      <div style="display: flex;flex-wrap: wrap;" v-if="multi">
        <div class="sel-values" v-for="(item,index) in selected" :key="index" >
          {{format(item)}}
        </div>
      </div>
      <div v-else>
        {{selected ? format(selected) : ''}}
      </div>
    </div>

    <transition name="smooth">
      <div class="pick-panel" :style="{'position': alwaysDisplay ? 'inherit' : 'absolute'}" v-show="alwaysDisplay || panelShow">
        <div class="dp-header">
          <div class="btn btn-link last-year" @click="seleYear--"></div>
          <div class="btn btn-link last-month" @click="changeMonth(-1)"></div>
          <div class="btn btn-link sele-year">
            {{seleYear}}
            <span v-if="lang != 'en' || !!disp">{{display.year}}</span>
          </div>
          <div class="btn btn-link sele-month">
            <span v-if="lang === 'en' && !disp">{{monthNames[seleMonth]}}</span>
            <span v-else>{{seleMonth+1}}{{display.month}}</span>
          </div>
          <div class="btn btn-link next-month" @click="changeMonth(1)"></div>
          <div class="btn btn-link next-year" @click="seleYear++"></div>
        </div>
        <div class="dp-body">
          <div class="cal-container">
            <div class="cal-item" v-for="day in display.days" :key="day">{{day}}</div>
            <div class="cal-item" 
            @click="toggleSelect(item)" 
            v-for="(item,index) in renderCalendar" :key="index" 
            :class="[item.iscur? 'cal-enable' : 'cal-disable', selectIndex(item) >= 0  ? 'cal-select' : '']">
              {{item.label}}
            </div>
          </div>
        </div>
        <div class="dp-footer" v-show="multi">
          <div class="btn btn-cancel" @click="cancelSelect">{{alwaysDisplay ? display.clear : display.cancel}}</div>
          <div v-if="!alwaysDisplay" class="btn btn-ok" @click="submitSelect(selected)">{{display.ok}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data: () => ({
			panelShow: false,
			seleDate: new Date(),
			seleYear: new Date().getFullYear(),
			seleMonth: new Date().getMonth(),
			monthNames: ["Jan", 
			"Feb", 
			"Mar", 
			"Apr", 
			"May", 
			"June", 
			"July", 
			"Aug", 
			"Sept", 
			"Oct", 
			"Nov", 
			"Dec"],
		}),
		props: {
			multi:{
				type: Boolean,
				default: false,
			},
			value:{
				// type: Array|String|Date,
				default: [],
			},
			
			lang: {
      type: String,
      default: 'zh'
    },
    format: {
      type: Function,
      default: date => date.toLocaleDateString()
    },
    alwaysDisplay: {
      type: Boolean,
      default: false
    },
    disp: {
      type: Array,
      default: function (){ 
        
          return ['日', '一', '二', '三', '四', '五', '六', '年', '月', '取消', '确定', 'Clear']
      }
    },
  },
  computed: {
    renderCalendar: function () {
      let firDay = 0 - (new Date(this.seleYear, this.seleMonth, 1).getDay()) + 1
      let res = []
      for (let i = firDay, index = 0; index < 42; i++ , index++) {
        let day = new Date(this.seleYear, this.seleMonth, i, 8)
        let calObj = {
          label: day.getDate(),
          date: day,
          iscur: day.getMonth() === this.seleMonth
        }
        res.push(calObj)
      }
      return res
    },
    selected: function () { return this.value},
    display: function () {
      let d = this.disp
      
        if (this.lang === 'en') {
          d = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat','Year', 'Month', 'Cancel', 'OK']
        } else {
          d = ['日', '一', '二', '三', '四', '五', '六','年', '月', '取消', '确定']
        }
      return {
        days: d.slice(0,7),
        year: d[7],
        month: d[8],
        cancel: d[9],
        ok: d[10],
        clear: d[11]
      }
    }
  },
  methods: {
    selectIndex: function (item) {
      if (!this.multi || !this.selected) {
        return -1
      }
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].getTime() == item.date.getTime()) {
          return i
        }
      }
      return -1
    },
    cancelSelect: function () {
      if (this.multi) {
        this.selected.splice(0, this.selected.length)
      } else {
        this.selected = null
      }
      this.panelShow = false
    },
    toggleSelect: function (item) {
    console.log("item",item.date)
      if (!this.multi) {
        this.submitSelect(item.date)
      } else {
        let index = this.selectIndex(item)
        if (index < 0) {
        console.log(this.selected);
          this.selected.push(item.date)
        } else {
          this.selected.splice(index, 1)
        }
      }
    },
    submitSelect: function (value) {
      this.$emit('input', value)
      this.panelShow = false
    },
    changeMonth(num) {
      if (this.seleMonth + num > 11) {
        this.seleMonth = 0
        this.seleYear++
      } else if (this.seleMonth + num < 0) {
        this.seleMonth = 11
        this.seleYear--
      } else {
        this.seleMonth += num
      }
    }
  }
}
</script>
<style>
	.dp-mask{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.selected-date{
  cursor: pointer;
  min-height: 28px;
  padding: 3px 10px;
  border-radius: 3px;
  border: 1px solid rgb(191, 203, 217);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  min-width: 195px;
  max-width: 230px;
}
.pick-panel{
  width: 280px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #48576a;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 6px #ccc;
  background: #fff;
  border-radius: 2px;
  line-height: 20px;
  margin: 5px 0;
  z-index: 10;
}
 
.last-year:before{content: "<<"}
.last-month:before{content: "<"}
.next-month:before{content: ">"}
.next-year:before{content: ">>"}
.btn{cursor: pointer; padding: 3px; margin: 0 8px;}

.btn-link:hover{
  color: #61C3FF
}
.dp-header{
  display: flex;
}
.dp-footer{
  width: 90%;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  margin: 8px;
  border-top: 1px solid #daa
}

.cal-container{
  width: calc(7*34px);
  display: flex;
  flex-wrap: wrap
}

.cal-item{
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
}
.cal-enable{
  cursor: pointer;
}
.cal-enable:hover{
  background-color: #E4E8F1;
}
.cal-disable{
  color: #d4d8d1;
  cursor: default
}
.cal-select{
  background-color: #61C3FF
}

.btn-ok{
  color: #61C3FF;
  /* font-weight: bold; */
  font-size: 1rem;
}
.sel-values{
  background-color: rgba(32,160,255,.1);
  border-color: rgba(32,160,255,.2);
  color: #20a0ff;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  font-size: 12px;
  margin: 3px;
  padding: 0 5px;
  border-radius: 3px;
}
.smooth-enter-active {
  transition: all .5s ease-in-out;
}
.smooth-leave-active {
  transition: all .5s ease-in-out;
}
.smooth-enter, .smooth-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>