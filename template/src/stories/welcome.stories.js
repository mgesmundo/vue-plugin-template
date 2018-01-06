import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Welcome from './Welcome.vue'
import MyButton from './MyButton.vue'
import MyComponent from '../Component.vue'

storiesOf('Welcome', module)
  .add('to Storybook', () => ({
    components: { Welcome },
    template: '<welcome :showApp="action" />',
    methods: { action: linkTo('Button') }
  }))

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') }
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') }
  }))

storiesOf('Counter', module)
  .add('simple', () => ({
    components: { MyComponent },
    template: '<my-component :value="count" @increment="count += 1" @decrement="count -= 1"></my-component>',
    data () {
      return {
        count: 0
      }
    },
    methods: { action: action('clicked') }
  }))
