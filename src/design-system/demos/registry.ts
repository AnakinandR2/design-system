import type { Component } from 'vue'
import Alert from './pages/alert.vue'
import Breadcrumb from './pages/breadcrumb.vue'
import Button from './pages/button.vue'
import Card from './pages/card.vue'
import Checkbox from './pages/checkbox.vue'
import Color from './pages/color.vue'
import DatePicker from './pages/date-picker.vue'
import DeliveryPackage from './pages/delivery-package.vue'
import DesignTokens from './pages/design-tokens.vue'
import Drawer from './pages/drawer.vue'
import Dropdown from './pages/dropdown.vue'
import Empty from './pages/empty.vue'
import Form from './pages/form.vue'
import Input from './pages/input.vue'
import Menu from './pages/menu.vue'
import Message from './pages/message.vue'
import Modal from './pages/modal.vue'
import Navigation from './pages/navigation.vue'
import Notification from './pages/notification.vue'
import PageHeader from './pages/page-header.vue'
import Pagination from './pages/pagination.vue'
import Popconfirm from './pages/popconfirm.vue'
import Popover from './pages/popover.vue'
import Progress from './pages/progress.vue'
import QuickStart from './pages/quick-start.vue'
import Radio from './pages/radio.vue'
import Result from './pages/result.vue'
import Select from './pages/select.vue'
import Skeleton from './pages/skeleton.vue'
import Spin from './pages/spin.vue'
import Steps from './pages/steps.vue'
import Switch from './pages/switch.vue'
import Table from './pages/table.vue'
import Tabs from './pages/tabs.vue'
import Tag from './pages/tag.vue'
import Watermark from './pages/watermark.vue'

export const demoByNavId: Record<string, Component> = {
  'quick-start': QuickStart,
  color: Color,
  'design-tokens': DesignTokens,
  'delivery-package': DeliveryPackage,
  button: Button,
  input: Input,
  select: Select,
  radio: Radio,
  checkbox: Checkbox,
  switch: Switch,
  form: Form,
  tag: Tag,
  tabs: Tabs,
  'date-picker': DatePicker,
  card: Card,
  navigation: Navigation,
  breadcrumb: Breadcrumb,
  'page-header': PageHeader,
  pagination: Pagination,
  steps: Steps,
  dropdown: Dropdown,
  menu: Menu,
  drawer: Drawer,
  modal: Modal,
  table: Table,
  empty: Empty,
  popover: Popover,
  progress: Progress,
  skeleton: Skeleton,
  spin: Spin,
  result: Result,
  watermark: Watermark,
  alert: Alert,
  message: Message,
  notification: Notification,
  popconfirm: Popconfirm,
}

export function getDemoForNavId(navId: string): Component {
  return demoByNavId[navId] ?? QuickStart
}
