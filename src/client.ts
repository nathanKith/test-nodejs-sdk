import { credentials } from "@grpc/grpc-js";
import { GetNetworkRequest, NetworkServiceClient } from "./generated/network_service";

const clientNative = NetworkServiceClient;
const a = new clientNative(
    '127.0.0.1:5052',
    credentials.createInsecure(),
    {
        'grpc.service_config': JSON.stringify({
            loadBalancingConfig: [],
            methodConfig: [
                {
                    name: [{}],
                    retryPolicy: {
                        maxAttempts: 5,
                        initialBackoff: '0.1s',
                        maxBackoff: '20s',
                        backoffMultiplier: 2,
                        retryableStatusCodes: ["INVALID_ARGUMENT"],
                    },
                    waitForReady: true,
                },
            ],
            retryThrottling: {
                maxTokens: 1000,
                tokenRatio: 0.1,
            },
        }),
        // 'grpc.enable_retries': 1,
    }
);

a.get(GetNetworkRequest.fromPartial({ networkId: '123' }), (error, value) => {
    console.log(error);
    console.log(value);
});
