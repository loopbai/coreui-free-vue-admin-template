<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Basic Form</strong> Create
          </div>
          <b-form>
            <b-form-group
              description
              label="用戶名稱"
              label-for="userName"
              :label-cols="3"
            >
              <b-form-input id="userName" type="text" autocomplete="name" v-model="userName"></b-form-input>
            </b-form-group>

            <b-form-group
              description
              label="信箱名稱"
              label-for="mailName"
              :label-cols="3"
            >
              <b-form-input id="mailName" type="text" autocomplete="name" v-model="mailName"></b-form-input>
            </b-form-group>

            <b-form-group label="組織" label-for="org" :label-cols="3">
              <b-form-select
                id="org"
                :plain="true"
                :options="optOrg"
                v-model="org"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="有效" label-for="is_active" :label-cols="3">
              <b-form-select
                id="is_active"
                :plain="true"
                :options="optActive"
                v-model="isActive"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              label="備註"
              label-for="desc"
              :label-cols="3"
            >
              <b-textarea id="desc" :textarea="true" :rows="3" placeholder="Content.." v-model="desc"></b-textarea>
            </b-form-group>

            <b-form-group label="建立時間" label-for="created_at" :label-cols="3" >
              <b-form-input plaintext id="created_at" type="text" :value="createdAt"></b-form-input>
            </b-form-group>
            <b-form-group label="更新時間" label-for="updated_at" :label-cols="3" >
              <b-form-input plaintext id="updated_at" type="text" :value="updatedAt"></b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button size="sm" variant="primary" @click="onSubmitClicked()">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <!-- <b-button type="reset" size="sm" variant="danger">
                <i class="fa fa-ban"></i> Reset
              </b-button> -->
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueX from 'vuex'
import router from "../router";

const form = new VueX.Store({
  state: {
      mail: {},
  },
  mutations: {
    setMail(state, mail){
      state.mail = mail
    },
    updateUserName(state, userName) {
      state.mail.user_name = userName
    },
    updateMailName(state, mailName) {
      state.mail.mail_name = mailName
    },
    updateOrg(state, org) {
      state.mail.org = org
    },
    updateIsActive(state, isActive) {
      state.mail.is_active = isActive
    },
    updateDesc(state, desc) {
      state.mail.desc = desc
    }
  }
})

export default {
  name: "Mail-Add",
  components: {},
  data: () => {
    return {
      optOrg: [],
      optActive:[{text: 'Yes', value: '1'},{text: 'No', value: '0'}]
    };
  },
  computed: {
    userName: {
      get() {
        return form.state.mail.user_name
      },
      set(value) {
        form.state.mail.user_name = value
      }
    },
    mailName: {
      get() {
        return form.state.mail.mail_name
      },
      set(value) {
        form.state.mail.mail_name = value
      }
    },
    org: {
      get() {
        return form.state.mail.org
      },
      set(value) {
        form.state.mail.org = value
      }
    },
    isActive: {
      get() {
        return form.state.mail.is_active
      },
      set(value) {
        form.state.mail.is_active = value
      }
    },
    desc: {
      get() {
        return form.state.mail.desc
      },
      set(value) {
        form.state.mail.desc = value
      }
    },
    createdAt() {
      return form.state.mail.created_at
    },
    updatedAt() {
      return form.state.mail.updated_at
    }
  },
  created() {
    // get orgs
    this.$apiRequest
      .get("api/v1/option/org")
      .then(response => {
        this.optOrg = response.data
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response.status === 401) {
          router.push({ path: "system/login" });
        }
      });
  },
  methods: {
    onSubmitClicked: function() {
      let data = form.state.mail
      this.$apiRequest
        .post("api/v1/mail", data)
        .then(() => {
          alert('Success!')
          router.push({ path: "/mails" })
        })
        .catch(error => {
          console.log(error.response.data);
          alert(error.response.data)
        });
    },
  }
};
</script>
