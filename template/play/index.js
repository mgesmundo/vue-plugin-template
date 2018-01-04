'use strict'

import { play } from 'vue-play'
import Component from '../src/Component.vue'

play(Component)
  .add('Normal', {
    template: `
      <test :value="count" @increment="count += 1" @decrement="count -= 1"></test>
    `,
    data () {
      return {
        count: 0
      }
    }
  })
