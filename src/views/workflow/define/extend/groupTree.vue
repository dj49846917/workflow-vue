<template>
  <div>
    <el-dialog title="组织树" :visible="visible" width="40%" :before-close="modalClose">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
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
        label: 'groupNm'
      },
	  treeRowData: {} // 树选中的数据
    }
  },
  computed: {
    ...mapState(['extend'])
  },
  created() {
    this.$store.dispatch('extend/getGroup').then(() => {
      this.data = this.extend.groupList
    })
  },
  methods: {
    // 点击树节点
    handleNodeClick(data) {
      console.log(data)
	  this.treeRowData = data
    },
    // 取消
    modalClose() {
      const params = {}
      params.status = false
      this.$emit('changeGroupStatus', false) // 直接修改父组件的属性
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
      this.$emit('changeGroupStatus', params)
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
