import { reactive, ref } from 'vue'

export default function usePagination (page = 1) {

  const pagination = reactive({
    total: 0,
    'page-size': 0,
  })
  const currentPage = ref(+page)
  const perPageCounts = ref([10, 25, 50, 100])
  const perPage = ref(10)
  const setPagination = ({ current_page, total, per_page, last_page }) => {
    pagination.total = +total
    pagination.pageCount = +last_page
    pagination['page-size'] = +per_page
    currentPage.value = +current_page
  }
  return { pagination, currentPage, setPagination, perPage, perPageCounts }

}
