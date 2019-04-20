<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <c-table-action
          :table-header="tableHeader"
          :table-column="tableColumn"
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
      tableColumn: ["user_name", "mail_name", "org_name", "is_active", "actions"]
    };
  },
  created() {
    this.$apiRequest
      .get("api/v1/mail")
      .then(response => {
        this.$store.commit('setMails', response.data)
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
