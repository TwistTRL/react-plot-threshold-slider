# react-plot-threshold-slider

v0.0.1
Providing ThresholdSliderLite in place of ThresholdSlider.

## Import
```
import {ThresholdSliderLite, ThresholdOverlay} from "react-plot-threshold-slider";
```

## Example

ThresholdOverlay

```
<ThresholdOverlay width={width}
                  height={height}
                  minY={0}
                  maxY={10000}
                  lowerThreshold={lowerThreshold}
                  upperThreshold={upperThreshold}
                  />
```

ThresholdSliderLite

```
<ThresholdSliderLite  data={DATA}
                      width={width}
                      height={height}
                      minY={0}
                      maxY={10000}
                      lowerThreshold={lowerThreshold}
                      upperThreshold={upperThreshold}
                      updateThresholdHandler={this.updateThreshold}
                      />
```

* data should be an array of object which contains a key `y` as the y axis value.

* updateThresholdHandler receives an object, {upperThreshold,lowerThreshold} as an argument.
