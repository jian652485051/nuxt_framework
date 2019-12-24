import {configureBreakpoints, configureDefaultWidth} from 'vue-responsive-component';

configureBreakpoints({
  // these are default breakpoints, you can add other breakpoints too.
  xs: 543,
  sm: 767,
  md: 991,
  lg: 1199,
  xl: 1200,
});

configureDefaultWidth(991);
