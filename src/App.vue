<template>
  <div id="app">
		<!-- <keep-alive> -->
    	<router-view />
			<!-- v-if="$route.meta.keepAlive" -->
		<!-- </keep-alive> -->
		<!-- <router-view v-if="!$route.meta.keepAlive" /> -->
  </div>
</template>

<style>
body {
  font-size: 16px;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,form,input,textarea,p,th,td {
  padding: 0;
  margin: 0
}
</style>
