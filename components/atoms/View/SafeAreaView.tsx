import { Platform, SafeAreaView as IosSafeAreaView } from 'react-native';
import { SafeAreaView as AosSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = Platform.OS === 'ios' ? IosSafeAreaView : AosSafeAreaView;
export default SafeAreaView;
