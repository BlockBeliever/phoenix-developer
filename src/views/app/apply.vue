<template>
  <div>
    <apply-form :is-edit="false" />
  </div>
</template>

<script>
import ApplyForm from './components/ApplyForm'
import ApplyInfo from './components/ApplyInfo'

export default {
  name: 'CreateArticle',
  components: { ApplyForm },
  data() {
    return {

    }
  },
}
</script>

