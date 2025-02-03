/* eslint-disable */
/* THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import { a } from "@aws-amplify/data-schema";
import { configure } from "@aws-amplify/data-schema/internals";
import { secret } from "@aws-amplify/backend";

export const schema = configure({
    database: {
        identifier: "IDRulxgwcjAaFTytBHOXPFXg",
        engine: "mysql",
        connectionUri: secret("SQL_CONNECTION_STRING"),
        vpcConfig: {
            vpcId: "vpc-0222224e1fc2cd0a6",
            securityGroupIds: [
                "sg-04ce520d2d1efcee3"
            ],
            subnetAvailabilityZones: [
                {
                    subnetId: "subnet-0cb377acff0970d64",
                    availabilityZone: "us-east-1e"
                },
                {
                    subnetId: "subnet-07bc10e54dcf98aa5",
                    availabilityZone: "us-east-1f"
                },
                {
                    subnetId: "subnet-00dff6ec2ef614289",
                    availabilityZone: "us-east-1c"
                },
                {
                    subnetId: "subnet-0e42290f429cc8f2f",
                    availabilityZone: "us-east-1b"
                },
                {
                    subnetId: "subnet-056dc1a1d74eecf17",
                    availabilityZone: "us-east-1d"
                },
                {
                    subnetId: "subnet-088ff0fe5fedaf361",
                    availabilityZone: "us-east-1a"
                }
            ]
        }
    }
}).schema({
    "SAVED_RECIPES": a.model({
        idSAVED_RECIPES: a.integer().required(),
        USER_ID: a.string(),
        USER_INGREDIENTS: a.string(),
        USER_RECIPE: a.string()
    }).identifier([
        "idSAVED_RECIPES"
    ])
});
