const gRPCInstance = require('../Presentation/gRPCRequests');

const PROTO_PATH = __dirname + '/user.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const _ = require('lodash');

const gRPCRequestHandler = gRPCInstance.getInstance();

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

let user_proto = grpc.loadPackageDefinition(packageDefinition).user;

async function getUserWorkingHour(call, callback) {
    callback(null,
        {
            workingHour: await gRPCRequestHandler.getWorkingHour(call.request.identifier)
        });

}

function isWantedRole(call, callback) {
    callback(null,
        {
            isWantedRole: gRPCRequestHandler.isWantedRole(call.request.token, call.request.role)
        });
}

function canCancel(call, callback) {
    callback(null,
        {
            canCancel: gRPCRequestHandler.canCancel(call.request.token)
        });
}

function main() {
    let server = new grpc.Server();
    server.addService(user_proto.User.service, {
        getUserWorkingHour: getUserWorkingHour,
        canUserCancel: canCancel,
        isWantedRole: isWantedRole
    });

    server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

// todo view.run().then(() => null);
