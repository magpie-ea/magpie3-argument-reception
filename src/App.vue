<template>
  <Experiment title="Who said this? - Experiment">
    <InstructionScreen :title="'Welcome'">
      This experiment consists of 10 statements, which you are supposed to read
      and interpret.
      <br />
      <br />
      You task is to evaluate how likely it is that a particular kind of person
      has made that statement.
      <br />
      <br />
    </InstructionScreen>

    <InstructionScreen :title="'General Instructions'">
      This is a sample instructions view.
      <br />
      <br />
      First you will go through two practice trials. The practice trial view
      uses magpie's forced choice trial input.
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
      items: interpretation_stimuli,
      group: group,
      // Expose lodash.range to template above
      range: _.range
    };
  }
};
</script>
