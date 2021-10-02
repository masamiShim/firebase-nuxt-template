<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table dense :headers="dt.contractHeaders">
              <template
                #header="{ props: { headers } }"
              >
                <thead>
                <tr>
                  <th :colspan="headers.length">
                    契約中案件
                  </th>
                </tr>
                </thead>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table dense :headers="dt.billingHeaders">
              <template
                #header="{ props: { headers } }"
              >
                <thead>
                <tr>
                  <th :colspan="headers.length">
                    請求未発行
                  </th>
                </tr>
                </thead>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table dense :headers="dt.incomeHeaders">
              <template
                #header="{ props: { headers } }"
              >
                <thead>
                <tr>
                  <th :colspan="headers.length">
                    入金管理
                  </th>
                </tr>
                </thead>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  setup(_, __) {
    const contractHeaders = [
      { text: "契約", value: "contract" },
      { text: "契約期限", value: "to" },
      { text: "稼働率", value: "work" },
      { text: "時間幅", value: "duration" },
      { text: "単価", value: "realPrice" }
    ]

    const billingHeaders = [
      { text: "案件名", value: "matter" },
      { text: "請求先", value: "to" },
      { text: "請求期限", value: "work" }
    ]

    const incomeHeaders = [
      { text: "案件名", value: "matter" },
      { text: "請求先", value: "to" },
      { text: "請求日時", value: "work" },
      { text: "支払期日", value: "work" },
      { text: "入金状況", value: "work" }
    ]

    return {
      dt: { contractHeaders, billingHeaders, incomeHeaders }
    }
  }
})
</script>

<style scoped>

</style>