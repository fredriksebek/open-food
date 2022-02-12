
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Animated, { BounceInDown, BounceInUp, BounceOutDown, BounceOutUp, FadeInLeft, FadeInRight, FadeInUp, FadeOut, FadeOutDown, FadeOutRight, Layout, ZoomOutDown } from "react-native-reanimated";
import { Text, View } from '../components/Themed';

// Converts the list of ingredients into a formatted string.
const buildStringFromList = (list, map) => list && list.length > 0 ? list.reduce(
  (previousValue, currentValue, index) => previousValue + map(currentValue).toLowerCase() + ((index + 1 == list.length) ? "." : ", "),
  ""
) : "information is missing."


export default function SodaInformation(props) {

  const product = props.data?.product;
  
  let additives = buildStringFromList(product.additives_tags, (currentValue) => currentValue);
  let ingredients = buildStringFromList(product.ingredients, (currentValue) => currentValue.text);

  return (
    <Animated.View
      style={styles.container}
      entering={BounceInDown}>
      <ScrollView>
        {!!product.nutriscore_grade &&
          <View style={{ ...styles.section, ...styles.row }}>
            <Text style={styles.title}>
              {`Nutriscore grade`}
            </Text>
            <Text>
              {`${product.nutriscore_grade.toUpperCase()}`}
            </Text>
          </View>
        }
        {!!product.nutrient_levels &&
          <View style={styles.section}>
            <Text style={styles.title}>
              {`Nutrient levels`}
            </Text>
            {Object.keys(product.nutrient_levels).map((nutrient, index) =>
              <View key={index} style={styles.row}>
                <Text>{nutrient}</Text>
                <Text>{product.nutrient_levels[nutrient]}</Text>
              </View>
            )}
          </View>
        }
        {!!additives &&
          <View style={styles.section}>
            <Text style={styles.title}>{"Additives"}</Text>
            <Text>{additives}</Text>
          </View>
        }
        {!!ingredients &&
          <View style={styles.section}>
            <Text style={styles.title}>{"Ingredients"}</Text>
            <Text>{ingredients}</Text>
          </View>
        }
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: '100%'
  },
  section: {
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 3,
  }
});