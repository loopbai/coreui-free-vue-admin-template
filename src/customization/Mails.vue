<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <c-table-action
          :table-header="tableHeader"
          :table-column="tableColumn"
          :table-data="itemsArray"
          :per-page="10"
          hover
          striped
          bordered
          small
          fixed
        ></c-table-action>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import cTableAction from "@/customization/TableAction.vue";
import router from "../router";

export default {
  name: "Mails",
  components: { cTableAction },
  data: () => {
    return {
      tableHeader: "Mail List",
      itemsArray: [],
      tableColumn: ["owner_name", "owner_e_name", "name", "org_name", "actions"]
    };
  },
  created() {
    this.$apiRequest
      .get("api/v1/mail")
      .then(response => {
        let maillist = new Array();
        response.data.forEach(element => {
          maillist.push({
            owner_name: element.owner_name,
            owner_e_name: element.owner_e_name,
            name: element.name,
            org_name: element.org_name,
            desc: element.desc
          });
        });
        //this.itemsArray = maillist;
        this.itemsArray = response.data;
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log(error.response.data);
          router.push({ path: "system/login" });
        }
      });
  }
};
</script>
