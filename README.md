# hoc

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

# Vue 高阶组件例子 🌰

带分页功能的表格

![image.png](https://cdn.nlark.com/yuque/0/2019/png/119906/1553062760334-6d75023f-4bdd-4cd7-a9e2-8127d9a010dd.png#align=left&display=inline&height=396&name=image.png&originHeight=396&originWidth=1293&size=48144&status=done&width=1293)<br />这是一个非常常见的功能，用高阶组件的写法非常简单，并且高效。看例子

<a name="HelloWorld.vue"></a>

## HelloWorld.vue

```jsx
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

```

<a name="HOC.js"></a>

## HOC.js

```javascript
export default function Hoc(Table, Pagination) {
  return {
    data() {
      return {
        currentPage: 1
      };
    },
    mounted() {
      console.log('I am Hoc WrapComponent, mounted.');
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

    render(h) {
      const table = h(
        Table,
        {
          on: this.$listeners,
          props: {
            ...this.$attrs
          }
        },
        this.$slots.default
      );
      const pagers = h(Pagination, {
        staticClass: 'my-wrap-pagination',
        on: {
          ...this.$listeners,
          'current-change': this.handleCurrentChange,
          'size-change': this.handleSizeChange
        },
        props: {
          ...this.$attrs,
          'current-page': this.currentPage
        }
      });
      return h('div', [table, pagers]);
    }
  };
}
```
