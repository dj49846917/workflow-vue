<template>
  <div>
    <el-dialog
      title="新增"
      :visible="visible"
      width="100%"
      :before-close="modalClose"
    >
      <div class="rightBtn">
        <el-button type="primary" size="mini" @click.native.prevent="addItem">新增</el-button>
      </div>
      <el-form
        ref="ruleForm"
        size="mini"
        :model="form"
        :status-icon="true"
      >
        <el-table
          :data="form.extendTable"
          highlight-current-row
          style="width: 100%"
          border
          size="mini"
        >
          <el-table-column
            label="规则"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.userRuleNm'"
                :rules="[
                  { required: true, message: '规则不能为空', trigger: 'change' }
                ]"
              >
                <el-select v-model="scope.row.userRuleNm" clearable placeholder="请选择">
                  <el-option
                    v-for="item in ruleList"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="上一节点"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.taskDefinitionName'"
                :rules="[
                  { required: true, message: '上一节点不能为空', trigger: 'change' }
                ]"
              >
                <el-select v-model="scope.row.taskDefinitionName" clearable placeholder="请选择">
                  <el-option
                    v-for="item in extend.lastNodeList"
                    :key="item.taskDefinitionKey"
                    :label="item.taskName"
                    :value="item.taskDefinitionKey"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="组织"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.groupNm'"
                :rules="[
                  { required: true, message: '组织不能为空', trigger: 'change' }
                ]"
              >
                <el-input v-model="scope.row.groupNm" placeholder="组织" @focus="()=>openGroupTree(scope.$index)" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="机构级别"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.loanOrgLvlNm'"
                :rules="[
                  { required: true, message: '机构级别不能为空', trigger: 'change' }
                ]"
              >
                <el-select v-model="scope.row.loanOrgLvlNm" clearable placeholder="请选择">
                  <el-option
                    v-for="item in loanList"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="机构"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.orgNm'"
                :rules="[
                  { required: true, message: '机构不能为空', trigger: 'change' }
                ]"
              >
                <el-input
                  v-model="scope.row.orgNm"
                  placeholder="机构"
                  @focus="()=>openOrgTree(scope.$index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="岗位"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'extendTable.'+scope.$index+'.positionNm'"
                :rules="[
                  { required: true, message: '岗位不能为空', trigger: 'change' }
                ]"
              >
                <el-input
                  v-model="scope.row.positionNm"
                  placeholder="岗位"
                  @focus="()=>openPosTree(scope.$index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="modalClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <group-tree
      :v-if="groupStatus"
      :visible="groupStatus"
      @changeGroupStatus="updateGroupStatus"
    />
    <org-tree
      :v-if="orgStatus"
      :visible="orgStatus"
      @changeOrgStatus="updateOrgStatus"
    />
    <pos-tree
      :v-if="posStatus"
      :visible="posStatus"
      @changePosStatus="updatePosStatus"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import groupTree from '@/views/workflow/define/extend/groupTree'
import orgTree from '@/views/workflow/define/extend/orgTree'
import posTree from '@/views/workflow/define/extend/posTree'
export default {
  name: 'ExtendAddList',
  components: {
    groupTree,
    orgTree,
    posTree
  },
  props: {
    visible: { type: Boolean },
    loanList: { type: Array },
    ruleList: { type: Array },
    list: { type: Array },
    primary: { type: String }
  },
  data() {
    return {
      groupStatus: false, // 组织树弹窗状态
	    rowIndex: null, // 当前行的下标
      orgStatus: false, // 机构树弹窗状态
      posStatus: false, // 岗位树弹窗状态
      form: {
        extendTable: this.list
      }
    }
  },
  computed: {
    ...mapState(['extend'])
  },
  created() {
    this.getLastNode()
  },
  methods: {
    // 查询上一节点
    getLastNode() {
      const params = {
        id: this.primary
      }
      this.$store.dispatch('extend/getLastNode', params)
    },
    // 取消
    modalClose() {
      this.$emit('changeVisible', false) // 直接修改父组件的属性
    },
    // 新增
    addItem() {
      const newArray = this.form.extendTable
      const obj = {
        userRuleNm: '',
        userRuleNo: '',
        taskDefinitionName: '',
        taskDefinitionKey: '',
        groupNm: '',
        groupNo: '',
        loanOrgLvlNm: '',
        loanOrgLvl: '',
        orgNm: '',
        orgNo: '',
        positionNm: '',
        positionNo: '',
        id: Math.random()
      }
      newArray.push(obj)
      console.log('arr', newArray)
      this.form.extendTable = newArray
    },
    // 打开组织树
    openGroupTree(index) {
      this.rowIndex = index
      this.groupStatus = true
    },
    // 打开机构树
    openOrgTree(index) {
      this.rowIndex = index
      this.orgStatus = true
    },
    // 打开岗位树
    openPosTree(index) {
      console.log('2222')
      this.rowIndex = index
      this.posStatus = true
    },
    // 获取子组件传过来选中的组织树节点
    updateGroupStatus(code) {
      this.groupStatus = false
      if (code.rowData) {
        this.form.extendTable[this.rowIndex].groupNm = code.rowData.groupNm
        this.form.extendTable[this.rowIndex].groupNo = code.rowData.groupNo
        // this.$emit('getChooseGroupTree', code.rowData, this.rowIndex)
      }
    },
    // 获取子组件传过来选中的机构树节点
    updateOrgStatus(code) {
      this.orgStatus = false
      if (code.rowData) {
        this.form.extendTable[this.rowIndex].orgNm = code.rowData.enumName
        this.form.extendTable[this.rowIndex].orgNo = code.rowData.enumKey
        // this.$emit('getChooseOrgTree', code.rowData, this.rowIndex)
      }
    },
    // 获取子组件传过来选中的岗位树节点
    updatePosStatus(code) {
      this.posStatus = false
      if (code.rowData) {
        this.form.extendTable[this.rowIndex].positionNm = code.rowData.enumName
        this.form.extendTable[this.rowIndex].positionNo = code.rowData.enumKey
        // this.$emit('getChoosePosTree', code.rowData, this.rowIndex)
      }
    },
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$emit('saveAddList', this.form.extendTable)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.el-col{
  margin-bottom: 10px;
}
.end{
  margin-bottom: 0;
}
.el-date-editor{
  @extend .el-select
}
.rightBtn{
  text-align: right;
  margin-bottom: 20px;
}
</style>
