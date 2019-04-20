<template>
  <b-card :header="tableHeader">
    <b-table
      :dark="dark"
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :small="small"
      :fixed="fixed"
      :items="items"
      responsive="sm"
      :fields="column"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <div slot="actions" slot-scope="data">
        <b-button
          variant="primary"
          class="btn-pill"
          size="sm"
          @click="onActionClicked('edit-item', data.item)"
        >Ddit</b-button>
        <b-button
          variant="danger"
          class="btn-pill"
          size="sm"
          @click="onActionClicked('delete-item', data.item)"
        >Delete</b-button>
      </div>
    </b-table>
    <nav>
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        prev-text="Prev"
        next-text="Next"
        hide-goto-end-buttons
      />
    </nav>
  </b-card>
</template>

<script>
export default {
  name: "c-table-actions",
  inheritAttrs: false,
  props: {
    tableHeader: {
      type: String,
      default: "Table"
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableColumn: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentPage: 1
    };
  },
  computed: {
    items: function() {
      const items = this.$store.state.mails;
      return Array.isArray(items) ? items : items();
    },
    totalRows: function() {
      return this.getRowCount();
    },
    column: function() {
      return this.tableColumn;
    }
  },
  methods: {
    getRowCount: function() {
      return this.items.length;
    },
    onActionClicked: function(action, data) {
      let mails = this.$store.state.mails.filter((item) => (item.id !== data.id));
      this.$store.commit("setMails", mails);
    }
  }
};
</script>
