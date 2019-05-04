<template>
  <el-form :model="model">
    <el-form-item v-if="model.type === 'String' || model.type === 'Number'" :label="model.field" :label-width="formLabelWidth">
      <el-input v-model="model.cell" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-else-if="model.type === 'Date'" :label="model.field" :label-width="formLabelWidth">
      <el-input v-model="model.cell" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-else-if="model.type === 'Boolean'" :label="model.field">
      <el-switch v-model="model.cell"></el-switch>
    </el-form-item>
    <el-form-item v-else-if="model.type === 'Pointer'" v-for="(acl, key) in Object.keys(row[field])" :key="key" :label="acl === '*' ? '所有人' : acl" prop="delivery">
      <el-switch
        v-model="row[field][acl].read"
        active-text="读">
      </el-switch>
      <el-switch
        v-model="row[field][acl].write"
        active-text="写">
      </el-switch>
    </el-form-item>
    <el-form-item v-else-if="model.type === 'ACL'" v-for="(acl, key) in Object.keys(cell.cell)" :key="key" :label="acl === '*' ? '所有人' : acl" prop="delivery">
      <el-switch
        v-model="cell.cell[acl].read"
        active-text="读">
      </el-switch>
      <el-switch
        v-model="cell.cell[acl].write"
        active-text="写">
      </el-switch>
    </el-form-item>
    <el-form-item v-else :label="model.field">
      <el-input type="textarea" v-model="model.cell"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      formLabelWidth: '120px',
    };
  },
  props: {
    cell: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    model() {
      return this.cell;
    },
  },
  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}
</script>

<style>

</style>
