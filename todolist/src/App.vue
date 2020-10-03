<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="handleClickAdd">添加事项</a-button>

    <a-list bordered :dataSource="showList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="handleChecked(item.id)" >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="handleClickDel(item.id)" >删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undownLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeKey('all')">全部</a-button>
          <a-button :type="viewKey==='undown'?'primary':'default'"  @click="changeKey('undown')">未完成</a-button>
          <a-button :type="viewKey==='down'?'primary':'default'"  @click="changeKey('down')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="handleClean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
  import {mapActions,mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    methods: {
      ...mapActions(['getList']),
      ...mapMutations(['changeInputValue','addList','removeList','changeDone','clean','changeViewKey']),
      handleInputChange(e){
        this.changeInputValue(e.target.value)
      },
      handleClickAdd(){
        if(this.inputValue.trim().length<=0){
          this.$message.warning('文本框不可以为空');
        }else{
          this.addList();
        }

      },
      handleClickDel(val){
          this.removeList(val);
      },
      handleChecked(val){
          this.changeDone(val);
      },
      handleClean(){
        this.clean();
      },
      changeKey(newKey){
        this.changeViewKey(newKey);
      }
    },
    computed: {
      ...mapState ([,'inputValue','viewKey']),
      ...mapGetters(['undownLength','showList'])

    },
    created (){
      this.getList();
    }
  }
</script>

<style scoped>
  #app {
    padding: 10px;
  }
  .my_ipt {
    width: 500px;
    margin-right: 10px;
  }
  .dt_list {
    width: 500px;
    margin-top: 10px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
