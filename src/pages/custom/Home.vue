<template>
  <div class="container-fluid search">
    <el-row >
      <el-col :span="3">
        <el-input v-model="search" placeholder="Type to search"/>
      </el-col>
    </el-row>
  </div>
  <div class="container-fluid">
    <el-table
        v-loading="loading"
        :data="SearchFly"
        stripe
        max-height="800"
        border
        style="width: 100%"
        header-row-class-name="custom_table_header"
        header-cell-class-name="custom_header_cell"
    >
      <el-table-column prop="carrieR_3" label="ALN" align="center"/>
      <el-table-column prop="flighT_NO" label="Flight No" align="center"/>
      <el-table-column prop="oriG_AP_CODE" label="Dep AP Code" align="center"/>
      <el-table-column prop="desT_AP_CODE" label="Des AP Code" align="center"/>
      <el-table-column width="180" label="Schedule Date" align="center">
        <template #default="scope">
          <span v-html="formatDate(scope.row.schedulE_DATE)"></span>
        </template>
      </el-table-column>
      <el-table-column width="180" label="Actual Date" align="center">
        <template #default="scope">
          <span v-html="formatDate(scope.row.actuaL_DATE)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="conN_TYPE" label="Connection Type" align="center"/>
      <el-table-column prop="aircrsafT_TYPE" label="Aircraft Type" align="center"/>
      <el-table-column prop="taiL_NO" label="Tail No" align="center"/>
      <el-table-column prop="parking" label="Parking" align="center"/>
      <el-table-column prop="delayCode" label="Delay Code" align="center"/>
      <el-table-column prop="mtow" label="MTOW" align="center"/>
      <el-table-column prop="transP_TYPE" label="Transport Type" align="center"/>
      <el-table-column prop="flighT_KIND" label="Flight Kind" align="center"/>
      <el-table-column prop="lscount.all" label="Pax" align="center"/>
      <el-table-column prop="lscount.cargo" label="Cargo" align="center"/>
      <el-table-column prop="lscount.post" label="Post" align="center"/>
      <el-table-column prop="status" label="Status" align="center"/>
    </el-table>
  </div>
</template>
<script>
import usePagination from '@/composables/common/usePagination'
import homeService from '@/services/HomeService'
import router from '@/router'
import moment from 'moment'

const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination()
export default {
  name: 'Etv',
  data () {
    const fourHoursAgo = new Date(Date.now()-2*60*60*1000)
    const twelveHourAfter = new Date(Date.now() + 10 * 60 * 60 * 1000)
    const st_from = fourHoursAgo.toISOString().slice(0, 16).replace('T', ' ')
    const end_to = twelveHourAfter.toISOString().slice(0, 16).replace('T', ' ')
    console.log(fourHoursAgo + ' ' + twelveHourAfter + ' ' + st_from + ' ' + end_to + ' ')
    return {
      search: '',
      allMainFlightList: [],
      loading: false,
      dateFlight: {
        st_from: st_from,
        end_to: end_to,
      }
    }
  },
  async mounted () {
    await this.getMainFlightList()
  },
  methods: {
    async getMainFlightList () {
      this.loading = true
      try {
        const { data: FlightData } = await homeService.getLMainFlightList(this.dateFlight)
        FlightData.sort((a, b) => new Date(a.schedulE_DATE) - new Date(b.schedulE_DATE))
        this.allMainFlightList = FlightData
        this.editItem = this.allMainFlightList
        console.log(FlightData)
      } finally {
        this.loading = false
      }
    },
    formatDate (date) {
      if (date != null) {
        const formattedDate = moment(date).format('DD/MM/YYYY')
        const formattedTime = moment(date).format('HH:mm')
        return `${formattedDate} <span style="color: #64b115;">${formattedTime}</span>`
      }
      return date
    }
  },
  computed: {
    SearchFly () {
      return this.allMainFlightList.filter(
          (data) =>
              !this.search ||
              data.carrieR_3?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.flighT_NO?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.desT_AP_CODE?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.oriG_AP_NAME?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.schedulE_DATE?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.conN_TYPE?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.taiL_NO?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.mtow?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.aircrsafT_TYPE?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.transP_TYPE?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.flighT_KIND?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.status?.toLowerCase().includes(this.search.toLowerCase()) ||
              data.parking?.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  }
}
</script>

<style>
.container-fluid {
  padding: 20px;
}

.custom_table_header {
  background-color: #0e6662 !important;
  color: #fff;
}

.custom_header_cell {
  background: transparent !important;
  white-space: nowrap; /* Add this line */
}
.search{
  padding-bottom: 0;
}
.el-table .cell {
  white-space: nowrap; /* Add this line */
}
</style>
