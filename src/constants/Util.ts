export const AddDays = (date = new Date(), days: any) => new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
import appJson from '../../app.json';
import { PixelRatio, Platform } from "react-native";
import { debugPrint } from "../utils/sytemUtil";
import currency from "currency.js";


const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number) => size / fontScale;

const toMoney = (value: number, needFraction = true) => {
    return currency(value, { symbol: "" }).format();
    // var parts = value.toFixed(2).split(".");
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return `${needFraction ? parts.join(".") : parts[0]}`;
}

const toCurrency = ({ }) => {
    currency(123);
}

const tryParseFloat = (value: any) => {
    return parseFloat(value) || 0;
}

export { toMoney, tryParseFloat }

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date: Date) => {
    var dt = [
        padTo2Digits(date.getDate()),
        padTo2Digits(monthNames[date.getMonth()]),
        date.getFullYear()
    ].join(' ');

    // var mt = [date.getUTCHours(),
    // date.getMinutes()].join(':');


    return [
        dt, formatAMPM(date)
    ].join(": ")
}

export const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = +(minutes.toString().padStart(2, '0'));
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getAbsoluteDatePeriod = (from: Date, to: Date): { from: Date; to: Date } => {
    let fd = from;
    fd.setHours(8, 0, 0, 0)
    let td = to;
    td = AddDays(td, 1);
    td.setHours(7, 59, 59, 0);
    return { from: fd, to: td }
}
export const getAlternateDatePeriod = (from: Date, to: Date): { from: Date; to: Date } => {
    let fd = from;
    fd.setHours(6, 0, 0, 0)
    let td = to;
    td = AddDays(td, 1);
    td.setHours(5, 59, 59, 0);
    return { from: fd, to: td }
}


export const countDays = (from: Date, to: Date) => {
    let difference = to.getTime() - from.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
}



const print = (data: any) => {
    return sendPrintDataToPrinter(data)
}



export const sendPrintDataToPrinter = (b64encoded: any) => {
    let body = JSON.stringify({
        "dataBytes": b64encoded,
        "PaperCut": "2"
    })

    let request = fetch("http://127.0.0.1:3456/api/printer", {
        method: "POST",
        body: body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })

    return request;
}

export enum PrintTemplate {
    CHALLAN_TEMPLATE,
    INVOICE_TEMPLATE
}

export const CURRENCY = '৳';

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const parseAddress = (address: string) => {
    if (isJsonString(address)) {
        let a = JSON.parse(address)
        const holding = a?.holding ? `${a?.holding}, ` : "";
        const road = a?.road ? `${a?.road}` : "";
        const addrs = a?.address ? `, ${a?.address}` : "";
        const thana = a?.thana ? `, ${a?.thana}` : "";
        const subDistrict = a?.subDistrict ? `, ${a?.subDistrict}` : "";
        const district = a?.district ? `, ${a?.district}` : "";
        const division = a?.division ? `, ${a?.division}` : "";

        return `Holding-${holding}Road-${road}${addrs}${thana}${subDistrict}${district}${division}`;
    } else {
        return address
    }
}

export const getAddressObject = (address: string) => {
    let result = {
        holding: "",
        road: "",
        addrs: "",
        thana: "",
        subDistrict: "",
        district: "",
        division: "",
        fullAddress: "",
        isObjectType: false
    }
    if (isJsonString(address)) {
        let a = JSON.parse(address)
        const holding = a?.holding ? `${a?.holding}` : "";
        const road = a?.road ? `${a?.road}` : "";
        const addrs = a?.address ? `${a?.address}` : "";
        const thana = a?.thana ? `${a?.thana}` : "";
        const subDistrict = a?.subDistrict ? `${a?.subDistrict}` : "";
        const district = a?.district ? `${a?.district}` : "";
        const division = a?.division ? `${a?.division}` : "";

        result.holding = holding;
        result.road = road;
        result.addrs = addrs;
        result.thana = thana;
        result.subDistrict = subDistrict;
        result.district = district;
        result.division = division;
        result.isObjectType = true;
        result.fullAddress = parseAddress(address);
    } else {
        result.fullAddress = parseAddress(address);
        result.isObjectType = false;
    }
    return result;
}


export const GetHourMinSec = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let data = { h: hours, m: minutes, s: seconds };
    return data;
}