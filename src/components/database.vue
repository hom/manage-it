<template>
<section>
  <el-table
    ref="DATABASE_TABLE"
    stripe
    border
    height="calc(100vh - 120px)"
    :data="collection.results"
    style="width: 100%"
    :cell-style="{'padding-top': '4px', 'padding-bottom': '4px', 'font-size': '12px', 'color': '#0E69A1'}"
    @cell-mouse-enter="handleCellMouseEnter"
    @cell-mouse-leave="handleCellMouseLeave"
    @cell-dblclick="handleCellDbClick"
    @selection-change="handleSelectionChange">
    <el-table-column
      fixed="left"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="操作"
      width="60">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
        <el-button @click="handleDeleteRow(scope.row)" type="text" size="small"><i class="el-icon-delete"></i></el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      v-for="(field, index) in fields"
      show-overflow-tooltip
      :key="index"
      width="160"
      :prop="field.field"
      :label="`${field.field}/${field.type}`">
      <template slot-scope="scope">
        <Column :row="scope.row" :field="field" />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog ref="EDIT_ROW_DIALOG" :title="row.objectId" :visible.sync="isShowEditDialog">
    <el-form :model="row">
      <el-form-item v-for="(field, index) in Object.keys(row)" :key="index" :label="field" :label-width="formLabelWidth">
        <el-switch v-if="schema.fields[field].type === 'Boolean'" v-model="row[field]"></el-switch>
        <div v-else-if="schema.fields[field].type === 'ACL'">
          <el-form-item v-for="(acl, key) in Object.keys(row[field])" :key="key" :label="acl === '*' ? '所有人' : acl" prop="delivery">
            <el-switch
              v-model="row[field][acl].read"
              active-text="读">
            </el-switch>
            <el-switch
              v-model="row[field][acl].write"
              active-text="写">
            </el-switch>
          </el-form-item>
        </div>
        <el-select v-else-if="schema.fields[field].type === 'Pointer'" v-model="row[field].objectId" :placeholder="row[field].objectId">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-input v-else v-model="row[field]" :disabled="field === 'createdAt' || field === 'updatedAt' || field === 'objectId'" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowEditDialog = false">完 成</el-button>
      </div>
  </el-dialog>
  <el-dialog ref="EDIT_CELL_DIALOG" :title="cell.field" :close="handleCloseEditCellDialog" :visible.sync="isShowEditCellDialog">
      <EditRowCell :cell="cell" />
  </el-dialog>

  <el-footer>
    <el-checkbox @change="toggleSelectAll" v-model="isSelectAll">{{ isSelectAll ? '取消全选' : '全选' }}</el-checkbox>
    <el-button @click="handleDeleteRow" type="text">删除</el-button>
  </el-footer>
</section>
</template>

<script>
import { mapState } from 'vuex';
import Column from '@/components/column.vue';
import EditRowCell from '@/components/edit-row-cell.vue';

export default {
  data() {
    return {
      isSelectAll: false,
      multipleSelection: [],
      row: '',
      cell: '',
      formLabelWidth: '120px',
      isShowEditDialog: false,
      isShowEditCellDialog: false,
    }
  },

  components: {
    Column,
    EditRowCell,
  },

  computed: {
    ...mapState({
      schema: (state) => state.schema.schema,
      fields: (state) => {
        if (!state.schema.schema) return [];
        const { fields } = state.schema.schema;
        // eslint-disable-next-line
        return Object.keys(fields).map((item) => {
          return {
            field: item,
            ...fields[item],
          }
        })
      },
      collection: (state) => state.collection.collection,
    }),
  },

  methods: {
    handleCellMouseEnter(row, column, cell, e) {
      e.target.style.color = 'green';
    },
    handleCellDbClick(row, column) {
      const field = column.label.split('/');
      this.cell = {
        cell: row[field[0]],
        field: field[0],
        type: field[1],
      }
      this.isShowEditCellDialog = true;
    },
    handleCellMouseLeave(row, column, cell, e) {
      e.target.style.color = '#0E69A1';
    },
    handleEdit(row) {
      this.row = row;
      this.isShowEditDialog = true;
    },
    handleDeleteRow() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseEditCellDialog() {
      this.cell = '';
    },
    toggleSelectAll() {
      this.$refs.DATABASE_TABLE.toggleAllSelection();
    },
  },

  mounted() {
    this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', this.$route.params.className);
    this.$store.dispatch('collection/ACTION_FETCH_COLLECTION', this.$route.params.className);
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.path.startsWith('/database')) {
      await this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', to.params.className);
      await this.$store.dispatch('collection/ACTION_FETCH_COLLECTION', to.params.className);
    }
    next();
  },
}
</script>

<style lang="scss" scoped>
.el-footer {
  line-height: 60px;
}
</style>
