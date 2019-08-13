<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>编辑</span>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-info" size="mini">
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="业务表单ID:" label-width="150px" prop="businessFormId">
              <el-input v-model="ruleForm.businessFormId" placeholder="请输入业务表单ID" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="业务表单URL:" label-width="150px" prop="businessFormUrl">
              <el-input v-model="ruleForm.businessFormUrl" placeholder="业务表单URL" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="审批表单ID:" label-width="150px" prop="approvalFormId">
              <el-input v-model="ruleForm.approvalFormId" placeholder="请输入审批表单ID" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="审批表单URL:" label-width="150px" prop="approvalFormUrl">
              <el-input v-model="ruleForm.approvalFormUrl" placeholder="请输入审批表单URL" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程变量名:" label-width="150px" prop="processVariables">
              <el-input v-model="ruleForm.processVariables" placeholder="请输入流程变量名" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="调用规则编号:" label-width="150px" prop="ruleId">
              <el-input v-model="ruleForm.ruleId" placeholder="请输入调用规则编号" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="特殊标识:" label-width="150px" prop="specialFla">
              <el-input v-model="ruleForm.specialFla" placeholder="请输入特殊标识" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="节点参与者规则:" label-width="150px" prop="userRuleList">
              <el-input v-model="ruleForm.userRuleList" placeholder="节点参与者规则" disabled />
              <el-button type="primary" size="small" @click.native.prevent="showList">...</el-button>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="转办规则:" label-width="150px" prop="makeOverRule">
              <el-select v-model="ruleForm.makeOverRule" clearable placeholder="请选择">
                <el-option
                  v-for="item in makeOverRuleList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否必须填写意见:" label-width="150px" prop="isMustHasCommont">
              <el-radio-group v-model="ruleForm.isMustHasCommont">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否传阅标志:" label-width="150px" prop="isTransRead">
              <el-radio-group v-model="ruleForm.isTransRead">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="路由规则:" label-width="150px" prop="router">
              <el-radio-group v-model="ruleForm.router">
                <el-radio label="00">系统计算</el-radio>
                <el-radio label="01">用户选择</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="候选人列表是否单选:" label-width="150px" prop="isRadio">
              <el-radio-group v-model="ruleForm.isRadio">
                <el-radio label="00">单选</el-radio>
                <el-radio label="01">多选</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="候选人列表排序方式:" label-width="150px" prop="candidateSortOrd">
              <el-radio-group v-model="ruleForm.candidateSortOrd">
                <el-radio label="00">正序</el-radio>
                <el-radio label="01">倒序</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否允许发起退回:" label-width="150px" prop="isAllowCanSendBack">
              <el-radio-group v-model="ruleForm.isAllowCanSendBack">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否允许接受退回:" label-width="150px" prop="isAllowAcceptSendBack">
              <el-radio-group v-model="ruleForm.isAllowAcceptSendBack">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否允许发起撤回:" label-width="150px" prop="isAllowCanReCall">
              <el-radio-group v-model="ruleForm.isAllowCanReCall">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="是否允许接受撤回:" label-width="150px" prop="isAllowAcceptReCall">
              <el-radio-group v-model="ruleForm.isAllowAcceptReCall">
                <el-radio label="00">是</el-radio>
                <el-radio label="01">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click.native.prevent="save('ruleForm')">保存</el-button>
          <el-button @click.native.prevent="goback()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <extend-add-list
      v-if="visible"
      :visible="visible"
      :list="userRule"
      :primary="primary"
      :loan-list="loanOrgLvlist"
      :rule-list="ruleList"
      @changeVisible="updateVisible"
      @changeArrayNum="updateArrayNum"
	  @getChooseGroupTree="updateChooseGroupTree"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findList } from '@/utils/index.js'
import extendAddList from '@/views/workflow/define/extend/extendAddList'
export default {
  name: 'ExtendAdd',
  components: {
    extendAddList
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        businessFormId: '',
        businessFormUrl: '',
        approvalFormId: '',
        approvalFormUrl: '',
        processVariables: '',
        ruleId: '',
        specialFla: '',
        isMustHasCommont: '00',
        isTransRead: '01',
        router: '00',
        isRadio: '00',
        candidateSortOrd: '00',
        isAllowCanSendBack: '',
        isAllowAcceptSendBack: '',
        isAllowCanReCall: '',
        isAllowAcceptReCall: '',
        userRuleList: '',
        makeOverRule: ''
      },
      userRule: [], // 节点参与者列表
      primary: '', // 前一个列表选中的id
      visible: false, // 弹窗状态
      rules: {
        isAllowCanSendBack: [{ required: true, trigger: 'change', message: '请选择是否允许发起退回' }],
        isAllowAcceptSendBack: [{ required: true, trigger: 'change', message: '请选择是否允许接受退回' }],
        isAllowCanReCall: [{ required: true, trigger: 'change', message: '请选择是否允许发起撤回' }],
        isAllowAcceptReCall: [{ required: true, trigger: 'change', message: '请选择是否允许接受撤回' }],
        makeOverRule: [{ required: true, trigger: 'change', message: '转办规则不能为空' }]
      }
    }
  },
  computed: {
    ...mapState(['extend']),
    makeOverRuleList: function() {
      return findList('MAKE_OVER_USER_RULE', this.extend.dicList)
    },
    loanOrgLvlist: function() {
      return findList('LOAN_ORG_LVL', this.extend.dicList)
    },
    ruleList: function() {
      return findList('USER_RULE', this.extend.dicList)
    }
  },
  created() {
    this.primary = this.$route.query.id
    const params = {
      id: this.$route.query.id
    }
    this.initDic()
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.$store.dispatch('extend/getInitData', payload).then(() => {
        const data = this.extend.detailData
        this.userRule = this.extend.detailData.userRuleList ? JSON.parse(this.extend.detailData.userRuleList) : [] // 节点参与者列表
        this.ruleForm = {
          businessFormId: data.businessFormId || '',
          businessFormUrl: data.businessFormUrl || '',
          approvalFormId: data.approvalFormId || '',
          approvalFormUrl: data.approvalFormUrl || '',
          processVariables: data.processVariables || '',
          ruleId: data.ruleId || '',
          specialFla: data.specialFla || '',
          isMustHasCommont: data.isMustHasCommont ? data.isMustHasCommont : '00',
          isTransRead: data.isTransRead ? data.isTransRead : '01',
          router: data.router ? data.router : '00',
          isRadio: data.isRadio ? data.isRadio : '00',
          candidateSortOrd: data.candidateSortOrd ? data.candidateSortOrd : '00',
          isAllowCanSendBack: data.isAllowCanSendBack || '',
          isAllowAcceptSendBack: data.isAllowAcceptSendBack || '',
          isAllowCanReCall: data.isAllowCanReCall || '',
          isAllowAcceptReCall: data.isAllowAcceptReCall || '',
          userRuleList: data.userRuleList || '',
          makeOverRule: data.makeOverRule || ''
        }
      })
    },
    // 查询业务表单URL和所属系统
    initDic() {
      const params = [
        { type: 'MAKE_OVER_USER_RULE' },
        { type: 'USER_RULE' },
        { type: 'LOAN_ORG_LVL' }
      ]
      this.$store.dispatch('extend/getRuleList', params)
    },
    // 打开弹窗
    showList() {
      this.visible = true
    },
    // 关闭弹窗
    updateVisible() {
      this.visible = false
    },
    // 保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            ...this.ruleForm
          }
          this.initData(params)
        }
      })
    },
    // 返回
    goback() {
      this.$router.go(-1)
    },
    // 获取子组件传来的array数量
    updateArrayNum(code) {
      console.log('3', code)
      this.userRule = code
    },
	// 获取子组件传来的数据
	updateChooseGroupTree(row, index) {
		console.log('row', row, index)
		console.log('44', this.userRule[index])
		this.userRule[index].groupNm = row.groupNm
		this.userRule[index].groupNo = row.groupNo
	}
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 70%;
}
.el-input {
  @extend .el-select;
}
.rightItem {
  text-align: right;
}
.el-menu-item {
  min-width: 180px;
  text-align: center;
}
.menuItem {
  padding-right: 20px;
}
</style>
