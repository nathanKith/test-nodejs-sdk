import {handleUnaryCall, sendUnaryData, Server, ServerCredentials, ServerUnaryCall, UntypedHandleCall, UntypedServiceImplementation} from "@grpc/grpc-js";
import {Status} from "nice-grpc";
import { CreateNetworkRequest, DeleteNetworkRequest, GetNetworkRequest, ListNetworkOperationsRequest, ListNetworkOperationsResponse, ListNetworkRouteTablesRequest, ListNetworkRouteTablesResponse, ListNetworkSecurityGroupsRequest, ListNetworkSecurityGroupsResponse, ListNetworksRequest, ListNetworksResponse, ListNetworkSubnetsRequest, ListNetworkSubnetsResponse, MoveNetworkRequest, NetworkServiceService, UpdateNetworkRequest } from "./generated/network_service";
import { Operation } from "./generated/operation";
import { Network } from "./generated/network";

export interface NetworkServiceServer extends UntypedServiceImplementation {
    /**
     * Returns the specified Network resource.
     *
     * Get the list of available Network resources by making a [List] request.
     */
    get: handleUnaryCall<GetNetworkRequest, Network>;
    /** Retrieves the list of Network resources in the specified folder. */
    list: handleUnaryCall<ListNetworksRequest, ListNetworksResponse>;
    /**
     * Creates a network in the specified folder using the data specified in the request.
     * Method starts an asynchronous operation that can be cancelled while it is in progress.
     */
    create: handleUnaryCall<CreateNetworkRequest, Operation>;
    /**
     * Updates the specified network.
     * Method starts an asynchronous operation that can be cancelled while it is in progress.
     */
    update: handleUnaryCall<UpdateNetworkRequest, Operation>;
    /** Deletes the specified network. */
    delete: handleUnaryCall<DeleteNetworkRequest, Operation>;
    /** Lists subnets from the specified network. */
    listSubnets: handleUnaryCall<ListNetworkSubnetsRequest, ListNetworkSubnetsResponse>;
    /** Lists security groups from the specified network. */
    listSecurityGroups: handleUnaryCall<ListNetworkSecurityGroupsRequest, ListNetworkSecurityGroupsResponse>;
    /** Lists route tables from the specified network. */
    listRouteTables: handleUnaryCall<ListNetworkRouteTablesRequest, ListNetworkRouteTablesResponse>;
    /** Lists operations for the specified network. */
    listOperations: handleUnaryCall<ListNetworkOperationsRequest, ListNetworkOperationsResponse>;
    /** Move network to another folder. */
    move: handleUnaryCall<MoveNetworkRequest, Operation>;
}

class NetworkServiceMock implements NetworkServiceServer {
    list: handleUnaryCall<ListNetworksRequest, ListNetworksResponse> = () => {};
    create: handleUnaryCall<CreateNetworkRequest, Operation> = () => {};
    update: handleUnaryCall<UpdateNetworkRequest, Operation> = () => {};
    delete: handleUnaryCall<DeleteNetworkRequest, Operation> = () => {};
    listSubnets: handleUnaryCall<ListNetworkSubnetsRequest, ListNetworkSubnetsResponse> = () => {};
    listSecurityGroups: handleUnaryCall<ListNetworkSecurityGroupsRequest, ListNetworkSecurityGroupsResponse> = () => {};
    listRouteTables: handleUnaryCall<ListNetworkRouteTablesRequest, ListNetworkRouteTablesResponse> = () => {};
    listOperations: handleUnaryCall<ListNetworkOperationsRequest, ListNetworkOperationsResponse> = () => {};
    move: handleUnaryCall<MoveNetworkRequest, Operation> = () => {};
    get: handleUnaryCall<GetNetworkRequest, Network> = (
        call: ServerUnaryCall<GetNetworkRequest, Network>,
        callback: sendUnaryData<Network>
    ) => {
        console.log('request started');
        const error = {
            name: 'UNAVAILABLE',
            message: 'UNAVAILABLE (testing retries)',
            code: Status.UNAVAILABLE,
        };
        callback(error, null);

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

        NetworkServiceService,
        networkService,
    );

    console.log('bind service');
    server.bindAsync(
        '127.0.0.1:5052',
        ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.log(error);
            }
        },
    );
})();
