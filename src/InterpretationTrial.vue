<!-- InterpretationTrial.vue -->
<template>
  <Screen :progress="progress">
    <Slide>
      <Record
        :data="{
          trialNr: trialNR + 1,
          statement: item.statement
        }"
      />

      <!-- <KeypressInput -->
      <!--   :response.sync="$magpie.measurements.launch" -->
      <!--   :keys="{ -->
      <!--     '~': 'next' -->
      <!--   }" -->
      <!--   @update:response="$magpie.saveAndNextScreen()" -->
      <!-- /> -->

     <div style="color: gray;">
       {{item.statement}}
                 </div>
      
      <p>
        <strong>a friend who read a lot of reviews</strong> ({{
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
        <strong>a friend who did not read many reviews</strong> ({{
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
        <strong>a seller who read a lot of reviews</strong> ({{
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
        <strong>a seller who did not read many reviews</strong> ({{
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
