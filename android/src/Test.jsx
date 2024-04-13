import { View, Text, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as RNIap from 'react-native-iap';

const productSkus = [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
]

const subSkus = [
    'test.sub1',
]

export default function Test() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function initializeIAP() {
            try {
                await RNIap.initConnection();
                await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
                await RNIap.purchaseUpdatedListener(async (purchase) => {
                    console.log(purchase);
                    const receipt = purchase.transactionReceipt;
                    if (receipt) {
                        try {
                            const acknowledgeResult = await RNIap.finishTransaction({ purchase });
                            Alert.alert('Alert', "purchased successfully");

                            console.info('acknowledgeResult', acknowledgeResult);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
                await RNIap.purchaseErrorListener((error) => {
                    console.log(error);
                    Alert.alert('purchase error', JSON.stringify(error.message));
                })
                console.log('Initialized IAP');
            } catch (err) {
                console.error('Failed to initialize IAP', err);
            }
        }
        initializeIAP();
    }, []);

    const handleGetProducts = async () => {
        try {
            const prod = await RNIap.getProducts({ skus: productSkus });
            setProducts(prod);
        } catch (error) {
            console.log(error);
        }
    };

    async function onPressBuy(id) {
        try {
            RNIap.requestPurchase({ skus: [id] })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            {
                products.map((item) => {
                    return (
                        <TouchableOpacity style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#DDD', }} key={item.productId} onPress={() => onPressBuy(item.productId)}>
                            <Text>{item?.title}</Text>
                            <Text>{item?.description}</Text>
                            <Text>{item?.currency}</Text>
                            <Text>{item?.price}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <Button title="Get the products" onPress={handleGetProducts} />

        </View>
    )
}