<template>
  <Experiment title="Who said this? - Experiment">
    <InstructionScreen :title="'Welcome'">
      This experiment consists of 12 statements, which you are supposed to read
      and interpret.
      <br />
      <br />
      You task is to evaluate how likely it is that a particular kind of person
      has made that statement.
      <br />
      <br />
    </InstructionScreen>

    <InstructionScreen :title="'General Instructions'">
      Imagine that you consider buying a new TV set for your house. You found a
      candidate that caught your attention, but you are unsure whether it is any
      good.
      <br />
      <br />
      Now imagine that a person tells you something about the reviews they read
      online for exactly this TV set, but you do not know exactly who told you
      this. The message could have come from a friend or a seller. A friend
      would just like to help you make a good decision. A seller might either
      try to sell you this particular product or another one without necessarily
      caring about what you care about. Moreover, the person giving you this
      statement may have exhaustively studied the reviews, or just browsed them
      very briefly. You are supposed to guess, who is most likely to have given
      you a particular statement in a situation like this.
      <br />
      <br />
      For example, the person may have told you:
      <div style="color: gray">
        <strong>"Some reviews are positive but most are negative."</strong>
      </div>
      Now you should indicate how likely (relative to each other) it is that
      this statement came from:
      <ol>
        <li>a friend who read a lot of reviews</li>
        <li>a friend who did not read many reviews</li>
        <li>a seller who read a lot of reviews</li>
        <li>a seller who did not read many of reviews</li>
      </ol>
      You can express the (relative) likelihood using sliders.
    </InstructionScreen>

    <template v-for="(trial, i) in items">
      <InterpretationTrial
        :key="i"
        :trial-n-r="i"
        :item="trial"
        :group="group"
        :progress="i / items.length"
      />/>
    </template>

    <PostTestScreen />

    <!-- While developing your experiment, using the DebugResults screen is fine,
      once you're going live, you can use the <SubmitResults> screen to automatically send your experimental data to the server. -->
    <DebugResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import interpretation_stimuli from '../trials/interpretation_stimuli.csv';
import _ from 'lodash';
import InterpretationTrial from './InterpretationTrial.vue';

// group allocation: 'helpful' vs 'relevant'
//   whether participants see questions regarding helpfulness or relevance
//   all items are formulated in terms of helpfulness
//   if group is 'relevance', we substitute the relevant entries either
//   during the creation of the stimuli or in situ when the material is shown
var group = _.sample(['helpful', 'relevant']);

export default {
  name: 'App',
  components: {
    InterpretationTrial
  },
  data() {
    return {
      items: _.shuffle(interpretation_stimuli),
      group: group,
      // Expose lodash.range to template above
      range: _.range
    };
  }
};
</script>
