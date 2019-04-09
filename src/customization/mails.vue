<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <c-table :table-data="itemsArray" :per-page=10 hover striped bordered small fixed caption="Mails List"></c-table>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import cTable from '@/views/base/Table.vue'

export default {
  name: 'tables',
  components: {cTable},
  data: () => {
    return {
      // items: ,
      itemsArray: [],
      fields: []
    }
  },
  created() {
    this.$apiRequest.get('api/v1/mail',)
    .then(response => {
      let maillist = new Array
      response.data.forEach(element => {
        maillist.push({
          owner_name: element.owner_name,
          owner_e_name: element.owner_e_name,
          name: element.name,
          org_name: element.org_name,
          desc: element.desc
          })
      });
      this.itemsArray = maillist
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
