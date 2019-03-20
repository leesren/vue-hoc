<template>
  <div class="hello" style="width:88%;margin:0 auto;">
    <h3>带分页的table</h3>
    <hr>
    <div>
      <TablePager
        @row-click="handleRowClick"
        :data="tableData"
        style="width: 100%"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="400"
        :default-sort="{prop: 'date', order: 'descending'}"
        layout="total,sizes, prev, pager, next, jumper"
      >
        <el-table-column prop="date" sortable label="日期" width="180"></el-table-column>
        <el-table-column prop="name" sortable label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </TablePager>
    </div>
  </div>
</template>

<script>
import { Table, Pagination } from "element-ui";
import HOC from "./HOC";
export default {
  name: "HelloWorld",
  components: {
    TablePager: HOC(Table, Pagination)
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleRowClick(...args) {
      console.log(args);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .my-wrap-pagination {
  padding: 10px 0 !important;
}
</style>
