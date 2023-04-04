<template>
  <div>
    <apply-form :is-edit="false" />
  </div>
</template>

<script>
import ApplyForm from './components/ApplyForm'

export default {
  name: 'CreateArticle',
  components: { ApplyForm },
  data() {
    return {
    }
  },
}
</script>

