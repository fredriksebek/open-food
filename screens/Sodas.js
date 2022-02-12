import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { useAxios } from '../network/api';
import DropDownPicker from 'react-native-dropdown-picker';
import SodaInformation from '../components/SodaInformation';



export default function Sodas({ navigation }) {

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "Pepsico Pepsi Cola Soda", value: "01223004" },
    { label: "Coca - Cola Classic Coke Soft Drink", value: "04963406" },
    { label: "Diet Pepsi", value: "069000019832" },
    { label: "Coca - Cola Zero", value: "5000112519945" },
  ]);

  const [value, setValue] = useState(items[0].value);
  const [{ data, loading, error }, refetch] = useAxios(`/product/${value}`);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        {
          (data == null || loading) ?
            <View style={styles.indicator}>
              <ActivityIndicator />
            </View>
            :
            <SodaInformation key={value} data={data} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    marginTop: 10,
  },
  indicator: {
    marginTop: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
