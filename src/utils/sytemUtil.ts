
import { Dimensions } from "react-native";
import { Alert, Platform, ToastAndroid } from "react-native";
const isIos = Platform.OS == "ios"

export const ShowToast = (msg: string, type: number, toastFinished?: () => void): void => {
    isIos ?
        Alert.alert(type == 1 ? "Success" : "Error", msg)
        :
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    toastFinished && toastFinished()
}

export const ShowAlert = (msg: string, type: number, alertFinished?: () => void): void => {
    Alert.alert(type == 1 ? "Success" : "Message", msg, [
        {
            text: 'OK', onPress: () => {
                alertFinished && alertFinished()
            }
        },
    ])

}

export const debugPrint = (data: any, header?: string) => {
    // if (ENV_MODE !== "production") {
    header && isIos ?
        console.log(JSON.stringify(`======= ${header} =======`, getCircularReplacer))
        :
        console.log(JSON.stringify(`======= ${header} =======`, undefined, 2));
    isIos ?
        console.log(JSON.stringify(data, getCircularReplacer))
        :
        console.log(JSON.stringify(data, undefined, 2));
    // }
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: any, value: any) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export const secondsToHms = (d: number) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
}

export function numberCommaSeparated(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const debounce = (func: any, millisecond: number) => {
    let timer: any;
    return function (...args: any) {
        const context = "";
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, millisecond);
    };
};
export function validPhoneNumberCheck(phoneNumber: string) {
    // Regular expression to match Bangladeshi phone numbers with country code +880
    var regex = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;

    // Check if the phone number matches the regex
    return regex.test(phoneNumber);
}

export function StringSanitizer(text: string) {
    const parts = text?.toLowerCase().split('_') ?? [];
    const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    const result = capitalizedParts.join(' ');
    return result;
}

// export const ApiKeyHeader = { headers: { "X-API-KEY": API_KEY } };

export const isSmallDevice = Dimensions.get('window').width < 479
export const isMediumDevice = Dimensions.get('window').width < 767
export const isLargeDevice = Dimensions.get('window').width < 991

export const PaymentOptionsImages = (img: string) => {

    const paymentImgs: any = {
        Cash: require("../assets/images/cash-logo.png"),
        Bkash: require("../assets/images/bkash-logo.png"),
        Rocket: require("../assets/images/rocket-logo.png"),
    }
    return paymentImgs[img]
}