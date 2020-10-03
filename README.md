# ToDoList
# Vuex

组件之间的数据共享（小范围）

- 父向子传值：v-bind属性绑定

- 子向父传值:v-on事件绑定

- 兄弟组件之间的共享数据 EventBus

  $on 接收数据的那个组件

  $emit 发送数据的那个组件

Vuex：主要实现数据全局共享的一种方案，方便实现组件之间的数据共享

只有组件之间共享的数据才需要数据共享，存在vuex中，私有的存在data中

## 安装使用

```js
npm install vuex --save

//在main.js评级创建store.js
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{},
  mutation:{},
  acions:{}
})
//在main.js中使用store.js
import store from "./store";
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,//添加store项
});
```



## 核心概念

### state（属性

提供唯一公共数据源

组件中访问state中数据的第一种方式

```js
 <h3>当前最新的count值为{{this.$store.state.count}}</h3>
//<template>中this可以省略
```

组件中访问state中数据的第一种方式

```js
import {mapState} from 'vuex'
   
computed:{
  ...mapState(['count'])//三个点 展开运算符，将全局变量映射为计算属性
}
```



### Mutation 处理变化（方法

在store中只能通过mutation来变更store中的数据

方便后期维护，发现数据有问题，直接找mutations

使用

```js
store.js
//修改组件中的数据
mutations:{
    add(state){
        state.count++;
    },
    addN(state,step){
        state.count+=step;
    },
},
//第一种调用方式
this.$store.commit('add');//commit作用：函数调用
this.$store.commit('addN'，3);//commit作用：函数调用
//第二种调用方式
import {mapMutations} from 'vuex'
methods{
    ...mapMutations(['add','addN'])
    handleBtnClick(){
        this.add();
        this.addN(3);
    }
}
```

mutaion中不能写异步的代码，setTimeout是异步的代码



### Action 处理异步任务（方法

如果通过异步操作变更数据，必须通过Action，不能使用Mutation,但是action中还是要通过mutation的方式间接变更数据

```js
//定义actions
actions:{
    addAsync(context){
        setTimeout(()=>{context.commit('addN',step)},1000)
    }
}

//触发actions
import {mapActions} from 'vuex'
methods:{
    ...mapActions(['addNASync']),
    handleClick(){
        //第一种方式
        //dispatch专门用来触发action(commit专门用来触发mutation)
        this.$store.dispatch('addAsync',step)
        //第二种方法
        this.addNAsync(3);//或者@click="addNASync(3)"
    }
}
```

### Getter（属性

Getter用于对Store中的数据进行包装（不会修改）

1. 对Store中的数据处理之后形成新数据，类似于Vue的计算属性
2. Store中的数据变化，Getter数据也随之变化

```js
//store.js中
getters:{
    showNumber(state){
      return '当前最新的数目是【'+state.count+'】'
    }
  }

//第一种调用方法
<h3>{{$store.getters.showNumber}}</h3>

//第二种调用方法
<h3>{{showNumber}}</h3>

import {mapGetters} from 'vuex'
computed:{
...mapGetters(['showNumber']),
},
   
```

### 基于Vuex的案例

安装依赖包

npm install axios --save

npm install ant-deign-vue --save



配置编译器

新建文件.prettierrc

```js
{
"semi":false,
"singleQuote":true,
}
```

#### 需求一：页面被创建时，从服务器请求数据，传到页面上(数据单向)

思路：

actions中定义异步函数请求数据，调用mutations中的函数更改state中的数据，然后将state中的数据传入组件。显示出来

难点：axios

```js
//store.js
import axios from 'axios'
export default new Vuex.Store({
  state:{
    list:[]
  },
    //2改变state
  mutations:{
    initList(state,list){
      state.list=list;
      console.log(state.list);
    }
  },
    //1异步获取数据
  actions:{
    getList(context){
      axios.get('../static/list.json').then(({data})=>{
        context.commit('initList',data);

      })

    }
  },
})
//App.vue
created (){
      this.getList();
    }
```



区分js和json文件

#### 需求二  input框的双向数据绑定

- 将state中的值映射到input的value属性上

  （正确理解state的value属性，类似于div的innerText,即为

  ```
  <div>xxxxx</div>之间的部分
  ```

- input的变化引起state中数据的变化，调用函数

  难点：如何获取变化的值：e.target.value

#### 需求三 向列表中添加一项

- 难点：向数组中添加，是push

- 添加前要判断.trim().length是否大于0

  是否要弹出waring项（antd）

- 构造要添加的项

#### 需求四 删除列表中某一项

- 先查找要删除项目的index
- 再用splice删除这一项

#### 需求五 统计数组中满足某条件的数目

- 用getters展示
- const newList=list.filter(x=>x.id===false)

#### 需求六 三个按钮高亮效果切换

如何改变展示效果：更改绑定的type属性是”primary“还是"default",如何判断应该是那个，看看viewKey值等于什么（三个三元表达式）
