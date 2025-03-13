import { credentials } from "@grpc/grpc-js";
import { createChannel, createClient } from "nice-grpc";
import { GetNetworkRequest, NetworkServiceClient } from "./generated/network_service";

const clientNative = NetworkServiceClient;
const a = new clientNative(
    '127.0.0.1:5051', 
    credentials.createInsecure(), 
    {
        'grpc.service_config': JSON.stringify({
            methodConfig: [
                {
                    name: [{ service: '' }],
                    retryPolicy: {
                        maxAttempts: 3,
                        initialBackoff: '1s',
                        maxBackoff: '20s',
                        backoffMultiplier: 2,
                        retryableStatusCodes: ["INVALID_ARGUMENT"],
                    },
                },
            ],
            retryThrottling: {
                maxTokens: 100,
                tokenRatio: 0.1,
            },
            waitForReady: true,
        }),
        'grpc.enable_retries': 1,
    }
);

a.get(GetNetworkRequest.fromPartial({ networkId: '123' }), (error, value) => {
    console.log(error);
    console.log(value);
});

// console.log('create channel');
// const channel = createChannel(
//     '127.0.0.1:5051',
//     credentials.createInsecure(),
//     {
//         'grpc.service_config': JSON.stringify({
//             methodConfig: [
//                 {
//                     name: [{ service: '' }],
//                     retryPolicy: {
//                         maxAttempts: 3,
//                         initialBackoff: '1s',
//                         maxBackoff: '20s',
//                         backoffMultiplier: 2,
//                         retryableStatusCodes: ["INVALID_ARGUMENT"],
//                     },
//                 },
//             ],
//             retryThrottling: {
//                 maxTokens: 100,
//                 tokenRatio: 0.1,
//             },
//             waitForReady: true,
//         }),
//         'grpc.enable_retries': 1,
//     }
// );

// console.log('create client');
// const client = createClient(serviceClients.NetworkServiceClient.service, channel);

// console.log('start request');
// client.get(cloudApi.vpc.network_service.GetNetworkRequest.fromPartial({ networkId: '123' }))
//     .then((value) => {
//         console.log('success');
//         console.log(value);
//     })
//     .catch((e) => {
//         console.log('failed');
//         console.log(e);
//     });