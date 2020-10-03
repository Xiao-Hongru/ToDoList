import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    list:[],
    inputValue:"请输入要完成事项",
    nextId:5,
    viewKey:'all'
  },
  mutations:{
    //初始化列表
    initList(state,list){
      state.list=list;
      console.log(state.list);
    },
    //改变input
    changeInputValue(state,newVal){
      state.inputValue=newVal;
    },
    //向列表中添加一项
    addList(state){
      const obj={
        id:state.nextId,
        info:state.inputValue.trim(),
        done:false
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue='';
    },
    //列表中删除指定项
    removeList(state,val){
      const index=state.list.findIndex(x=>x.id===val);
      if(index>-1){
        state.list.splice(index,1);
      }
    },
    //列表中改变done的状态
    changeDone(state,val){
      const index=state.list.findIndex(x=>x.id===val);
      if(index>-1){
        state.list[index].done=!state.list[index].done;
      }
    },
    //清除已经完成
    clean(state){
      state.list=state.list.filter(x=>x.done===false);
    },
    //切换按钮状态
    changeViewKey(state,newKey){
      state.viewKey=newKey;
    }

  },
  actions:{
    getList(context){
      axios.get('../static/list.json').then(({data})=>{
        context.commit('initList',data);

      })

    }
  },
  getters:{
      undownLength(state){
        return state.list.filter(x=>x.done===false).length;
      },
      showList(state){
         if(state.viewKey==='all'){
           return state.list;
         } else if(state.viewKey==='undown'){
           return state.list.filter(x=>x.done===false)
         }else{
           return state.list.filter(x=>x.done===true)
         }
      }
  }
})
