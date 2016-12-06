<template>
	<div>
		<div class="ceshi">
		1231231312
		<span class="ceshi2">123123</span>
		</div>
		<test></test>
	</div>
</template>
<script>
	 import test from './packages/test.vue'
	 export default{
	 	components:{
	 			'test':test
	 	},
	 	name:'test',
	 	data(){
	 		return {
	 			hehe:1
	 		}
	 	},
	 	mounted(){
	 		console.log(12313);
	 	}
	 }
</script>
<style scoped lang="scss">
	.ceshi{
		background: #000;
		display:flex;
		.ceshi2{
			background: #fff;
		}
	}
	
</style>