import { message } from "antd";
import Raxios from "./axiosHelper";
import { SetStateAction } from "react";

const sendBarcodeToBackend = async (value: string, setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    setLoading(false);
    try {
        const response = await Raxios.get("/verify_user", {
            params: { hash_code: value }
        });
        setTimeout(() => {
            setLoading(true);
        }, 3000);
        return response.data;
    } catch (err) {
        console.error("Error sending barcode to backend:", err);
        message.error("Failed to send barcode.");
    }
    setLoading(true);
};

export { sendBarcodeToBackend };