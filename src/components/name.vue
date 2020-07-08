<template>
    <div>
        <h1>我是{{ $route.params.name }}</h1> 
        <h1>我{{ $route.query.age }}岁辣</h1>
        <router-link to="more" append>关于我</router-link>
        
    </div>
</template>
<script>
export default {
    name:"Name",
}
</script>