<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const formRef = ref<FormInstance>()
const model = reactive({
  name: '',
  region: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择区域', trigger: 'change' }],
}

function submit() {
  formRef.value?.validate((ok) => {
    if (ok) console.info('valid', model)
  })
}

const SNIPPET_USAGE = `<template>
  <el-form :model="model" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="model.name" />
    </el-form-item>
  </el-form>
</template>`

const SNIPPET_STYLES = `<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-width="88px" style="max-width: 420px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="model.name" placeholder="必填" clearable />
    </el-form-item>
    <el-form-item label="区域" prop="region">
      <el-select v-model="model.region" placeholder="请选择" clearable style="width: 100%">
        <el-option label="华东" value="east" />
        <el-option label="华北" value="north" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交校验</el-button>
      <el-button @click="formRef?.resetFields()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<!-- script：formRef、model、rules、submit、resetFields -->`

const SNIPPET_STATE = `<template>
  <el-form :model="model" disabled label-width="88px">
    <el-form-item label="名称"><el-input v-model="model.name" /></el-form-item>
  </el-form>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Form</code>；按钮区走 Figma 规范；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-form :model="model" label-width="80px" style="max-width: 420px">
        <el-form-item label="名称">
          <el-input v-model="model.name" placeholder="输入" clearable />
        </el-form-item>
      </el-form>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample
      title-zh="校验与表单项"
      title-en="Validation"
      intro-zh="rules + 提交/重置。"
      intro-en="Rules and actions."
      :code="SNIPPET_STYLES"
    >
      <el-form ref="formRef" :model="model" :rules="rules" label-width="88px" style="max-width: 420px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="model.name" placeholder="必填" clearable />
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <el-select v-model="model.region" placeholder="请选择" clearable style="width: 100%">
            <el-option label="华东" value="east" />
            <el-option label="华北" value="north" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交校验</el-button>
          <el-button @click="formRef?.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="整表禁用" title-en="Form disabled" :code="SNIPPET_STATE" compact>
      <el-form :model="model" disabled label-width="88px" style="max-width: 420px">
        <el-form-item label="名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item label="区域">
          <el-input model-value="华东" />
        </el-form-item>
      </el-form>
    </DsDocSample>
  </div>
</template>
