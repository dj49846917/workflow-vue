<template>
  <div>
    <el-dialog title="岗位树" :visible="visible" width="40%" :before-close="modalClose">
      <el-tree
        :props="defaultProps"
        node-key="_id"
        highlight-current
        lazy
        :load="loadNode"
        @node-click="handleNodeClick"
      />
      <div class="rightBtn">
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini" @click="modalClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['visible'],
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'enumName',
        isLeaf: 'leaf'
      },
	    treeRowData: {} // 树选中的数据
    }
  },
  computed: {
    ...mapState(['extend'])
  },
  created() {

  },
  methods: {
    // 点击树节点
    handleNodeClick(data) {
      console.log(data)
	  this.treeRowData = data
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      // 一级节点处理
      if (node.level === 0) {
        this.requestTree(resolve)
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getIndex(node, resolve)
      }
    },

    // 首次加载一级节点数据函数
    requestTree(resolve) {
      const params = {
        parentEnumKey: '00000000'
      }
      this.$store.dispatch('extend/getPos', params).then(() => {
        this.extend.posList.forEach(item => {
          if (item.isLeaf === '1') {
            item.leaf = false // 为叶子节点
          } else {
            item.leaf = true // 不为叶子节点
          }
        })
		  resolve(this.extend.posList)
      })
    },

    // 异步加载叶子节点数据函数
    getIndex(node, resolve) {
      const params = {
        parentEnumKey: node.data.enumKey
      }
      this.$store.dispatch('extend/getPos', params).then(() => {
		  this.extend.posList.forEach(item => {
          if (item.isLeaf === '1') {
            item.leaf = false // 为叶子节点
          } else {
            item.leaf = true // 不为叶子节点
          }
        })
		  resolve(this.extend.posList)
      })
    },

    // 取消
    modalClose() {
      const params = {}
      params.status = false
      this.$emit('changePosStatus', false) // 直接修改父组件的属性
    },
    // 确定
    save() {
      if (JSON.stringify(this.treeRowData) === '{}') {
        this.$message({
          showClose: true,
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      const params = {}
      params.status = false
      params.rowData = this.treeRowData
      this.$emit('changePosStatus', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.rightBtn{
  text-align: right;
  margin-top: 20px;
}
</style>
