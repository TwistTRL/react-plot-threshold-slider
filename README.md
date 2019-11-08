# react-plot-threshold-slider

v0.0.2
Providing ThresholdSlider. ThresholdSliderLite is removed.

## Import
```
import ThresholdSlider, {ThresholdOverlay} from "react-plot-threshold-slider";
```

## Example

ThresholdOverlay

```html
<ThresholdOverlay width={width}
                  height={height}
                  minY={0}
                  maxY={10000}
                  lowerThreshold={lowerThreshold}
                  upperThreshold={upperThreshold}
                  />
```

ThresholdSlider

```html
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

## Things To Consider
* ThresholdOverlay and ThresholdSlider are not bundled up together into a ThresholdSliderBundle because the user might need to position ThresholdOverlay and ThresholdSlider differently.

* updateThresholdHandler receives an object, {upperThreshold,lowerThreshold} as an argument.
