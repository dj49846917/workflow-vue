<template>
  <div class="dashboard-container">
    <div class="content">
		<div class="header">
			<el-row class="header_row">
				<el-col :span="8">
					<img :src="logo" />
					<div class="logoTextBox">
						<p class="logoTextBox_title">信贷与投资管理系统</p>
						<p class="logoTextBox_eng">YPSystem</p>
						<p class="logoTextBox_eng">已启动<span>2716</span>个流程实例</p>
					</div>
				</el-col>
				<el-col :span="12" :offset="4" class="totalBox">
					<div class="totalBoxItem">
						<div class="totalBoxItemNum">28481</div>
						<div class="totalBoxItemTitle">人员</div>
					</div>
					<div class="totalBoxItem">
						<div class="totalBoxItemNum">28481</div>
						<div class="totalBoxItemTitle">机构</div>
					</div>
					<div class="totalBoxItem">
						<div class="totalBoxItemNum">28481</div>
						<div class="totalBoxItemTitle">岗位</div>
					</div>
					<div class="totalBoxItem">
						<div class="totalBoxItemNum">28481</div>
						<div class="totalBoxItemTitle">定义</div>
					</div>
					<div class="totalBoxItem">
						<div class="totalBoxItemNum">28481</div>
						<div class="totalBoxItemTitle">代办</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-row class="progressBox">
			<el-col :span="12" class="progressBox_start">
				<start-progress />
			</el-col>
			<el-col :span="12">
				333
			</el-col>
		</el-row>
	</div>
  </div>
</template>

<script>
import startProgress from '@/views/dashboard/startProgress'
export default {
  name: 'Dashboard',
  components: {
	  startProgress
  },
  data(){
    return {
      logo: require('@/assets/alphabet-logo-Y.svg')
    }
  },
  created() {
    this.$store.dispatch('home/getList')
  }
}
</script>

<style lang="scss" scoped>
$textColor1: #666;
$textColor2: #999;
.dashboard-container{
	padding: 20px;
	.content{
		background: #fff;
		.header{
			padding: 20px;
			.header_row{
				display: flex;
				align-items: center;
				img{
					width: 100px;
					height:100px;
					float: left;
				}
				.logoTextBox{
					margin-left: 100px;
					margin-top: 12px;
					p{
						margin: 0;
						padding-left:22px;
						white-space: nowrap;
					}
					.logoTextBox_title{
						font-size: 28px;
						color: $textColor1;
						
					}
					.logoTextBox_eng{
						font-size: 16px;
						color: $textColor2;
						span{
							font-size: 24px;
							color: $textColor1;
						}
					}
				}
				.totalBox{
					display: flex;
					height: 20px;
					.totalBoxItem{
						display: flex;
						flex-direction: column;
						justify-content: center;
						width: 18%;
						text-align: center;
						border-right: 1px solid #ccc;
						.totalBoxItemNum{
							font-size: 28px;
							color: $textColor1;
							white-space: nowrap;
						}
						.totalBoxItemTitle{
							font-size: 14px;
							color: $textColor2;
						}
					}
				}
			}
		}
		.progressBox{
			padding: 20px;
			.progressBox_start{
				border: 1px solid #ededed;
				padding: 20px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
