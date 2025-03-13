import {handleUnaryCall, sendUnaryData, Server, ServerCredentials, ServerUnaryCall, UntypedHandleCall, UntypedServiceImplementation} from "@grpc/grpc-js";
import {Status} from "nice-grpc";

import {cloudApi} from '@yandex-cloud/nodejs-sdk';

export interface NetworkServiceServer extends UntypedServiceImplementation {
    /**
     * Returns the specified Network resource.
     *
     * Get the list of available Network resources by making a [List] request.
     */
    get: handleUnaryCall<cloudApi.vpc.network_service.GetNetworkRequest, cloudApi.vpc.network.Network>;
    /** Retrieves the list of Network resources in the specified folder. */
    list: handleUnaryCall<cloudApi.vpc.network_service.ListNetworksRequest, cloudApi.vpc.network_service.ListNetworksResponse>;
    /**
     * Creates a network in the specified folder using the data specified in the request.
     * Method starts an asynchronous operation that can be cancelled while it is in progress.
     */
    create: handleUnaryCall<cloudApi.vpc.network_service.CreateNetworkRequest, cloudApi.operation.operation.Operation>;
    /**
     * Updates the specified network.
     * Method starts an asynchronous operation that can be cancelled while it is in progress.
     */
    update: handleUnaryCall<cloudApi.vpc.network_service.UpdateNetworkRequest, cloudApi.operation.operation.Operation>;
    /** Deletes the specified network. */
    delete: handleUnaryCall<cloudApi.vpc.network_service.DeleteNetworkRequest, cloudApi.operation.operation.Operation>;
    /** Lists subnets from the specified network. */
    listSubnets: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkSubnetsRequest, cloudApi.vpc.network_service.ListNetworkSubnetsResponse>;
    /** Lists security groups from the specified network. */
    listSecurityGroups: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkSecurityGroupsRequest, cloudApi.vpc.network_service.ListNetworkSecurityGroupsResponse>;
    /** Lists route tables from the specified network. */
    listRouteTables: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkRouteTablesRequest, cloudApi.vpc.network_service.ListNetworkRouteTablesResponse>;
    /** Lists operations for the specified network. */
    listOperations: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkOperationsRequest, cloudApi.vpc.network_service.ListNetworkOperationsResponse>;
    /** Move network to another folder. */
    move: handleUnaryCall<cloudApi.vpc.network_service.MoveNetworkRequest, cloudApi.operation.operation.Operation>;
}

class NetworkServiceMock implements NetworkServiceServer {
    list: handleUnaryCall<cloudApi.vpc.network_service.ListNetworksRequest, cloudApi.vpc.network_service.ListNetworksResponse> = () => {};
    create: handleUnaryCall<cloudApi.vpc.network_service.CreateNetworkRequest, cloudApi.operation.operation.Operation> = () => {};
    update: handleUnaryCall<cloudApi.vpc.network_service.UpdateNetworkRequest, cloudApi.operation.operation.Operation> = () => {};
    delete: handleUnaryCall<cloudApi.vpc.network_service.DeleteNetworkRequest, cloudApi.operation.operation.Operation> = () => {};
    listSubnets: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkSubnetsRequest, cloudApi.vpc.network_service.ListNetworkSubnetsResponse> = () => {};
    listSecurityGroups: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkSecurityGroupsRequest, cloudApi.vpc.network_service.ListNetworkSecurityGroupsResponse> = () => {};
    listRouteTables: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkRouteTablesRequest, cloudApi.vpc.network_service.ListNetworkRouteTablesResponse> = () => {};
    listOperations: handleUnaryCall<cloudApi.vpc.network_service.ListNetworkOperationsRequest, cloudApi.vpc.network_service.ListNetworkOperationsResponse> = () => {};
    move: handleUnaryCall<cloudApi.vpc.network_service.MoveNetworkRequest, cloudApi.operation.operation.Operation> = () => {};
    get: handleUnaryCall<cloudApi.vpc.network_service.GetNetworkRequest, cloudApi.vpc.network.Network> = (
        call: ServerUnaryCall<cloudApi.vpc.network_service.GetNetworkRequest, cloudApi.vpc.network.Network>, 
        callback: sendUnaryData<cloudApi.vpc.network.Network>
    ) => {
        const error = {
            name: 'INVALID_ARGUMENT',
            message: 'INVALID_ARGUMENT (testing retries)',
            code: Status.INVALID_ARGUMENT,
        };
        callback(error, null);

        console.log('request finishes');
    };
    [name: string]: UntypedHandleCall;

}

(async () => {
    console.log('create server');
    const server = new Server();
    console.log('create service');
    const networkService = new NetworkServiceMock();

    console.log('add service');
    server.addService(
        
        cloudApi.vpc.network_service.NetworkServiceService,
        networkService,
    );

    console.log('bind service');
    server.bindAsync(
        '127.0.0.1:5051',
        ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.log(error);
            }
        },
    );
})();
