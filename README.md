# react-plot-threshold-slider

v0.0.2
Providing ThresholdSlider. ThresholdSliderLite is removed.

## Import
```
import {ThresholdSlider, ThresholdOverlay} from "react-plot-threshold-slider";
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
<ThresholdSlider  data={DATA}
                  value="y"
                  width={width}
                  height={height}
                  minY={0}
                  maxY={10000}
                  lowerThreshold={lowerThreshold}
                  upperThreshold={upperThreshold}
                  updateThresholdHandler={this.updateThreshold}
                  />
```

* updateThresholdHandler receives an object, {upperThreshold,lowerThreshold} as an argument.
