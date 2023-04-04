<template>
  <develop-info />
</template>

<script>
import DevelopInfo from './components/DevelopInfo'

export default {
  name: 'CreateArticle',
  components: { DevelopInfo },
  created(){
    this.$store.dispatch("developer/setDeveloperInfo");
  },
}
</script>


