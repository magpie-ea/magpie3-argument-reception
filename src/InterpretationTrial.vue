<!-- InterpretationTrial.vue -->
<template>
  <Screen :progress="progress">
    <Slide>
      <Record
        :data="{
          trialNr: trialNR + 1,
          statement: item.statement,
          itemID: item.itemID,
          noun: item.noun,
          predicate: item.predicate,
          statement: item.statement
        }"
      />

      <div style="color: lightgreen">For debugging: quick forward with '~'.</div>

      <KeypressInput
        :response.sync="$magpie.measurements.launch"
        :keys="{
          '~': 'next'
        }"
        :showOptions='false'
        @update:response="$magpie.saveAndNextScreen()"
      />

      <p>You received the following statement:</p>
      <div style="color: darkred">
        <strong>{{ item.statement }}</strong>
      </div>
      <p>How likely is this statement to come from...?</p>
      <br />

      <p>
        a <strong>friend</strong> who read <strong>a lot</strong> of reviews ({{
          showPercentage(
            $magpie.measurements.competentFriend,
            $magpie.measurements.incompetentFriend,
            $magpie.measurements.competentSeller,
            $magpie.measurements.incompetentSeller
          )
        }}%)
      </p>
      <SliderInput
        left="less likely"
        right="more likely"
        initial="25"
        :response.sync="$magpie.measurements.competentFriend"
      />

      <p>
        a <strong>friend</strong> who read <strong>just a few</strong> reviews
        ({{
          showPercentage(
            $magpie.measurements.incompetentFriend,
            $magpie.measurements.competentFriend,
            $magpie.measurements.competentSeller,
            $magpie.measurements.incompetentSeller
          )
        }}%)
      </p>
      <SliderInput
        left="less likely"
        right="more likely"
        initial="25"
        :response.sync="$magpie.measurements.incompetentFriend"
      />

      <p>
        a <strong>seller</strong> who read <strong>a lot</strong> of reviews ({{
          showPercentage(
            $magpie.measurements.competentSeller,
            $magpie.measurements.incompetentFriend,
            $magpie.measurements.competentFriend,
            $magpie.measurements.incompetentSeller
          )
        }}%)
      </p>
      <SliderInput
        left="less likely"
        right="more likely"
        initial="25"
        :response.sync="$magpie.measurements.competentSeller"
      />

      <p>
        a <strong>seller</strong> who read <strong>just a few</strong> reviews
        ({{
          showPercentage(
            $magpie.measurements.incompetentSeller,
            $magpie.measurements.competentFriend,
            $magpie.measurements.incompetentFriend,
            $magpie.measurements.competentSeller
          )
        }}%)
      </p>
      <SliderInput
        left="less likely"
        right="more likely"
        initial="25"
        :response.sync="$magpie.measurements.incompetentSeller"
      />

      <button
        v-if="
          checkResponses(
            $magpie.measurements.competentFriend,
            $magpie.measurements.incompetentFriend,
            $magpie.measurements.competentSeller,
            $magpie.measurements.incompetentSeller
          )
        "
        @click="$magpie.saveAndNextScreen()"
      >
        Submit
      </button>
    </Slide>
  </Screen>
</template>

<script>
export default {
  name: 'RelevanceTrial',
  props: {
    item: {
      type: Object,
      required: true
    },
    trialNR: {
      type: Number,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      sliderResponseClicked: false
    };
  },
  computed: {
    lastTrial() {
      const data = this.$magpie.getAllData();
      return data[data.length - 1];
    }
  },
  methods: {
    checkResponses: function (a, b, c, d) {
      return !(isNaN(a) | isNaN(b) | isNaN(c) | isNaN(d));
    },
    showPercentage: function (a, b, c, d) {
      a = isNaN(a) ? 25 : a;
      b = isNaN(b) ? 25 : b;
      c = isNaN(c) ? 25 : c;
      d = isNaN(d) ? 25 : d;
      return Math.round((a / (a + b + c + d)) * 100);
    }
  }
};
</script>
