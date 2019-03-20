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
