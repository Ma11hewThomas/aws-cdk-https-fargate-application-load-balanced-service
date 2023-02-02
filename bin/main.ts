#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HttpsFargateApplicationLoadBalancedServiceStack } from '../lib/https-fargate-application-load-balanced-service-stack';

const app = new cdk.App();
new HttpsFargateApplicationLoadBalancedServiceStack(app, 'HttpsFargateApplicationLoadBalancedServiceStack', {
  certificateDomainName: "example.com",
  hostedZoneName: "example.com",
  hostedZoneId: "Z000000000000",
  aRecordName: "example.com",
});